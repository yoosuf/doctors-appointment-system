import commonApi from '@/api/common'
import { USER_ROLE_TYPE, IDENTIFY_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { customStyles, formatDate, dateDisplay } from '@/utils/helper'
import socket from '@/utils/socket' // Import the socket instance
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValue = {
  patientId: '',
  notes: '',
  locationIds: '',
}

const useAddAppointment = props => {
  const {
    getAllData = () => {},
    closeAppointmentModal = () => {},
    editAppointment,
    setEditAppointment = () => {},
  } = props
  const [selectedLocationValue, setSelectedLocationValue] = useState({})
  const [locationOptionsData, setLocationOptionsData] = useState([])
  const [initialValues, setInitialValues] = useState(initialValue)
  const [editID, setEditID] = useState()

  const [loading, setLoading] = useState(false)
  const [customerOptionsData, setCustomerList] = useState([])
  const [serviceCategoryOptionsData, setServiceCategoryOptionsData] = useState(
    []
  )
  const [chiroOptionsData, setChiroOptionsData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [checked, setChecked] = useState(true)
  const [nextAvailableSlot, setNextAvailableSlot] = useState('')
  const [nextAvailableSlotEnd, setNextAvailableSlotEnd] = useState('')
  const [payWithCard, setPayWithCard] = useState(1)
  //const [payWithCash, setPayWithCash] = useState(false)
  const [chiroValue, setChiroValue] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])
  const [clearServiceInfo, setClearServiceInfo] = useState(false)
  const [servicesListforslots, setSLF] = useState()
  const [customerValue, setCustomerValue] = useState({})

  const asyncSelectRefCustomer = useRef(null)
  const asyncSelectRefChiro = useRef(null)

  const onClear = () => {
    asyncSelectRefCustomer.current.select.select.clearValue()
    asyncSelectRefChiro.current.select.select.clearValue()
  }

  useEffect(() => {
    // if (props.activeAppointment) {
    setClearServiceInfo(false)
    loadOptionsLocation()
    // }
  }, [])

  useEffect(() => {
    if (selectedLocationValue?.value) {
      loadOptionsChiro()
      loadOptionsCustomer()
    }
  }, [selectedLocationValue])

  const loadOptionsLocation = async (inputValue, callback = () => {}) => {
    try {
      let locations = []
      const {
        locationIds = [],
        roleId: { code },
      } = getUser()
      if (code !== USER_ROLE_TYPE.SUPER_ADMIN) {
        let m = {
          label: locationIds?.[0]?.locationName,
          value: locationIds?.[0]?._id,
        }
        locations = [m]
        setLocationOptionsData(locations)
        setSelectedLocationValue(m)
      } else {
        const searchQuery = {
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
            select: ['id', 'locationName'],
          },
        }
        const data = {
          query: {
            // isDeleted: false,
          },
          options: {
            select: ['id', 'locationName'],
          },
        }
        const sendData = inputValue === undefined ? data : searchQuery

        await commonApi({
          action: 'findLocation',
          data: sendData,
        }).then(({ DATA = {} }) => {
          const location = DATA.data
          const locationData = location?.map((data = {}) => ({
            value: data.id,
            label: data.locationName,
          }))
          setLocationOptionsData(locationData || [])
          callback(locationData)
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  const onChangeLocation = (data, setFieldValue) => {
    if (data === null) {
      setSelectedLocationValue({})
      setFieldValue('locationIds', null)
    } else {
      setSelectedLocationValue({
        label: data?.label,
        value: data?.value,
      })
      setFieldValue('locationIds', data?.value)
    }
    asyncSelectRefCustomer.current.select.select.clearValue()
    asyncSelectRefChiro.current.select.select.clearValue()
  }
  const closeBtn = async handleReset => {
    await props.setActiveAppointment(false)

    const addFile = document?.getElementById('AddAppointmentModal')
    addFile?.classList?.remove('active')

    setEditID()
    closeAppointmentModal()
    const modalBody = document.getElementById('top-div-appointment')
    modalBody.scrollTop = 0
    handleReset
    onClear()
    setAvailableSlots([])
    setChiroValue('')
    setPayWithCard(true)
    //setPayWithCash(false)
    setNextAvailableSlotEnd('')
    setNextAvailableSlot('')
    setChecked(true)
    setStartDate(new Date())
    setChiroOptionsData([])
    setServiceCategoryOptionsData([])
    setCustomerList([])
    setSelectedLocationValue()
    setClearServiceInfo(true)
  }

  const loadOptionsCustomer = async (inputValue, callback) => {
    let data = {
      query: {
        locationIds: {
          $in: selectedLocationValue.value,
        },
      },
      options: {
        select: [],
      },
    }

    let searchData = {
      query: {
        locationIds: {
          $in: selectedLocationValue.value,
        },
        $or: [
          {
            firstName: {
              $regex: inputValue,
              $options: 'i',
            },
          },
          {
            lastName: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: ['id', 'firstName', 'lastName'],
        pagination: false,
      },
    }
    if (!selectedLocationValue.value) {
      delete data.query.locationIds
      delete searchData.query.locationIds
    }
    const sendQuery = inputValue === undefined ? data : searchData
    await commonApi({
      action: 'getPatientList',
      data: sendQuery,
    }).then(({ DATA }) => {
      const patientList = DATA.data?.map((data = {}) => ({
        value: data.id,
        label: `${data.firstName} ${data.lastName}`,
      }))
      callback?.(patientList)
      setCustomerList(patientList)
    })
  }

  

  const loadOptionsChiro = async (
    appointmentServices = servicesListforslots,
    callback
  ) => {
    if (!appointmentServices || !appointmentServices) return

    const data = {
      choosenTime: dateDisplay(startDate),
      skip: 0,
      limit: 10,
      locationIds: [selectedLocationValue.value],
      serviceIds: appointmentServices.map(x => x.subCategoryId),
    }

    try {
      commonApi({
        action: 'getAllAvailableProviderSlot',
        data: data,
      }).then(({ DATA }) => {
        const chiroList = DATA?.map((data = {}) => ({
          value: data?._id,
          label: `${data?.firstName} ${data?.lastName}`,
          startTime: data?.startTime,
          endTime: data?.endTime,
          startDateTime: data?.startDateTime,
          endDateTime: data?.endDateTime,
        }))

        setChiroOptionsData(chiroList)
      })
    } finally {
      setSLF(appointmentServices)
    }
  }

  const onChangeChiro = data => {
    if (data) {
      let startDate = new Date(data?.startDateTime)
      let startHr = startDate.getUTCHours()
      let startMin = startDate.getUTCMinutes()
      let endDate = new Date(data?.endDateTime)
      let endHr = endDate.getUTCHours()
      let endMin = endDate.getUTCMinutes()
      setNextAvailableSlot(startHr + ':' + startMin)
      setNextAvailableSlotEnd(endHr + ':' + endMin)
    } else {
      setNextAvailableSlot('')
      setNextAvailableSlotEnd('')
    }
  }

  const onClickSubmit = async (values, setSubmitting, resetForm) => {
    const res = getUser()

    setLoading(true)

    if (nextAvailableSlot === '' || nextAvailableSlotEnd === '') {
      toast.error('Please select next available slot')
    } else {
      const data = {
        patientId: values?.patientId,
        locationId: selectedLocationValue.value,
        serviceIds: values?.appointmentServices?.map(x => x.subCategoryId),
        categoryIds: values?.appointmentServices?.map(x => x.categoryId),
        date: dateDisplay(startDate),
        notes: values?.notes,
        paymentStaus: payWithCard,
      }
      try {
        await commonApi({
          parameters: editID ? [editID] : [],
          action: editID ? 'editAppointment' : 'addAppointment',
          data: data,
        }).then(({ DATA, MESSAGE }) => {
          toast.success(MESSAGE)
          socket.emit('appointmentAdded', DATA)
          getAllData()
          closeBtn()
          resetForm()
        })
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (editAppointment) {
      openEdit(editAppointment)
    }
  }, [editAppointment])

  const openAddAppointmentModal = async () => {
    await props.setActiveAppointment(true)
    const addAppointment = document.getElementById('AddAppointmentModal')
    addAppointment.classList.add('active')
  }

  const openEdit = async id => {
    if (!id) return false
    setLoading(true)
    try {
      const data = {
        query: {
          _id: id,
        },
        options: {
          select: [],
          populate: [
            'locationId',
            'serviceIds',
            'userId',
          ],
        },
      }
      await commonApi({
        action: 'findAppointment',
        data,
      }).then(({ DATA = {} }) => {
        const res = DATA?.data?.[0]
        if (!res) return
        setEditAppointment()
        setEditID(res.id)
        openAddAppointmentModal()
        setChiroValue({
          label: res.chiroId?.firstName + ' ' + res.chiroId?.lastName,
          value: res.chiroId?._id,
        })
        setStartDate(new Date(res.appointmentDate))
        setCustomerValue({
          label: res.patientId?.firstName + ' ' + res.patientId?.lastName,
          value: res.patientId?._id,
        })
        const serviceIds = res.serviceIds?.map((s = {}) => {
          return {
            categoryId: s.categoryId,
            subCategoryId: s._id,
          }
        })
        setInitialValues({
          ...initialValues,
          patientId: res.patientId?._id,
          appointmentServices: serviceIds,
          chiroId: res.chiroId?.id,
          notes: res.notes,
        })
      })
    } finally {
      setLoading(false)
    }
  }

  const validationSchema = Yup.object().shape({
    patientId: Yup.string().required('Please select patient.'),
    appointmentServices: Yup.array().of(
      Yup.object().shape({
        categoryId: Yup.string().required('Please select category.'),
        subCategoryId: Yup.string().required('Please select sub category.'),
      })
    ),
    locationIds: Yup.string().required('Please select locationIds'),
    chiroId: Yup.string().required('Please select chiropractor.'),
    notes: Yup.string().required('Please enter notes.'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      onClickSubmit(values, setSubmitting, resetForm)
    },
  })




  return {
    loading,
    formik,
    closeBtn,
    initialValues,
    onClickSubmit,
    loadOptionsCustomer,
    customerOptionsData,
    startDate,
    setStartDate,
    payWithCard,
    setPayWithCard,
    //payWithCash,
    //setPayWithCash,
    chiroValue,
    setChiroValue,
    setNextAvailableSlot,
    nextAvailableSlotEnd,
    setNextAvailableSlotEnd,
    asyncSelectRefCustomer,
    customerValue,
    setCustomerValue,
    editID,
    selectedLocationValue,
    locationOptionsData,
    loadOptionsLocation,
    onChangeLocation,
  }
}

export default useAddAppointment
