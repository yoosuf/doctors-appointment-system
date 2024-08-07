import { useEffect, useState } from 'react'
import commonApi from '@/api/common'
import { ONBOARDING_STEPS } from '@/utils/constant'
import routes from '@/utils/routes'
import Router from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'

export const useLocation = ({ userData }) => {
  const [loading, setLoading] = useState(false)
  const [onBoardingId, setOnBoardingId] = useState()
  const [locationObj, setLocationObj] = useState({})


  const validationSchema = Yup.object({
    selectedLocation: Yup.object().required('Selecting a location is required'),
  })

  const formik = useFormik({
    initialValues: { selectedLocation: locationObj },
    validationSchema: validationSchema,
    onSubmit: async values => {
      await submitData(values)
    },
  })

  const loadOnBoarding = async () => {
    setLoading(true)

    const data = {
      options: {
        populate: [
          {
            path: 'locationIds',
          },
        ],
      },
      pagination: false,
    }

    await commonApi({
      action: 'getPatient',
      data,
    }).then(async ({ DATA = {} }) => {
      const seelctedLocation = DATA.data?.[0].locationIds


      const newArray = seelctedLocation.map(item => {
        const { _id: id, ...rest } = item
        return { id, ...rest }
      })


      setLocationObj(newArray[0])

      formik.setFieldValue('selectedLocation', newArray[0])
    })

    try {
      await commonApi({
        action: 'onBoardingGet',
        parameters: [userData.id],
      }).then(({ DATA }) => {
        if (DATA) {
          setOnBoardingId(DATA.id)
        }
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userData) loadOnBoarding()
  }, [userData])

 

  const submitData = async values => {
    try {
      const data = {
        onboardSteps: ONBOARDING_STEPS.LOCATION,
        totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
        userId: userData.id,
        selectedLocation: values.selectedLocation,
      }

      await commonApi({
        action: 'onboardingUpdate',
        data,
        parameters: [onBoardingId],
      }).then(({ MESSAGE }) => {
        setLoading(true)
        Router.push(routes.onbardSign)
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    formik,
  }
}

export default useLocation
