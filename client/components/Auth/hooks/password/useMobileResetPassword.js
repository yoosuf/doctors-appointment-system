import React, { useState } from 'react'
import * as Yup from 'yup'
import commonApi from '@/api/common'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { KEYS } from '@/utils/constant'
import { useFormik } from 'formik'
import routes from '@/utils/routes'

const useMobileResetPassword = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onClickSubmit = async values => {
    setLoading(true)
    try {
      await commonApi({
        action: 'forgotPassword',
        data: values,
      }).then(({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        router.push(routes.password.recoverPhone)
        localStorage.setItem(KEYS.phone, values.phone)
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Please enter phone number.')
        .min(5, 'Invalid phone number')
        .max(15, 'Invalid phone number'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })
  return {
    loading,
    formik,
  }
}

export default useMobileResetPassword
