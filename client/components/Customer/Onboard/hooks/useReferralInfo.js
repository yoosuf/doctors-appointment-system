import commonApi from '@/api/common'
import { ONBOARDING_STEPS, MASTER_CODE } from '@/utils/constant'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import Router from 'next/router'
import routes from '@/utils/routes'
import { isEmpty } from 'lodash'

const useRefferalInfo = ({ userData }) => {
  const [refferalInfo, setRefferalInfo] = useState([])
  const [aboutUs, setAboutUs] = useState([])
  const [loading, setLoading] = useState(false)
  const [onBoardingId, setOnBoardingId] = useState()
  const { user } = userData

  const loadOptionsRefferalCatgory = async () => {
    const data = {
      query: {
        parentCode: MASTER_CODE.REFERRAL,
      },
      options: {
        select: ['id', 'name'],
        pagination: false,
      },
    }

    await commonApi({
      action: 'findMaster',
      data: data,
    }).then(async ({ DATA = [] }) => {
      const fileRefferalData = DATA.data?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))
      setRefferalInfo(fileRefferalData)
    })
  }
  const onClickSubmit = async values => {
    // if (!aboutUs || isEmpty(aboutUs)) {
    //   return toast.error('Please select atleast one media marketing.')
    // }
    const { refferalName } = values
    const data = {
      onboardSteps: ONBOARDING_STEPS.REFERRAL,
      totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
      userId: user.id,
      refferalInformation: {
        refferalName,
        aboutUs,
      },
    }
    setLoading(true)

    await commonApi({
      action: 'onboardingUpdate',
      data,
      parameters: [onBoardingId],
    }).then(({ MESSAGE = '', DATA = {}, STATUS }) => {
      if (STATUS === 'SUCCESS') {
        // commnted the toast as it is reducing the performance
        // toast.success(MESSAGE)
        // setLoading(false)
        // return Router.push(routes.ReasonForVisit)
        return Router.push(routes.onbardMedicalHistory)
      }
    })
  }
  const formik = useFormik({
    initialValues: {
      refferalName: '',
    },
    validationSchema: Yup.object({
      refferalName: Yup.string()
        .trim('Referral name cannot include leading and trailing space.')
        .strict(true)
        .nullable(),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const onClickCancel = () => {
    setEdit(false)
  }

  const handleChange = e => {
    if (e.target.checked) {
      setAboutUs(prev => {
        return [...prev, e.target.value]
      })
    } else {
      setAboutUs(prev => {
        return prev.filter(item => item !== e.target.value)
      })
    }
  }

  const loadOnBoarding = async () => {
    setLoading(true)
    await commonApi({
      action: 'onBoardingGet',
      parameters: [user.id],
    }).then(({ DATA = {} }) => {
      if (DATA) {
        setOnBoardingId(DATA.id)
        setAboutUs(DATA.refferalInformation?.aboutUs)
        formik.setFieldValue(
          'refferalName',
          DATA.refferalInformation.refferalName || ''
        )
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    loadOptionsRefferalCatgory()
  }, [])

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])

  return {
    loading,
    formik,
    refferalInfo,
    onClickCancel,
    handleChange,
    aboutUs,
  }
}

export default useRefferalInfo
