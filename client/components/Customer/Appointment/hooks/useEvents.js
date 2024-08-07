import commonApi from '@/api/common'
import { getUser } from '@/utils/localStorage'
import { useEffect, useState } from 'react'

const useEvents = () => {
  const [loading, setLoading] = useState(false)
  const [eventLists, setEventLists] = useState([])

  const [activeEventDetailModal, setActiveEventDetailModal] = useState(false)
  const [eventDetail, setEventDetail] = useState({})

  const EventDetailModalOpen = async (e, data) => {
    e.preventDefault()
    await setActiveEventDetailModal(true)
    await setEventDetail(data)
    const eventDetailsModal = document.getElementById('eventDetailModal')
    eventDetailsModal.classList.add('active')
  }

  const JoinEventModalOpen = (e, data) => {
    e.preventDefault()
    setEventDetail(data)
    const joinEventModal = document.getElementById('joinEventModal')
    joinEventModal.classList.add('active')
  }

  const closeModal = async e => {
    e.preventDefault()
    const eventDetailsModal = document.getElementById('eventDetailModal')
    eventDetailsModal.classList.remove('active')
    await setActiveEventDetailModal(false)
    await setEventDetail({})
  }

  useEffect(() => {
    getEventList()
  }, [])

  const getEventList = async () => {
    const { locationIds = [] } = getUser()
    setLoading(true)
    try {
      const data = {
        options: {

          populate: [
            {
              path: 'serviceIds',
              populate: ['categoryId'],
            },
            {
              path: 'locationId',
              populate: [
                {
                  path: 'billingAddressId',
                  populate: [
                    { path: 'cityId', select: ['name'] },
                    { path: 'provinceId', select: ['name'] },
                    { path: 'postalCodeId', select: ['postalCode'] },
                    { path: 'countryId', select: ['name'] },
                  ],
                },
              ],
              select: ['billingAddressId', 'locationName'],
            },
            {
              path: 'userId',
            },
          ],
          pagination: false,
          "select": [],
          "collation": "",
          "sort": "",
          "projection": "",
          "lean": true,
          "leanWithId": true,
          "offset": 0,
          "page": 1,
          "limit": 10,
          "customLabels": {},
          "useEstimatedCount": true,
          "useCustomCountFn": true,
          "forceCountFn": true,
          "read": {},
          "options": {}
        },
      }
      await commonApi({
        action: 'customerUpComingEvents',
        data,
      }).then(({ DATA = {} }) => {
        setEventLists(DATA.docs)
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    eventLists,
    loading,
    activeEventDetailModal,
    eventDetail,
    EventDetailModalOpen,
    JoinEventModalOpen,
    closeModal,
    getEventList
  }
}

export default useEvents
