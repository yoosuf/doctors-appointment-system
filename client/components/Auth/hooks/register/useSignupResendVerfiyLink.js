import commonApi from '@/api/common'
import { KEYS } from '@/utils/constant'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'

const useSignupResendVerfiyLink = () => {
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState()
  const [email, setEmail] = useState()
  const [seconds, setSeconds] = useState(30)

  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem(KEYS.userId)
    setUserId(id)
    const email = localStorage.getItem(KEYS.email)
    setEmail(email)
  }, [])

  const onClickResendLink = async () => {
    const data = {
      userId,
    }
    await commonApi({
      action: 'emailResendVerifyLink',
      data,
    }).then(({ MESSAGE }) => {
      toast.success(MESSAGE)
      setSeconds(30)
    })
  }
  const redirectLogin = () => router.push(routes.routes.sesson.new)

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

  return {
    onClickResendLink,
    email,
    seconds,
    loading, 
    redirectLogin,
  }
}

export default useSignupResendVerfiyLink
