import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'

const useCustomerChartList = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [chartList, setChartList] = useState([])

  useEffect(() => {
    getChartList()
  }, [id])

  const getChartList = async () => {
    if (!id) return false
    setLoading(true)
    try {
      const data = {
        query: {
          patientId: id,
        },
        options: {
          select: [],
          collation: '',
          sort: {
            createdAt: -1,
          },
          limit: 3,
          populate: [
            'created_at',
            {
              path: 'creatorId',
              populate: [
                {
                  path: 'profile_image',
                },
              ],
            },
            {
              path: 'patientId',
            },
          ],
          pagination: true,
        },
        isCountOnly: false,
      }
      await commonApi({
        action: 'findAllAppointmentChart',
        data: data,
      }).then(({ DATA = {} }) => {
        setChartList(DATA.data)
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    chartList,
  }
}

export default useCustomerChartList
