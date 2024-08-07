import { getUser } from '@/utils/localStorage'
import React, { useState, useEffect } from 'react'
import { USER_ROLE_TYPE } from '@/utils/constant'

const useSidebar = () => {
  const [userManagementTab, setUserManagementTab] = useState(false)
  useEffect(() => {
    const { roleId = {} } = getUser()

    if (roleId) {
      if (
        [USER_ROLE_TYPE.STAFF, USER_ROLE_TYPE.PATIENT].includes(roleId.code)
      ) {
        setUserManagementTab(false)
      } else {
        setUserManagementTab(true)
      }
    }
  }, [])
  return { userManagementTab }
}

export default useSidebar
