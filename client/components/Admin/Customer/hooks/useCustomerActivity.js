import commonApi from '@/api/common'
import moment from 'moment'
import { useEffect, useState } from 'react'

const useCustomerActivity = ({ id }) => {
  const [loading, setLoading] = useState(false)

  const [activityList, setActivityList] = useState([])
  const [pagination, setPagination] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState({})
  const [searchValue, setSearchValue] = useState()
  const [selectionRange, setselectionRange] = useState({
    startDate: moment().subtract(7, "d").toDate(),
    endDate: moment().toDate(),
    key: 'selection',
  })
  useEffect(() => {
    if (id) {
      getUserActivity()
    }
  }, [id, selectionRange, searchValue])

  const getUserActivity = async () => {
    setLoading(true)
    try {
      let data = {
        query: {
          userId: id,
          fromDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
          toDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),
          "$or": [
            {
              "activityName": {
                "$regex": searchValue,
                "$options": "i"
              }
            }
          ]
        },
        options: {
          select: [],
          populate: ['userId'],
          sort: {
            createdAt: -1,
          },
        },
      }
      if (!searchValue) delete data.query.$or
      await commonApi({
        action: 'userActivity',
        data,
      }).then(({ DATA = {} }) => {
        setActivityList(DATA.data)
        setPagination(DATA.paginator)
        setDataQueryOptions(data)
      })
    } finally {
      setLoading(false)
    }
  }
  const handleSelect = ranges => {
    setselectionRange({
      startDate: moment(ranges.selection?.startDate).toDate(),
      endDate: moment(ranges.selection?.endDate).toDate(),
      key: 'selection',
    })
  }
  return {
    loading,
    activityList,
    pagination,
    dataQueryOptions,
    setLoading,
    setPagination,
    setActivityList,
    selectionRange,
    handleSelect,
    setSearchValue,
    searchValue
  }
}

export default useCustomerActivity
