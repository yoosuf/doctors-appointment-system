import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'


const useNotification = (
  { userData}
) => {


  

 const user = userData
 const {emailNotifications,messageNotifications,id}=user
  const [loading, setLoading] = useState(false)
  const [sendEmailNotification, setSendEmailNotification] = useState(emailNotifications)
  const [sendPhoneNotification, setSendPhoneNotification] = useState(messageNotifications)
 

  const initialValues = {
    email: user.email,
    phone: user.phone,
    emailNotifications: '', 
    messageNotifications: '', 
  };


  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Please enter email.'),
    phone: Yup.string()
      .required('Please enter phone number.')
      .min(10, 'Number should be greater than 5 and less than 15')
      .max(15, 'Number should be greater than 5 and less than 15'),
  });

  const onClickSubmit = async (values) => {
    const data = {
      emailNotifications: sendEmailNotification,
      messageNotifications: sendPhoneNotification,
    }
    await commonApi({
      parameters: [id],
      action: 'updateClient',
      data,
    }).then(({ DATA }) => {
      toast.success('Your notification is successfully updated')
    })
  }


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      onClickSubmit(values)
    },
  });


  return {
    sendEmailNotification,
    sendPhoneNotification,
    setSendEmailNotification,
    setSendPhoneNotification,
        loading,
        formik,
  }
}

export default useNotification
