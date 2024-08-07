import Loader from '@/widget/loader'
import toast from 'react-hot-toast'
import commonApi from '@/api/common'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'
import React, { useState, useEffect } from 'react'
import AuthLayout from '@/components/Layout/AuthLayout'

import { LocalStorage } from '@/utils/localStorage'
import { setDeviceId, fetchData } from '@/utils/helper'
import { KEYS, USER_ROLE_TYPE } from '@/utils/constant'

const LoginVerify = () => {
  const roleType = ['CHIROPRACTOR', 'STAFF', 'NURSE']

  const { query, isReady } = useRouter()

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const setLocalStorage = async (
    SEND_DATA,
    token,
    localStorageData,
    permission,
    locationIds
  ) => {
    await fetchData('/api/login', SEND_DATA)

    await LocalStorage.setToken(token)

    await LocalStorage.setUser(localStorageData)

    await LocalStorage.setPermission(permission)

    const locationData = {
      locationIds: true,
    }

    await fetchData('/api/location', locationData)
  }

  useEffect(async () => {
    if (isReady) {
      setLoading(true)
      const data = {
        email: query.email,
        loginToken: query.token,
      }
      try {
        await commonApi({
          action: 'login',
          data: data,
        }).then(async ({ DATA, MESSAGE }) => {
          setLoading(true)
          router.push(routes.dashboard)
          toast.success(MESSAGE)

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
            router.push(routes.account.firstStep)
          } else if (
            user?.roleId?.code === USER_ROLE_TYPE.PATIENT &&
            user?.flag + 1 === 3
          ) {
            localStorage.setItem(KEYS.userId, user?.id)
            LocalStorage.setToken(token)
            router.push(routes.account.lastStep)
          } else if (user?.roleId?.code === USER_ROLE_TYPE.PATIENT) {
            await setLocalStorage(
              SEND_DATA,
              token,
              localStorageData,
              permission,
              locationIds
            )
            if (LocalStorage.get(KEYS.checkinMessage)) {
              router.push(routes.selectService)
            } else {
              router.push(routes.customerDashboard)
            }
          }
          if (user?.roleId?.code.includes(roleType)) {
            await setLocalStorage(
              SEND_DATA,
              token,
              localStorageData,
              permission,
              locationIds
            )
            router.push(routes.deskWaitlist)
          } else {
            await setLocalStorage(
              SEND_DATA,
              token,
              localStorageData,
              permission,
              locationIds
            )
            router.push(routes.dashboard)
          }

          setDeviceId()
        })
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [query])

  return loading ? <Loader customClass='absolute' /> : <></>
}

export default LoginVerify
