import commonApi from '@/api/common'
import { localTimeToUtc } from '@/utils/datetime'
import { getUser } from '@/utils/localStorage'
import { useEffect, useRef, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import socket from '@/utils/socket' // Import the socket instance
import useBillingCalculator from '@/components/Desk/Appointment/hooks/useBillingCalculator'
import { transformMembershipData } from '@/utils/membership'

const initialValues = {
  patientId: '',
  selectedServices: {},
  serviceIds: [],
  categoryIds: [],
}

const validationSchema = Yup.object().shape({
  patientId: Yup.string().required('Patient is required'),
  notes: Yup.string(),
  selectedServices: Yup.object().test(
    'hasSelectedServices',
    'Select at least one service for each category',
    value => {
      const categoryIds = Object.keys(value)
      for (const categoryId of categoryIds) {
        if (
          !Array.isArray(value[categoryId]) ||
          value[categoryId].length === 0
        ) {
          return false
        }
      }
      return true
    }
  ),
})

const useInstantAppointment = props => {
  const {
    getAllData = () => {},
    closeAppointmentModal = () => {},
    appointmentCreated = () => {},
  } = props

  const [selectedLocationValue, setSelectedLocationValue] = useState({})
  const [editID, setEditID] = useState()

  const [loading, setLoading] = useState(false)
  const [customerOptionsData, setCustomerList] = useState([])
  const [selectedServicIds, setSelectedServicIds] = useState([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])

  const [payWithCard, setPayWithCard] = useState(true)
  const [payWithCash, setPayWithCash] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [selectedPatientObj, setSelectedPatientObj] = useState({})
  const [activeSubscription, setActiveSubscription] = useState({})


  const [paymentMethod, setPaymentMethod] = useState('')

  // const { lineItems, totalAmount, totalAmountToPay } = {}

  // useEffect(() => {

  //   console.log(`formik.values.patientId`, formik.values.patientId)

  // }, [formik.values.patientId])

  // const {
  //   activeSubscription,
  //   lineItems,
  //   totalAmount,
  // } = useBillingCalculator({
  //   patientId: selectedPatientId,
  //   serviceIds: selectedServicIds,
  // })

  const asyncSelectRefCustomer = useRef(null)

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      console.log(`values`, values)
      onClickSubmit(values)

      formikHelpers.setSubmitting(false)
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching patient data')
        const selectedPatientId = formik.values.patientId

        const patientDataPromise = commonApi({
          parameters: [selectedPatientId],
          action: 'getPatientById',
        })
        console.log('Selected patient ID:', selectedPatientId)

        const [patientData] = await Promise.all([patientDataPromise])

        console.log('Patient data:', patientData.DATA)

        setSelectedPatientObj(patientData.DATA)
        const formattedMembership = transformMembershipData(
          patientData?.DATA?.membership
        )

        console.info(`formattedMembership`, formattedMembership)

        setActiveSubscription(formattedMembership)
      } catch (error) {
        console.error('Error fetching patient data:', error)
      }
    }

    if (formik.values.patientId) {
      fetchData()
    }
  }, [formik.values.patientId])

  const { lineItems, totalAmount, totalAmountToPay } = useBillingCalculator({
    userObj: selectedPatientObj,
    serviceIds: selectedServicIds,
  })

  useEffect(() => {
    const { categoryIds, serviceIds } = separateKeysAndValues(
      formik.values.selectedServices
    )

    setSelectedCategoryIds(categoryIds)
    setSelectedServicIds(serviceIds)
    // console.log(`SELECTED categoryIds`, categoryIds)
    // console.log(`SELECTED serviceIds`, serviceIds)
  }, [formik.values.selectedServices])

  // useEffect(() => {
  //   console.info(`################################`)
  //   console.info(`############# selectedCategoryIds`, selectedCategoryIds)
  //   console.info(`############# selectedServicIds`, selectedServicIds)

  //   console.info(`The total ammount for the appontmenbt`, totalAmount)
  // }, [selectedPatientId, selectedCategoryIds, selectedServicIds])

  // useEffect to log form values on change
  // useEffect(() => {
  //   console.info(formik.values)
  // }, [formik.values]) // Dependency array with formik.values

  useEffect(() => {
    loadOptionsCustomer()
  }, [])

  const closeBtn = async handleReset => {
    await props.setActiveAppointment(false)

    const addFile = document?.getElementById('InstantAppointmentModal')
    addFile?.classList?.remove('active')

    setEditID()
    closeAppointmentModal()
    const modalBody = document.getElementById('top-div')
    modalBody.scrollTop = 0
    handleReset
    setPayWithCard(true)
    setPayWithCash(false)
    setCustomerList([])
  }

  const loadOptionsCustomer = async (inputValue, callback) => {
    const { locationIds = [] } = getUser()
    let data = {
      query: {
        locationIds: {
          $in: locationIds?.[0]?._id,
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
        select: ['id', 'firstName', 'lastName', 'email'],
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

  const onClickSubmit = async values => {
    setLoading(true)

    const { locationIds } = getUser()

    const { categoryIds, serviceIds } = separateKeysAndValues(
      values.selectedServices
    )

    const userId = values?.patientId

    const data = {
      patientId: values?.patientId,
      locationId: locationIds[0]._id,
      serviceIds: serviceIds,
      categoryIds: categoryIds,
      date: localTimeToUtc(),
      notes: values?.notes,
      status: 'confirmed',
      paymentMethod: 'card',
    }

    try {
      await commonApi({
        parameters: editID ? [editID] : [],
        action: editID ? 'editAppointment' : 'addAppointment',
        data: data,
      }).then(({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)

        socket.emit('appointmentAdded', DATA)
        socket.emit('updateMembership', { userId })

        appointmentCreated()
        getAllData()
        closeBtn()
        formik.resetForm()
      })
    } finally {
      setLoading(false)
    }
  }

  const separateKeysAndValues = selectedServices => {
    const categoryIds = Object.keys(selectedServices)
    const serviceIds = Object.values(selectedServices).flat()
    return { categoryIds, serviceIds }
  }

  const selectedServicesForCategory = (selectedServices, category) => {
    return (
      selectedServices[category._id]?.map(serviceId => ({
        value: serviceId,
        label: category.data.find(service => service._id === serviceId)?.name,
      })) || []
    )
  }

  return {
    loading,
    formik,
    closeBtn,
    onClickSubmit,
    loadOptionsCustomer,
    customerOptionsData,
    selectedPatientId,
    selectedServicIds,
    selectedCategoryIds,
    // payWithCard,
    // setPayWithCard,
    // payWithCash,
    // setPayWithCash,
    asyncSelectRefCustomer,
    selectedServicesForCategory,
    activeSubscription, 
    lineItems,
    totalAmount,
    totalAmountToPay,
  }
}

export default useInstantAppointment
