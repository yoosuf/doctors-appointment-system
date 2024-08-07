import commonApi from '@/api/common'
import { KEYS } from '@/utils/constant'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getUser } from '@/utils/localStorage'

const useForgotResendLink = () => {
  const [email, setEmail] = useState()
  const [seconds, setSeconds] = React.useState(30)

  useEffect(() => {
    // const data = localStorage.getItem(KEYS.email)
    const data = getUser()?.email
    setEmail(data)
  }, [])

  const onClickResendLink = async e => {
    e.preventDefault()
    const data = {
      email: email,
    }
    await commonApi({
      action: 'forgotPassword',
      data,
    }).then(({ DATA, MESSAGE }) => {
      toast.success(MESSAGE)
    })
  }

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else {
        setSeconds(0)
        clearInterval(myInterval)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  return { onClickResendLink, email, seconds }
}

export default useForgotResendLink
