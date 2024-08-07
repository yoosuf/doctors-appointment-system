import commonApi from '@/api/common'
import { getUser } from '@/utils/localStorage'
import React, { useState, useEffect } from 'react'

const useCalendarView = () => {
  const [loading, setLoading] = useState(false)

  const [eventAndAppointmentData, setEventAndAppointmentData] = useState([])
  const [eventDetail, setEventDetail] = useState({})

  const [eventLoading, setEventLoading] = useState(false)
  const openModal = () => {
    const eventDetailsModal = document.getElementById(
      'eventDetailCalendarViewModal'
    )
    eventDetailsModal.classList.add('active')
  }

  const closeModal = () => {
    const eventDetailsModal = document.getElementById(
      'eventDetailCalendarViewModal'
    )
    eventDetailsModal.classList.remove('active')
  }

  useEffect(() => {
    getAppointmentAndEventData()
  }, [])

  const getAppointmentAndEventData = async () => {
    setLoading(true)
    try {
      const data = {
        query: {
          isDeleted: false,
        },
        options: {
          select: [],
          populate: [
            {
              path: 'userId',
              select: ['firstName', 'lastName'],
            },
          ],
          sort: {
            createdAt: -1,
          },
          pagination: false,
        },
      }
      await commonApi({
        action: 'findAppointment',
        data,
      }).then(({ DATA = {} }) => {
        let arr = []
        const res = DATA.data

        res.forEach((d = {}) => {
          if (d.type === 'EVENT') {
            arr = [
              ...arr,
              {
                title: 'Event - ' + d.name,
                start: d.fromDateTime,
                end: d.toDateTime,
                id: d.id,
              },
            ]
          } else if (d.type === 'APPOINTMENT') {
            arr = [
              ...arr,
              {
                title:
                  'Checked in ' +
                  d.patientId?.firstName +
                  ' ' +
                  d.patientId?.lastName,
                start: d.appointmentDate,
              },
            ]
          }
        })

        setEventAndAppointmentData(arr)
      })
    } finally {
      setLoading(false)
    }
  }

  const getEventDetail = async id => {
    setEventLoading(true)
    openModal()
    try {
      const data = {
        options: {
          select: [],
          populate: [
            {
              path: 'serviceIds',
              populate: ['categoryId'],
            },
            {
              path: 'locationId',
              select: ['locationName', 'locationAddressId'],
              populate: [
                {
                  path: 'locationAddressId',
                  select: [
                    'addressLine1',
                    'addressLine2',
                    'cityId',
                    'provinceId',
                    'postalCodeId',
                    'countryId',
                  ],
                  populate: [
                    'cityId',
                    'provinceId',
                    'postalCodeId',
                    'countryId',
                  ],
                },
              ],
            },
            {
              path: 'userId',
            },
          ],
        },
      }
      await commonApi({
        action: 'findAppointment',
        data,
      }).then(({ DATA = {} }) => {
        const event = DATA.data?.[0]
        if (event) {
          setEventDetail(event)
        }
      })
    } finally {
      setEventLoading(false)
    }
  }

  return {
    loading,
    eventAndAppointmentData,
    getEventDetail,
    closeModal,
    eventLoading,
    eventDetail,
  }
}

export default useCalendarView
