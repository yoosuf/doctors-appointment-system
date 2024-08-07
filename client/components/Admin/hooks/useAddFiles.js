import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { REQUIRED_FIELD, MASTER_CODE } from '@/utils/constant'
import toast from 'react-hot-toast'

const TYPES = [
  {
    label: 'PNG',
    value: 'image/png',
  },
  {
    label: 'JPG/JPEG',
    value: 'image/jpg,image/jpeg',
  },
  {
    label: 'PDF',
    value: 'application/pdf',
  },
  {
    label: 'DOC/DOCX',
    value: '.doc,.docx',
  },
]

const useAddFiles = props => {
  const [loading, setLoading] = useState()
  const [notVisibleToPatient, setNotVisibleToPatient] = useState(false)
  const [image, setImage] = useState([])
  const [fileCategoryOptionsData, setFileCategoryOptionsData] = useState([])
  const [fileCategoryValue, setFileCategoryValue] = useState({})
  const [fileTypeOptionsData, setFileTypeOptionsData] = useState(TYPES)
  const [fileTypeValue, setFileTypeValue] = useState({})

  const closeBtn = async () => {
    await props.setActiveFile(true)
    const addFile = document.getElementById('AddFileModal')
    addFile.classList.remove('active')
    const modalBody = document.getElementById('top-div-file')
    modalBody.scrollTop = 0
    formik.resetForm()
    setNotVisibleToPatient(false)
    setImage([])
    setFileCategoryOptionsData([])
    setFileCategoryValue({})
    setFileTypeOptionsData(TYPES)
    setFileTypeValue({})
  }

  useEffect(() => {
    if(props.activeFile) {
      loadOptionsServiceCatgory()
    }
  }, [props.activeFile])

  const loadOptionsServiceCatgory = async (inputValue, callback) => {
    const data = {
      query: {
        code: [MASTER_CODE.FILE_CATEGORY],
      },
      options: {
        select: [],
      },
    }
    await commonApi({
      action: 'findMaster',
      data,
    }).then(async ({ DATA = [] }) => {
      const category = DATA?.[0]?.subMasters
      const fileCategoryData = category?.map((data = {}) => ({
        value: data._id,
        label: data.name,
      }))
      setFileCategoryOptionsData(fileCategoryData)
      callback?.(fileCategoryData)
    })
  }

  const onClickSubmit = async values => {
    setLoading(true)
    try {
      const { imageIds, ...value } = values

      let imageId = []
      imageIds?.map(i => {
        imageId = [...imageId, i?._id]
      })

      const data = {
        ...value,
        imageIds: imageId,
        notVisibleToPatient,
      }
      await commonApi({
        action: 'addFile',
        data,
      }).then(({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        closeBtn()
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      imageIds: [],
      description: '',
      type: '',
      slug: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter title."),
      imageIds: Yup.array().min(1, REQUIRED_FIELD).required(REQUIRED_FIELD),
      description: Yup.string().required("Please enter description."),
      slug: Yup.string().required("Please select slug."),
      // type: Yup.string().required("Please select type."),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    loading,
    closeBtn,
    formik,
    image,
    setImage,
    // Toggle Switch State
    notVisibleToPatient,
    setNotVisibleToPatient,
    // File Category Dropdown State
    fileCategoryOptionsData,
    fileCategoryValue,
    setFileCategoryValue,
    // File Type Dropdown State
    fileTypeOptionsData,
    fileTypeValue,
    setFileTypeValue,
  }
}

export default useAddFiles
