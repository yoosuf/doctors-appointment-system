import commonApi from '@/api/common'
import { baseUrl } from '@/utils/helper'
import React, { useState, useEffect } from 'react'
import moment from 'moment'

const useCustomerBilling = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [billingData, setBillingData] = useState([])
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState({})
  const [showDate, setShowDate] = useState(false)
  const [selectionRange, setselectionRange] = useState({
    startDate: moment().subtract(1, 'M').toDate(),
    endDate: moment().toDate(),
    key: 'selection',
  })
  const [selectedUserValue, setSelectedUserValue] = useState({
    value: 'all',
    label: 'All',
  })
  const [selectedLocationValue, setSelectedLocationValue] = useState({
    value: 'all',
    label: 'All',
  })
  const [locationOptionsData, setLocationOptionsData] = useState([])
  useEffect(() => {
    loadOptionsLocation()
  }, [])
  useEffect(() => {
    getBillingData()
  }, [id,selectionRange,selectedLocationValue])
  const handleDatePicker = () => {
    setShowDate(!showDate)
  }
  const handleSelect = ranges => {
    setselectionRange({
      startDate: moment(ranges.selection?.startDate).toDate(),
      endDate: moment(ranges.selection?.endDate).toDate(),
      key: 'selection',
    })
  }
  const getLocationQuery = () => {
    const { roleId = {}, locationIds = [] } = getUser()
    if (roleId.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
      return {
        locationId: {
          $in: locationIds.map((l = {}) => l._id),
        },
      }
    }
  }
  const loadOptionsLocation = async (inputValue, callback = () => { }) => {
    const allData = {
      query: {
        // isDeleted: false,
      },
      options: {
        select: [],
        sort: {
          createdAt: -1,
        },
      },
    }
    const data = {
      query: {
        // isDeleted: false,
        $or: [
          {
            locationName: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
        pagination: false,
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findLocation',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const location = DATA.data || []
      let locationData = location?.map((data = {}) => (
        {
        value: data.id,
        label: data.locationName,
      }))
      locationData.unshift({ value: 'all', label: 'All' })
      setLocationOptionsData(locationData)
      callback(locationData)
    })
  }
 
  const getBillingData = () => {
    setLoading(true)
    try {
      const data = {
        query: {
          userId: id,
        },
        options: {
          select: [],
          sort: {
            createdAt: -1,
          },
          populate: [
            {
              path: 'appointmentId',
              populate: [
                { path: 'locationId', select: ['locationName'] },
                { path: 'chiroId', select: ['firstName', 'lastName'] },
              ],
            },
          ],
        },
      }
      commonApi({
        action: 'findOrder',
        data,
      }).then(({ DATA = {} }) => {
        setDataQueryOptions({ query: data.query, options: data.options })
        setBillingData(DATA.data)
        setPaginator(DATA.paginator)
      })
    } finally {
      setLoading(false)
    }
  }

  const openInvoicePDF = async (e, invoiceId) => {
    e.preventDefault()
    // const data = {
    //   query: {
    //     invoiceId: invoiceId,
    //   },
    //   options: {
    //     select: [],
    //   },
    // }
    // await commonApi({
    //   action: 'invoicePDF',
    //   data,
    // }).then(({ DATA }) => {
    //   window.open(baseUrl + DATA)
    // })
  }

  return {
    loading,
    setLoading,
    billingData,
    setBillingData,
    dataQueryOptions,
    paginator,
    setPaginator,
    openInvoicePDF,
    handleDatePicker,
    selectionRange,
    handleSelect,
    showDate, 
    setShowDate,
    selectedLocationValue,
    setSelectedLocationValue,
    locationOptionsData,
    loadOptionsLocation
  }
}

export default useCustomerBilling
