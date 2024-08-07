import commonApi from '@/api/common'
import { APPOINTMENT_CHART_TYPE, UNIQUE, IDENTIFY_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import routes from '@/utils/routes'

const useCustomerChart = ({ id }) => {
  const [loading, setLoading] = useState(false)

  const [chartList, setChartList] = useState([])
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState({})

  const [dailyIntakeData, setDailyIntakeData] = useState()


  const [editSOAP, setEditSOAP] = useState({})
  const [appointmentData, setAppointmentData] = useState({})

  const [chartTemplateData, setChartTemplateData] = useState([])
  const [selectedChart, setSelectedChart] = useState([])

  const [role, setRole] = useState()
  useEffect(() => {
    getChartList()
    getChartTemplateData()
    const { roleId = {} } = getUser()

    setRole(roleId.code)
  }, [id])

  const closeBtn = () => {
    const chartDraft = document.getElementById('ChartDraftModal')
    chartDraft.classList.remove('active')
  }

  const deletChartUser = async (e, id, deleteItem, setDeleteItem) => {
    e.preventDefault()
    setLoading(true)
    if (deleteItem === 'Delete') {
      try {
        await commonApi({
          action: 'deleteNurse',
          parameters: [id],
        }).then(async ({ DATA = {}, MESSAGE }) => {
          toast.success(MESSAGE)
          const openDeleteEntryModal = document.getElementById(
            'DeleteEntryModal'
          )
          openDeleteEntryModal.classList.remove('active')
          const openDailyIntake = document.getElementById('activityModal')
          openDailyIntake.classList.remove('active')
        })
      } finally {
        getChartList()
        setLoading(false)
      }
      setDeleteItem('')
    } else {
      toast.error("Type 'Delete' to confirm delete")
      setLoading(false)
      setDeleteItem('')
    }
  }

  const archieveChart = async (e, id) => {
    e.preventDefault()
    setLoading(true)

    try {
      await commonApi({
        action: 'archieveChart',
        parameters: [id],
      }).then(async ({ DATA = {}, MESSAGE }) => {
        toast.success(MESSAGE)
        closeBtn()
      })
    } finally {
      setLoading(false)
      getChartList()
    }
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
      }).then(
        async ({ DATA = {} }) => {
          setChartTemplateData(
            DATA.data?.[0]?.chartData?.length ? DATA.data?.[0]?.chartData : null
          )
        },
        () => {
          setChartTemplateData()
        }
      )
    } finally {
      setLoading(false)
    }
  }

  const route = useRouter()

  const getChartList = async () => {
    if (!id) return false

    const logId = getUser()

    const newId = {}

    let types
    let query

    if (logId?.roleId?.code === IDENTIFY_TYPE.chiro) {
      newId.chiroId = logId?.id

      types = APPOINTMENT_CHART_TYPE.DAILY_INTAKE_NURSE
      UNIQUE = 2

      query = {
        patientId: id,
        // $or: [
        //   {
        //     ...newId,
        //   },
        //   {
        //     type: types,
        //   },
        //   {
        //     no: UNIQUE,
        //   },
        // ],
      }
    }

    if (logId?.roleId?.code === IDENTIFY_TYPE.nurse) {
      newId.nurseId = logId?.id
      types = APPOINTMENT_CHART_TYPE.DAILY_INTAKE_NURSE
      UNIQUE = 2
      query = {
        patientId: id,
        // ...newId,
        // $or: [
        //   {
        //     type: types,
        //   },
        //   {
        //     no: UNIQUE,
        //   },
        // ],
      }
    }

    // if (role === IDENTIFY_TYPE.nurse) {
    //   if (route?.pathname == routes?.manageCustomer) {
    //     types = APPOINTMENT_CHART_TYPE.DAILY_INTAKE_NURSE
    //     UNIQUE = 2
    //   } else {
    //     types = APPOINTMENT_CHART_TYPE.DAILY_INTAKE
    //     UNIQUE = 1
    //   }
    // }

    // if (role === IDENTIFY_TYPE.chiro) {
    //   if (route?.pathname == routes?.manageCustomer) {
    //     types = APPOINTMENT_CHART_TYPE.DAILY_INTAKE
    //     UNIQUE = 1
    //   } else {
    //     types = APPOINTMENT_CHART_TYPE.DAILY_INTAKE_NURSE
    //     UNIQUE = 2
    //   }
    // }

    setLoading(true)
    try {
      const data = {
        query,
        options: {
          select: [],
          collation: '',
          sort: {
            pinned: -1,
            createdAt: -1,
          },
          populate: [
            'created_at',
            {
              path: 'creatorId',
              populate: [
                {
                  path: 'profile_image',
                },
              ],
            },
            {
              path: 'patientId',
              populate: [
                {
                  path: 'profile_image',
                },
              ],
            },
            {
              path: 'appointmentId',
            },
          ],
          pagination: true,
        },
        isCountOnly: false,
      }
      await commonApi({
        action: 'findAllAppointmentChart',
        data: data,
      }).then(({ DATA = {} }) => {
        setChartList(DATA.data?.length ? DATA.data : null)
        setPaginator(DATA.paginator)
        setDataQueryOptions(data)
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (chartTemplateData?.length && chartList?.length) {
      setPointData()
    } else setSelectedChart()
  }, [chartTemplateData, chartList])

  const setPointData = async () => {
    const res = await chartList.map((chart = {}) => {
      // if (chart.type === APPOINTMENT_CHART_TYPE.SOAP) {
      //   return {
      //     ...chart,
      //     chartData: chart.chartData.map((c = {}) => {
      //       if (chartTemplateData.find((x = {}) => x._id === c.pointId)) {
      //         const res = chartTemplateData.find(
      //           (x = {}) => x._id === c.pointId
      //         )
      //         return {
      //           point: res?.point,
      //           _id: res?._id,
      //           desc: c.desc,
      //         }
      //       }
      //     }),
      //   }
      // }
      return {
        ...chart,
      }
    })
    await setSelectedChart(res)
  }

  const openEdit = (data = {}) => {
    if (data.type === APPOINTMENT_CHART_TYPE.SOAP) {
      const appointmentData = {
        ...data,
        _id: data.appointmentId,
      }
      setAppointmentData(appointmentData)
      getChartTemplateData()
      setEditSOAP(data)
      const chartModal = document.getElementById('editSoapChartSheet')
      chartModal.classList.add('active')
    } else {
      setDailyIntakeData(data)
      const chartModal = document.getElementById('editDailyIntakeChartModal')
      chartModal?.classList.add('active')
    }
  }

  const onPinnedChart = async (e, chart) => {
    const { id, pinned } = chart
    e.preventDefault()
    const data = {
      pinned: !pinned,
    }
    await commonApi({
      parameters: [id],
      action: 'partialUpdateAppointmentChart',
      data,
    }).then(({ DATA }) => {
      getChartList()
    })
  }

  const onExportChart = (e, id, type) => {
    e.preventDefault()
    const data = {
      id,
      type,
    }
    commonApi({
      action: 'exportChart',
      data,
    }).then(({ DATA = {} }) => {
      window.open(DATA.pdfUri)
    })
  }

  return {
    loading,
    chartList,
    paginator,
    setPaginator,
    setChartList,
    setLoading,
    dataQueryOptions,
    openEdit,
    dailyIntakeData,
    setDailyIntakeData,
    getChartList,
    role,
    editSOAP,
    setEditSOAP,
    appointmentData,
    selectedChart,
    chartTemplateData,
    onPinnedChart,
    onExportChart,
    deletChartUser,
    archieveChart,
  }
}

export default useCustomerChart