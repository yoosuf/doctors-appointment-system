import React, { useState, useEffect } from 'react'
import commonApi from '@/api/common'
import { getRole } from '@/utils/helper'

const useAppointmentHistory = id => {

  const [loading, setLoading] = useState(false)

  const [prevAppointmentList, setPrevAppointmentList] = useState([])
  const [nextAppointmentList, setNextAppointmentList] = useState([])

  useEffect(() => {
    getAppointmentHistory()
  }, [id])

  const getAppointmentHistory = async () => {
    const value = getRole()

    const data = {
      query: {
        ...value,
      },
      options: {
        populate: [
          'locationId',
          {
            path: 'serviceIds',
            populate: [
              {
                path: 'categoryId',
              },
            ],
          },
        ],
      },
    }


    setLoading(true)
    await commonApi({
      parameters: [id],
      action: 'appointmentHistory',
      data,
    }).then(({ DATA = {} }) => {
      setPrevAppointmentList(DATA.lastAppointments)
      setNextAppointmentList(DATA.nextAppointments)
      setLoading(false)
    })
  }

  return {
    loading, 
    prevAppointmentList,
    nextAppointmentList,
  }
}

export default useAppointmentHistory
