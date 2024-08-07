import commonApi from '@/api/common'
import { TABLE_LENGTH, USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const options = {
  sort: {
    createdAt: -1,
  },
  select: [],
  pagination: true,
  populate: [
    'profile_image',
    {
      path: 'addressIds',
      populate: [
        {
          path: 'address',
        },
      ],
    },
    { path: 'locationIds', model: 'location' },
    { path: 'roleId', model: 'role', select: 'name code' },
    { path: 'membership._id', model: 'membership' },
    { path: 'membership.categories._id', model: 'category' },
  ],
}

const useCustomer = () => {
  const { query } = useRouter()
  const [loading, setLoading] = useState(false)
  const [customerData, setCustomerData] = useState([])
  const [paginator, setPaginator] = useState({})
  const [id, setID] = useState()
  const [userData, setUserData] = useState({})
  const [filterData, setFilterData] = useState({ isActive: 0 })
  const [filterModal, setFilterModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [membershipPlans, setMembershipPlans] = useState([])

  useEffect(() => {
    getInitialSideBarData()
  }, [])

  useEffect(() => {
    query?.userId && getInitialSideBarData()
  }, [query])

  useEffect(() => {
    getInitialSideBarData()
  }, [filterData])

  const getRole = () => {
    const { roleId = {}, locationIds = [] } = getUser()
    if (roleId?.code && roleId.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
      return {
        locationIds: {
          $in: locationIds.map((x = {}) => x._id),
        },
      }
    }
  }

  const getInitialSideBarData = async inputValue => {
    const value = getRole()
    const data = {
      query: {
        ...value,
        isActive: filterData.isActive
          ? filterData.isActive === 1
            ? true
            : false
          : undefined,
      },
      options: options,
    }

    if (searchValue) {
      data.query.$or = [
        {
          firstName: {
            $regex: searchValue,
          },
        },
        {
          lastName: {
            $regex: searchValue,
          },
        },
      ]
    }
    
    setLoading(true)
    try {
      await commonApi({
        action: 'getPatientList',
        data: data,
      }).then(async ({ DATA = {} }) => {
        const data = _.groupBy(DATA.data, function (value = {}) {
          return value.firstName?.toUpperCase()?.charAt(0)
        })
        const newData = Object.keys(data)
          .sort()
          .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = data[key]
            return obj
          }, {})
        setCustomerData(newData)
        const firstData = newData[Object.keys(newData)[0]]
        if (!localStorage.getItem('searchUser')) {
          if(firstData){
          setID(firstData?.[0]?.id)
          setUserData(firstData?.[0])
        } else setSearchUser()
        setPaginator(DATA.paginator)
      }
      })
    } finally {
      setLoading(false)
    }
  }


  const setSearchUser = async () => {
    const data = {
      query: {
        email: {
          $regex: localStorage.getItem('searchUser'),
          $options: 'i',
        },
      },
      options: options,
    }
    setLoading(true)
    try {
      await commonApi({
        action: 'getPatientList',
        data,
      }).then(async ({ DATA = {} }) => {
        const data = _.groupBy(DATA?.data, function (value) {
          return value?.firstName?.toUpperCase()?.charAt(0)
        })
        const newData = Object.keys(data)
          .sort()
          .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = data[key]
            return obj
          }, {})

        const firstData = newData[Object.keys(newData)[0]]

        if (firstData) {
          setID(firstData?.[0]?.id)
          setUserData(firstData?.[0])
        } else {
          setID()
          setUserData({})
          setMembershipPlans([])
        }
        localStorage.removeItem('searchUser')
      })
    } finally {
      setLoading(false)
    }
  }

  const onChangeSearch = async e => {
      const inputValue = e.target.value
    setSearchValue(inputValue)
    const value = getRole()
    if (inputValue) {

      const data = {
        query: {
          ...value,
          $or: [
            {
              firstName: {
                $regex: inputValue,
                $options: 'i',
              },
            },
            {
              lastName: {
                $regex: inputValue,
                $options: 'i',
              },
            },
          ],
        },
        options: {
          ...options,
          pagination: false,
        },
      }
      await commonApi({
        action: 'getPatientList',
        data: data,
      }).then(async ({ DATA = {} }) => {
        setPaginator(DATA.paginator)
        const data = _.groupBy(DATA.data, function (value = {}) {
          return value.firstName?.toUpperCase()?.charAt(0)
        })
        const newData = Object.keys(data)
          .sort()
          .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = data[key]
            return obj
          }, {})

        setCustomerData(newData)

        const firstData = newData[Object.keys(newData)[0]]

        if (firstData) {
          setID(firstData?.[0]?.id)
          setUserData(firstData?.[0])
        } else {
          setID()
          setUserData({})
          setMembershipPlans([])
        }
      })
    } else {
      getInitialSideBarData()
    }
  }

  const changePaginator = async selected => {
    const value = getRole()
    setLoading(true)
    try {
      const selectedPage = selected + 1
      const data = {
        query: {
          ...value,
        },
        options: {
          select: options.select,
          sort: options.sort,
          pagination: options.pagination,
          populate: options.populate,
          page: selectedPage,
          offset: selected * TABLE_LENGTH || 0,
          limit: TABLE_LENGTH,
        },
      }
      await commonApi({
        action: 'getPatientList',
        data: data,
      }).then(async ({ DATA = {} }) => {
        const data = _.groupBy(DATA.data, function (value = {}) {
          return value.firstName?.toUpperCase()?.charAt(0)
        })
        const newData = Object.keys(data)
          .sort()
          .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = data[key]
            return obj
          }, {})
        setCustomerData(newData)
        const firstData = newData[Object.keys(newData)[0]]
        setID(firstData?.[0]?.id)
        setUserData(firstData?.[0])
        setPaginator(DATA.paginator)
      })
    } finally {
      setLoading(false)
    }
  }

  const onClickCustomer = (e, item = {}) => {
    e.preventDefault()
    setID(item.id)
    setUserData(item)
    // setSearchValue('')
  }

  const onClickApplyFilter = data => {
    setFilterData(data)
    setFilterModal(false)
  }

  const filterRemove = () => {
    setFilterModal(false)
  }
  
  return {
    loading,
    customerData,
    setCustomerData,
    id,
    setID,
    userData,
    onChangeSearch,
    paginator,
    changePaginator,
    onClickCustomer,
    setUserData,
    searchValue,
    setSearchValue,
    filterData,
    filterRemove,
    onClickApplyFilter,
    filterModal,
    setFilterModal,
    membershipPlans,
  }
}

export default useCustomer
