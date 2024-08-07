import commonApi from '@/api/common'
import { useEffect, useState } from 'react'
const useDashboard = () => {
    const [selectedLocationValue, setSelectedLocationValue] = useState({ value: "all", label: "All" })
    const [locationOptionsData, setLocationOptionsData] = useState([])

    useEffect(() => {
        loadOptionsLocation()
    }, []);
    const loadOptionsLocation = async (inputValue, callback = () => { }) => {
        const allData = {
            query: {
                // isDeleted: false,
            },
            options: {
                select: [],
                sort: {
                    createdAt: -1,
                },
            },
        }
        const data = {
            query: {
                // isDeleted: false,
                $or: [
                    {
                        locationName: {
                            $regex: inputValue,
                            $options: 'i',
                        },
                    },
                ],
            },
            options: {
                select: [],
                pagination: false,
            },
        }
        const sendData = inputValue === undefined ? allData : data
        await commonApi({
            action: 'findLocation',
            data: sendData,
        }).then(({ DATA = {} }) => {
            const location = DATA.data || []
            let locationData = location?.map((data = {}) => ({
                value: data.id,
                label: data.locationName,
            }))
            locationData.unshift({ value: "all", label: "All" })
            setLocationOptionsData(locationData)
            callback(locationData)
        })
    }
    return {
        selectedLocationValue,
        setSelectedLocationValue,
        locationOptionsData,
        loadOptionsLocation
    }
}

export default useDashboard
