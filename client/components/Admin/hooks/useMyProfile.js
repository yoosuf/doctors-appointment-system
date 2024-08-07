import commonApi from '@/api/common'
import { KEYS, MASTER_CODE, REQUIRED_FIELD } from '@/utils/constant'
import { baseUrl } from '@/utils/helper'
import { LocalStorage } from '@/utils/localStorage'
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

const useMyProfile = ({ id }) => {
  const asyncSelectRefPrefix = useRef(null)
  const asyncSelectRefGender = useRef(null)

  const onClear = () => {
    asyncSelectRefPrefix.current.select.select.clearValue()
    asyncSelectRefGender.current.select.select.clearValue()
  }

  const [edit, setEdit] = useState(false)
  const [open, setOpen] = useState(false)

  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(subYears(new Date(), 16))
  const [userID, setUserID] = useState()
  const [prefixOptionsData, setPrefixOptionsData] = useState([])
  const [defaultPrefixValue, setDefaultPrefixValue] = useState({})
  const [genderOptionsData, setGenderOptionsData] = useState([])
  const [defaultGenderValue, setDefaultGenderValue] = useState({})

  useEffect(() => {
    if (id) {
      getProfileData()
      getAllMasterData()
    }
  }, [id])

  const getAllMasterData = async () => {
    const data = {
      query: {
        parentCode: [MASTER_CODE.GENDER, MASTER_CODE.PREFIX],
      },
      options: {
        select: [],
      },
    }
    await commonApi({
      action: 'findMaster',
      data,
    }).then(async ({ DATA }) => {
      const data = DATA?.data
      const prefix = data?.filter(d => d?.parentCode === MASTER_CODE.PREFIX)
      const prefixData = prefix?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      setPrefixOptionsData(prefixData)
      const gender = data?.filter(d => d?.parentCode === MASTER_CODE.GENDER)
      const genderData = gender?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      setGenderOptionsData(genderData)
    })
  }

  const getProfileData = async () => {
    const data = {
      query: {},
      options: {
        select: [],
        populate: [
          'prefixId',
          'genderId',
          'profile_image',
          {
            path: 'addressIds',
            populate: [
              {
                path: 'address',
              },
            ],
          },
        ],
      },
    }
    setLoading(true)
    try {
      await commonApi({
        parameters: id ? [id] : [],
        action: 'getUser',
        data,
      }).then(async ({ DATA }) => {
        const data = DATA?.data?.[0]

        const address = data?.addressIds?.[0]?.address

        setUserID(data?.id)

        formik.setValues({
          firstName: data?.firstName,
          lastName: data?.lastName,
          phone: data?.phone,
          phone2: data?.phones?.[0]?.phone,
          profile_image: data?.profile_image?._id,
          email: data?.email,
          dob: data?.dob,
          addressLine1: address?.addressLine1,
          addressLine2: address?.addressLine2,
          cityId: address?.cityNm,
          provinceId: address?.provinceNm,
          postalCodeId: address?.postalCodeNm,
          prefixId: data?.prefixId?._id,
          genderId: data?.genderId?._id,
          description: data?.description,
        })
        // await setStartDate(data?.dob)

        await setImage(data?.profile_image?.uri ? baseUrl + data?.profile_image?.uri : '/images/sidebar/sidebar-logo.svg')


        await setDefaultPrefixValue({
          label: data?.prefixId?.name,
          value: data?.prefixId?._id,
        })

        await setDefaultGenderValue({
          label: data?.genderId?.name,
          value: data?.genderId?._id,
        })
      })
    } finally {
      setLoading(false)
    }
  }

  const loadOptionsPrefix = async (inputValue, callback) => {
    const data = {
      query: {
        parentCode: [MASTER_CODE.PREFIX],
      },
      options: {
        select: [],
      },
    }

    if (inputValue) {
      data.query.$or = [
        {
          name: {
            $regex: inputValue,
            $options: 'i',
          },
          code: {
            $regex: inputValue,
            $options: 'i',
          },
        },
      ]

      data.query.$and = [
        {
          name: {
            $regex: inputValue,
            $options: 'i',
          },
          code: {
            $regex: inputValue,
            $options: 'i',
          },
        },
      ]
    } else {
      delete data.query.$and
      delete data.query.$or
    }

    await commonApi({
      action: 'findMaster',
      data,
    }).then(({ DATA }) => {
      const prefix = DATA?.data
      const prefixData = prefix?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      setPrefixOptionsData(prefixData)
      callback?.(prefixData)
    })
  }

  const loadOptionsGender = async (inputValue, callback) => {
    const data = {
      query: {
        parentCode: [MASTER_CODE.GENDER],
      },
      options: {
        select: [],
      },
    }

    if (inputValue) {
      data.query.$or = [
        {
          name: {
            $regex: inputValue,
            $options: 'i',
          },
          code: {
            $regex: inputValue,
            $options: 'i',
          },
        },
      ]

      data.query.$and = [
        {
          name: {
            $regex: inputValue,
            $options: 'i',
          },
          code: {
            $regex: inputValue,
            $options: 'i',
          },
        },
      ]
    } else {
      delete data.query.$and
      delete data.query.$or
    }

    await commonApi({
      action: 'findMaster',
      data,
    }).then(({ DATA }) => {
      const gender = DATA?.data
      const genderData = gender?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      setGenderOptionsData(genderData)
      callback?.(genderData)
    })
  }

  // City, State and Postal Dropdown API Function
  const onClickSubmit = async values => {
    setLoading(true)
    try {
      const addressData = {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        cityId: values.cityId,
        provinceId: values.provinceId,
        postalCodeId: values.postalCodeId,
      }
      await commonApi({
        action: 'createAddress',
        data: addressData,
      }).then(async ({ DATA }) => {
        const data = {
          profile_image: values.profile_image,
          email: values.email,
          phone: values.phone,
          prefixId: values.prefixId,
          firstName: values.firstName,
          lastName: values.lastName,
          genderId: values.genderId,
          description: values.description,
          dob: values.dob,
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
          parameters: userID ? [userID] : [],
          action: 'updateUser',
          data,
        }).then(({ DATA = {}, MESSAGE }) => {
          LocalStorage.setUser(DATA)
          window.dispatchEvent(
            new StorageEvent('storage', {
              key: KEYS.user,
            })
          )
          setEdit(false)
          toast.success(MESSAGE)
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
      prefixId: '',
      firstName: '',
      lastName: '',
      genderId: '',
      addressLine1: '',
      addressLine2: '',
      cityId: '',
      provinceId: '',
      postalCodeId: '',
      phone2: '',
      profile_image: '',
      dob: subYears(new Date(), 16),
      description: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required("Please enter email."),
      phone: Yup.string()
        .min(10, 'Phone number is not valid')
        .required("Please enter phone number."),
      prefixId: Yup.string().required("Please select prefix."),
      firstName: Yup.string().required("Please enter first name."),
      lastName: Yup.string().required("Please enter last name."),
      genderId: Yup.string().required("Please select gender."),
      addressLine1: Yup.string().required("Please select address."),
      // addressLine2: Yup.string().required(REQUIRED_FIELD),
      cityId: Yup.string().required("Please enter city."),
      provinceId: Yup.string().required("Please enter province."),
      postalCodeId: Yup.string().required("Please enter postal code."),
      // phone2: Yup.string()
      //   .min(10, 'Phone number is not valid')
      //   .required(REQUIRED_FIELD),
      dob: Yup.string().required("Please enter date."),
      // profile_image: Yup.string().required('Please select image.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const onClickCancel = () => {
    // setDefaultPrefixValue({})
    // setDefaultGenderValue({})
    formik.resetForm()
    // setImage()
    getProfileData()
    setEdit(false)
  }

  return {
    edit,
    setEdit,
    loading,
    startDate,
    setStartDate,
    formik,
    image,
    setImage,
    // Prefix Dropdown State
    prefixOptionsData,
    loadOptionsPrefix,
    defaultPrefixValue,
    setDefaultPrefixValue,
    // Gender Dropdown State
    genderOptionsData,
    loadOptionsGender,
    defaultGenderValue,
    setDefaultGenderValue,
    // Clear Dropdown Ref
    asyncSelectRefPrefix,
    asyncSelectRefGender,
    onClickCancel,
    open, setOpen
  }
}

export default useMyProfile
