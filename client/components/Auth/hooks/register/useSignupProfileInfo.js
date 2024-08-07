import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { KEYS, REQUIRED_FIELD } from '@/utils/constant'
import commonApi from '@/api/common'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'
import { getTempToken, LocalStorage } from '@/utils/localStorage'

const useSignupProfileInfo = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [id, setID] = useState()

  useEffect(() => {
    const id = localStorage.getItem(KEYS.userId)
    setID(id)
  }, [])

  useEffect(() => {}, [])

  const onClickSubmit = async values => {
    const {
      addressLine1,
      addressLine2,
      provinceId,
      postalCodeId,
      cityId,
      countryId,
      ...rest
    } = values

    const temp = getTempToken()
    setLoading(true)
    try {
      const addressData = {
        addressLine1,
        addressLine2,
        provinceId,
        postalCodeId,
        cityId,
        countryId,
      }

      await commonApi({
        action: 'createAddress',
        data: addressData,
        config: { tempToken: temp },
      }).then(async ({ DATA = {} }) => {
        const profileData = {
          flag: 2,
          addressIds: [
            {
              address: DATA?.id,
            },
          ],
          ...rest,
        }
        await commonApi({
          parameters: [id],
          action: 'updateClient',
          data: profileData,
          config: { tempToken: temp },
        }).then(({ DATA }) => {
          router.push(routes.account.secondStep)
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
      countryId: '',
      dob: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Enter your first name'),
      lastName: Yup.string().required('Enter your last name'),
      genderId: Yup.string().required('What is your gender'),
      dob: Yup.date()
        .max(new Date(), 'Date of Birth cannot be in the future')
        .required('Date of Birth is required'),
      addressLine1: Yup.string().required(`What is your address`),
      cityId: Yup.string().required(`What is your city`),
      provinceId: Yup.string().required(`What is your state`),
      postalCodeId: Yup.string().required(`What is your zipcode`),
      countryId: Yup.string().required('You must select your country'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    loading,
    formik,
  }
}

export default useSignupProfileInfo
