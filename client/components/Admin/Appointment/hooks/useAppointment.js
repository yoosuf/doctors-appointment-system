import commonApi from '@/api/common'
import { TABLE_LENGTH, USER_ROLE_TYPE, KEYS } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import moment from 'moment'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { eventDate, formatChartDate, dateDisplay } from '@/utils/helper'
const DISPLAY = {
  Id: true,
  Time: true,
  Location: false,
  Customer: true,
  Chiropractor: true,
  CustomerPhone: false,
  CustomerEmail: false,
  Services: true,
  Status: true,
  Remarks: true,
  Payment: true,
}
const useAppointment = () => {
  const [loading, setLoading] = useState(false)

  const [role, setRole] = useState()
  const [showColumn, setShowColumn] = useState(DISPLAY)

  const [listData, setListData] = useState([])
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState({})
  const [showDate, setShowDate] = useState(false)
  const [editData, setEditData] = useState()
  const [editAppointment, setEditAppointment] = useState()

  // Delete Popup Modal State
  const [deleteID, setDeleteID] = useState()
  const [label, setLabel] = useState()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const closeModal = () => {
    setOpenDeleteModal(false), setDeleteID(), setLabel()
  }
  const [selectionRange, setselectionRange] = useState({
    startDate: moment().subtract(1, 'M').toDate(),
    endDate: moment().toDate(),
    key: 'selection',
  })
  const handleSelect = ranges => {
    setselectionRange({
      startDate: moment(ranges.selection?.startDate).toDate(),
      endDate: moment(ranges.selection?.endDate).toDate(),
      key: 'selection',
    })
  }
  const openModal = (data = {}) => {
    if (data.type === 'APPOINTMENT') {
      setLabel(
        data.patientId?.firstName +
          ' ' +
          data.patientId?.lastName +
          ' ' +
          data.type.toLowerCase()
      )
    } else {
      setLabel(data.name + ' ' + data.type.toLowerCase())
    }

    setDeleteID(data.id)
    setOpenDeleteModal(true)
  }

  // Dropdown State
  const event = [
    { name: 'Appointment', code: 'APPOINTMENT' },
    { name: 'Event', code: 'EVENT' },
  ]

  const [selectedEvent, setSelectedEvent] = useState(event[0])

  useEffect(() => {
    getAllData()
    const {
      roleId: { code },
    } = getUser()
    setRole(code)
  }, [selectedEvent, selectionRange])



  
  
  



  const getLocationQuery = () => {
    const { roleId = {}, locationIds = [] } = getUser()

    if (roleId.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
      const locationId = locationIds?.map((l = {}) => l._id)
      return {
        locationId: locationId.join(''),
      }
    }
  }

  const getAllData = async inputValue => {
    const locationquery = getLocationQuery()
    setLoading(true)
    let data = {
      query: {
        ...locationquery,
        isDeleted: false,
      },
      options: {
        select: [],
        populate: [
          {
            path: 'serviceIds',
            populate: ['categoryId'],
          },
          {
            path: 'locationId',
          },
          {
            path: 'userId',
          },
        ],
        sort: {
          createdAt: -1,
        },
        page: paginator?.currentPage || 1,
        offset: (paginator?.currentPage - 1) * Number(paginator?.perPage) || 0,
        limit: paginator?.perPage || 10,
        pagination: true,
      },
    }
    // if (selectedEvent.code === KEYS.appointment) {
    //   data.query = {
    //     ...data.query,

    //     fromDate: dateDisplay(selectionRange.startDate),
    //     toDate: dateDisplay(selectionRange.endDate),
    //     // status: 'OPEN',
    //   }
    // } else {
    //   data.query = {
    //     ...data.query,

    //     fromDateTime: dateDisplay(selectionRange.startDate),
    //     toDateTime: dateDisplay(selectionRange.endDate),
    //   }
    // }

    if (inputValue) {
        data.search = inputValue
    }
    try {
      await commonApi({
        action: 'findAppointment',
        data,
      }).then(({ DATA = {} }) => {
        setDataQueryOptions({ query: data.query, options: data.options })
        setListData(DATA.data)
        setPaginator(DATA.paginator)
      })
    } finally {
      setLoading(false)
    }
  }

  const onClickEdit = (data = {}) => {
    if (data.type === 'EVENT') {
      setEditData(data.id)
    }
    if (data.type === 'APPOINTMENT') {
      setEditAppointment(data.id)
    }
  }

  const onClickDelete = async id => {
    if (!id) return false
    setLoading(true)
    try {
      await commonApi({
        parameters: [id],
        action: 'deleteAppointment',
      }).then(({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        closeModal()
        getAllData()
      })
    } finally {
      setLoading(false)
    }
  }
  const onChangeSearch = e => {
    const inputValue = e.target.value
    getAllData(inputValue)
  }
  const onCancelEvent = (e, event = {}) => {
    e.preventDefault()
    const data = {
      eventId: event.id,
      locationId: event.locationId?._id,
    }
    commonApi({
      action: 'cancelEvent',
      data,
    }).then(({ DATA, MESSAGE }) => {
      toast.success(MESSAGE)
      getAllData()
    })
  }
  const handleDatePicker = () => {
    setShowDate(!showDate)
  }
  const handleChange = e => {
    setShowColumn({ ...showColumn, [e.target.value]: e.target.checked })
  }
  return {
    loading,
    role,
    dataQueryOptions,
    paginator,
    listData,
    setLoading,
    setListData,
    setPaginator,
    getAllData,
    onClickEdit,
    editData,
    setEditData,
    editAppointment,
    setEditAppointment,
    showColumn,
    setShowColumn,
    // Dropdown State
    event,
    selectedEvent,
    setSelectedEvent,
    // Delete Modal State
    openModal,
    closeModal,
    openDeleteModal,
    deleteID,
    label,
    onClickDelete,
    // Cancel Event
    onCancelEvent,
    handleSelect,
    handleDatePicker,
    setShowDate,
    showDate,
    selectionRange,
    onChangeSearch,
    handleChange,
  }
}

export default useAppointment
