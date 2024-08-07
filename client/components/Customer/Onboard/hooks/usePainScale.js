import { useEffect, useState } from 'react'
import { ONBOARDING_STEPS } from '@/utils/constant'
import toast from 'react-hot-toast'
import Router from 'next/router'
import routes from '@/utils/routes'
import commonApi from '@/api/common'

export const usePainScale = ({ userData }) => {
  const [onBoardingId, setOnBoardingId] = useState()
  const [loading, setLoading] = useState(false)
  const [painScale, setPainScale] = useState()
  const PAIN_SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const { user } = userData

  const loadOnBoarding = async () => {
    setLoading(true)
    try {
      await commonApi({
        action: 'onBoardingGet',
        parameters: [user.id],
      }).then(({ DATA }) => {
        if (DATA) {
          setOnBoardingId(DATA.id)
          setPainScale(DATA.painScale)
        }
        setLoading(false)
      })
    } finally {
      setLoading(false)
    }
  }

  const submitPainScale = async () => {
    if (!painScale) {
      return toast.error('Please select pain scale')
    }
    setLoading(true)
    const data = {
      onboardSteps: ONBOARDING_STEPS.PAIN_SCALE,
      totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
      userId: user.id,
      painScale,
    }
    await commonApi({
      action: 'onboardingUpdate',
      data,
      parameters: [onBoardingId],
    }).then(({ MESSAGE }) => {
      toast.success(MESSAGE)
      Router.push(routes.discomfort)
      setLoading(false)
    })
    setLoading(false)
  }

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])

  return {
    loading,
    PAIN_SCALE,
    painScale,
    setPainScale,
    submitPainScale,
  }
}

export default usePainScale
