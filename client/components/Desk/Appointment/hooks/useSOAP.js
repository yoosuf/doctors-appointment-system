import React, { useState, useEffect } from 'react'
import commonApi from '@/api/common'
import {
    APPOINTMENT_CHART_TYPE,
} from '@/utils/constant'

const useSOAP = () => {

    const [loading, setLoading] = useState(false)
    const [chartTemplateData, setChartTemplateData] = useState([])


    const pointStyle =
        'cursor-pointer no-select relative body-num flex-cen bg-yellowBg rounded-full h-5 w-5 text-gray-900 z-10 font-medium'


    useEffect(() => {
        getChartTemplateData()
    }, [])

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
            })
        } finally {
            setLoading(false)
        }
    }


    return {
        loading,
        pointStyle,
        chartTemplateData,
    }
}

export default useSOAP