import commonApi from '@/api/common'
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED_FIELD,
} from '@/utils/constant'
import { getProfileImage } from '@/utils/helper'
import { subYears } from 'date-fns'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
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

const useAddChrio = ({
  props,
  prefixData,
  genderData,
  loadOptionsPrefix,
  loadOptionsGender,
  setSelectedPrefixValue,
  setSelectedGenderValue,
  setSelectedCityValue,
  setSelectedStateValue,
  setSelectedPostalValue,
}) => {
  const asyncSelectStaff = useRef(null)
  const asyncSelectRefSubOwner = useRef(null)
  const asyncSelectRefPrefix = useRef(null)
  const asyncSelectRefGender = useRef(null)
  const asyncSelectRefCity = useRef(null)
  const asyncSelectRefState = useRef(null)
  const asyncSelectRefPostal = useRef(null)
  const asyncSelectRefDiscipline = useRef(null)
  const asyncSelectRefLocation = useRef(null)

  const [selectedSubOwnerValue, setSelectedSubOwnerValue] = useState({})
  const [selectedLocationValue, setSelectedLocationValue] = useState({})
  const [selectedStaffValue, setSelectedStaffValue] = useState({})
  const [selectedDisciplineValue, setSelectedDisciplineValue] = useState([])

  const onClear = () => {
    setSelectedPrefixValue({})
    setSelectedGenderValue({})
    setSelectedCityValue({})
    setSelectedStateValue({})
    setSelectedPostalValue({})
    setSelectedSubOwnerValue({})
    setSelectedLocationValue({})
    setSelectedStaffValue({})
    setSelectedDisciplineValue([])
  }

  const [checked, setChecked] = useState(false)
  const [active, setActive] = useState(false)
  const [activeEmailNotification, setActiveEmailNotification] = useState(false)
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [passwordEyeIcon, setPasswordEyeIcon] = useState(false)
  const [confirmPasswordEyeIcon, setConfirmPasswordEyeIcon] = useState(false)
  const [subOwnerOptionsData, setSubOwnerOptionsData] = useState([])
  const [staffOptionsData, setStaffOptionsData] = useState([
    { value: 'Staff', label: 'Staff' },
    { value: 'Chiropractor', label: 'Chiropractor' },
  ])
  const [disciplineOptionsData, setDisciplineOptionsData] = useState([])
  const [disciplineData, setDisciplineData] = useState()
  const [locationOptionsData, setLocationOptionsData] = useState([])
  const [subOwnerId, setSubOwnerId] = useState()
  const [isActiveChrio, setIsActiveChrio] = useState(false)

  const closeBtn = () => {
    props.setActiveChrio(false)
    const openAddChrio = document.getElementById('AddChrioModal')
    openAddChrio.classList.remove('active')
    formik.resetForm()
    const modalBody = document.getElementById('top-div-chiro')
    modalBody.scrollTop = 0
    onClear()
    setActive(false)
    setActiveEmailNotification(false)
    setImage()
    setPasswordEyeIcon(false)
    setSubOwnerOptionsData([])
    setStaffOptionsData([
      { value: 'Staff', label: 'Staff' },
      { value: 'Chiropractor', label: 'Chiropractor' },
    ])
    setDisciplineOptionsData([])
    setDisciplineData()
    setLocationOptionsData([])
    setSubOwnerId()
    setIsActiveChrio(false)
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
        sort: {
          createdAt: -1,
        },
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
    if (props.activeChrio) {
      loadOptionsSubOwner()
    }
  }, [props.activeChrio])

  const loadOptionsDiscipline = async (inputValue, callback) => {
    const data = {
      query: {
        parentId: disciplineData,
      },
      options: {
        select: [],
      },
    }

    await commonApi({
      action: 'findMaster',
      data: data,
    }).then(({ DATA = {} }) => {
      const discipline = DATA.data
      const disciplineData = discipline?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))
      setDisciplineOptionsData(disciplineData)
      callback?.(disciplineData)
    })
  }

  useEffect(() => {
    if (isActiveChrio && props.activeChrio) {
      loadOptionsDiscipline()
    }
  }, [isActiveChrio, props.activeChrio])

  useEffect(() => {
    if (props.activeChrio) {
      loadOptionsPrefix()
      loadOptionsGender()
    }
  }, [prefixData, genderData, props.activeChrio])

  useEffect(() => {
    if (subOwnerId) {
      loadOptionsLocation()
    }
  }, [subOwnerId])

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
      locationIds: values.locationIds ? values.locationIds : undefined,
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
      emailNotifications: activeEmailNotification,
      disciplineIds: values.disciplineIds,
      licenseNumber: values.licenseNumber,
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
      action: 'addChiro',
      data,
    }).then(async ({ DATA, MESSAGE }) => {
      toast.success(MESSAGE)
      setLoading(false)
      closeBtn()
    })
    // })
    // } finally {
    //setLoading(false)
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
      disciplineIds: [],
      licenseNumber: '',
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
          .required('Confirm Please enter password.'),
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
      // locationIds: Yup.string().required(REQUIRED_FIELD),
      // phone2: Yup.string()
      //   .min(10, 'Phone number is not valid')
      //   .required(REQUIRED_FIELD),
      dob: Yup.date().nullable(REQUIRED_FIELD).required('Please select date.'),
      // profile_image: Yup.string().required('Please select image.'),
      staff: Yup.string().required('Please select staff.'),
      disciplineIds: isActiveChrio && Yup.array().required(REQUIRED_FIELD),
      licenseNumber: isActiveChrio && Yup.string().required(REQUIRED_FIELD),
    }),
    onSubmit: values => {
      onClickSubmit(values)
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
    // Discipline Dropdown State
    disciplineOptionsData,
    setDisciplineOptionsData,
    loadOptionsDiscipline,
    // Location Dropdown State
    locationOptionsData,
    loadOptionsLocation,
    setLocationOptionsData,
    // Clear Dropdown Ref
    selectedSubOwnerValue,
    selectedStaffValue,
    selectedLocationValue,
    selectedDisciplineValue,
    setSelectedSubOwnerValue,
    setSelectedLocationValue,
    setSelectedStaffValue,
    setSelectedDisciplineValue,
    // Active Chrio State
    isActiveChrio,
    setIsActiveChrio,
    onClear,
  }
}

export default useAddChrio
