import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import commonApi from '@/api/common'
import routes from '@/utils/routes'
import { REQUIRED_FIELD, USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import toast from 'react-hot-toast'

const allData = {
  query: {
    isDeleted: false,
  },
  options: {
    select: [],
  },
}

const useAddLocation = props => {
  const { loading, setLoading } = props

  const asyncSelectRefSubOwner = useRef(null)
  const asyncSelectRefCity = useRef(null)
  const asyncSelectRefState = useRef(null)
  const asyncSelectRefPostal = useRef(null)
  const asyncSelectRefBillingCity = useRef(null)
  const asyncSelectRefBillingState = useRef(null)
  const asyncSelectRefBillingPostal = useRef(null)

  const onClear = () => {
    asyncSelectRefSubOwner.current.select.select.clearValue()
    asyncSelectRefCity.current.select.select.clearValue()
    asyncSelectRefState.current.select.select.clearValue()
    asyncSelectRefPostal.current.select.select.clearValue()
    asyncSelectRefBillingCity.current.select.select.clearValue()
    asyncSelectRefBillingState.current.select.select.clearValue()
    asyncSelectRefBillingPostal.current.select.select.clearValue()
  }

  const closeBtn = async () => {
    props.setActiveLocation(false)
    const addLocation = document.getElementById('AddLocationNewModal')
    addLocation.classList.remove('active')
    props?.setEditData()
    formik.resetForm()
    onClear()
    await setSubOwnerValue()
    await setCityValue()
    await setStateValue()
    await setPostalCodeValue()
    await setCityBillingValue()
    await setStateBillingValue()
    await setPostalCodeBillingValue()
  }

  // DropDown
  const [subOwnerOptionsData, setSubOwnerOptionsData] = useState([])
  const [subOwnerValue, setSubOwnerValue] = useState({})

  const [cityOptionsData, setCityOptionsData] = useState([])
  const [cityValue, setCityValue] = useState({})

  const [stateOptionsData, setStateOptionsData] = useState([])
  const [stateValue, setStateValue] = useState({})

  const [postalOptionsData, setPostalOptionsData] = useState([])
  const [postalCodeValue, setPostalCodeValue] = useState({})

  const [cityBillingOptionsData, setCityBillingOptionsData] = useState([])
  const [cityBillingValue, setCityBillingValue] = useState({})

  const [stateBillingOptionsData, setStateBillingOptionsData] = useState([])
  const [stateBillingValue, setStateBillingValue] = useState({})

  const [postalBillingOptionsData, setPostalBillingOptionsData] = useState([])
  const [postalCodeBillingValue, setPostalCodeBillingValue] = useState({})

  const [roleId, setRoleId] = useState()
  const [parentId, setParentId] = useState()

  const loadOptionsSubOwner = async (inputValue, callback) => {
    const data = {
      query: {
        parentId: parentId,
      },
      options: {
        select: [],
      },
    }

    await commonApi({
      action: 'findSubOwner',
      data: roleId?.code === USER_ROLE_TYPE.OWNER ? data : allData,
    }).then(({ DATA }) => {
      const subOwner = DATA?.data?.map(data => ({
        value: data?.id,
        label: `${data?.firstName} ${data?.lastName}`,
      }))
      callback?.(subOwner)
      setSubOwnerOptionsData(subOwner)
    })
  }

  useEffect(() => {
    if (roleId && parentId && props.activeLocation) {
      loadOptionsSubOwner()
    }
  }, [roleId, parentId, props.activeLocation])

  // City, State and Postal Dropdown API Function
  const loadOptionsCity = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        name: {
          $regex: inputValue,
        },
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findCity',
      data: sendData,
    }).then(({ DATA }) => {
      const city = DATA?.data
      const cityData = city?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      setCityOptionsData(cityData)
      callback?.(cityData)
    })
  }

  const loadOptionsState = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        name: {
          $regex: inputValue,
        },
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findState',
      data: sendData,
    }).then(({ DATA }) => {
      const state = DATA?.data
      const stateData = state?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      setStateOptionsData(stateData)
      callback?.(stateData)
    })
  }

  const loadOptionsPostal = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        postalCode: {
          $regex: inputValue,
        },
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findPostal',
      data: sendData,
    }).then(({ DATA }) => {
      const postal = DATA?.data
      const postalData = postal?.map(data => ({
        value: data?.id,
        label: data?.postalCode,
      }))
      setPostalOptionsData(postalData)
      callback?.(postalData)
    })
  }

  const loadOptionsBillingCity = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        name: {
          $regex: inputValue,
        },
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findCity',
      data: sendData,
    }).then(({ DATA }) => {
      const city = DATA?.data
      const cityData = city?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      setCityBillingOptionsData(cityData)
      callback?.(cityData)
    })
  }

  const loadOptionsBillingState = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        name: {
          $regex: inputValue,
        },
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findState',
      data: sendData,
    }).then(({ DATA }) => {
      const state = DATA?.data
      const stateData = state?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      setStateBillingOptionsData(stateData)
      callback?.(stateData)
    })
  }

  const loadOptionsBillingPostal = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        postalCode: {
          $regex: inputValue,
        },
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findPostal',
      data: sendData,
    }).then(({ DATA }) => {
      const postal = DATA?.data
      const postalData = postal?.map(data => ({
        value: data?.id,
        label: data?.postalCode,
      }))
      setPostalBillingOptionsData(postalData)
      callback?.(postalData)
    })
  }

  useEffect(() => {
    if (props.activeLocation) {
      const { id, roleId } = getUser()

      if (id && roleId) {
        setParentId(id)
        setRoleId(roleId)
      }
    }
  }, [props.activeLocation])

  const onClickEdit = async data => {
    if (!data) return false
    setLoading(true)
    try {
      const subOwner = data?.subOwnerId
      setSubOwnerValue({
        label: subOwner?.firstName + ' ' + subOwner?.firstName,
        value: subOwner?._id,
      })

      loadOptionsSubOwner()
      formik.setFieldValue('subOwnerId', subOwner?._id)
      formik.setFieldValue('locationName', data?.locationName)
      formik.setFieldValue('description', data?.description)
      formik.setFieldValue(
        'addressLine1',
        data?.locationAddressId?.addressLine1
      )
      formik.setFieldValue(
        'addressLine2',
        data?.locationAddressId?.addressLine2
      )
      formik.setFieldValue('cityId', data?.locationAddressId?.cityId?._id)
      formik.setFieldValue(
        'provinceId',
        data?.locationAddressId?.provinceId?._id
      )
      formik.setFieldValue(
        'postalCodeId',
        data?.locationAddressId?.postalCodeId?._id
      )
      formik.setFieldValue('email', data?.locationAddressId?.email)
      formik.setFieldValue('phone', data?.locationAddressId?.phone)
      formik.setFieldValue('legalName', data?.billingAddressId?.legalName)
      formik.setFieldValue(
        'billingAddressLine1',
        data?.billingAddressId?.addressLine1
      )
      formik.setFieldValue(
        'billingAddressLine2',
        data?.billingAddressId?.addressLine2
      )
      formik.setFieldValue('billingCityId', data?.billingAddressId?.cityId?._id)
      formik.setFieldValue(
        'billingProvinceId',
        data?.billingAddressId?.provinceId?._id
      )
      formik.setFieldValue(
        'billingPostalCodeId',
        data?.billingAddressId?.postalCodeId?._id
      )
      formik.setFieldValue(
        'businessNumber',
        data?.billingAddressId?.businessNumber
      )

      const city = Array.isArray(data?.locationAddressId?.cityId)
        ? data?.locationAddressId?.cityId
        : [data?.locationAddressId?.cityId]

      const cityData = city?.map(data => ({
        value: data?._id,
        label: data?.name,
      }))
      await setCityOptionsData(cityData)

      await setCityValue({
        value: data?.locationAddressId?.cityId?._id,
        label: data?.locationAddressId?.cityId?.name,
      })

      const billingCity = Array.isArray(data?.billingAddressId?.cityId)
        ? data?.billingAddressId?.cityId
        : [data?.billingAddressId?.cityId]

      const BillingCityData = billingCity?.map(data => ({
        value: data?._id,
        label: data?.name,
      }))
      await setCityBillingOptionsData(BillingCityData)

      await setCityBillingValue({
        value: data?.billingAddressId?.cityId?._id,
        label: data?.billingAddressId?.cityId?.name,
      })

      const province = Array.isArray(data?.locationAddressId?.provinceId)
        ? data?.locationAddressId?.provinceId
        : [data?.locationAddressId?.provinceId]

      const provinceData = province?.map(data => ({
        value: data?._id,
        label: data?.name,
      }))
      await setStateOptionsData(provinceData)

      await setStateValue({
        value: data?.locationAddressId?.provinceId?._id,
        label: data?.locationAddressId?.provinceId?.name,
      })

      const billingProvince = Array.isArray(data?.billingAddressId?.provinceId)
        ? data?.billingAddressId?.provinceId
        : [data?.billingAddressId?.provinceId]

      const billingProvinceData = billingProvince?.map(data => ({
        value: data?._id,
        label: data?.name,
      }))
      await setStateBillingOptionsData(billingProvinceData)

      await setStateBillingValue({
        value: data?.billingAddressId?.provinceId?._id,
        label: data?.billingAddressId?.provinceId?.name,
      })

      const postalCode = Array.isArray(data?.locationAddressId?.postalCodeId)
        ? data?.locationAddressId?.postalCodeId
        : [data?.locationAddressId?.postalCodeId]

      const postalCodeData = postalCode?.map(data => ({
        value: data?._id,
        label: data?.postalCode,
      }))
      await setPostalOptionsData(postalCodeData)

      await setPostalCodeValue({
        value: data?.locationAddressId?.postalCodeId?._id,
        label: data?.locationAddressId?.postalCodeId?.postalCode,
      })

      const billingPostalCode = Array.isArray(
        data?.billingAddressId?.postalCodeId
      )
        ? data?.billingAddressId?.postalCodeId
        : [data?.billingAddressId?.postalCodeId]

      const billingPostalCodeData = billingPostalCode?.map(data => ({
        value: data?._id,
        label: data?.postalCode,
      }))
      await setPostalBillingOptionsData(billingPostalCodeData)

      await setPostalCodeBillingValue({
        value: data?.billingAddressId?.postalCodeId?._id,
        label: data?.billingAddressId?.postalCodeId?.postalCode,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (props?.editData) {
      onClickEdit(props?.editData)
      // const addLocation = document.getElementById('AddLocationNewModal')
      // addLocation.classList.add('active')
    }
  }, [props?.editData])

  const onClickSubmit = async values => {
    setLoading(true)
    try {
      const addressData = {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        cityId: values.cityId,
        provinceId: values.provinceId,
        postalCodeId: values.postalCodeId,
        email: values.email,
        phone: values.phone,
      }
      await commonApi({
        action: 'createAddress',
        data: addressData,
      }).then(async ({ DATA }) => {
        const locationAddressId = DATA?.id
        const billingAddressData = {
          addressLine1: values.billingAddressLine1,
          addressLine2: values.billingAddressLine2,
          cityId: values.billingCityId,
          provinceId: values.billingProvinceId,
          postalCodeId: values.billingPostalCodeId,
          legalName: values.legalName,
          businessNumber: values.businessNumber,
        }
        await commonApi({
          action: 'createAddress',
          data: billingAddressData,
        }).then(async ({ DATA }) => {
          const billingAddressId = DATA?.id
          const data = {
            locationName: values.locationName,
            subOwnerId: values.subOwnerId,
            description: values.description,
            locationAddressId: locationAddressId,
            billingAddressId: billingAddressId,
          }
          const nonIncludeSubOwner = {
            locationName: values.locationName,
            description: values.description,
            locationAddressId: locationAddressId,
            billingAddressId: billingAddressId,
          }
          await commonApi({
            parameters: props?.editData?.id ? [props?.editData?.id] : [],
            action: props?.editData?.id ? 'updateLocation' : 'addLocation',
            data: values?.subOwnerId === '' ? nonIncludeSubOwner : data,
          }).then(async ({ DATA, MESSAGE }) => {
            const locationData = {
              locationIds: [...props.locationIds, DATA?.id],
            }

            await commonApi({
              parameters: props?.id ? [props?.id] : [],
              action: 'updateUser',
              data: locationData,
            }).then(async ({ DATA, MESSAGE }) => {
              toast.success(MESSAGE)
              formik.resetForm()
              onClear()
              await closeBtn()
              await props?.getLocationData(DATA?.locationIds)

              await props?.setEditData()

              await setCityValue()
              await setStateValue()
              await setPostalCodeValue()
              await setCityBillingValue()
              await setStateBillingValue()
              await setPostalCodeBillingValue()
            })
          })
        })
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      subOwnerId: '',
      locationName: '',
      description: '',
      addressLine1: '',
      addressLine2: '',
      cityId: '',
      provinceId: '',
      postalCodeId: '',
      email: '',
      phone: '',
      legalName: '',
      billingAddressLine1: '',
      billingAddressLine2: '',
      billingCityId: '',
      billingProvinceId: '',
      billingPostalCodeId: '',
      businessNumber: '',
      lat: '',
      lang: '',
    },
    validationSchema: Yup.object({
      // subOwnerId: Yup.string().required(REQUIRED_FIELD),
      locationName: Yup.string().required('Please select location.'),
      description: Yup.string().required('Please enter description.'),
      addressLine1: Yup.string().required('Please enter address.'),
      addressLine2: Yup.string().required('Please enter address.'),
      cityId: Yup.string().required('Please enter city.'),
      provinceId: Yup.string().required('Please enter province.'),
      postalCodeId: Yup.string().required('Please enter postal code.'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter email.'),
      phone: Yup.string()
        .min(10, 'Phone number is not valid')
        .required('Please enter phone number.'),
      legalName: Yup.string().required('Please enter legal name..'),
      billingAddressLine1: Yup.string().required('Please enter address.'),
      billingAddressLine2: Yup.string().required('Please enter address.'),
      billingCityId: Yup.string().required('Please enter city.'),
      billingProvinceId: Yup.string().required('Please enter province.'),
      billingPostalCodeId: Yup.string().required('Please enter postal code.'),
      businessNumber: Yup.string().required('Please enter business number.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    formik,
    closeBtn,
    // City Dropdown State
    cityOptionsData,
    loadOptionsCity,
    setCityOptionsData,
    cityValue,
    setCityValue,
    // State Dropdown State
    stateOptionsData,
    loadOptionsState,
    setStateOptionsData,
    stateValue,
    setStateValue,
    // Postal Code Dropdown State
    postalOptionsData,
    loadOptionsPostal,
    setPostalOptionsData,
    postalCodeValue,
    setPostalCodeValue,
    // Billing City Dropdown State
    cityBillingOptionsData,
    loadOptionsBillingCity,
    setCityBillingOptionsData,
    cityBillingValue,
    setCityBillingValue,
    // Billing State Dropdown State
    stateBillingOptionsData,
    loadOptionsBillingState,
    setStateBillingOptionsData,
    stateBillingValue,
    setStateBillingValue,
    // Billing Postal Code Dropdown State
    postalBillingOptionsData,
    loadOptionsBillingPostal,
    setPostalBillingOptionsData,
    postalCodeBillingValue,
    setPostalCodeBillingValue,
    // Sub Owner Dropdown State
    subOwnerOptionsData,
    loadOptionsSubOwner,
    setSubOwnerOptionsData,
    subOwnerValue,
    setSubOwnerValue,
    // Clear Dropdown Ref
    asyncSelectRefSubOwner,
    asyncSelectRefCity,
    asyncSelectRefState,
    asyncSelectRefPostal,
    asyncSelectRefBillingCity,
    asyncSelectRefBillingState,
    asyncSelectRefBillingPostal,
  }
}

export default useAddLocation
