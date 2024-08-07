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

const useAddOwner = ({
  props,
  prefixData,
  genderData,
  getAllMasterData,
  loadOptionsPrefix,
  loadOptionsGender,
  loadOptionsCity,
  loadOptionsState,
  loadOptionsPostal,
  loadOptionsLocation,
  setSelectedPrefixValue,
  setSelectedGenderValue,
  setSelectedCityValue,
  setSelectedStateValue,
  setSelectedPostalValue,
}) => {
  const onClear = () => {
    setSelectedPrefixValue({})
    setSelectedGenderValue({})
    setSelectedCityValue({})
    setSelectedStateValue({})
    setSelectedPostalValue({})
    setSelectedLocationValue([])
  }

  const [checked, setChecked] = useState(false)
  const [active, setActive] = useState(false)
  const [activeEmailNotification, setActiveEmailNotification] = useState(false)
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [passwordEyeIcon, setPasswordEyeIcon] = useState(false)
  const [confirmPasswordEyeIcon, setConfirmPasswordEyeIcon] = useState(false)

  const [selectedLocationValue, setSelectedLocationValue] = useState([])

  const closeBtn = () => {
    props.setActiveOwner(false)
    formik.resetForm()
    onClear()
    setChecked(false)
    setActive(false)
    setActiveEmailNotification(false)
    setImage()
    setPasswordEyeIcon(false)
    setConfirmPasswordEyeIcon(false)
    const openAddOwner = document.getElementById('AddOwnerModal')
    openAddOwner.classList.remove('active')
    const modalBody = document.getElementById('top-div-owner')
    modalBody.scrollTop = 0
    onClear()
  }

  useEffect(() => {
    if (props.activeOwner) {
      loadOptionsLocation()
    }
  }, [props.activeOwner])

  useEffect(() => {
    if (props.activeOwner) {
      loadOptionsPrefix()

      loadOptionsGender()
    }
  }, [prefixData, genderData, props.activeOwner])

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
    try {
      const data = {
        ...profile_image,
        email: values.email,
        phone: values.phone,
        password: values.password,
        generatePassword: checked,
        // prefixId: values.prefixId,
        firstName: values.firstName,
        lastName: values.lastName,
        genderId: values.genderId,
        dob: values.dob,
        isActive: active,
        emailNotifications: activeEmailNotification,
        locationIds: values.locationId,
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
        action: 'addOwner',
        data,
      }).then(async ({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        closeBtn()
      })
      // })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      // prefixId: '',
      firstName: '',
      lastName: '',
      genderId: '',
      // addressLine1: '',
      // addressLine2: '',
      // cityId: '',
      // provinceId: '',
      // postalCodeId: '',
      // phone2: '',
      locationId: [],
      profile_image: '',
      dob: subYears(new Date(), 16),
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
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
            'Contains at least 8 characters, 1 Upper case (A-Z), 1 number (0-9) & one special symbol.'
          )
          .required('Please enter password.'),
      confirm_password:
        !checked &&
        Yup.string()
          .when('password', {
            is: val => !!(val && val.length > 0),
            then: Yup.string().oneOf(
              [Yup.ref('password')],
              'Password does not match.'
            ),
          })
          .required('Please enter confirm password.'),
      // prefixId: Yup.string().required(REQUIRED_FIELD),
      firstName: Yup.string()
        .matches(/^[-_ a-zA-Z]+$/, 'Only alphabets are allowed.')
        .required('Please enter first name.'),
      lastName: Yup.string()
        .matches(/^[-_ a-zA-Z]+$/, 'Only alphabets are allowed.')
        .required('Please enter last name.'),
      genderId: Yup.string().required(REQUIRED_FIELD),
      // addressLine1: Yup.string().required(REQUIRED_FIELD),
      // addressLine2: Yup.string().required(REQUIRED_FIELD),
      // cityId: Yup.string().required(REQUIRED_FIELD),
      // provinceId: Yup.string().required(REQUIRED_FIELD),
      // postalCodeId: Yup.string().required(REQUIRED_FIELD),
      // phone2: Yup.string()
      //   .min(10, 'Phone number is not valid')
      //   .required(REQUIRED_FIELD),
      dob: Yup.date().nullable(REQUIRED_FIELD).required('Please enter date.'),
      // profile_image: Yup.string().required('Please select image.'),
      locationId: Yup.array()
        .min(1, REQUIRED_FIELD)
        .required('Please select location.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
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
    // Clear Dropdown Ref
    selectedLocationValue,
    setSelectedLocationValue,
  }
}

export default useAddOwner
