import React, { useState, useEffect, useRef } from 'react'
import commonApi from '@/api/common'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getRole } from '@/utils/helper'
import { APPOINTMENT_CHART_TYPE, CHART_VIEWABLE } from '@/utils/constant'
import toast from 'react-hot-toast'
import { getUser } from '@/api/list'

const useNurseAPI = ({
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
  closeBtn,
  chartData,
  templateData,
  injectionLevel,
  injectionName,
  notVisiblePatient,
  setNotVisiblePatient,
  injected,
  setInjected,
}) => {
  useEffect(() => {
    if (editData) {
      formik.setFieldValue('notes', editData?.desc)
      formik.setFieldValue('bloodPressure', editData?.bloodPressure)
      formik.setFieldValue('systolic', editData?.systolic)
      formik.setFieldValue('diastolic', editData?.diastolic)
      formik.setFieldValue('explain', editData?.explain)
      formik.setFieldValue(
        'medicationWhichAllergy',
        editData?.medicationWhichAllergy
      )
      formik.setFieldValue('foodWhichAllergy', editData?.foodWhichAllergy)
      formik.setFieldValue('note', editData?.note)
      formik.setFieldValue('viewableByEveryoneId', editData?.viewableBy)

      // setNotVisiblePatient(editData.patientVisible)
    }
  }, [editData])

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      viewableByEveryoneId: CHART_VIEWABLE.NURSE,
      notes: '',
      name: '',
      viewableBy: '',
      patientVisible: '',
      bloodPressure: '',
      diastolic: '',
      explain: '',
      medicationWhichAllergy: '',
      foodWhichAllergy: '',
      note: '',
      systolic: '',
      previousInjections: '',
      previousInjectionMl: '',
      medicationAllergy: '',
      foodAllergy: '',
      otherAllergy: '',
      type: '',
      chartData: '',
    },
    validationSchema: Yup.object({
      bloodPressure: Yup.number().required('Blood Pressure is required.'),
      systolic: Yup.number().required('Systolic is required.'),
      diastolic: Yup.number().required('Diastolic is required.'),
      explain: Yup.string().required('Explain is required.'),
      medicationWhichAllergy: Yup.string().required(
        'Which Allergy is required.'
      ),
      foodWhichAllergy: Yup.string().required('Which Allergy is required.'),
      note: Yup.string().required('Note is required.'),
    }),
    note: Yup.number().required('Notes is required.'),
    onSubmit: values => {
      onClickSubmit({
        values,
      })
    },
  })

  const onClickSubmit = async values => {
    const type = 'DAILY_INTAKE_NURSE'

    setLoading(true)
    const data = {
      name: appointmentDetail?.firstName + ' ' + appointmentDetail?.lastName,
      isActive: true,
      type: APPOINTMENT_CHART_TYPE.DAILY_INTAKE_NURSE,
      viewableBy: values.values.viewableByEveryoneId,
      patientVisible: notVisiblePatient,
      injected: injected,
      chiroId: getRole()?.chiroId,
      nurseId: getRole()?.nurseId,
      patientId: appointmentDetail?.patientId?._id,
      appointmentId: appointmentDetail?._id,
      chartId: templateId,
      desc: injectionName?.painLevel,
      bloodPressure: values?.values?.bloodPressure,
      diastolic: values?.values?.diastolic,
      explain: values?.values?.explain,
      medicationWhichAllergy: values?.values?.medicationWhichAllergy,
      foodWhichAllergy: values?.values?.foodWhichAllergy,
      note: values?.values?.note,
      systolic: values?.values?.systolic,
      previousInjections: values?.values?.previousInjections,
      previousInjectionMl: values?.values?.previousInjectionMl,
      medicationAllergy: values?.values?.medicationAllergy,
      foodAllergy: values?.values?.foodAllergy,
      otherAllergy: values?.values?.otherAllergy,
      // type: type,
      chartData: [
        {
          labelId: injectionLevel?.labelId,
          optionIds: injectionLevel?.optionIds,
        },
      ],
    }

    try {
      await commonApi({
        action: editData
          ? 'updateAppointmentChartNurse'
          : 'addDailyIntakeChart',
        data: data,
        parameters: editData?.id ? [editData?.id] : [],
      }).then(async ({ DATA = {}, MESSAGE }) => {
        toast.success(MESSAGE)
        closeBtn()
        listAllChart(appointmentDetail?.userId?._id)
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    closeBtn,
    painLevel,
    chartCsValue,
    chartTsValue,
    chartLsValue,
    chartSLValue,
    chartShoulderValue,
    chartWristValue,
    chartAnklesValue,
    formik,
    loading,
    chartData,
    templateId,
    injectionLevel,
    injectionName,
    editData,
    notVisiblePatient,
    setNotVisiblePatient,
    injected,
    setInjected,
  }
}

export default useNurseAPI
