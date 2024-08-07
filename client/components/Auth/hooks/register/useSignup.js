import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import commonApi from '@/api/common'
import {
  EMAIL_VALIDATION,
  KEYS,
  PASSWORD_VALIDATION,
  REQUIRED_FIELD,
} from '@/utils/constant'
import routes from '@/utils/routes'

const useSignup = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const initialValues = {
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    acceptTerms: false,
  };


  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(EMAIL_VALIDATION, 'Invalid email address')
      .required('Please enter email.'),
    phone: Yup.string()
      .required('Please enter phone number.')
      .min(10, 'Number should be greater than 5 and less than 15')
      .max(15, 'Number should be greater than 5 and less than 15'),
    password: Yup.string()
      .matches(
        PASSWORD_VALIDATION,
        'Contains at least 8 characters, 1 Upper case (A-Z), 1 number (0-9) & one special symbol'
      )
      .required('Please enter password.'),
    confirm_password: Yup.string()
      .when('password', {
        is: val => !!(val && val.length > 0),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Password does not match'
        ),
      })
      .required('Please enter confirm password.'),
    acceptTerms: Yup.bool().oneOf(
      [true],
      'Accept terms & conditions is required'
    ),
  });

  const onClickSubmit = async values => {
    const { confirm_password, ...value } = values
    setLoading(true)
    try {
      await commonApi({
        action: 'signup',
        data: value,
      }).then(({ DATA = {}, MESSAGE }) => {
        localStorage.setItem(KEYS.userId, DATA.result?.id)
        localStorage.setItem(KEYS.email, DATA.result?.email)
        localStorage.setItem(KEYS.tempToken, DATA.token)
        router.push(routes.account.firstStep)
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      await onClickSubmit(values)
      formikHelpers.setSubmitting(false);
    },
  })

  return {
    loading,
    formik,
  }
}

export default useSignup
