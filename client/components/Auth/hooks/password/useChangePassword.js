import { PASSWORD_VALIDATION, REQUIRED_FIELD } from '@/utils/constant'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import commonApi from '@/api/common'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'
import toast from 'react-hot-toast'

const useChangePassword = () => {
  const router = useRouter()
  const { query } = useRouter()

  const [loading, setLoading] = useState(false)

  const onClickSubmit = async values => {
    const data = {
      password: values.password,
      token: query.token,
    }

    setLoading(true)
    try {
      await commonApi({
        action: 'changePassword',
        data,
      }).then(({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        router.push(routes.password.success)
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(
          PASSWORD_VALIDATION,
          'Contains at least 8 characters, 1 Upper case (A-Z), 1 number (0-9) & one special symbol'
        )
        .required("Please enter password."),
      confirm_password: Yup.string()
        .when('password', {
          is: val => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Password does not match'
          ),
        })
        .required("Please enter confirm password."),
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

export default useChangePassword
