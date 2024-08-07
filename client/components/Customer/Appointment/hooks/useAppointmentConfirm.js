import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'
import { useFormik } from 'formik'
import socket from '@/utils/socket'; // Import the socket instance
import _ from 'lodash'

const useAppointmentConfirm = ({ user }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [tempAppointment, setTempAppointment] = useState({})

  // Load initial values from localStorage if available
  useEffect(() => {
    const storedValues = localStorage.getItem('appointment')

    if (storedValues) {
      setTempAppointment(JSON.parse(storedValues))
    }
    setLoading(false)
  }, [])

  const [date, setDate] = useState(new Date())

  const [deleteID, setDeleteID] = useState()
  const [label, setLabel] = useState()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [timeDuration, setTimeDuration] = useState({})


  // useEffect(()=> {
  //   console.log(`from Line 36 user`, user)
  // }, [user])

  const closeModal = () => {
    setOpenDeleteModal(false), setDeleteID(), setLabel()
  }

  const openModal = (data = {}) => {
    console.log(`data FROM MODEL`, data)
    setLabel(data.name)
    setDeleteID(data)
    setOpenDeleteModal(true)
  }

  const onClickDelete = deletedServiceId => {
    console.log("onClickDelete initiated with deletedServiceId:", deletedServiceId); 

    if (deletedServiceId) {
      setLoading(true)
      console.log("Loading state set to true");

      try {
        console.log("Filtering serviceIds");

        // Filter out the deleted service ID from the serviceIds array
        const updatedServiceIds = tempAppointment.serviceIds.filter(
          serviceId => serviceId !== deletedServiceId
        )
        console.log("Updated serviceIds:", updatedServiceIds);


        console.log("Updating tempAppointment");

        // Update formikValues with the new serviceIds array
        setTempAppointment({
          ...tempAppointment,
          serviceIds: updatedServiceIds,
        })
        console.log("New tempAppointment:", tempAppointment); // Log the updated state

      } finally {
        setLoading(false)
        console.log("Loading state set to false");

      }
    }
  }

  const onClickCheckIn = async values => {
    if (tempAppointment?.serviceIds?.length === 0) {
      toast.error('Please select the service')
      return
    }

    const userId = user?.id;

    try {
      setLoading(true)

      await commonApi({
        action: 'createAppointment',
        data: tempAppointment,
      }).then((response) => {

        console.log(response.DATA)
        console.log(`response`, response.STATUS)
        if (response.STATUS === 'SUCCESS') {
          // Handle successful appointment creation
          socket.emit('appointmentAdded', response.DATA);
          socket.emit('updateMembership', { userId });
          localStorage.removeItem('appointment')
          router.push(routes.customer.dashboard)
        } else {
          // Handle errors (including non-200/201 statuses)
          toast.error('There was an error processing your request.')
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const formikInit = useFormik({
    initialValues: tempAppointment,
    onSubmit: async (values, formikHelpers) => {
      if (formikHelpers.isSubmitting) {
        return
      }

      formikHelpers.setSubmitting(true)
      await onClickCheckIn(values)
      formikHelpers.setSubmitting(true)
    },
  })

  const safeParseFloat = (value, defaultValue = 0) => {
    const parsed = parseFloat(value)
    return Number.isNaN(parsed) ? defaultValue : parsed
  }

  const total = _.reduce(
    tempAppointment?.serviceIds,
    (result, value) => safeParseFloat(value.price) + result,
    0
  )



  return {
    loading,
    formikInit,
    tempAppointment,
    setLoading,
    date,
    openModal,
    closeModal,
    openDeleteModal,
    deleteID,
    label,
    onClickDelete,
    timeDuration,
    total,
  }
}

export default useAppointmentConfirm
