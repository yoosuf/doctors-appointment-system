import React, { useState, useEffect, useRef } from 'react'
import commonApi from '@/api/common'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getRole } from '@/utils/helper'
import { APPOINTMENT_CHART_TYPE, CHART_VIEWABLE, links } from '@/utils/constant'
import toast from 'react-hot-toast'
import useNurseAPI from './useNurseApi'

const useNurseDailyIntake = ({
  appointmentDetail,
  listAllChart,
  editData,
  chartId,
  selectChartData,
  previousInjection,
  previousInjectionMl,
  medicationAllergy,
  foodAllergy,
  otherAllergy,
}) => {
  const viewableOptions = [
    { label: 'Viewable By Chiro', value: CHART_VIEWABLE.CHIRO },
    { label: 'Viewable By Everyone', value: CHART_VIEWABLE.EVERYONE },
  ]

  const asyncSelectRefViewable = useRef(null)
  const [chartTemplateData, setChartTemplateData] = useState([])
  const [painLevel, setPainLevel] = useState()
  const [injectionLevel, setInjectionLevel] = useState()
  const [injectionName, setInjectionName] = useState()
  const [injected, setInjected] = useState()
  const [chartCsValue, setChartCsValue] = useState({
    labelId: '',
    optionIds: [],
  })
  const [chartTsValue, setChartTsValue] = useState({
    labelId: '',
    optionIds: [],
  })
  const [chartLsValue, setChartLsValue] = useState({
    labelId: '',
    optionIds: [],
  })
  const [chartSLValue, setChartSLValue] = useState({
    labelId: '',
    optionIds: [],
  })
  const [chartShoulderValue, setChartShoulderValue] = useState({
    labelId: '',
    optionIds: [],
  })
  const [chartWristValue, setChartWristValue] = useState({
    labelId: '',
    optionIds: [],
  })
  const [chartAnklesValue, setChartAnklesValue] = useState({
    labelId: '',
    optionIds: [],
  })
  const [textareaValue, setTextAreaValue] = useState('')
  const [strValue, setStrValue] = useState()
  const [notVisiblePatient, setNotVisiblePatient] = useState(false)
  const [loading, setLoading] = useState(false)
  const [templateId, setTemplateId] = useState('')

  useEffect(() => {
    if (editData) {
      const chartModal = document.getElementById('activityModal')
      chartModal.classList.add('active')
      formik.setFieldValue('notes', editData?.desc)
      setNotVisiblePatient(editData.patientVisible)
      setInjectionLevel(editData?.chartData[0])
    }
  }, [editData])

  useEffect(() => {
    updateDailyIntakeChart()
  }, [])

  const closeBtn = () => {
    const chartModal = document.getElementById('activityModal')
    chartModal.classList.remove('active')
    setPainLevel()
    setChartCsValue({ labelId: '', optionIds: [] })
    setChartTsValue({ labelId: '', optionIds: [] })
    setChartLsValue({ labelId: '', optionIds: [] })
    setChartSLValue({ labelId: '', optionIds: [] })
    setChartShoulderValue({ labelId: '', optionIds: [] })
    setChartWristValue({ labelId: '', optionIds: [] })
    setChartAnklesValue({ labelId: '', optionIds: [] })
    setNotVisiblePatient(false)
    setTextAreaValue('')
    setStrValue()
    asyncSelectRefViewable.current.select.select.clearValue()
    formik.resetForm()
  }

  const { formik } = useNurseAPI({
    appointmentDetail,
    listAllChart,
    editData,
    chartId,
    selectChartData,
    previousInjection,
    previousInjectionMl,
    medicationAllergy,
    foodAllergy,
    otherAllergy,
    templateId,
    painLevel,
    chartCsValue,
    chartTsValue,
    chartLsValue,
    chartSLValue,
    chartShoulderValue,
    chartWristValue,
    chartAnklesValue,
    notVisiblePatient,
    closeBtn,
    injectionLevel,
    injectionName,
    injected,
  })

  const updateDailyIntakeChart = async () => {
    setLoading(true)
    const templateData = {
      query: {
        type: APPOINTMENT_CHART_TYPE.DAILY_INTAKE_NURSE,
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
        setChartTemplateData(DATA?.data?.[0]?.chartData)
        setTemplateId(DATA?.data?.[0]?.id)
      })
    } finally {
      setLoading(false)
    }
  }

  const onClickPainLevel = (e, labelId, optionId, name) => {
    e.preventDefault()
    setPainLevel({ labelId, optionIds: [optionId] })
    setStrValue({ ...strValue, painLevel: name })
    setInjectionLevel({ labelId, optionIds: [optionId] })
    setInjectionName({ ...strValue, painLevel: name })
  }

  const onClickCSProblem = async (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartCsValue?.optionIds?.length) {
      setChartCsValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, cervicialSpine: [name] })
    } else {
      if (!chartCsValue?.optionIds.includes(optionId)) {
        setChartCsValue({
          labelId: labelId,
          optionIds: chartCsValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          cervicialSpine: [...strValue?.cervicialSpine, name],
        })
      } else {
        setChartCsValue({
          labelId: labelId,
          optionIds: chartCsValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          cervicialSpine: strValue.cervicialSpine.filter(x => x !== name),
        })
      }
    }
  }

  const onClickTSProblem = async (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartTsValue?.optionIds?.length) {
      setChartTsValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, thoracicSpine: [name] })
    } else {
      if (!chartTsValue?.optionIds.includes(optionId)) {
        setChartTsValue({
          labelId: labelId,
          optionIds: chartTsValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          thoracicSpine: [...strValue?.thoracicSpine, name],
        })
      } else {
        setChartTsValue({
          labelId: labelId,
          optionIds: chartTsValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          thoracicSpine: strValue.thoracicSpine.filter(x => x !== name),
        })
      }
    }
  }

  const onClickLSProblem = async (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartLsValue?.optionIds?.length) {
      setChartLsValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, lumbarSpine: [name] })
    } else {
      if (!chartLsValue?.optionIds.includes(optionId)) {
        setChartLsValue({
          labelId: labelId,
          optionIds: chartLsValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          lumbarSpine: [...strValue?.lumbarSpine, name],
        })
      } else {
        setChartLsValue({
          labelId: labelId,
          optionIds: chartLsValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          lumbarSpine: strValue.lumbarSpine.filter(x => x !== name),
        })
      }
    }
  }

  const onClickSLProblem = (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartSLValue?.optionIds?.length) {
      setChartSLValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, sacroiliacSide: [name] })
    } else {
      if (!chartSLValue?.optionIds.includes(optionId)) {
        setChartSLValue({
          labelId: labelId,
          optionIds: chartSLValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          sacroiliacSide: [...strValue?.sacroiliacSide, name],
        })
      } else {
        setChartSLValue({
          labelId: labelId,
          optionIds: chartSLValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          sacroiliacSide: strValue.sacroiliacSide.filter(x => x !== name),
        })
      }
    }
  }

  const onClickShoulderProblem = (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartShoulderValue?.optionIds?.length) {
      setChartShoulderValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, shoulderSide: [name] })
    } else {
      if (!chartShoulderValue?.optionIds.includes(optionId)) {
        setChartShoulderValue({
          labelId: labelId,
          optionIds: chartShoulderValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          shoulderSide: [...strValue?.shoulderSide, name],
        })
      } else {
        setChartShoulderValue({
          labelId: labelId,
          optionIds: chartShoulderValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          shoulderSide: strValue.shoulderSide.filter(x => x !== name),
        })
      }
    }
  }

  const onClickWristProblem = (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartWristValue?.optionIds?.length) {
      setChartWristValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, wristSide: [name] })
    } else {
      if (!chartWristValue?.optionIds.includes(optionId)) {
        setChartWristValue({
          labelId: labelId,
          optionIds: chartWristValue?.optionIds?.concat(optionId),
        })
        setStrValue({ ...strValue, wristSide: [...strValue?.wristSide, name] })
      } else {
        setChartWristValue({
          labelId: labelId,
          optionIds: chartWristValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          wristSide: strValue.wristSide.filter(x => x !== name),
        })
      }
    }
  }

  const onClickAnklesProblem = (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartAnklesValue?.optionIds?.length) {
      setChartAnklesValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, anklesSide: [name] })
    } else {
      if (!chartAnklesValue?.optionIds.includes(optionId)) {
        setChartAnklesValue({
          labelId: labelId,
          optionIds: chartAnklesValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          anklesSide: [...strValue?.anklesSide, name],
        })
      } else {
        setChartAnklesValue({
          labelId: labelId,
          optionIds: chartAnklesValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          anklesSide: strValue.anklesSide.filter(x => x !== name),
        })
      }
    }
  }

  return {
    updateDailyIntakeChart,
    closeBtn,
    onClickPainLevel,
    onClickCSProblem,
    onClickTSProblem,
    onClickLSProblem,
    onClickSLProblem,
    onClickShoulderProblem,
    onClickWristProblem,
    onClickAnklesProblem,
    setTextAreaValue,
    setNotVisiblePatient,
    chartTemplateData,
    painLevel,
    setPainLevel,
    chartCsValue,
    chartTsValue,
    chartLsValue,
    chartSLValue,
    chartShoulderValue,
    chartWristValue,
    chartAnklesValue,
    textareaValue,
    notVisiblePatient,
    viewableOptions,
    asyncSelectRefViewable,
    formik,
    loading,
    injectionLevel,
    injectionName,
    editData,
    links,
    injected,
    setInjected,
  }
}

export default useNurseDailyIntake
