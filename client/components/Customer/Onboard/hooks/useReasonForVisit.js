import commonApi from '@/api/common'
import { MASTER_CODE, ONBOARDING_STEPS } from '@/utils/constant'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import Router from 'next/router'
import moment from 'moment'
import routes from '@/utils/routes'

export const useReasonForVisit = ({ userData }) => {
  const [visitReason, setVisitReason] = useState([])
  const [reasonList, setReasonList] = useState([])
  const [approxDate, setApproxDate] = useState(new Date())
  const [onBoardingId, setOnBoardingId] = useState()
  const [loading, setLoading] = useState(false)

  const { user } = userData

  const loadOptionsVisitReason = async () => {
    const data = {
      query: {
        parentCode: MASTER_CODE.VISIT_REASON,
      },
      options: {
        pagination: false,
        select: ['id', 'name'],
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
      setReasonList(fileRefferalData)
    })
  }

  const onSubmit = async values => {
    setLoading(true)
    const data = {
      onboardSteps: ONBOARDING_STEPS.VISIT_REASON,
      totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
      userId: user.id,
      approxDate: moment(values.approxDate).format('yyyy-MM-DD'),
      visitReason,
    }
    await commonApi({
      action: 'onboardingUpdate',
      data,
      parameters: [onBoardingId],
    }).then(({ MESSAGE }) => {
      toast.success(MESSAGE)
      // Router.push(routes.pain)
      Router.push(routes.onbardMedicalHistory)
      setLoading(false)
    })
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      approxDate: new Date(),
    },
    validationSchema: Yup.object({
      approxDate: Yup.object().nullable('Please enter name.'),
    }),
    onSubmit: values => {
      onSubmit(values)
    },
  })

  const handleChange = e => {
    if (e.target.checked) {
      setVisitReason(prev => {
        return [...prev, e.target.value]
      })
    } else {
      setVisitReason(prev => {
        return prev.filter(item => item !== e.target.value)
      })
    }
  }
  const onChangeApproxDate = date => {
    setApproxDate(date)
    formik.setFieldValue('approxDate', date)
  }

  const loadOnBoarding = async () => {
    await commonApi({
      action: 'onBoardingGet',
      parameters: [user.id],
    }).then(({ DATA }) => {
      if (DATA) {
        setOnBoardingId(DATA.id)
        setVisitReason(DATA.visitReason)
        DATA.approxDate && setApproxDate(new Date(DATA.approxDate))
        formik.setFieldValue('approxDate', DATA.approxDate)
      }
    })
  }

  useEffect(() => {
    loadOptionsVisitReason()
  }, [])

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])

  return {
    loading,
    formik,
    reasonList,
    handleChange,
    approxDate,
    onChangeApproxDate,
    onSubmit,
    visitReason,
  }
}

export default useReasonForVisit
