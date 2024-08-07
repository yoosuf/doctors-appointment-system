import commonApi from '@/api/common'
import { APPOINTMENT_CHART_TYPE } from '@/utils/constant'
import { useEffect, useState } from 'react'
import { getUser } from '@/utils/localStorage'

const usePatientChart = ({ templateChartData, listChartData }) => {
  const { id } = getUser()

  const data = {
    query: {
      patientId: id,
      patientVisible: true,
    },
    options: {
      select: [],
      collation: '',
      sort: {
        pinned: -1,
        createdAt: -1,
      },
      populate: [
        {
          path: 'creatorId',
        },
        {
          path: 'patientId',
        },
      ],
      pagination: true,
    },
    isCountOnly: false,
  }
  const [loading, setLoading] = useState(false)

  const [chartList, setChartList] = useState([])
  const [paginator, setPaginator] = useState(listChartData.DATA.paginator)
  const [dataQueryOptions, setDataQueryOptions] = useState({
    query: data.query,
    options: data.options,
  })

  const [chartTemplateData, setChartTemplateData] = useState(
    templateChartData.DATA.data?.[0]?.chartData
  )
  const [selectedChart, setSelectedChart] = useState(listChartData.DATA.data)

  // useEffect(() => {
  //   getChartList()
  //  getChartTemplateData()
  // }, [])

  // const getChartTemplateData = async () => {
  //   setLoading(true)
  //   const templateData = {
  //     query: {
  //       type: APPOINTMENT_CHART_TYPE.SOAP,
  //     },
  //     options: {
  //       sort: {
  //         createdAt: -1,
  //       },
  //       select: [],
  //     },
  //     isCountOnly: false,
  //   }
  //   try {
  //     await commonApi({
  //       action: 'findChartTemplate',
  //       data: templateData,
  //     }).then(async ({ DATA = {} }) => {
  //       setChartTemplateData(DATA.data?.[0]?.chartData)
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const getChartList = async () => {
  //   setLoading(true)
  //   try {

  //     await commonApi({
  //       action: 'findPatientAppointmentChart',
  //       data: data,
  //     }).then(({ DATA = {} }) => {
  //       setChartList(DATA.data)
  //       setPaginator(DATA.paginator)
  //       setDataQueryOptions({ query: data.query, options: data.options })
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    if (chartTemplateData?.length && chartList?.length) {
      setPointData()
    }
  }, [chartTemplateData, chartList])

  const setPointData = async () => {
    const res = await chartList.map((chart = {}) => {
      if (chart.type === APPOINTMENT_CHART_TYPE.SOAP) {
        return {
          ...chart,
          chartData: chart.chartData.map((c = {}) => {
            if (chartTemplateData.find((x = {}) => x._id === c.pointId)) {
              const res = chartTemplateData.find(
                (x = {}) => x._id === c.pointId
              )
              return {
                point: res?.point,
                _id: res?._id,
                desc: c.desc,
              }
            }
          }),
        }
      }
      return {
        ...chart,
      }
    })
    await setSelectedChart(res)
  }

  const onExportChart = (e, id, type) => {
    e.preventDefault()
    const data = {
      id,
      type,
    }
    commonApi({
      action: 'exportPatientChart',
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
    chartTemplateData,
    selectedChart,
    onExportChart,
  }
}

export default usePatientChart
