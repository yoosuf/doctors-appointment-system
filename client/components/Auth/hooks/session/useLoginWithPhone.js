import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import commonApi from '@/api/common'
import toast from 'react-hot-toast'

const useLoginWithPhone = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const initialValues = {
    phone: '',
  }

  const validationSchema = Yup.object({
    phone: Yup.string().required('Please enter phone number.'),
  })

  // Async function to handle form submission
  const onClickSubmit = async values => {
    setLoading(true)
    const data = {
      phone: values.phone,
    }

    try {
      const { DATA, MESSAGE, STATUS } = await commonApi({
        action: 'loginWithPhone',
        data: data,
      })

      if (STATUS === 'SUCCESS') {
        toast.success(DATA?.message)
        // Optionally, you can navigate the user to a different page after successful login
        // router.push('/dashboard');
      } else {
        toast.error(MESSAGE)
      }
    } catch (error) {
      toast.error('An error occurred.')
      console.error(error)
    } finally {
      setLoading(false)
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      await onClickSubmit(values)
      formikHelpers.setSubmitting(false)
    },
  })

  return {
    loading,
    formik,
  }
}

export default useLoginWithPhone
