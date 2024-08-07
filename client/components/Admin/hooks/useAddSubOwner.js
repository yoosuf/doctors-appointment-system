import commonApi from '@/api/common'
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED_FIELD,
} from '@/utils/constant'
import { getLocationQuery, getProfileImage } from '@/utils/helper'
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

const useAddSubOwner = ({
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
  const [selectedOwnerValue, setSelectedOwnerValue] = useState({})
  const [selectedLocationValue, setSelectedLocationValue] = useState({})

  const onClear = () => {
    setSelectedLocationValue({})
    setSelectedOwnerValue({})
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
  const [ownerOptionsData, setOwnerOptionsData] = useState([])
  const [locationOptionsData, setLocationOptionsData] = useState([])
  const [ownerId, setOwnerId] = useState()

  const closeBtn = () => {
    props.setActiveSubOwner(false)
    formik.resetForm()
    onClear()
    setChecked(false)
    setActive(false)
    setActiveEmailNotification(false)
    setImage()
    setPasswordEyeIcon(false)
    setConfirmPasswordEyeIcon(false)
    setOwnerOptionsData([])
    setLocationOptionsData([])
    setOwnerId()
    const openAddSubOwner = document.getElementById('AddSubOwnerModal')
    openAddSubOwner.classList.remove('active')
    const modalBody = document.getElementById('top-div-sub-owner')
    modalBody.scrollTop = 0
    onClear()
  }

  useEffect(() => {
    if (ownerId) {
      loadOptionsLocation()
    }
  }, [ownerId])

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
      parameters: ownerId ? [ownerId] : [],
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

  const loadOptionsOwner = async (inputValue, callback) => {
    const locationquery = getLocationQuery()
    const data = {
      query: {
        ...locationquery,
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

    const all = {
      query: {
        ...locationquery,
      },
      options: {
        select: ['id', 'firstName', 'lastName'],
        sort: {
          createdAt: -1,
        },
      },
    }

    const sendData = inputValue === undefined ? all : data

    await commonApi({
      action: 'findOwner',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const owner = DATA.data?.map((data = {}) => ({
        value: data.id,
        label: `${data.firstName} ${data.lastName}`,
      }))
      callback?.(owner)
      setOwnerOptionsData(owner)
    })
  }

  useEffect(() => {
    if (props.activeSubOwner) {
      // getAllMasterData()
      loadOptionsOwner()
    }
  }, [props.activeSubOwner])

  useEffect(() => {
    if (props.activeSubOwner) {
      loadOptionsPrefix()

      loadOptionsGender()
    }
  }, [prefixData, genderData, props.activeSubOwner])

  const onClickSubmit = async values => {
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
      locationIds: values.locationId,
      dob: values.dob,
      isActive: active,
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
      action: 'addSubOwner',
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
      locationId: '',
      profile_image: '',
      dob: subYears(new Date(), 16),
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(EMAIL_VALIDATION, 'Invalid email address.')
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
      parentId: Yup.string().required('Please select owner.'),
      firstName: Yup.string()
        .matches(/^[-_ a-zA-Z]+$/, 'Only alphabets are allowed.')
        .required('Please enter first name.'),
      lastName: Yup.string()
        .matches(/^[-_ a-zA-Z]+$/, 'Only alphabets are allowed.')
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
      locationId: Yup.string().required('Please select location.'),
      // profile_image: Yup.string().required('Please select image.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    ownerId,
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
    // Owner Dropdown State
    ownerOptionsData,
    loadOptionsOwner,
    setOwnerOptionsData,
    setOwnerId,
    // Location Dropdown State
    locationOptionsData,
    setLocationOptionsData,
    loadOptionsLocation,
    // Clear Dropdown Ref
    selectedOwnerValue,
    selectedLocationValue,
    setSelectedOwnerValue,
    setSelectedLocationValue,
  }
}

export default useAddSubOwner
