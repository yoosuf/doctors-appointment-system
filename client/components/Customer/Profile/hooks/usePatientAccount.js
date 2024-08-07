import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  REQUIRED_FIELD,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from '@/utils/constant'
import toast from 'react-hot-toast'
import { LocalStorage } from '@/utils/localStorage'

const PASSWORD_YUP_VALIDATION = Yup.string()
  .matches(
    PASSWORD_VALIDATION,
    'Contains at least 8 characters, 1 Upper case (A-Z), 1 number (0-9) & one special symbol'
  )
  .required(REQUIRED_FIELD)

const usePatientAccount = ({userData}) => {
  const user =userData
  const [loading, setLoading] = useState(false)
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false)

  const [active, setActive] = useState(user?.isActive)


      

  // useEffect(() => {
  //   getProfileData()
  // }, [])

  // const getProfileData = async () => {
  //   setLoading(true)
  //   try {
  //     const data = {
  //       options: {
  //         select: ['email', 'id', 'userName', 'isActive'],
  //       },
  //     }
  //     await commonApi({
  //       action: 'getPatient',
  //       data,
  //     }).then(({ DATA = {} }) => {
  //       const { data = [] } = DATA
  //       const user = data?.[0]

  //       setActive(user?.isActive)

  //       formik.setValues({
  //         email: user?.email,
  //         userName: user?.userName,
  //         id: user?.id,
  //       })
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      id: user?.id,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(EMAIL_VALIDATION, 'Invalid email address')
        .required("Please enter email."),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const onClickSubmit = async values => {
    setLoading(true)
    try {
      const { id, ...rest } = values
      const data = {
        ...rest,
        isActive: active,
      }
      await commonApi({
        parameters: [id],
        action: 'updateClient',
        data,
      }).then(({ DATA = {}, MESSAGE }) => {
        LocalStorage.setUser(DATA)
        toast.success('Your profile is successfully updated')
      })
    } finally {
      setLoading(false)
    }
  }


  const [sendEmailNotification, setSendEmailNotification] = useState(true)

  const patient_password = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      confirm_new_password: '',
    },
    validationSchema: Yup.object({
      password: PASSWORD_YUP_VALIDATION,
      new_password: PASSWORD_YUP_VALIDATION,
      confirm_new_password: Yup.string()
        .when('new_password', {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref('new_password')],
            'Password does not match'
          ),
        })
        .required("Please enter new password."),
    }),
    onSubmit: values => {
      onSavePassword(values)
    },
  })

  const onSavePassword = async (values = {}) => {
    setPasswordChangeLoading(true)
    try {
      const data = {
        password: values.password,
        new_password: values.new_password,
        sendEmail: sendEmailNotification,
      }

      await commonApi({
        action: 'patientChangePassword',
        data,
      }).then(({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        patient_password.resetForm()
      })
    } finally {
      setPasswordChangeLoading(false)
    }
  }

  return {
    loading,
    passwordChangeLoading,
    formik,
    active,
    setActive,
    // Password
    patient_password,
    sendEmailNotification,
    setSendEmailNotification,
  }
}

export default usePatientAccount
