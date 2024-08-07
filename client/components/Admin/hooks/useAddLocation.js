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

const useAddLocation = ({
  props,
  loadOptionsCity,
  loadOptionsState,
  loadOptionsPostal,
  setSelectedCityValue,
  setSelectedStateValue,
  setSelectedPostalValue,
}) => {
  const [loading, setLoading] = useState(false)
  const [subOwnerOptionsData, setSubOwnerOptionsData] = useState([])
  const [cityBillingOptionsData, setCityBillingOptionsData] = useState([])
  const [stateBillingOptionsData, setStateBillingOptionsData] = useState([])
  const [postalBillingOptionsData, setPostalBillingOptionsData] = useState([])
  const [roleId, setRoleId] = useState()
  const [parentId, setParentId] = useState()

  const [selectedSubOwnerValue, setSelectedSubOwnerValue] = useState({})
  const [selectedBillingCityValue, setSelectedBillingCityValue] = useState({})
  const [selectedBillingStateValue, setSelectedBillingStateValue] = useState({})
  const [selectedBillingPostalValue, setSelectedBillingPostalValue] = useState(
    {}
  )

  const onClear = () => {
    setSelectedSubOwnerValue({})
    setSelectedCityValue({})
    setSelectedStateValue({})
    setSelectedPostalValue({})
    setSelectedBillingCityValue({})
    setSelectedBillingStateValue({})
    setSelectedBillingPostalValue({})
  }

  const closeBtn = () => {
    props.setActiveLocation(false)
    const addLocation = document.getElementById('AddLocationModal')
    addLocation.classList.remove('active')
    formik.resetForm()
    const modalBody = document.getElementById('top-div-location')
    modalBody.scrollTop = 0
    onClear()
    setSubOwnerOptionsData([])
    setCityBillingOptionsData([])
    setStateBillingOptionsData([])
    setPostalBillingOptionsData([])
    setRoleId()
    setParentId()
  }

  const loadOptionsSubOwner = async (inputValue, callback) => {
    const data = {
      query: {
        parentId: parentId,
      },
      options: {
        select: [],
        pagination: false,
      },
    }

    const newData = {
      query: {},
      options: {
        select: [],
      },
    }

    const searchData = {
      query: {
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
        select: [],
        pagination: false,
      },
    }

    await commonApi({
      action: 'findSubOwner',
      data:
        roleId?.code === USER_ROLE_TYPE.OWNER
          ? data
          : inputValue === undefined
          ? newData
          : searchData,
    }).then(({ DATA = {} }) => {
      const subOwner = DATA.data?.map((data = {}) => ({
        value: data.id,
        label: `${data.firstName} ${data.lastName}`,
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

  const loadOptionsBillingCity = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        $or: [
          {
            name: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findCity',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const city = DATA.data
      const cityData = city?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))
      setCityBillingOptionsData(cityData)
      callback?.(cityData)
    })
  }

  const loadOptionsBillingState = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        $or: [
          {
            name: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findState',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const state = DATA.data
      const stateData = state?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))
      setStateBillingOptionsData(stateData)
      callback?.(stateData)
    })
  }

  const loadOptionsBillingPostal = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        $or: [
          {
            postalCode: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findPostal',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const postal = DATA.data
      const postalData = postal?.map((data = {}) => ({
        value: data.id,
        label: data.postalCode,
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
            action: 'addLocation',
            data: values?.subOwnerId === '' ? nonIncludeSubOwner : data,
          }).then(async ({ DATA, MESSAGE }) => {
            toast.success(MESSAGE)
            closeBtn()
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
      locationName: Yup.string().required('Please enter location name.'),
      description: Yup.string().required('Please enter description.'),
      addressLine1: Yup.string().required('Please enter address.'),
      // addressLine2: Yup.string().required("REQUIRED_FIELD"),
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
      // billingAddressLine2: Yup.string().required("is required."),
      billingCityId: Yup.string().required('Please enter city.'),
      billingProvinceId: Yup.string().required('Please enter province.'),
      billingPostalCodeId: Yup.string().required('Please enter postal code.'),
      businessNumber: Yup.string()
        .min(9, 'Tax number is invalid')
        .max(9, 'Tax number is invalid')
        .required('Please enter business number.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    formik,
    loading,
    closeBtn,
    // Billing City Dropdown State
    cityBillingOptionsData,
    loadOptionsBillingCity,
    setCityBillingOptionsData,
    // Billing State Dropdown State
    stateBillingOptionsData,
    loadOptionsBillingState,
    setStateBillingOptionsData,
    // Billing Postal Code Dropdown State
    postalBillingOptionsData,
    loadOptionsBillingPostal,
    setPostalBillingOptionsData,
    // Sub Owner Dropdown State
    subOwnerOptionsData,
    loadOptionsSubOwner,
    setSubOwnerOptionsData,
    // Clear Dropdown Ref
    selectedSubOwnerValue,
    selectedBillingCityValue,
    selectedBillingStateValue,
    selectedBillingPostalValue,
    setSelectedSubOwnerValue,
    setSelectedBillingCityValue,
    setSelectedBillingStateValue,
    setSelectedBillingPostalValue,
  }
}

export default useAddLocation
