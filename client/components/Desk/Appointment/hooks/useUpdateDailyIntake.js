import React, { useState, useEffect, useRef } from 'react'
import commonApi from '@/api/common'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getRole } from '@/utils/helper'
import { APPOINTMENT_CHART_TYPE, CHART_VIEWABLE } from '@/utils/constant'
import toast from 'react-hot-toast'

const useUpdateDailyIntake = ({ appointmentDetail, clearDailyIntakeData, listAllChart }) => {

  const { dailyIntakeChart } = appointmentDetail
  const viewableOptions = [
    { label: 'Viewable By Chiro', value: CHART_VIEWABLE.CHIRO },
    { label: 'Viewable By Everyone', value: CHART_VIEWABLE.EVERYONE },
  ]

  const asyncSelectRefViewable = useRef(null)
  const [chartTemplateData, setChartTemplateData] = useState([])
  const [painLevel, setPainLevel] = useState()

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

  const [chartKempsValue, setChartKempsValue] = useState({
    labelId: '',
    optionIds: [],
  })

  const [chartSLRValue, setChartSLRValue] = useState({
    labelId: '',
    optionIds: [],
  })

  const [chartCervicalCompressionValue, setChartCervicalCompressionValue] = useState({
    labelId: '',
    optionIds: [],
  })

  const [textareaValue, setTextAreaValue] = useState('')
  const [strValue, setStrValue] = useState()
  const [notVisiblePatient, setNotVisiblePatient] = useState(false)
  const [loading, setLoading] = useState(false)
  const [templateId, setTemplateId] = useState('')
  const [viewableBy, setViewableBy] = useState(CHART_VIEWABLE.CHIRO)
  const [bloodPressure, setBloodPressure] = useState("")
  const [extraNote, setExtraNote] = useState("")

  useEffect(() => {
    updateDailyIntakeChart()
  }, [])

  useEffect(() => {
        if (strValue || textareaValue) {
      concateString()
    }
  }, [strValue, textareaValue])

  const closeBtn = () => {
    const chartModal = document.getElementById('editDailyIntakeChartModal')
    chartModal.classList.remove('active')
    setPainLevel()
    clearDailyIntakeData()
    setChartCsValue({ labelId: '', optionIds: [] })
    setChartTsValue({ labelId: '', optionIds: [] })
    setChartLsValue({ labelId: '', optionIds: [] })
    setChartSLValue({ labelId: '', optionIds: [] })
    setChartShoulderValue({ labelId: '', optionIds: [] })
    setChartWristValue({ labelId: '', optionIds: [] })
    setChartAnklesValue({ labelId: '', optionIds: [] })

    setChartKempsValue({ labelId: '', optionIds: [] })
    setChartSLRValue({ labelId: '', optionIds: [] })
    setChartCervicalCompressionValue({ labelId: '', optionIds: [] })

    setNotVisiblePatient(false)
    setTextAreaValue('')
    setStrValue()
    setBloodPressure('')
    setExtraNote('')
    asyncSelectRefViewable.current.select.select.clearValue()
    formik.resetForm()
  }

  const updateDailyIntakeChart = async () => {
    setLoading(true)
    const templateData = {
      query: {
        type: APPOINTMENT_CHART_TYPE.DAILY_INTAKE,
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


  //  Kemp 
  // this needs to be a dynamic in future FK the previus developers

  const onClickKempsProblem = (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartKempsValue?.optionIds?.length) {
      setChartKempsValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, kempSide: [name] })
    } else {
      if (!chartKempsValue?.optionIds.includes(optionId)) {
        setChartKempsValue({
          labelId: labelId,
          optionIds: chartKempsValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          kempSide: [...strValue?.kempSide, name],
        })
      } else {
        setChartKempsValue({
          labelId: labelId,
          optionIds: chartKempsValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          kempSide: strValue.kempSide.filter(x => x !== name),
        })
      }
    }
  }



  const onClickSLRProblem = (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartSLRValue?.optionIds?.length) {
      setChartSLRValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, slrSide: [name] })
    } else {
      if (!chartSLRValue?.optionIds.includes(optionId)) {
        setChartSLRValue({
          labelId: labelId,
          optionIds: chartSLRValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          slrSide: [...strValue?.slrSide, name],
        })
      } else {
        setChartSLRValue({
          labelId: labelId,
          optionIds: chartSLRValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          slrSide: strValue.slrSide.filter(x => x !== name),
        })
      }
    }
  }



  const onClicksetCervicalCompressionProblem = (e, optionId, labelId, name) => {
    e.preventDefault()
    if (!chartCervicalCompressionValue?.optionIds?.length) {
      setChartCervicalCompressionValue({ labelId: labelId, optionIds: [optionId] })
      setStrValue({ ...strValue, cervicalCompressionSide: [name] })
    } else {
      if (!chartCervicalCompressionValue?.optionIds.includes(optionId)) {
        setChartCervicalCompressionValue({
          labelId: labelId,
          optionIds: chartCervicalCompressionValue?.optionIds?.concat(optionId),
        })
        setStrValue({
          ...strValue,
          cervicalCompressionSide: [...strValue?.cervicalCompressionSide, name],
        })
      } else {
        setChartCervicalCompressionValue({
          labelId: labelId,
          optionIds: chartCervicalCompressionValue?.optionIds.filter(x => x !== optionId),
        })
        setStrValue({
          ...strValue,
          cervicalCompressionSide: strValue.cervicalCompressionSide.filter(x => x !== name),
        })
      }
    }
  }

  const onChangeExtraNote = (e) => {
    const value = e.target.value

    setExtraNote(value)
    setStrValue({ ...strValue, extraNote: value })
  }

  const onChangeBloodPressure = (e) => {
    const value = e.target.value

    setBloodPressure(value)
    setStrValue({ ...strValue, bloodPressure: value })
  }

  const categoryString = {
    painLevelstr: val => `Visual Analogue Scale of ${val}.`,
    cervicialstr: val =>
      val
        ? `Pain, tenderness and myo spasms over the adjusted regions. Adjustments were performed in the ${val} area of the Cervical Spine`
        : '',
    thoracicstr: val =>
      val ? `, the ${val} area of the Thoracic Spine. ` : '',
    lumbarstr: val => (val ? `, the ${val} area of the Lumbar Spine` : ''),
    sacroiliacstr: val =>
      val ? `, the ${val} side of the Sacroiliac Joint` : '',
    shouldersstr: val => (val ? `, the ${val} Shoulders` : ''),
    wriststr: val => (val ? `, the ${val} Wrist` : ''),
    anklesstr: val => (val ? ` and the ${val} Ankles.` : ''),
    kempsStr: val => (val ? ` and the ${val} Kemps.` : ''),
    straightLegRaiseStr: val => (val ? ` and the ${val} Straight Leg Raise.` : ''),
    cervicalCompressionStr: val => (val ? ` and the ${val} Cervical compression.` : ''),
    bloodPressureStr: val => (val ? ` and the ${val} Blood pressure.` : ''),
    extraNoteStr: val => (val ? ` and additionally, \n\n${val}` : ''),
  }

  const concateString = () => {
    const tempParts = [];

    if (strValue?.painLevel) {
      tempParts.push(categoryString.painLevelstr(strValue.painLevel));
    }

    if (strValue?.cervicialSpine) {
      tempParts.push(
        categoryString.cervicialstr(strValue.cervicialSpine.join(', '))
      );
    }

    if (strValue?.thoracicSpine) {
      tempParts.push(
        categoryString.thoracicstr(strValue.thoracicSpine.join(', '))
      );
    }

    if (strValue?.lumbarSpine) {
      tempParts.push(
        categoryString.lumbarstr(strValue.lumbarSpine.join(', '))
      );
    }

    if (strValue?.sacroiliacSide) {
      tempParts.push(
        categoryString.sacroiliacstr(strValue.sacroiliacSide.join(' and '))
      );
    }

    if (strValue?.shoulderSide) {
      tempParts.push(
        categoryString.shouldersstr(strValue.shoulderSide.join(' and '))
      );
    }

    if (strValue?.wristSide) {
      tempParts.push(
        categoryString.wriststr(strValue.wristSide.join(' and '))
      );
    }

    if (strValue?.cervicalCompressionSide) {
      tempParts.push(
        categoryString.cervicalCompressionStr(
          strValue.cervicalCompressionSide.join(' and ')
        )
      );
    }

    if (strValue?.kempSide) {
      tempParts.push(
        categoryString.kempsStr(strValue.kempSide.join(' and '))
      );
    }

    if (strValue?.slrSide) {
      tempParts.push(
        categoryString.straightLegRaiseStr(strValue.slrSide.join(' and '))
      );
    }

    if (strValue?.anklesSide) {
      tempParts.push(
        categoryString.anklesstr(strValue.anklesSide.join(' and '))
      );
    }

    if (strValue?.bloodPressure) {
      tempParts.push(categoryString.bloodPressureStr(strValue.bloodPressure));
    }

    if (strValue?.extraNote) {
      tempParts.push(categoryString.extraNoteStr(strValue.extraNote));
    }

    const temp = tempParts.join(' ');

    setTextAreaValue(temp);
    formik.setFieldValue('notes', temp);
  };

  const formik = useFormik({
    initialValues: {
      viewableByEveryoneId: CHART_VIEWABLE.CHIRO,
      notes: '',
    },
    validationSchema: Yup.object({
      notes: Yup.string().required('You can not submit empty form.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })



  const onClickSubmit = async values => {
    setLoading(true)
    const data = {
      name: appointmentDetail?.userId?.fullName,
      isActive: true,
      type: APPOINTMENT_CHART_TYPE.DAILY_INTAKE,
      viewableBy: values.viewableByEveryoneId,
      patientVisible: notVisiblePatient,
      creatorId: getRole()?.creatorId,
      patientId: appointmentDetail?.userId?._id,
      appointmentId: appointmentDetail?._id,
      chartId: templateId,
      desc: values.notes,
      chartData: [],
    }

    if(bloodPressure?.length > 0) data.blood_pressure = bloodPressure
    if(extraNote?.length > 0) data.extra_note = extraNote

    if (painLevel?.optionIds?.length) {
      data.chartData.push(painLevel)
    }
    if (chartCsValue?.optionIds?.length) {
      data.chartData.push(chartCsValue)
    }
    if (chartTsValue?.optionIds?.length) {
      data.chartData.push(chartTsValue)
    }
    if (chartLsValue?.optionIds?.length) {
      data.chartData.push(chartLsValue)
    }
    if (chartSLValue?.optionIds?.length) {
      data.chartData.push(chartSLValue)
    }
    if (chartShoulderValue?.optionIds?.length) {
      data.chartData.push(chartShoulderValue)
    }
    if (chartWristValue?.optionIds?.length) {
      data.chartData.push(chartWristValue)
    }
    if (chartAnklesValue?.optionIds?.length) {
      data.chartData.push(chartAnklesValue)
    }
    if (chartKempsValue?.optionIds?.length) {
      data.chartData.push(chartKempsValue)
    }
    if (chartSLRValue?.optionIds?.length) {
      data.chartData.push(chartSLRValue)
    }
    if (chartCervicalCompressionValue?.optionIds?.length) {
      data.chartData.push(chartCervicalCompressionValue)
    }

    try {
      await commonApi({
        action: 'updateDailyIntakeChart',
        data: data,
        parameters: [appointmentDetail?.dailyIntakeChart?.id],
      }).then(async ({ DATA = {}, MESSAGE }) => {
        toast.success(MESSAGE)
        closeBtn()
        listAllChart(appointmentDetail?.userId?._id)
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(dailyIntakeChart?.chartData){
      if(dailyIntakeChart.chartData.length > 0){
        const strData = {
          painLevel: '',
          cervicialSpine: [],
          thoracicSpine: [],
          lumbarSpine: [],
          sacroiliacSide: [],
          shoulderSide: [],
          wristSide: [],
          anklesSide: [],
          kempSide: [],
          slrSide: [],
          cervicalCompressionSide: []
        }
        dailyIntakeChart.chartData.forEach(data=>{
          const field = chartTemplateData.find(el=>el._id === data.labelId)
          if(field){
            switch (field.label) {
              case "Pain Level":
                setPainLevel(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.painLevel = option.name
                })
                break;
              case "C/S":
                setChartCsValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.cervicialSpine.push(option.name)
                })
                break;
              case "T/S":
                setChartTsValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.thoracicSpine.push(option.name)
                })
                break;
              case "L/S":
                setChartLsValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.lumbarSpine.push(option.name)
                })
                break;
              case "SI":
                setChartSLValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.sacroiliacSide.push(option.name)
                })
                break;
              case "Shoulders":
                setChartShoulderValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.shoulderSide.push(option.name)
                })
                break;
              case "Wrist":
                setChartWristValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.wristSide.push(option.name)
                })
                break;
              case "Ankles":
                setChartAnklesValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.anklesSide.push(option.name)
                })
                break;
              case "Kemps":
                setChartKempsValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.kempSide.push(option.name)
                })
                break;
              case "SLR":
                setChartSLRValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.slrSide.push(option.name)
                })
                break;
              case "Cervical compression":
                setChartCervicalCompressionValue(data)
                data.optionIds.forEach(optId=>{
                  const option = field.options.find(el=>el._id === optId)
                  strData.cervicalCompressionSide.push(option.name)
                })
                break;
              default:
                break;
            }
          }
        })
        setStrValue(strData)
      }
      setBloodPressure(dailyIntakeChart.blood_pressure)
      setExtraNote(dailyIntakeChart.extra_note)
      formik.setFieldValue("viewableByEveryoneId",dailyIntakeChart.viewableBy)
      setViewableBy(dailyIntakeChart.viewableBy)
      setNotVisiblePatient(dailyIntakeChart.patientVisible)
    }
  },[dailyIntakeChart])

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
    onClickSLRProblem,
    onClickKempsProblem,
    onClicksetCervicalCompressionProblem,
    setTextAreaValue,
    setNotVisiblePatient,
    setViewableBy,
    onChangeBloodPressure,
    onChangeExtraNote,
    chartTemplateData,
    painLevel,
    chartCsValue,
    chartTsValue,
    chartLsValue,
    chartSLValue,
    chartShoulderValue,
    chartWristValue,
    chartAnklesValue,

    chartKempsValue,
    chartSLRValue,
    chartCervicalCompressionValue,

    viewableBy,
    textareaValue,
    notVisiblePatient,
    viewableOptions,
    asyncSelectRefViewable,
    formik,
    loading,
    bloodPressure,
    extraNote
  }
}

export default useUpdateDailyIntake