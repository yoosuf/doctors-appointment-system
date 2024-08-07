import commonApi from '@/api/common'
import { TABLE_LENGTH, USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import { ROLE_WISE_CHECKBOX, VERIFY_UN_VERIFY_FILTER } from '@/utils/roles'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const populate = [
  'roleId',
  {
    path: 'profile_image',
    select: ['uri'],
  },
  {
    path: 'addressIds',
    populate: [
      {
        path: 'address',
        
      },
    ],
  },
]

const useUserManagement = () => {
  const [loading, setLoading] = useState(false)
  const [sidebarLoader, setSidebarLoader] = useState(false)

  const [data, setData] = useState({})

  const [id, setID] = useState()

  const [userData, setUserData] = useState({})

  const filterRemove = () => {
    const filterModal = document.getElementById('filter_modal')
    filterModal.classList.remove('active')
  }
  const { query } = useRouter()

  const [allChecked, setAllChecked] = useState(true)
  const [allCheckedVerify, setAllCheckedVerify] = useState(true)
  const [filterData, setFilterData] = useState([])
  const [verifyData, setVerifyData] = useState([])
  const [sendFilterData, setSendFilterData] = useState([])
  const [verified, setVerified] = useState([])
  const [paginator, setPaginator] = useState({})
  const [showOnlyActive, setShowOnlyActive] = useState(false)
  useEffect(() => {
    const { roleId = {} } = getUser()
    setFilterData(ROLE_WISE_CHECKBOX[roleId.code])
    setVerifyData(VERIFY_UN_VERIFY_FILTER)
  }, [])

  useEffect(() => {
    const { roleId = {} } = getUser()
    setFilterData(
      ROLE_WISE_CHECKBOX[roleId.code].map((x = {}) => {
        // eslint-disable-next-line no-param-reassign
        x.checked = allChecked
        return x
      })
    )
    setSendFilterData([])
  }, [allChecked])
  useEffect(() => {
    setVerifyData(
      VERIFY_UN_VERIFY_FILTER.map((x = {}) => {
        // eslint-disable-next-line no-param-reassign
        x.checked = allCheckedVerify
        return x
      })
    )
    setVerified([])
  }, [allCheckedVerify])
  const onChangeFilter = (data, e) => {
    let sendData = sendFilterData
    if (e.target.checked === true) {
      sendData = [...sendData, data?.value]
    } else if (e.target.checked === false && sendFilterData?.length > 0) {
      sendData = sendData?.filter(p => p !== data?.value)
    }
    if (sendData?.length === filterData.length) setAllChecked(true)
    else setAllChecked(false)

    setSendFilterData(sendData)
    setFilterData(prev =>
      prev.map(x => {
        if (x.id === data.id) {
          return {
            ...x,
            checked: e.target.checked,
          }
        }
        return x
      })
    )
  }
  const onChangeVerifyFilter = (data, e) => {
    let sendData = verified
    if (e.target.checked === true) {
      sendData = sendData?.length ? [...sendData, data?.value] : [data?.value]
    } else if (e.target.checked === false && verified?.length > 0) {
      sendData = sendData?.filter(p => p !== data?.value)
    }
    if (sendData?.length === verifyData.length) setAllCheckedVerify(true)
    else setAllCheckedVerify(false)

    setVerified(sendData)
    setVerifyData(prev =>
      prev.map(x => {
        if (x.id === data.id) {
          return {
            ...x,
            checked: e.target.checked,
          }
        }
        return x
      })
    )
  }
  const onClickApplyFilter = e => {
    e.preventDefault()
    if (allChecked) {
      getInitialSideBarData()
    } else {
      getInitialSideBarData(sendFilterData)
    }
  }

  const changePaginator = async selected => {
    setSidebarLoader(true)
    try {
      const selectedPage = selected + 1
      const data = {
        query: {
          isDelete: false,
          role:
            sendFilterData?.length > 0
              ? sendFilterData
              : [
                  USER_ROLE_TYPE.OWNER,
                  USER_ROLE_TYPE.SUB_OWNER,
                  USER_ROLE_TYPE.CHIROPRACTOR,
                  USER_ROLE_TYPE.NURSE,
                  USER_ROLE_TYPE.STAFF,
                ],
        },
        options: {
          select: [],
          sort: {
            createdAt: -1,
          },
          populate: populate,
          page: selectedPage,
          offset: selected * TABLE_LENGTH || 0,
          limit: TABLE_LENGTH,
          pagination: true,
        },
      }
      await commonApi({
        action: 'findUser',
        data,
      }).then(async ({ DATA = {} }) => {
        setPaginator(DATA.paginator)
        const data = _.groupBy(DATA.data, function (value) {
          return value?.firstName?.toUpperCase()?.charAt(0)
        })
        const newData = Object.keys(data)
          .sort()
          .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = data[key]
            return obj
          }, {})

        await setData(newData)

        const firstData = newData[Object.keys(newData)[0]]

        await setID(firstData?.[0]?.id)
        await setUserData(firstData?.[0])

        sendFilterData?.length > 0
          ? await setAllChecked(false)
          : await setAllChecked(true)

        filterRemove()
      })
    } finally {
      setSidebarLoader(false)
    }
  }

  const getInitialSideBarData = async sendFilterData => {
    const data = {
      query: {
        isActive: showOnlyActive ? true : undefined,
        isDelete: false,
        isVerified: verified?.length > 0 ? verified[0] : undefined,
        role:
          sendFilterData?.length > 0
            ? sendFilterData
            : [
                USER_ROLE_TYPE.OWNER,
                USER_ROLE_TYPE.SUB_OWNER,
                USER_ROLE_TYPE.CHIROPRACTOR,
                USER_ROLE_TYPE.NURSE,
                USER_ROLE_TYPE.STAFF,
              ],
      },
      options: {
        select: [],
        sort: {
          createdAt: -1,
        },
        pagination: true,
        populate: populate,
      },
    }
    setSidebarLoader(true)
    try {
      await commonApi({
        action: 'findUser',
        data,
      }).then(async ({ DATA = {} }) => {
        setPaginator(DATA.paginator)
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

        await setData(newData)

        const firstData = newData[Object.keys(newData)[0]]

        if (!localStorage.getItem('searchUser')) {
          await setID(firstData?.[0]?.id)
          await setUserData(firstData?.[0])
        } else setSearchUser()

        sendFilterData?.length > 0
          ? await setAllChecked(false)
          : await setAllChecked(true)

        filterRemove()
      })
    } finally {
      setSidebarLoader(false)
    }
  }

  useEffect(() => {
    getInitialSideBarData()
  }, [])
  useEffect(() => {
    query?.userId && getInitialSideBarData()
  }, [query])
  const setSearchUser = async () => {
    const data = {
      query: {
        email: {
          $regex: localStorage.getItem('searchUser'),
          $options: 'i',
        },
        role: [
          USER_ROLE_TYPE.OWNER,
          USER_ROLE_TYPE.SUB_OWNER,
          USER_ROLE_TYPE.CHIROPRACTOR,
          USER_ROLE_TYPE.NURSE,
          USER_ROLE_TYPE.STAFF,
        ],
      },
      options: {
        select: [],
        populate: [
          'roleId',
          {
            path: 'profile_image',
            select: ['uri'],
          },
          {
            path: 'addressIds',
            populate: [
              {
                path: 'address',
                populate: [
                  {
                    path: 'cityId',
                    model: 'city',
                  },
                  {
                    path: 'provinceId',
                    model: 'province',
                  },
                  {
                    path: 'postalCodeId',
                    model: 'postalCode',
                  },
                  {
                    path: 'countryId',
                    model: 'country',
                  },
                ],
              },
            ],
          },
        ],
      },
    }
    setSidebarLoader(true)
    try {
      await commonApi({
        action: 'findUser',
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
          await setID(firstData?.[0]?.id)
          await setUserData(firstData?.[0])
        } else {
          await setID()
          await setUserData({})
        }
        localStorage.removeItem('searchUser')
      })
    } finally {
      setSidebarLoader(false)
    }
  }
  const onChangeSearch = async e => {
    if (e.target.value) {
      const data = {
        query: {
          firstName: {
            $regex: e.target.value,
            $options: 'i',
          },
          isActive: showOnlyActive ? true : undefined,
          isDelete: false,
          role:
            sendFilterData?.length > 0
              ? sendFilterData
              : [
                  USER_ROLE_TYPE.OWNER,
                  USER_ROLE_TYPE.SUB_OWNER,
                  USER_ROLE_TYPE.CHIROPRACTOR,
                  USER_ROLE_TYPE.NURSE,
                  USER_ROLE_TYPE.STAFF,
                ],
        },
        options: {
          select: [],
          sort: 'firstName',
          populate: [
            'roleId',
            {
              path: 'profile_image',
              select: ['uri'],
            },
            {
              path: 'addressIds',
              populate: [
                {
                  path: 'address',
                  populate: [
                    {
                      path: 'cityId',
                      model: 'city',
                    },
                    {
                      path: 'provinceId',
                      model: 'province',
                    },
                    {
                      path: 'postalCodeId',
                      model: 'postalCode',
                    },
                    {
                      path: 'countryId',
                      model: 'country',
                    },
                  ],
                },
              ],
            },
          ],
        },
      }
      setSidebarLoader(true)
      try {
        await commonApi({
          action: 'findUser',
          data,
        }).then(async ({ DATA = {} }) => {
          setPaginator(DATA.paginator)
          const data = _.groupBy(DATA?.data, function (value) {
            return value?.firstName?.toUpperCase()?.charAt(0)
          })
          const newData = Object.keys(data)
            .sort()
            .reduce((obj = {}, key) => {
              // eslint-disable-next-line no-param-reassign
              obj[key] = data[key]
              return obj
            }, {})

          await setData(newData)

          const firstData = newData[Object.keys(newData)[0]]

          if (firstData) {
            await setID(firstData?.[0]?.id)
            await setUserData(firstData?.[0])
          } else {
            await setID()
            await setUserData({})
          }

          sendFilterData?.length > 0
            ? await setAllChecked(false)
            : await setAllChecked(true)

          filterRemove()
        })
      } finally {
        setSidebarLoader(false)
      }
    } else {
      getInitialSideBarData()
    }
  }

  return {
    loading,
    sidebarLoader,
    data,
    id,
    setData,
    setID,
    setUserData,
    userData,
    getInitialSideBarData,
    filterData,
    onChangeFilter,
    allChecked,
    setAllChecked,
    filterRemove,
    onClickApplyFilter,
    onChangeSearch,
    sendFilterData,
    paginator,
    changePaginator,
    showOnlyActive,
    setShowOnlyActive,
    verifyData,
    onChangeVerifyFilter,
    allCheckedVerify,
    setAllCheckedVerify,
  }
}

export default useUserManagement
