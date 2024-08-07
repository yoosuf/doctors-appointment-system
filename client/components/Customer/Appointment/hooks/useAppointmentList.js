import commonApi from '@/api/common'
import moment from 'moment'
import { useEffect, useState } from 'react'

const useAppointmentList = (userData) => {
  const [userId, setUserId] = useState('')
  const [listsData, setListsData] = useState([])
  const [selectedList, setSelectedList] = useState([])
  const [value, onChange] = useState()
  const [calendarDate, setCalendarDate] = useState({
    from: moment().startOf('month').format('YYYY-MM-DD'),
    to: moment().endOf('month').format('YYYY-MM-DD'),
  })

  useEffect(() => {
    if (userData) {
      setUserId(userData._id)
    }
  }, [userData])

  // useEffect(() => {
  //   console.log(`userData`, userData)
  // }, [userData])

  useEffect(() => {
    getListData()
  }, [userId])

  useEffect(() => {
    let tempData = listsData?.filter(
      i =>
        moment(
             i?.appointmentId?.date
        )
          .utc()
          .format('DD') === moment(value || new Date()).format('DD')
    )
    setSelectedList(tempData)
  }, [value, listsData])

  const getListData = () => {
    commonApi({
      parameters: [userId ?? userData._id],
      action: 'patientVisithistory',
    }).then(({ DATA = {} }) => {
      setListsData(DATA)
    })
  }


  return {
    listsData,
    value,
    onChange,
    selectedList,
    calendarDate,
    setCalendarDate,
  }
}

export default useAppointmentList
