import commonApi from '@/api/common'
import { MASTER_CODE, ONBOARDING_STEPS } from '@/utils/constant'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Router from 'next/router'
import routes from '@/utils/routes'
import { isEmpty } from 'lodash'

export const useDiscomfort = ({ userData }) => {
  const [discomfortList, setDiscomfortList] = useState([])
  const [discomfort, setDiscomfort] = useState([])
  const [onBoardingId, setOnBoardingId] = useState()
  const [loading, setLoading] = useState(false)

  const { user } = userData

  const loadOptionDiscomfort = async () => {
    const data = {
      query: {
        parentCode: MASTER_CODE.DISCOMFORT,
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
      setDiscomfortList(fileRefferalData)
    })
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
          setDiscomfort(DATA.discomfort)
        }
        setLoading(false)
      })
    } finally {
      setLoading(false)
    }
  }

  const submitDiscomfort = async () => {
    if (!discomfort || isEmpty(discomfort)) {
      return toast.error('Please select atleast one discomfort')
    }
    setLoading(true)
    const data = {
      onboardSteps: ONBOARDING_STEPS.DISCOMFIRT,
      totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
      userId: user.id,
      discomfort,
    }
    await commonApi({
      action: 'onboardingUpdate',
      data,
      parameters: [onBoardingId],
    }).then(({ MESSAGE }) => {
      toast.success(MESSAGE)
      Router.push(routes.aggravates)
      setLoading(false)
    })
    setLoading(false)
  }

  const handleChange = e => {
    if (e.target.checked) {
      setDiscomfort(prev => {
        return [...prev, e.target.value]
      })
    } else {
      setDiscomfort(prev => {
        return prev.filter(item => item !== e.target.value)
      })
    }
  }

  useEffect(() => {
    loadOptionDiscomfort()
  }, [])

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])

  return {
    loading,
    discomfortList,
    handleChange,
    submitDiscomfort,
    discomfort,
  }
}

export default useDiscomfort
