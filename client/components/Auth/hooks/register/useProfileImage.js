import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { KEYS, REQUIRED_FIELD } from '@/utils/constant'
import commonApi from '@/api/common'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'
import { getToken, LocalStorage, getTempToken } from '@/utils/localStorage'
import toast from 'react-hot-toast'

const useProfileImage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [id, setID] = useState()
  const [token, setToken] = useState()

  useEffect(() => {
    const id = localStorage.getItem(KEYS.userId)
    setID(id)
    const token = getTempToken()
    setToken(token)
  }, [])

  const onClickSubmit = async values => {
    try {
      let { profile_image } = values

      setLoading(true)

      // upload default profile image
      if (!profile_image) {
        const folder = 'images'
        const fileName = 'Avatar.svg'
        const filePath = '/images/Avatar.svg'
        const formData = new FormData()

        const response = await fetch(filePath)
        const blob = await response.blob()

        const file = new File([blob], fileName)

        formData.append('folder', folder)
        formData.append('file', file, fileName)

        const profileUploadResult = await commonApi({
          action: 'imgUpload',
          data: formData,
          config: {
            contentType: 'multipart/form-data',
            tempToken: token,
          },
        })

        profile_image = profileUploadResult?.DATA?.id
      }

      const data = {
        profile_image,
        flag: 3,
      }

      const { DATA } = await commonApi({
        parameters: [id],
        action: 'updateClient',
        data,
        config: { tempToken: token },
      })

      LocalStorage.setUser(DATA)

      router.push(routes.account.verify)
    } catch (e) {
      console.error(e)
      toast.error('Registration Failed!')
    }
  }

  const formik = useFormik({
    initialValues: {
      profile_image: '',
    },
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const redirectLogin = () => {
    router.push(routes.sesson.new)
  }

  return {
    image,
    setImage,
    formik,
    loading,
    redirectLogin,
  }
}

export default useProfileImage