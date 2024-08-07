import { useEffect, useState } from 'react'
import { ONBOARDING_STEPS, APPOINTMENT_CHART_TYPE } from '@/utils/constant'
import toast from 'react-hot-toast'
import Router from 'next/router'
import routes from '@/utils/routes'
import commonApi from '@/api/common'
import { isEmpty } from 'lodash'

export const usePain = ({ userData }) => {
  const [onBoardingId, setOnBoardingId] = useState()
  const [loading, setLoading] = useState(false)
  const [chartTemplateData, setChartTemplateData] = useState()
  const [selectedPoint, setSelectedPoint] = useState([])
  const [chartId, setChartId] = useState()
  const { user } = userData

  const loadOnBoarding = async () => {
    setLoading(true)
    await commonApi({
      action: 'onBoardingGet',
      parameters: [user.id],
    }).then(({ DATA }) => {
      if (DATA) {
        setOnBoardingId(DATA.id)
        setSelectedPoint(DATA.chartData || [])
      }
      setLoading(false)
    })
  }

  const getChartTemplateData = async () => {
    setLoading(true)
    const templateData = {
      query: {
        type: APPOINTMENT_CHART_TYPE.SOAP,
      },
      options: {
        sort: {
          createdAt: -1,
        },
        select: [],
      },
      isCountOnly: false,
    }
    try {
      await commonApi({
        action: 'findChartTemplate',
        data: templateData,
      }).then(async ({ DATA = {} }) => {
        setChartTemplateData(DATA.data?.[0]?.chartData)
        setChartId(DATA?.data?.[0]?.id)
      })
    } finally {
      setLoading(false)
    }
  }

  const onAddPoint = (e, data = {}) => {
    e.preventDefault()
    if (selectedPoint.length === 0) {
      setSelectedPoint(prev => [
        ...prev,
        {
          point: data.point,
          _id: data._id,
        },
      ])
    } else if (
      selectedPoint.length > 0 &&
      selectedPoint.find((p = {}) => p._id === data._id)
    ) {
    } else if (
      selectedPoint.length > 0 &&
      selectedPoint.find((p = {}) => p._id !== data._id)
    ) {
      setSelectedPoint(prev => [
        ...prev,
        {
          point: data.point,
          _id: data._id,
        },
      ])
    }
  }

  const onChangeText = e => {
    setSelectedPoint(prev =>
      prev.map(x => {
        if (x._id === e.target.id) {
          return {
            ...x,
            desc: e.target.value,
          }
        }
        return x
      })
    )
  }

  const onDeletePoint = (e, _id) => {
    e.preventDefault()
    const data = selectedPoint.filter((s = {}) => s._id !== _id)
    setSelectedPoint(data)
  }

  const submitPainChart = async () => {
    if (!selectedPoint || isEmpty(selectedPoint)) {
      return toast.error('Please select pain point and describe pain.')
    }
    if (!isEmpty(selectedPoint)) {
      const point = selectedPoint.map(item => item.desc?.trim() || '')
      if (point.includes('')) {
        return toast.error('Please enter description for every selected point')
      }
    }
    setLoading(true)

    const data = {
      onboardSteps: ONBOARDING_STEPS.PAIN,
      totalOnboardSteps: ONBOARDING_STEPS.TOTALONBOARDSTEPS,
      userId: user.id,
      chartId,
      chartData: selectedPoint,
    }
    try {
      await commonApi({
        action: 'onboardingUpdate',
        data,
        parameters: [onBoardingId],
      }).then(({ MESSAGE }) => {
        toast.success(MESSAGE)
        Router.push(routes.painScale)
        setLoading(false)
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getChartTemplateData()
  }, [])

  useEffect(() => {
    if (user) loadOnBoarding()
  }, [user])

  return {
    loading,
    chartTemplateData,
    onAddPoint,
    selectedPoint,
    onDeletePoint,
    onChangeText,
    submitPainChart,
  }
}

export default usePain
