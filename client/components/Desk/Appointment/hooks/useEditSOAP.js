import commonApi from '@/api/common'
import {
  APPOINTMENT_CHART_TYPE,
  CHART_VIEWABLE,
  REQUIRED_FIELD,
  IDENTIFY_TYPE,
} from '@/utils/constant'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getUser } from '@/utils/localStorage'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'
import { getRole } from '@/utils/helper'

const useEditSOAP = ({
  activeSOAPChart,
  closeEditSOAPModal = () => {},
  appointmentDetail = {},
  listAllChart,
  editSOAP,
  patientId = {},
  clearSoapData
}) => {
  const [loading, setLoading] = useState(false)
  const [patientVisible, setPatientVisible] = useState(false)
  const [chartTemplateData, setChartTemplateData] = useState([])

  const [editID, setEditID] = useState()
  const [selectedViewable, setSelectedViewable] = useState(CHART_VIEWABLE.CHIRO)

  const [selectedPoint, setSelectedPoint] = useState([])

  const [chartId, setChartId] = useState()

  const [editChartData, setEditChartData] = useState([])

  const route = useRouter()

  const viewableOptions = [
    { label: 'Viewable By Chiro', value: CHART_VIEWABLE.CHIRO },
    { label: 'Viewable By Everyone', value: CHART_VIEWABLE.EVERYONE },
  ]

  const pointStyle =
    'cursor-pointer no-select relative body-num flex-cen bg-yellowBg rounded-full h-5 w-5 text-gray-900 z-10 font-medium'

  const closeBtn = () => {
    clearSoapData()
    closeEditSOAPModal()
    setSelectedViewable({})
    formik.resetForm()
    setSelectedPoint([])
  }

  useEffect(() => {

    getChartTemplateData()
    const data = editSOAP;
    setEditID(editSOAP.id)
    formik.setValues({
      subjective: data.subjective,
      objective: data.objective,
      assestment: data.assestment,
      plans: data.plans,
      viewableByEveryoneId: data.viewableBy,
    })

    setSelectedViewable(data.viewableBy)

    setEditChartData(data.chartData)
}, [editSOAP])

  useEffect(() => {
    if (activeSOAPChart) {
      getChartTemplateData()
    }
  }, [activeSOAPChart])

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

 
  useEffect(() => {
    if (chartTemplateData?.length && editChartData?.length) {
      setEditChartPoint()
    }
  }, [chartTemplateData, editChartData])

  const setEditChartPoint = () => {
        editChartData.map((data = {}) => {
      if (chartTemplateData.find((x = {}) => x._id === data.pointId)) {
        const res = chartTemplateData.find((x = {}) => x._id === data.pointId)
        setSelectedPoint(prev => [
          ...prev,
          {
            point: res?.point,
            _id: res?._id,
            desc: data.desc,
          },
        ])
      }
    })
  }

  useEffect(() => {
    if (selectedPoint.length) {
      setEditChartData([])
    }
  }, [selectedPoint])

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

  const onDeletePoint = (e, _id) => {
    e.preventDefault()
    const data = selectedPoint.filter((s = {}) => s._id !== _id)
    setSelectedPoint(data)
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

  const check = 'NURSE'

  const onClickSubmit = async (values = {}) => {
    const roles = getUser()

    const newId = {}
    let no

    if (roles?.roleId?.code === IDENTIFY_TYPE.chiro) {
      newId.chiroId = roles?.id
      {
        route?.pathname === routes?.manageCustomer ? (no = 1) : (no = 2)
      }
    }

    if (roles?.roleId?.code === IDENTIFY_TYPE.nurse) {
      newId.nurseId = roles?.id
      {
        route?.pathname === routes?.manageCustomer ? (no = 2) : null
      }
    }

    setLoading(true)
    const {
      subjective,
      objective,
      assestment,
      plans,
      viewableByEveryoneId,
    } = values

    let chartData = []
    selectedPoint.forEach((p = {}) => {
      chartData = [...chartData, { pointId: p._id, desc: p.desc }]
    })
    const data = {
      subjective,
      objective,
      assestment,
      plans,
      viewableBy: viewableByEveryoneId,
      patientVisible,
      type: APPOINTMENT_CHART_TYPE.SOAP,
      isActive: true,
      patientId: patientId?._id || patientId?.id,
      appointmentId: appointmentDetail.id,
      creatorId: getRole()?.creatorId,
      chartId: chartId,
      chartData,
      no: no,
    }

    try {
      await commonApi({
        parameters: [editID],
        action: 'updateDailyIntakeChart',
        data: data,
      }).then(async ({ DATA = {}, MESSAGE }) => {
        toast.success(MESSAGE)
        setEditID()
        closeBtn()
        listAllChart(appointmentDetail?.userId?._id)
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      viewableByEveryoneId: '',
      subjective: '',
      objective: '',
      assestment: '',
      plans: '',
    },
    validationSchema: Yup.object({
      viewableByEveryoneId: Yup.string().required(REQUIRED_FIELD),
      subjective: Yup.string().required(REQUIRED_FIELD),
      objective: Yup.string().required(REQUIRED_FIELD),
      assestment: Yup.string().required(REQUIRED_FIELD),
      plans: Yup.string().required(REQUIRED_FIELD),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    loading,
    chartTemplateData,
    onAddPoint,
    selectedPoint,
    onDeletePoint,
    onChangeText,
    patientVisible,
    setPatientVisible,
    viewableOptions,
    formik,
    closeBtn,
    pointStyle,
    editID,
    selectedViewable,
    setSelectedViewable,
  }
}

export default useEditSOAP