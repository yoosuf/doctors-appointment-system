import commonApi from '@/api/common'
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED_FIELD,
} from '@/utils/constant'
import { getProfileImage } from '@/utils/helper'
import { subYears } from 'date-fns'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

const allData = {
  query: {
    isDeleted: false,
  },
  options: {
    select: [],
  },
}

const useAddStaff = ({
  props,
  prefixData,
  genderData,
  getAllMasterData,
  loadOptionsPrefix,
  loadOptionsGender,
  loadOptionsCity,
  loadOptionsState,
  loadOptionsPostal,
  setSelectedPrefixValue,
  setSelectedGenderValue,
  setSelectedCityValue,
  setSelectedStateValue,
  setSelectedPostalValue,
}) => {
  const [selectedSubOwnerValue, setSelectedSubOwnerValue] = useState({})
  const [selectedLocationValue, setSelectedLocationValue] = useState({})
  const [selectedStaffValue, setSelectedStaffValue] = useState({})

  const onClear = () => {
    setSelectedSubOwnerValue({})
    setSelectedLocationValue({})
    setSelectedStaffValue({})
    setSelectedPrefixValue({})
    setSelectedGenderValue({})
    setSelectedCityValue({})
    setSelectedStateValue({})
    setSelectedPostalValue({})
  }

  const [checked, setChecked] = useState(false)
  const [active, setActive] = useState(false)
  const [activeEmailNotification, setActiveEmailNotification] = useState(false)
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [passwordEyeIcon, setPasswordEyeIcon] = useState(false)
  const [confirmPasswordEyeIcon, setConfirmPasswordEyeIcon] = useState(false)
  const [subOwnerOptionsData, setSubOwnerOptionsData] = useState([])
  const [locationOptionsData, setLocationOptionsData] = useState([])
  const [subOwnerId, setSubOwnerId] = useState()
  const [staffOptionsData, setStaffOptionsData] = useState([
    { value: 'Staff', label: 'Staff' },
  ])

  const closeBtn = () => {
    props.setActiveStaff(false)
    const openAddStaff = document.getElementById('AddStaffModal')
    openAddStaff.classList.remove('active')
    formik.resetForm()
    const modalBody = document.getElementById('top-div-staff')
    modalBody.scrollTop = 0
    onClear()
    setActive(false)
    setChecked(false)
    setActiveEmailNotification(false)
    setImage()
    setPasswordEyeIcon(false)
    setConfirmPasswordEyeIcon(false)
    setSubOwnerOptionsData([])
    setLocationOptionsData([])
    setSubOwnerId()
    setStaffOptionsData([{ value: 'Staff', label: 'Staff' }])
  }

  const loadOptionsLocation = async (inputValue, callback) => {
    const data = {
      query: {},
      options: {
        select: [],
        populate: ['locationIds'],
      },
    }

    const searchData = {
      query: {
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
        populate: ['locationIds'],
      },
    }

    const sendData = inputValue === undefined ? data : searchData
    await commonApi({
      parameters: subOwnerId ? [subOwnerId] : [],
      action: 'getUser',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const location = DATA.data?.[0]?.locationIds
      const locationData = location?.map((data = {}) => ({
        value: data._id,
        label: `${data.locationName}`,
      }))
      callback?.(locationData)
      setLocationOptionsData(locationData)
    })
  }

  useEffect(() => {
    if (subOwnerId) {
      loadOptionsLocation()
    }
  }, [subOwnerId])

  const loadOptionsSubOwner = async (inputValue, callback) => {
    const data = {
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

    const all = {
      query: {},
      options: {
        select: [],
      },
    }

    const sendData = inputValue === undefined ? all : data

    await commonApi({
      action: 'findSubOwner',
      data: sendData,
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
    if (props.activeStaff) {
      // getAllMasterData()
      loadOptionsSubOwner()

    }
  }, [props.activeStaff])

  useEffect(() => {
    if (props.activeStaff) {
      loadOptionsPrefix()
      loadOptionsGender()
    }
  }, [prefixData, genderData, props.activeStaff])

  const onClickSubmit = async ({ values, staff }) => {
    setLoading(true)
    const profile_image = getProfileImage(values)
    // const data = {
    //   addressLine1: values.addressLine1,
    //   addressLine2: values.addressLine2,
    //   cityId: values.cityId,
    //   provinceId: values.provinceId,
    //   postalCodeId: values.postalCodeId,
    // }
    // try {
    //   await commonApi({
    //     action: 'createAddress',
    //     data,
    //   }).then(async ({ DATA }) => {
    const data = {
      locationIds: values.locationIds,
      ...profile_image,
      email: values.email,
      phone: values.phone,
      password: values.password,
      generatePassword: checked,
      // prefixId: values.prefixId,
      parentId: values.parentId,
      firstName: values.firstName,
      lastName: values.lastName,
      genderId: values.genderId,
      dob: values.dob,
      isActive: active,
      role: staff,
      emailNotifications: activeEmailNotification,
      // addressIds: [
      //   {
      //     address: DATA?.id,
      //     isDefault: true,
      //   },
      // ],
      // phones: [
      //   {
      //     phone: values.phone2,
      //   },
      // ],
      emails: [
        {
          isApproved: true,
          isVerified: true,
          isDefault: true,
          email: values.email,
        },
      ],
    }
    await commonApi({
      action: 'addStaff',
      data,
    }).then(async ({ DATA, MESSAGE }) => {
      toast.success(MESSAGE)
      closeBtn()
    })
    //   })
    // } finally {
    //   setLoading(false)
    // }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      // prefixId: '',
      parentId: '',
      firstName: '',
      lastName: '',
      genderId: '',
      // addressLine1: '',
      // addressLine2: '',
      // cityId: '',
      // provinceId: '',
      // postalCodeId: '',
      // phone2: '',
      locationIds: '',
      profile_image: '',
      dob: subYears(new Date(), 16),
      staff: '',
      role: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(EMAIL_VALIDATION, 'Invalid email address')
        .required('Please enter email.'),
      phone: Yup.string()
        .min(5, 'Number should be greater than 5 and less than 15')
        .max(15, 'Number should be greater than 5 and less than 15')
        .required('Please enter phone number.'),
      password:
        !checked &&
        Yup.string()
          .matches(
            PASSWORD_VALIDATION,
            'Contains at least 8 characters, 1 Upper case (A-Z), 1 number (0-9) & one special symbol'
          )
          .required('Please enter password.'),
      confirm_password:
        !checked &&
        Yup.string()
          .when('password', {
            is: val => !!(val && val.length > 0),
            then: Yup.string().oneOf(
              [Yup.ref('password')],
              'Password does not match'
            ),
          })
          .required('Please enter confirm password.'),
      // prefixId: Yup.string().required(REQUIRED_FIELD),
      parentId: Yup.string().required('Please select sub owner.'),
      firstName: Yup.string()
        .matches(/^[-_ a-zA-Z]+$/, 'Only alphabets are allowed')
        .required('Please enter first name.'),
      lastName: Yup.string()
        .matches(/^[-_ a-zA-Z]+$/, 'Only alphabets are allowed')
        .required('Please enter last name.'),
      genderId: Yup.string().required('Please select gender.'),
      // addressLine1: Yup.string().required(REQUIRED_FIELD),
      // addressLine2: Yup.string().required(REQUIRED_FIELD),
      // cityId: Yup.string().required(REQUIRED_FIELD),
      // provinceId: Yup.string().required(REQUIRED_FIELD),
      // postalCodeId: Yup.string().required(REQUIRED_FIELD),
      // phone2: Yup.string()
      //   .min(10, 'Phone number is not valid')
      //   .required(REQUIRED_FIELD),
      dob: Yup.date().nullable(REQUIRED_FIELD).required('Please enter date.'),
      locationIds: Yup.string().required('Please select location.'),
      // profile_image: Yup.string().required('Please select image.'),
      staff: Yup.string().required('Please select staff.'),
    }),
    onSubmit: values => {
      onClickSubmit({ values, staff: 'STAFF' })
    },
  })

  return {
    subOwnerId,
    checked,
    setChecked,
    active,
    setActive,
    activeEmailNotification,
    setActiveEmailNotification,
    closeBtn,
    passwordEyeIcon,
    setPasswordEyeIcon,
    confirmPasswordEyeIcon,
    setConfirmPasswordEyeIcon,
    formik,
    image,
    setImage,
    loading,
    // Sub Owner Dropdown State
    subOwnerOptionsData,
    loadOptionsSubOwner,
    setSubOwnerOptionsData,
    setSubOwnerId,
    // Staff Dropdown State
    staffOptionsData,
    setStaffOptionsData,
    // Location Dropdown State
    locationOptionsData,
    setLocationOptionsData,
    loadOptionsLocation,
    // Clear Dropdown Ref
    selectedSubOwnerValue,
    setSelectedSubOwnerValue,
    selectedLocationValue,
    setSelectedLocationValue,
    selectedStaffValue,
    setSelectedStaffValue,
  }
}

export default useAddStaff
