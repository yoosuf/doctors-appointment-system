import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'

const useUserActivity = ({ id }) => {
  const [activityList, setActivityList] = useState([])
  const [paginator, setPaginator] = useState({})

  useEffect(() => {
    getUserActivity()
  }, [id])

  const getUserActivity = async () => {
    const data = {
      query: {
        userId: id,
      },
      options: {
        select: [],
        populate: ['userId'],
      },
    }
    await commonApi({
      action: 'userActivity',
      data,
    }).then(({ DATA = {} }) => {
      setActivityList(DATA.data)
      setPaginator(DATA.paginator)
    })
  }

  const getAllUserActivity = async () => {
    const data = {
      query: {
        userId: id,
      },
      options: {
        select: [],
        populate: ['userId'],
        pagination: false,
      },
    }
    await commonApi({
      action: 'userActivity',
      data,
    }).then(({ DATA = {} }) => {
      setActivityList(DATA.data)
      setPaginator(DATA.paginator)
    })
  }

  return {
    activityList,
    getAllUserActivity,
    paginator,
  }
}

export default useUserActivity
