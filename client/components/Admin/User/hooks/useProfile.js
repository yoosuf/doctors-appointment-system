import commonApi from '@/api/common'
import { MASTER_CODE, REQUIRED_FIELD } from '@/utils/constant'
import { baseUrl } from '@/utils/helper'
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

const useProfile = ({
  id,
  setID = () => { },
  setUserData = () => { },
  setData = () => { },
}) => {


  const [edit, setEdit] = useState(false)

  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(subYears(new Date(), 16))
  const [userID, setUserID] = useState()

  useEffect(() => {
    if (id) {
      getProfileData()
    }
  }, [id])

  

  const getProfileData = async () => {
    const data = {
      query: {},
      options: {
        select: [],
        populate: [
          'profile_image',
          {
            path: 'addressIds',
            populate: [
              {
                path: 'address',
              },
            ],
          },
          { path: 'locationIds', model: 'location' },
          { path: 'roleId', model: 'role', select: 'name code' },
          { path: 'membership._id', model: 'membership' },
          { path: 'membership.categories._id', model: 'category' },
        ],
      },
    };
    setLoading(true)
    try {
      await commonApi({
        parameters: id ? [id] : [],
        action: 'getUser',
        data,
      }).then(async ({ DATA }) => {
        const data = DATA?.data?.[0]

        // const address = data?.addressIds?.[0]?.address

        setUserID(data?.id)

        formik.setValues({
          firstName: data?.firstName,
          lastName: data?.lastName,
          phone: data?.phone,
          // phone2: data?.phones?.[0]?.phone,
          profile_image: data?.profile_image?._id,
          email: data?.email,
          dob: data?.dob,
          // addressLine1: address?.addressLine1,
          // addressLine2: address?.addressLine2,
          // cityId: address?.cityId?._id,
          // provinceId: address?.provinceId?._id,
          // postalCodeId: address?.postalCodeId?._id,
          // prefixId: data?.prefixId?._id,
          genderId: data?.genderId?._id,
          description: data?.description || "",
        })
        // await setStartDate(data?.dob)

        await setImage(baseUrl + data?.profile_image?.uri)

      })
    } finally {
      setLoading(false)
    }
  }


  const onClickSubmit = async values => {
    setLoading(true)
    // try {
    //   const addressData = {
    //     addressLine1: values.addressLine1,
    //     addressLine2: values.addressLine2,
    //     cityId: values.cityId,
    //     provinceId: values.provinceId,
    //     postalCodeId: values.postalCodeId,
    //   }
    //   await commonApi({
    //     action: 'createAddress',
    //     data: addressData,
    //   }).then(async ({ DATA }) => {
    const data = {
      profile_image: values.profile_image,
      email: values.email,
      phone: values.phone,
      // prefixId: values.prefixId,
      firstName: values.firstName,
      lastName: values.lastName,
      genderId: values.genderId,
      description: values.description,
      dob: values.dob,
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
      parameters: userID ? [userID] : [],
      action: 'updateUser',
      data,
    }).then(({ DATA = {}, MESSAGE }) => {
      const firstName = DATA.firstName.substring(0, 1).toUpperCase()
      setID(DATA.id)
      setUserData(DATA)
      setData(prev => ({
        ...prev,
        [firstName]: prev[firstName]?.map((u = {}) => {
          if (u.id === DATA.id) {
            return {
              ...DATA,
            }
          }
          return u
        }),
      }))
      setEdit(false)
      // LocalStorage.setUser(DATA)
      // window.dispatchEvent(
      //   new StorageEvent('storage', {
      //     key: KEYS.user,
      //   })
      // )
      toast.success(MESSAGE)
      setLoading(false)
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
      profile_image: '',
      dob: subYears(new Date(), 16),
      description: undefined,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required(REQUIRED_FIELD),
      phone: Yup.string()
        .min(10, 'Phone number is not valid')
        .required(REQUIRED_FIELD),
      // prefixId: Yup.string().required(REQUIRED_FIELD),
      firstName: Yup.string().required("Please enter first name."),
      lastName: Yup.string().required("Please enter last name."),
      genderId: Yup.string().required("Please select gender."),
      // addressLine1: Yup.string().required(REQUIRED_FIELD),
      // addressLine2: Yup.string().required(REQUIRED_FIELD),
      // cityId: Yup.string().required(REQUIRED_FIELD),
      // provinceId: Yup.string().required(REQUIRED_FIELD),
      // postalCodeId: Yup.string().required(REQUIRED_FIELD),
      // phone2: Yup.string()
      //   .min(10, 'Phone number is not valid')
      //   .required(REQUIRED_FIELD),
      dob: Yup.string().required("Please enter date."),
      profile_image: Yup.string().required('Please select image.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const onClickCancel = () => {
    // formik.resetForm()
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
    onClickCancel,
  }
}

export default useProfile
