import commonApi from '@/api/common'
import { MASTER_CODE, REQUIRED_FIELD } from '@/utils/constant'
import { baseUrl } from '@/utils/helper'
import { subYears } from 'date-fns'
import { useFormik } from 'formik'
import { capitalize } from 'lodash'
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

const useProfile = ({
  id,
  setUserData: setUser,
  customerData,
  setCustomerData,
  setID,
}) => {
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(subYears(new Date(), 16))
  const [userID, setUserID] = useState()
  const [userData, setUserData] = useState({})
  const [editData, setEditData] = useState(false)
  const [onBoardingDetail, setOnBoardingDetail] = useState({})
  const [onBoardingAnswer, setOnBoardingAnswer] = useState([])

  
  const getProfileData = async dataId => {
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
        setUserData(data)

        // setUser(data)
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
          countryId: capitalize(address?.countryId?.name),
          postalCodeId: address?.postalCodeNm,
          genderId: data?.genderId,
          description: data?.description,
        })
        setStartDate(data?.dob ? new Date(data?.dob) : undefined)
        setImage(baseUrl + data?.profile_image?.uri)

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
        countryId: values.countryId,
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
          action: 'updateAdminPatient',
          data,
        }).then(({ DATA = {}, MESSAGE }) => {
          const firstName = DATA.firstName.substring(0, 1).toUpperCase()
          // setUser(DATA)
          getProfileData(DATA.id)
          setID(DATA.id)
          setCustomerData(prev => ({
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
          onClickCancel()
          // LocalStorage.setUser(DATA)
          // window.dispatchEvent(
          //   new StorageEvent('storage', {
          //     key: KEYS.user,
          //   })
          // )
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
      countryId: '',
      postalCodeId: '',
      phone2: '',
      profile_image: '',
      dob: subYears(new Date(), 16),
      description: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter email.'),
      phone: Yup.string()
        .min(5, 'Number should be greater than 5 and less than 15')
        .max(15, 'Number should be greater than 5 and less than 15')
        .required('Please enter phone number.'),
      prefixId: Yup.string().required('Please select prefix.'),
      firstName: Yup.string().required('Please enter first name.'),
      lastName: Yup.string().required('Please enter last name.'),
      genderId: Yup.string().required('Please select gender.'),
      addressLine1: Yup.string().required('Please enter address.'),
      // addressLine2: Yup.string().required(REQUIRED_FIELD),
      cityId: Yup.string().required('Please enter city.'),
      provinceId: Yup.string().required('Please enter province.'),
      countryId: Yup.string().required('Please select country.'),
      postalCodeId: Yup.string().required('Please enter postal code.'),
      // phone2: Yup.string()
      //   .min(10, 'Phone number is not valid')
      //   .required(REQUIRED_FIELD),
      dob: Yup.string().required('Please enter date.'),
      profile_image: Yup.string().required('Please select image.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const onClickCancel = () => {
    getProfileData()
    setEditData(false)
  }

  const getOnBoardingData = async () => {
    await commonApi({ action: 'onBoardingUserDetail', parameters: [id] }).then(
      ({ DATA = {} }) => {
        setOnBoardingDetail(DATA)
      }
    )
  }

  const getOnBoardingAnswer = async () => {
    const data = {
      options: {
        pagination: false,
        populate: [
          {
            path: 'quesId',
            select: 'title options',
          },
        ],
      },
      query: {
        userId: id,
        isActive: true,
      },
    }
    await commonApi({
      action: 'onBoardingUserAnswer',
      data,
    }).then(({ DATA = {} }) => {
      
      const answer = DATA.data?.map((item = {}) => {
        const answerById = item.quesId?.options?.find(
          data => data._id === item.ansIds?.[0]
        )
        return {
          ans: item.ans,
          ansType: item.ansType,
          ansById: answerById?.desc,
          quesTitle: item.quesId?.title,
        }
      })
      setOnBoardingAnswer(answer)
    })
  }

  useEffect(() => {
    if (id) {
      getProfileData()
      // loadOptionsGender()
      // getAllMasterData()
      getOnBoardingData()
      getOnBoardingAnswer()
    }
  }, [id])

  return {
    loading,
    startDate,
    setStartDate,
    formik,
    image,
    setImage,
    onClickCancel,
    userData,
    editData,
    setEditData,
    onBoardingDetail,
    onBoardingAnswer,
  }
}

export default useProfile
