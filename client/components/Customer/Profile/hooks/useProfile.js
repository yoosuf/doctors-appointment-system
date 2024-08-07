import commonApi from '@/api/common'
import { KEYS, REQUIRED_FIELD } from '@/utils/constant'
import { baseUrl } from '@/utils/helper'
import { getToken, LocalStorage } from '@/utils/localStorage'
import subYears from 'date-fns/subYears'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import router from 'next/router'
import routes from '@/utils/routes'
import { getUser } from '@/utils/localStorage'
import SnapCrackContext from '@/utils/context'

const allData = {
  query: {
    isDelete: false,
  },
  options: {
    select: [],
  },
}

const useProfile = ({ props }) => {
  const [loading, setLoading] = useState(false)

  const [token, setToken] = useState()

  const [id, setID] = useState()
  const [image, setImage] = useState()
  const [date, setDate] = useState()

  const [locationOptionsData, setLocationOptionsData] = useState([])

  const { profileImage, setProfileImage } = React.useContext(SnapCrackContext)

  const openProfileModal = () => {
    const profileModal = document.getElementById('EditProfileModal')
    profileModal.classList.add('active')
  }


  const closeBtn = () => {
    props?.setProfileActive(false)
    const filterModal = document?.getElementById('EditProfileModal')
    filterModal?.classList?.remove('active')
  }

  useEffect(() => {
    if (props.profileActive) {
      getProfile()

      const token = getToken()
      setToken(token)
      loadOptionsLocation()
    }
  }, [props.profileActive])

  const loadOptionsLocation = async (inputValue, callback) => {
    const data = {
      query: {
        locationName: {
          $regex: inputValue,
        },
      },
      options: {
        select: [],
      },
    }

    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findClientLocation',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const location = DATA.data
      const locData = location?.map((data = {}) => ({
        value: data.id,
        label: data.locationName,
      }))
      setLocationOptionsData(locData)
      callback?.(locData)
    })
  }

  const getProfile = async () => {
    openProfileModal()

    const data = {
      options: {
        populate: [
          {
            path: 'addressIds.address',
          },
          {
            path: 'profile_image',
          },
          {
            path: 'locationIds',
          },
          {
            path: 'roleId',
          },
        ],
      },
    }
    setLoading(true)

    try {
      await commonApi({
        action: 'getPatient',
        data,
      }).then(async ({ DATA = {} }) => {
        const user = DATA.data?.[0]
        setID(user?.id)
        if (user) {
          const address = user?.addressIds?.[0]?.address ?? {};

          const { provinceId, postalCodeId, cityId, addressLine1 } = address;

          const location = user?.locationIds?.[0]

          formik.setFieldValue('profile_image', user.profile_image?._id)
          setImage(baseUrl + user?.profile_image?.uri)

          formik.setFieldValue('email', user?.email)
          formik.setFieldValue('phone', user?.phone)
          formik.setFieldValue('firstName', user?.firstName)
          formik.setFieldValue('lastName', user?.lastName)

          formik.setFieldValue('dob', user?.dob)
          setDate(new Date(user?.dob))

          formik.setFieldValue('genderId', user?.genderId)
          formik.setFieldValue('addressLine1', addressLine1 ?? "")
          formik.setFieldValue('cityId', cityId ?? "")
          formik.setFieldValue('provinceId', provinceId ?? "")
          formik.setFieldValue('postalCodeId', postalCodeId ?? "")
          formik.setFieldValue('locationIds', location?._id)


          if (location) {
            const locationData = {
              label: location?.locationName,
              value: location?._id,
            }
            // setSelectedOptionsData(
            //   locationData,
            //   setLocationValue,
            //   setLocationOptionsData
            // )
          }
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const setSelectedOptionsData = (data, setValue, setOptionsData) => {
    setValue(data)
    // setOptionsData([data])
  }

  const onClickSubmit = async values => {
    const {
      addressLine1,
      provinceId,
      postalCodeId,
      cityId,
      locationIds,
      ...rest
    } = values
    setLoading(true)
    try {
      const addressData = {
        addressLine1,
        provinceId,
        postalCodeId,
        cityId,
      }
      await commonApi({
        action: 'createAddress',
        data: addressData,
      }).then(async ({ DATA = {} }) => {
        const profileData = {
          addressIds: [
            {
              address: DATA?.id,
            },
          ],
          locationIds: [locationIds],
          ...rest,
        }
        await commonApi({
          parameters: [id],
          action: 'updateClient',
          data: profileData,
        }).then(async ({ DATA, MESSAGE }) => {
          const {
            emails,
            phones,
            addressIds,
            locationIds,
            createdBy,
            updatedBy,
            ...user
          } = DATA

          const SEND_DATA = {
            token,
            ...user,
          }

          await props.setUser(DATA)
          await LocalStorage.set('locationId', locationIds[0]?._id)

          await LocalStorage.setUser({
            ...user,
            addressIds,
            emails,
            phones,
            locationIds,
          })
          window.dispatchEvent(
            new StorageEvent('storage', {
              key: KEYS.user,
            })
          )
          await LocalStorage.setToken(token)

          await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(SEND_DATA),
          })

          const locationData = {
            locationIds: true,
          }

          if (props?.location === false) {
            router.push(routes.selectService)
          }

          await fetch('/api/location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(locationData),
          })
          const { profile_image } = getUser()
          setProfileImage(profile_image)
          toast.success(MESSAGE)
          closeBtn()
        })
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      genderId: '',
      addressLine1: '',
      cityId: '',
      provinceId: '',
      postalCodeId: '',
      dob: '',
      profile_image: '',
      locationIds: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Please enter first name.'),
      lastName: Yup.string().required('Please enter last name.'),
      dob: Yup.string().required('Please enter date.'),
      genderId: Yup.string().required('Please select gender.'),
      addressLine1: Yup.string().required('Please enter address.'),
      cityId: Yup.string().required('Please enter city.'),
      provinceId: Yup.string().required('Please enter state.'),
      postalCodeId: Yup.string().required('Please enter postal code.'),
      profile_image: Yup.string().required('Please select profile image.'),
      locationIds: Yup.string().required('Please select location.'),
    }),
    onSubmit: async values => {
      await onClickSubmit(values)
      formik.resetForm(); 
    },
  })

  return {
    loading,
    image,
    setImage,
    formik,
    closeBtn,
    date,
    setDate,
    // Dropdown Value State
    locationOptionsData,
  }
}

export default useProfile
