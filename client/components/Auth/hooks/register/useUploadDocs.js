import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { KEYS, REQUIRED_FIELD } from '@/utils/constant'
import commonApi from '@/api/common'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'
import { getToken, LocalStorage, getTempToken } from '@/utils/localStorage'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'; // You might need to install 'uuid'

const useUploadDocs = () => {
  const router = useRouter()
  const [identityDocs, setidentityDocs] = useState([])
  const [loading, setLoading] = useState(false)

  const [id, setID] = useState()
  const [token, setToken] = useState()

  useEffect(() => {
    const id = localStorage.getItem(KEYS.userId)
    setID(id)
    const token = getTempToken()
    setToken(token)
  }, [])

  const handleFileChange = newFileData => {
    const updatedFiles = [
      ...identityDocs,
      ...newFileData.map(file => ({
        id: uuidv4(),
        file,
        preview: URL.createObjectURL(file),
      })).filter(
        newImage => !identityDocs.some(existingImage => existingImage.file.name === newImage.file.name)
      ),
    ];
  
    setidentityDocs(updatedFiles);
    formik.setFieldValue('identityDocs', updatedFiles);
  };


  const handleFileRemove = index => {
    console.log(`handleFileRemove`, index);
    setidentityDocs(prevDocs => prevDocs.filter((_, i) => i !== index));
  };

  const handleImageCapture = (imageFile) => {
    console.log('Captured image file:', imageFile);
  
    const uniqueImageObject = {
      id: uuidv4(), // Generate a unique ID for the image
      file: imageFile.file,
      preview: imageFile.preview,
    };
  
    setidentityDocs(prevImages => [...prevImages, uniqueImageObject]);
  };

  

  const onClickSubmit = async values => {
    try {
      setLoading(true)

      // Prepare promises for file uploads
      const uploadPromises = identityDocs.map(async doc => {
        console.log(`doc`, doc.file.name)
        console.log(`doc`, doc.file)

        const folder = 'identity-docs'
        const file = doc.file.name

        const payload = new FormData()
        payload?.append('folder', folder)
        payload?.append('file', doc.file, file)

        return commonApi({
          action: 'imgUpload',
          data: payload,
          config: {
            contentType: 'multipart/form-data',
            tempToken: token,
          },
        })
      })

      // Execute all upload promises in parallel
      const uploadResults = await Promise.all(uploadPromises)

      // Process the results to extract file IDs
      const uploadedFileIds = uploadResults
        .filter(result => result?.DATA?.id)
        .map(result => result.DATA.id)

      // Construct the data object for the update API call
      const data = {
        identityDocuments: uploadedFileIds,
      }

      console.log(`data FROM ARRAY`, data)
      // Update the user with the uploaded file IDs
      const { DATA } = await commonApi({
        parameters: [id],
        action: 'updateClient',
        data,
        config: { tempToken: token },
      })

      LocalStorage.setUser(DATA)

      router.push(routes.account.lastStep)
    } catch (e) {
      console.error('Error updating client:', e);

      // Display a user-friendly error message
      let errorMessage = 'Registration Failed! Please try again.'
      if (e?.response?.data) {
        // If the API returned a specific error message
        errorMessage = e.response.data.message || errorMessage
      } else if (e?.message) {
        // Use error's message if available
        errorMessage = e.message
      }
      toast.error(errorMessage)
      // toast.error('Registration Failed!')
    } finally {
      setLoading(false)
    }
  }


  const formik = useFormik({
    initialValues: {
      identityDocs: [],
    },
    validationSchema: Yup.object({
      identityDocs: Yup.array().of(
        Yup.object().shape({
          file: Yup.mixed().nullable(),
          // fileType: Yup.string().required('File type is required'),
        })
      ),
    }),
    onSubmit: values => {
      if (values.identityDocs.length === 0) {
        toast.error('Your must upload one of your Identity Document')
        return
      }
      console.log(values) // Handle form submission
      onClickSubmit(values)

      // Implement submission logic here
    },
  })

  const redirectLogin = () => {
    router.push(routes.sesson.new)
  }

  return {
    loading,
    identityDocs,
    formik,
    redirectLogin,
    handleFileChange,
    handleImageCapture, 
    handleFileRemove, 
  }
}

export default useUploadDocs
