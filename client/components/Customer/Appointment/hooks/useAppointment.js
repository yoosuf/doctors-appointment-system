import React, { useState, useEffect } from 'react'
import routes from '@/utils/routes'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

const validationSchema = Yup.object({
  serviceIds: Yup.array().min(1, 'Please select at least one service'),
  categoryIds: Yup.array().min(1, 'Please select at least one category'),
})

const useAppointment = ({ user, services }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [openCategories, setOpenCategories] = useState({})
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [formikValues, setFormikValues] = useState({
    serviceIds: [],
    categoryIds: [],
  })

  // Load initial values from localStorage if available
  useEffect(() => {
    const storedValues = localStorage.getItem('appointment')
    if (storedValues) {
      setFormikValues(JSON.parse(storedValues))
    }
    setLoading(false)
  }, [])

  const handleSubmit = async (values, setSubmitting) => {
    try {
      setSubmitting(true)
      const currentDate = new Date()
      const currentUTCDate = currentDate.toISOString()

      // Extend values with additional data
      const extendedValues = {
        ...values,
        userId: user?._id,
        date: currentUTCDate,
        locationId: user?.locationIds[0]?._id,
        status: 'proposed',
        notes: '',
        paymentMethod: 'card'
      }

      // Save extended values to localStorage
      localStorage.setItem('appointment', JSON.stringify(extendedValues))

      router.push(routes.customer.appointmentConfirm)
    } finally {
      setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: formikValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  })

  useEffect(() => {
    formik.setFieldValue('serviceIds', formikValues.serviceIds)
    formik.setFieldValue('categoryIds', formikValues.categoryIds)

    // console.log('formikValues:', formikValues)
  }, [formikValues])

  const handleToggleCategory = categoryId => {
    setOpenCategories(prevOpenCategories => {
      const newOpenCategories = {}

      // Close all other categories
      Object.keys(prevOpenCategories).forEach(key => {
        newOpenCategories[key] = false
      })

      // Toggle the clicked category
      newOpenCategories[categoryId] = !prevOpenCategories[categoryId]

      return newOpenCategories
    })
  }

  const handleServiceSelection = (category, service, e) => {
    if (e) {
      e.stopPropagation()
    }

    const isSelected = formik.values.serviceIds.includes(service._id)

    formik.setFieldValue(
      'serviceIds',
      isSelected
        ? formik.values.serviceIds.filter(
            selectedService => selectedService !== service._id
          )
        : [...formik.values.serviceIds, service._id]
    )

    // Use a Set to store unique category ids
    const uniqueCategoryIds = new Set(formik.values.categoryIds)

    // Include the category in uniqueCategoryIds when a service is selected
    if (!isSelected) {
      uniqueCategoryIds.add(category._id)
    } else {
      uniqueCategoryIds.delete(category._id)
    }

    // Convert the Set back to an array and set the formik field value
    formik.setFieldValue('categoryIds', Array.from(uniqueCategoryIds))

    // Do not toggle the category when clicking on a service
  }

  const handleSelectAllServices = categoryServices => {
    const selectedServiceIds = categoryServices.map(service => service._id)
    formik.setFieldValue('serviceIds', [
      ...formik.values.serviceIds,
      ...selectedServiceIds,
    ])
  }

  const handleClearAllServices = category => {
    const updatedServiceIds = formik.values.serviceIds.filter(id => {
      return !category.data.some(service => service._id === id)
    })

    formik.setFieldValue('serviceIds', updatedServiceIds)
  }

  const handleCloseCollapse = categoryId => {
    setOpenCategories(prevOpenCategories => {
      const newOpenCategories = { ...prevOpenCategories }
      newOpenCategories[categoryId] = false
      return newOpenCategories
    })
  }

  const handleKeyDown = (index, e) => {
    const lastIndex = services.length - 1

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(index > 0 ? index - 1 : lastIndex)
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(index < lastIndex ? index + 1 : 0)
        break
      default:
        break
    }
  }

  return {
    loading,
    formik,
    openCategories,
    focusedIndex,
    handleToggleCategory,
    handleServiceSelection,
    handleCloseCollapse,
    handleKeyDown,
    handleClearAllServices,
  }
}

export default useAppointment
