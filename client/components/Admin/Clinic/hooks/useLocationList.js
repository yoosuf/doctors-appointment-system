import commonApi from '@/api/common'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import React, { useState, useEffect } from 'react'

const populate = [
  {
    path: 'locationAddressId',
    populate: [
      {
        path: 'countryId',
        select: ['name'],
      },
      {
        path: 'provinceId',
        select: ['name'],
      },
      {
        path: 'cityId',
        select: ['name'],
      },
      {
        path: 'postalCodeId',
        select: ['postalCode'],
      },
    ],
  },
]

const useLocationList = () => {
  const [loading, setLoading] = useState(false)

  const [paginator, setPaginator] = useState({})
  const [locationListData, setLocationListData] = useState([])

  const [editID, setEditID] = useState()

  useEffect(() => {
    getLocationData()
  }, [])

  const getLocationQuery = () => {
    const { roleId = {}, locationIds = [] } = getUser()
    if (roleId.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
      return {
        _id: {
          $in: locationIds.map((l = {}) => l._id),
        },
      }
    }
  }

  const getLocationData = async () => {
    const locationquery = getLocationQuery()
    setLoading(true)
    try {
      const data = {
        query: {
          ...locationquery,
        },
        options: {
          sort: {
            createdAt: -1,
          },
          populate: populate,
          select: [],
          page: paginator?.currentPage || 1,
          offset:
            (paginator?.currentPage - 1) * Number(paginator?.perPage) || 0,
          limit: paginator?.perPage || 10,
          pagination: true,
        },
      }
      await commonApi({
        action: 'findLocation',
        data,
      }).then(({ DATA = {}, MESSAGE }) => {
        const { paginator = {}, data = [] } = DATA
        setLocationListData(data)
        setPaginator(paginator)
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    locationListData,
    loading,
    paginator,
    setPaginator,
    setLocationListData,
    setLoading,
    populate,
    editID,
    setEditID,
    getLocationData,
  }
}

export default useLocationList
