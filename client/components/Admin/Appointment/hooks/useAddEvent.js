import commonApi from '@/api/common'
import { MASTER_CODE, USER_ROLE_TYPE } from '@/utils/constant'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getUser } from '@/utils/localStorage'
import toast from 'react-hot-toast'

const useAddEvent = ({
  activeEvent,
  setActiveEvent,
  getAllData,
  editData,
  setEditData,
}) => {
  const [loading, setLoading] = useState(false)

  const [editID, setEditID] = useState()

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [emailNotification, setEmailNotification] = useState(true)

  const [eventTypeOptionsData, setEventTypeOptionsData] = useState([])
  const [eventTypeValue, setEventTypeValue] = useState({})

  const [locationOptionsData, setLocationOptionsData] = useState([])
  const [locationValue, setLocationValue] = useState({})

  const [chiroOptionsData, setChiroOptionsData] = useState([])
  const [chiroValue, setChiroValue] = useState({})

  const clearValue = () => {
    setEventTypeValue({})
    setLocationValue({})
    setChiroValue({})
    setStartDate(new Date())
    setEndDate(new Date())
    setEmailNotification(true)
    formik.resetForm()
  }

  const closeBtn = async () => {
    await setActiveEvent(false)
    const eventModal = document.getElementById('addEventModal')
    eventModal.classList.remove('active')
    clearValue()
    setEditID()
  }

  const openEventModal = async () => {
    await setActiveEvent(true)
    const eventModal = document.getElementById('addEventModal')
    eventModal.classList.add('active')
  }

  useEffect(() => {
    if (JSON.stringify(locationValue) !== '{}' && activeEvent) {
      loadOptionsChiro()
    }
  }, [locationValue, activeEvent])

  const loadOptionsChiro = async (inputValue = '', callback = () => {}) => {
    const id = locationValue.value
    const data = {
      query: {
        locationIds: {
          $in: id,
        },
      },
      options: {
        select: ['firstName', 'lastName', 'id'],
      },
    }
    await commonApi({
      action: 'findChiro',
      data,
    }).then(({ DATA = {} }) => {
      let chiro = []
      DATA.data?.map((chi = {}) => {
        chiro = [
          ...chiro,
          {
            label: chi.firstName + ' ' + chi.lastName,
            value: chi.id,
          },
        ]
      })
      setChiroOptionsData(chiro)
    })
  }

  useEffect(() => {
    if (activeEvent) {
      loadOptionsEventTypes()
      loadOptionsLocation()
    }
  }, [activeEvent])

  const loadOptionsEventTypes = async (inputValue, callback) => {
    const data = {
      query: {
        parentCode: [MASTER_CODE.EVENT_TYPES],
      },
    }
    await commonApi({
      action: 'findMaster',
      data,
    }).then(({ DATA = {} }) => {
      let arr = []
      DATA.data?.map((d = {}) => {
        arr = [
          ...arr,
          {
            label: d.name,
            value: d.id,
          },
        ]
      })
      setEventTypeOptionsData(arr)
    })
  }

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

  const loadOptionsLocation = async (inputValue = '', callback = () => {}) => {
    const locationquery = getLocationQuery()
    const data = {
      query: {
        ...locationquery,
      },
      options: {
        sort: {
          createdAt: -1,
        },
        select: ['id', 'locationName'],
      },
    }

    const searchQuery = {
      query: {
        ...locationquery,
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
        sort: {
          createdAt: -1,
        },
        select: ['id', 'locationName'],
      },
    }

    const sendQuery = inputValue === '' ? data : searchQuery
    await commonApi({
      action: 'findLocation',
      data: sendQuery,
    }).then(({ DATA = {} }) => {
      if (!DATA.data.length) return false
      let location = []
      DATA.data.forEach((loc = {}) => {
        location = [
          ...location,
          {
            label: loc.locationName,
            value: loc.id,
          },
        ]
      })
      setLocationOptionsData(location)
      callback(location)
    })
  }

  useEffect(() => {
    if (editData) {
      openEdit(editData)
    }
  }, [editData])

  const openEdit = async id => {
    if (id) {
      setLoading(true)
      try {
        const data = {
          query: {
            _id: id,
          },
          options: {
            select: [],
            populate: ['locationId'],
          },
        }
        await commonApi({
          action: 'findAppointment',
          data,
        }).then(({ DATA = {} }) => {
          const { data = [] } = DATA
          setEditData()

          const editData = data?.[0]
          setEditID(editData?.id)

          formik.setValues({
            eventCost: editData?.eventCost,
            memberDiscount: editData?.memberDiscount,
            registrationLimit: editData?.registrationLimit,
            name: editData?.name,
            description: editData?.description,
            eventType: editData?.eventType?._id,
            locationId: editData?.locationId?._id,
            chiroId: editData?.chiroId?.id,
          })

          setEventTypeValue({
            label: editData?.eventType?.name,
            value: editData?.eventType?._id,
          })

          setLocationValue({
            label: editData?.locationId?.locationName,
            value: editData?.locationId?._id,
          })

          setChiroValue({
            label:
              editData?.chiroId?.firstName + ' ' + editData?.chiroId?.lastName,
            value: editData?.chiroId?.id,
          })

          setEmailNotification(editData?.notifyOnEmails)

          setStartDate(new Date(editData?.fromDateTime))

          setEndDate(new Date(editData?.toDateTime))

          openEventModal()
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const onClickSubmit = async values => {
    setLoading(true)
    try {
      const data = {
        ...values,
        fromDateTime: startDate,
        toDateTime: endDate,
        notifyOnEmails: emailNotification,
        type: 'EVENT',
      }
      await commonApi({
        parameters: editID ? [editID] : [],
        action: editID ? 'editAppointment' : 'addAppointment',
        data,
      }).then(({ DATA, MESSAGE }) => {
        getAllData()
        closeBtn()
        toast.success(MESSAGE)
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      eventType: '',
      locationId: '',
      chiroId: '',
      name: '',
      description: '',
      eventCost: '',
      // memberDiscount: '',
      registrationLimit: '',
    },
    validationSchema: Yup.object({
      eventType: Yup.string().required("Please select event type."),
      locationId: Yup.string().required("Please select location."),
      chiroId: Yup.string().required("Please select chiropractor."),
      name: Yup.string().required("Please enter name."),
      description: Yup.string().required("Please enter description."),
      eventCost: Yup.number()
    .min(1, 'Number is minimum 1')
    .required("Please enter event cost."),
      // memberDiscount: YUP_NUMBER,
      registrationLimit: Yup.number()
    .min(1, 'Number is minimum 1')
    .required("Please enter registration limit."),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    closeBtn,
    formik,
    editID,
    loading,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    emailNotification,
    setEmailNotification,
    // Event Dropdown
    eventTypeOptionsData,
    eventTypeValue,
    setEventTypeValue,
    // Location Dropdown
    locationOptionsData,
    loadOptionsLocation,
    locationValue,
    setLocationValue,
    // Chiro Dropdown
    chiroOptionsData,
    chiroValue,
    setChiroValue,
  }
}

export default useAddEvent
