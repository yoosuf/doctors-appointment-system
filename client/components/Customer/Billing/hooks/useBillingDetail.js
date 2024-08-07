import React, { useState, useEffect } from 'react'
import { getUser } from '@/utils/localStorage'
import commonApi from '@/api/common'
import { baseUrl } from '@/utils/helper'
import moment from 'moment'
import { TABLE_LENGTH, USER_ROLE_TYPE } from '@/utils/constant'
import { useIsMount } from '@/utils/useIsMount'


const useBillingDetail = () => {
  const [billingDetail, setBillingDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState()
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
  const isMount = useIsMount()
  useEffect(() => {
    loadOptionsLocation()
  }, [])
  useEffect(() => {
    if (isMount) {
      getInvoiceDetail()
    }
  }, [selectionRange, selectedLocationValue])
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
  const loadOptionsLocation = async (inputValue, callback = () => {}) => {
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
      action: 'findAllLocation',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const location = DATA.data || []
      let locationData = location?.map((data = {}) => ({
        value: data.id,
        label: data.locationName,
      }))
      locationData.unshift({ value: 'all', label: 'All' })
      setLocationOptionsData(locationData)
      callback(locationData)
    })
  }


  const getInvoiceDetail = async () => {
    const locationquery = getLocationQuery()
    setLoading(true)
    try {
      const { id } = getUser()
      const data = {
        query: {
          userId:
            selectedUserValue?.value === 'all'
              ? undefined
              : selectedUserValue.value,
          // fromDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
          // toDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),

          // isDeleted: false,
        },
        options: {
          // populate: ['orderId'],
          sort: {
            createdAt: -1,
          },
          page: paginator.currentPage || 1,
          offset: (paginator.currentPage - 1) * Number(paginator.perPage) || 0,
          limit: paginator.perPage || 10,
          pagination: true,
        },
      }


      await commonApi({
        params: [], 
        action: 'customerInvoiceList',
        data,
      }).then(({ DATA = {} }) => {
        // console.log(DATA.data)
        setBillingDetail(DATA.data)
        setPaginator(DATA.paginator)

        setDataQueryOptions({ query: data.query, options: data.options })
      })
    } finally {
      setLoading(false)
    }
  }

  const openInvoicePDF = async (e, invoiceId) => {
    e.preventDefault()
    const data = {
      invoiceId,
    }
    await commonApi({
      action: 'customerInvoiceItem',
      data,
    }).then(({ DATA }) => {
      window.open(baseUrl + DATA)
    })
  }

  return {
    paginator,
    billingDetail,
    setPaginator,
    setBillingDetail,
    loading,
    setLoading,
    dataQueryOptions,
    openInvoicePDF,
    handleDatePicker,
    selectionRange,
    handleSelect,
    showDate,
    setShowDate,
    selectedLocationValue,
    setSelectedLocationValue,
    locationOptionsData,
    loadOptionsLocation,
  }
}

export default useBillingDetail
