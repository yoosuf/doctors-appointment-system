import commonApi from '@/api/common'
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  REQUIRED_FIELD,
  USER_ROLE_TYPE,
} from '@/utils/constant'
import { getProfileImage } from '@/utils/helper'
import { getUser } from '@/utils/localStorage'
import { subDays } from 'date-fns'
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

const useAddCustomer = ({
  props,
  prefixData,
  genderData,
  getAllMasterData,
  loadOptionsPrefix,
  loadOptionsGender,
  loadOptionsMembership,
  loadOptionsCity,
  loadOptionsState,
  loadOptionsPostal,
  setSelectedPrefixValue,
  setSelectedGenderValue,
  setSelectedCityValue,
  setSelectedStateValue,
  selectedMembershipValue,
  setSelectedMembershipValue,
  setSelectedPostalValue,
}) => {
  const [selectedSubOwnerValue, setSelectedSubOwnerValue] = useState({})
  const [checked, setChecked] = useState(false)
  const [active, setActive] = useState(false)
  const [activeEmailNotification, setActiveEmailNotification] = useState(false)
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [passwordEyeIcon, setPasswordEyeIcon] = useState(false)
  const [confirmPasswordEyeIcon, setConfirmPasswordEyeIcon] = useState(false)
  const [subOwnerOptionsData, setSubOwnerOptionsData] = useState([])
  const [role, setRole] = useState()
  const [parentId, setParentId] = useState()

  const onClear = () => {
    setSelectedSubOwnerValue({})
    setSelectedPrefixValue({})
    setSelectedGenderValue({})
    // setSelectedCityValue({})
    // setSelectedStateValue({})
    // setSelectedPostalValue({})
  }

  const closeBtn = () => {
    props.setActiveCustomer(false)
    const openAddCustomer = document.getElementById('AddCustomerModal')
    if (openAddCustomer) {
      openAddCustomer.classList.remove('active')
    }
    const openAddCustomer2 = document.getElementById('AddCustomerModal2')
    if (openAddCustomer2) {
      openAddCustomer2.classList.remove('active')
    }
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
    if (props.activeCustomer) {
      getAllMasterData()

      const { parentId, roleId = {} } = getUser()

      setParentId(parentId)
      setRole(roleId.code)
    }
  }, [props.activeCustomer])

  useEffect(() => {
    if (role && parentId && props.activeCustomer) {
      loadOptionsSubOwner()
    }
  }, [role, parentId, props.activeCustomer])

  useEffect(() => {
    if (props.activeCustomer) {
      // loadOptionsPrefix()
      loadOptionsMembership()

      loadOptionsGender()
    }
  }, [prefixData, genderData, props.activeCustomer])

  const onClickSubmit = async values => {
    setLoading(true)
    const profile_image = getProfileImage(values)
    const data = {
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      cityId: values.cityId,
      provinceId: values.provinceId,
      postalCodeId: values.postalCodeId,
    }
    try {
      await commonApi({
        action: 'createAddress',
        data,
      }).then(async ({ DATA }) => {
        const data = {
          ...profile_image,
          isInvited: true, 
          email: values.email,
          phone: values.phone,
          password: values.password,
          generatePassword: checked,
          parentId: values.parentId,
          firstName: values.firstName,
          lastName: values.lastName,
          genderId: values.genderId,
          dob: values.dob,
          isActive: active,
          emailNotifications: activeEmailNotification,
          purchasedPlans: { membershipId: selectedMembershipValue?.value },
          addressIds: [
            {
              address: DATA?.id,
              isDefault: true,
            },
          ],
          phones: [
            {
              phone: values.phone2,
            },
          ],
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
          action: 'addCustomer',
          data,
        }).then(async ({ DATA, MESSAGE }) => {
          toast.success(MESSAGE)
          formik.resetForm()

          setImage()
          setChecked(false)
          setActive(false)
          setActiveEmailNotification(false)

          onClear()

          closeBtn()
        })
      })
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
      parentId: '',
      firstName: '',
      lastName: '',
      genderId: '',
      addressLine1: '',
      addressLine2: '',
      cityId: '',
      provinceId: '',
      postalCodeId: '',
      phone2: '',
      assignedLocations: [],
      profile_image: '',
      dob: subDays(new Date(), 1),
      membershipId: '',
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
      parentId: Yup.string().required('Please select sub owner.'),
      firstName: Yup.string()
        .matches(/^[-_ a-zA-Z]+$/, 'Only alphabets are allowed')
        .required('Please enter first name.'),
      lastName: Yup.string()
        .matches(/^[-_ a-zA-Z]+$/, 'Only alphabets are allowed')
        .required('Please enter last name.'),
      genderId: Yup.string().required('Please select gender.'),
      addressLine1: Yup.string().required('Please select address.'),
      // addressLine2: Yup.string().required(REQUIRED_FIELD),
      cityId: Yup.string().required('Please enter city.'),
      provinceId: Yup.string().required('Please enter province.'),
      postalCodeId: Yup.string().required('Please enter postal code.'),
      // phone2: Yup.string()
      //   .min(10, 'Phone number is not valid')
      //   .required(REQUIRED_FIELD),
      dob: Yup.date().nullable(REQUIRED_FIELD).required('Please enter date.'),
      profile_image: Yup.string().required('Please select image.'),
      membershipId: Yup.string().required('Please select membership.'),
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
    // Sub Owner Dropdown State
    subOwnerOptionsData,
    loadOptionsSubOwner,
    setSubOwnerOptionsData,
    // Clear Dropdown Ref
    selectedSubOwnerValue,
    setSelectedSubOwnerValue,
  }
}

export default useAddCustomer
