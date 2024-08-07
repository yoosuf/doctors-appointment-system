import React, { useState, useEffect } from 'react'
import commonApi from '@/api/common'
import toast from 'react-hot-toast';
import Router from 'next/router';
import routes from '@/utils/routes'
import { useFormik } from 'formik'
import { REQUIRED_FIELD } from '@/utils/constant'
import * as Yup from 'yup'

import {publicIp} from "public-ip"

const useCheckin = () => {

  const [myIp, setMyIp] = useState("")
  const [loading, setLoading] = useState("")

  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required(REQUIRED_FIELD),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  useEffect(() => {
    checkValidChecking()
  }, [])

  const checkValidChecking = async () => {
     const ip = await publicIp.v4();
     const data ={
       ipAddress: ip
     }
     if(data) {
      setLoading(true)
      try {
        await commonApi({
          action: 'checkIpValid',
          data,
        }).then(({ DATA, MESSAGE }) => {
          if(!DATA?.isValid){
            toast.error("Your Ip is invalid")
            Router.push('https://snapcrack.com/')
          } else {
            setMyIp(ip)
          }
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const onClickSubmit = async (values) => {
    const data = {
      ipAddress: myIp,
      phone: values?.phone
    }
    if(data) {
      setLoading(true)
      try {
        await commonApi({
          action: 'checkInRequest',
          data,
        }).then(({ DATA, MESSAGE }) => {
          if (!DATA?.isValid) {
            toast.error('Your Ip is invalid')
            Router.push('https://snapcrack.com/')
          } else {
            toast.success(MESSAGE)
            Router.push(routes.selfCheckin)
          }
        })
      } finally {
        setLoading(false)
      }
    }
  }

  return {
    loading,
    formik
  }
}

export default useCheckin
