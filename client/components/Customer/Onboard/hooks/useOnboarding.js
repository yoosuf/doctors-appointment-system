import { useEffect, useState } from 'react'
import commonApi from '@/api/common'
import { ONBOARDING_STEPS } from '@/utils/constant'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Router from 'next/router'
import routes from '@/utils/routes'
import { isEmpty } from 'lodash'

const useOnboarding = ({ userData }) => {
  const { user } = userData
  const [loading, setLoading] = useState(false)
  const [onBoardingId, setOnBoardingId] = useState()

  const onClickSubmit = async values => {
    const { ft, name, phone, inch, relationToYou, weight } = values
    setLoading(true)

    const data = {
      onboardSteps: ONBOARDING_STEPS.ONBOARDING,
      totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
      userId: user.id,
      height: {
        ft,
        in: inch,
      },
      weight,
      emergencyContact: { name, phone, relationToYou },
    }

    await commonApi({
      action: onBoardingId ? 'onboardingUpdate' : 'onboardingAdd',
      data,
      parameters: [onBoardingId],
    }).then(({ MESSAGE = '', DATA = {}, STATUS }) => {
      if (STATUS === 'SUCCESS') {
        // @todo commented as it is reducing the performance
        // toast.success(MESSAGE)
        // setLoading(false)
        Router.push(routes.onbardReferralInfo)
      }
    })
  }
  //onboarding--data---
  const formik = useFormik({
    initialValues: {
      ft: '',
      inch: '',
      weight: '',
      relationToYou: '',
      name: '',
      phone: '',
    },
    validationSchema: Yup.object({
      ft: Yup.string().required('Please pick your heigh (ft)t.'),
      inch: Yup.string().required('Please pick your height (inch).'),
      weight: Yup.string().required('Please pick your weight (lbs).'),
      relationToYou: Yup.string().required('Please select a relation to you.'),
      name: Yup.string().required('Please enter name.'),
      phone: Yup.string()
        .min(3, 'Phone number is not valid.')
        .max(15, 'Phone number is not valid.')
        .required('Please enter phone.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const loadOnBoarding = async () => {
    setLoading(true)
    await commonApi({
      action: 'onBoardingGet',
      parameters: [user.id],
    }).then(({ DATA }) => {
      if (!isEmpty(DATA)) {

        const { 
          height = { ft: null, in: null }, 
          weight = null, 
          emergencyContact = { name: null, phone: null, relationToYou: null }  
        } = DATA;
  
        setOnBoardingId(DATA.id);
        formik.setFieldValue('weight', weight ?? null);
        formik.setFieldValue('ft', height?.ft ?? null);
        formik.setFieldValue('inch', height?.in ?? null);

        formik.setFieldValue('name', emergencyContact.name)
        formik.setFieldValue('phone', emergencyContact.phone)
        formik.setFieldValue('relationToYou', emergencyContact.relationToYou)
      }
      setLoading(false)
    })
  }

  const onClickCancel = () => {
    getProfileData()
    setEdit(false)
  }

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])

  return {
    loading,
    formik,
    onClickCancel,
  }
}

export default useOnboarding
