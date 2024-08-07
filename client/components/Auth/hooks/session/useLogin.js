import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import commonApi from '@/api/common'
import routes from '@/utils/routes'
import { getToken, LocalStorage, getTempToken } from '@/utils/localStorage'
import { setDeviceId } from '@/utils/helper'
import { KEYS, EMAIL_VALIDATION, USER_ROLE_TYPE } from '@/utils/constant'
import SimpleCrypto from 'simple-crypto-js'
import toast from 'react-hot-toast'

const _secretKey = 'snapcrackloginSecurity'

export const Crypto = new SimpleCrypto(_secretKey)

const useLogin = () => {
  const [loading, setLoading] = useState(false)

  const [remember, setRemember] = useState(false)

  const [locationId, setLocationId] = useState(null)

  const router = useRouter()

  const initialValues = {
    email: '',
    password: '',
    remember: false,
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address') // Validates the email format
      .required('Please enter your email address'), // Makes the field required
    password: Yup.string().required('Please enter your password.'),
  })

  useEffect(() => {
    try {
      // Prefetch the dashboard page
      router.prefetch(routes.dashboard)
      router.prefetch(routes.customerDashboard)

      // Attempt to retrieve and decrypt the remember me data
      const encryptedRememberData = sessionStorage.getItem(KEYS.rememberMe)
      let rememberData = encryptedRememberData
        ? Crypto.decrypt(encryptedRememberData)
        : null

      if (rememberData) {
        const { email, password } = rememberData

        // Set form fields
        formik.setFieldValue('email', email)
        formik.setFieldValue('password', password)
        formik.setFieldValue('remember', true)
      }

      // Handle check-in message in query
      if (router?.query?.message === 'checkin-appointment') {
        localStorage.setItem(KEYS.checkinMessage, true)
      } else {
        localStorage.removeItem(KEYS.checkinMessage)
      }
    } catch (error) {
      // Handle errors that occurred during the execution of the useEffect
      console.error('Failed to execute useEffect:', error)

      // You might want to set some error state here as well
      // setErrorState(error);
    }
  }, [])

  const setLocalStorage = async (
    SEND_DATA,
    token,
    localStorageData,
    permission,
    locationIds
  ) => {
    await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(SEND_DATA),
    })

    await LocalStorage.setToken(token)

    await LocalStorage.setUser(localStorageData)

    await LocalStorage.setPermission(permission)

    const locationData = {
      locationIds: true,
    }

    // if (locationIds?.length) {
    await fetch('/api/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(locationData),
    })
    // }
  }

  const onClickSubmit = async values => {
    setLoading(true)
    let message = null
    const data = {
      email: values.email,
      password: values.password,
    }
    const temp = getTempToken()
    if (temp) {
      LocalStorage.remove(KEYS.tempToken)
    }
    try {
      await commonApi({
        action: 'login',
        data,
      }).then(async ({ DATA, MESSAGE }) => {
        if (values.remember) {
          const rememberData = {
            email: values.email,
            password: values.password,
          }

          sessionStorage.setItem(
            KEYS.rememberMe,
            Crypto.encrypt(JSON.stringify(rememberData))
          )
        } else {
          sessionStorage.clear()
        }

        const {
          token,
          rolePermissions,
          createdBy,
          addressIds,
          emails,
          phones,
          updatedBy,
          locationIds,
          ...user
        } = DATA

        setLocationId(locationIds[0]?._id)

        localStorage.setItem('locationId', locationIds[0]?._id)



        const permission = {}

        if (rolePermissions?.admin?.length) {
          rolePermissions.admin.map(b => {
            const s = b.split('.')
            if (permission[s[1]]) {
              permission[s[1]].push(s[2])
            } else {
              permission[s[1]] = [s[2]]
            }
          })
        }

        const localStorageData = {
          ...user,
          addressIds,
          emails,
          phones,
          locationIds,
        }

        const SEND_DATA = {
          token,
          ...user,
        }

        if (
          user?.roleId?.code === USER_ROLE_TYPE.PATIENT &&
          user?.flag + 1 === 2
        ) {
          localStorage.setItem(KEYS.userId, user?.id)
          LocalStorage.setToken(token)
          await router.push(routes.account.firstStep)
        } else if (user?.roleId?.code === USER_ROLE_TYPE.PATIENT) {
          await setLocalStorage(
            SEND_DATA,
            token,
            localStorageData,
            permission,
            locationIds
          )
          if (LocalStorage.get(KEYS.checkinMessage)) {
            await router.push(routes.selectService)
          } else {
            await router.push(routes.customerDashboard)
          }
        } else if (
          user?.roleId?.code === USER_ROLE_TYPE.CHIROPRACTOR ||
          user?.roleId?.code === USER_ROLE_TYPE.STAFF ||
          user?.roleId?.code === USER_ROLE_TYPE.NURSE
        ) {
          await setLocalStorage(
            SEND_DATA,
            token,
            localStorageData,
            permission,
            locationIds
          )
          await router.push(routes.deskWaitlist)
        } else {
          await setLocalStorage(
            SEND_DATA,
            token,
            localStorageData,
            permission,
            locationIds
          )
          await router.push(routes.dashboard)
        }

        localStorage.setItem('USEROBJ', JSON.stringify(user))
        setDeviceId()
        message = MESSAGE
      })
      toast.success(message)
    } finally {
      setLoading(false)
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

  return { formik, loading, remember, setRemember }
}

export default useLogin
