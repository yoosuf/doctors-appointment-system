import commonApi from '@/api/common'
import { MASTER_CODE, ONBOARDING_STEPS } from '@/utils/constant'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Router from 'next/router'
import routes from '@/utils/routes'
import { isEmpty } from 'lodash'

export const useAggravate = ({ userData }) => {
  const [aggravateList, setAggravateList] = useState([])
  const [aggravates, setAggravates] = useState([])
  const [onBoardingId, setOnBoardingId] = useState()
  const [loading, setLoading] = useState(false)

  const { user } = userData

  const loadOptionAggravates = async () => {
    setLoading(true)
    const data = {
      query: {
        parentCode: MASTER_CODE.AGGRAVATES,
      },
      options: {
        pagination: false,
        select: ['id', 'name'],
      },
    }
    try {
      await commonApi({
        action: 'findMaster',
        data: data,
      }).then(async ({ DATA = [] }) => {
        const fileRefferalData = DATA.data?.map((data = {}) => ({
          value: data.id,
          label: data.name,
        }))
        setAggravateList(fileRefferalData)
        setLoading(false)
      })
    } finally {
      setLoading(false)
    }
  }

  const loadOnBoarding = async () => {
    setLoading(true)
    try {
      await commonApi({
        action: 'onBoardingGet',
        parameters: [user.id],
      }).then(({ DATA }) => {
        if (DATA) {
          setOnBoardingId(DATA.id)
          setAggravates(DATA.aggravates)
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const submitAggravate = async () => {
    if (!aggravates || isEmpty(aggravates)) {
      return toast.error('Please select atleast one aggravates')
    }
    setLoading(true)
    const data = {
      onboardSteps: ONBOARDING_STEPS.AGGRAVATES,
      totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
      userId: user.id,
      aggravates,
    }
    try {
      await commonApi({
        action: 'onboardingUpdate',
        data,
        parameters: [onBoardingId],
      }).then(({ MESSAGE }) => {
        toast.success(MESSAGE)
        Router.push(routes.onbardMedicalHistory)
        setLoading(false)
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => {
    if (e.target.checked) {
      setAggravates(prev => {
        return [...prev, e.target.value]
      })
    } else {
      setAggravates(prev => {
        return prev.filter(item => item !== e.target.value)
      })
    }
  }

  useEffect(() => {
    loadOptionAggravates()
  }, [])

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])

  return {
    loading,
    aggravateList,
    handleChange,
    submitAggravate,
    aggravates,
  }
}

export default useAggravate
