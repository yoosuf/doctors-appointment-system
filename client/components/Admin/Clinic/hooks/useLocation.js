import commonApi from '@/api/common'
import { REQUIRED_FIELD, USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

const allData = {
  query: {
    // isDeleted: false,
  },
  options: {
    select: [],
  },
}

const useLocation = ({
  props,
  loadOptionsCity,
  loadOptionsState,
  loadOptionsPostal,
  setCityOptionsData,
  setStateOptionsData,
  setPostalOptionsData,
}) => {
  const [loading, setLoading] = useState(false)
  const [subOwnerOptionsData, setSubOwnerOptionsData] = useState([])
  const [cityBillingOptionsData, setCityBillingOptionsData] = useState([])
  const [stateBillingOptionsData, setStateBillingOptionsData] = useState([])
  const [postalBillingOptionsData, setPostalBillingOptionsData] = useState([])
  const [roleId, setRoleId] = useState()
  const [parentId, setParentId] = useState()

  const [subOwnerValue, setSubOwnerValue] = useState({})
  const [cityValue, setCityValue] = useState({})
  const [stateValue, setStateValue] = useState({})
  const [postalValue, setPostalValue] = useState({})
  const [billingCityValue, setBillingCityValue] = useState({})
  const [billingStateValue, setBillingStateValue] = useState({})
  const [billingPostalValue, setBillingPostalValue] = useState({})

  const openLocationModal = () => {
    props.setActiveLocation(true)
    const editLocation = document.getElementById('ProfileSettingLocationModal')
    editLocation.classList.add('active')
  }

  const onClear = () => {
    setSubOwnerValue({})
    setCityValue({})
    setStateValue({})
    setPostalValue({})
    setBillingCityValue({})
    setBillingStateValue({})
    setBillingPostalValue({})
  }

  const closeBtn = () => {
    props.setActiveLocation(false)
    props.setEditID()
    const addLocation = document.getElementById('ProfileSettingLocationModal')
    addLocation.classList.remove('active')
    formik.resetForm()
    const modalBody = document.getElementById('top-div-location')
    modalBody.scrollTop = 0
    onClear()
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
      if (!props.editID) {

      }

      const { id, roleId } = getUser()

      if (id && roleId) {
        setParentId(id)
        setRoleId(roleId)
      }
    }
  }, [props.activeLocation, props.editID])

  // Edit Time Useeffect
  useEffect(() => {
    if (props.editID) {
      getEditData(props.editID)
    }
  }, [props.editID])

  const getEditData = async editID => {
    if (!editID) return false
    openLocationModal()

    setLoading(true)
    try {
      const data = {
        query: {
          _id: editID,
        },
        options: {
          select: [],
          populate: [
            {
              path: 'locationAddressId',
              populate: [
                {
                  path: 'provinceId',
                  select: ['name'],
                },
                {
                  path: 'cityId',
                  select: ['name'],
                },
                {
                  path: 'postalCodeId',
                  select: ['postalCode'],
                },
              ],
            },
            {
              path: 'billingAddressId',
              populate: [
                {
                  path: 'provinceId',
                  select: ['name'],
                },
                {
                  path: 'cityId',
                  select: ['name'],
                },
                {
                  path: 'postalCodeId',
                  select: ['postalCode'],
                },
              ],
            },
            {
              path: 'subOwnerId',
            },
          ],
        },
      }
      await commonApi({
        action: 'findLocation',
        data,
      }).then(async ({ DATA = {} }) => {
        const { data = [] } = DATA
        if (data?.length === 0) return false
        const res = data?.[0] || {}

        const {
          subOwnerId = {},
          locationName,
          description,
          locationAddressId = {},
          billingAddressId = {},
        } = res

        const {
          addressLine1,
          addressLine2,
          cityNm = {},
          provinceNm = {},
          postalCodeNm = {},
          email,
          phone,
        } = locationAddressId

        const {
          addressLine1: billingAddressLine1,
          addressLine2: billingAddressLine2,
          cityNm: billingCityId = {},
          provinceNm: billingProvinceId = {},
          postalCodeNm: billingPostalCodeId = {},
          legalName,
          businessNumber,
        } = billingAddressId

        formik.setFieldValue('subOwnerId', subOwnerId?._id)
        formik.setFieldValue('locationName', locationName)
        formik.setFieldValue('description', description)
        formik.setFieldValue('addressLine1', addressLine1)
        formik.setFieldValue('addressLine2', addressLine2)
        formik.setFieldValue('cityId', cityNm)
        formik.setFieldValue('provinceId', provinceNm)
        formik.setFieldValue('postalCodeId', postalCodeNm)
        formik.setFieldValue('email', email)
        formik.setFieldValue('phone', phone)
        formik.setFieldValue('billingAddressLine1', billingAddressLine1)
        formik.setFieldValue('billingAddressLine2', billingAddressLine2)
        formik.setFieldValue('billingCityId', billingCityId)
        formik.setFieldValue('billingProvinceId', billingProvinceId)
        formik.setFieldValue('billingPostalCodeId', billingPostalCodeId)
        formik.setFieldValue('legalName', legalName)
        formik.setFieldValue('businessNumber', businessNumber)

        // Sub Owner Dropdown
        const subOwner = {
          label: subOwnerId.firstName + ' ' + subOwnerId.lastName,
          value: subOwnerId._id,
        }
        const subOwnerArr = Array.isArray(subOwner) ? subOwner : [subOwner]
        await setSubOwnerValue(subOwner)
        await setSubOwnerOptionsData(subOwnerArr)

        // City Dropdown
        const city = {
          label: cityId.name,
          value: cityId._id,
        }
        const cityArr = Array.isArray(city) ? city : [city]
        await setCityValue(city)
        await setCityOptionsData(cityArr)

        // State Dropdown
        const state = {
          label: provinceId.name,
          value: provinceId._id,
        }
        const stateArr = Array.isArray(state) ? state : [state]
        await setStateValue(state)
        await setStateOptionsData(stateArr)

        // Postal Code Dropdown
        const postalCode = {
          label: postalCodeId.postalCode,
          value: postalCodeId._id,
        }
        const postalArr = Array.isArray(postalCode) ? postalCode : [postalCode]
        await setPostalValue(postalCode)
        await setPostalOptionsData(postalArr)

        // Billing City Dropdown
        const billingCity = {
          label: billingCityId.name,
          value: billingCityId._id,
        }
        const billingCityArr = Array.isArray(billingCity)
          ? billingCity
          : [billingCity]
        await setBillingCityValue(billingCity)
        await setCityBillingOptionsData(billingCityArr)

        // Billing State Dropdown
        const billingState = {
          label: billingProvinceId.name,
          value: billingProvinceId._id,
        }
        const billingStateArr = Array.isArray(billingState)
          ? billingState
          : [billingState]
        await setBillingStateValue(billingState)
        await setStateBillingOptionsData(billingStateArr)

        // Billing Postal Dropdown
        const billingPostalCode = {
          label: billingPostalCodeId.postalCode,
          value: billingPostalCodeId._id,
        }
        const billingPostalCodeArr = Array.isArray(billingPostalCode)
          ? billingPostalCode
          : [billingPostalCode]
        await setBillingPostalValue(billingPostalCode)
        await setPostalBillingOptionsData(billingPostalCodeArr)

        // Open Modal Function
      })
    } finally {
      setLoading(false)
    }
  }

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
            parameters: props.editID ? [props.editID] : [],
            action: props.editID ? 'updateLocation' : 'addLocation',
            data: values?.subOwnerId === '' ? nonIncludeSubOwner : data,
          }).then(async ({ DATA, MESSAGE }) => {
            toast.success(MESSAGE)
            closeBtn()
            await props.getLocationData()
            await props.setEditID()
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
      subOwnerId: Yup.string().required('Please select sub owner'),
      locationName: Yup.string().required('Please select location.'),
      description: Yup.string().required('Please enter description.'),
      addressLine1: Yup.string().required('Please enter address.'),
      // addressLine2: Yup.string().required(REQUIRED_FIELD),
      cityId: Yup.string().required('Please enter city.'),
      provinceId: Yup.string().required('Please enter province.'),
      postalCodeId: Yup.string().required('Please enter postal code.'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter email.'),
      phone: Yup.string()
        .min(5, 'Number should be greater than 5 and less than 15')
        .max(15, 'Number should be greater than 5 and less than 15')
        .required('Please enter phone number.'),
      legalName: Yup.string().required('Please enter legal name..'),
      billingAddressLine1: Yup.string().required('Please enter address.'),
      // billingAddressLine2: Yup.string().required(REQUIRED_FIELD),
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
    // Dropdown Value
    subOwnerValue,
    cityValue,
    stateValue,
    postalValue,
    billingCityValue,
    billingStateValue,
    billingPostalValue,
    setSubOwnerValue,
    setCityValue,
    setStateValue,
    setPostalValue,
    setBillingCityValue,
    setBillingStateValue,
    setBillingPostalValue,
  }
}

export default useLocation
