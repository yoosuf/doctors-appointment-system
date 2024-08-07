import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { REQUIRED_FIELD, USER_ROLE_TYPE } from '@/utils/constant'
import * as Yup from 'yup'
import commonApi from '@/api/common'
import toast from 'react-hot-toast'
import { getUser } from '@/utils/localStorage'

const populate = [
  {
    path: 'locationIds',
    populate: [
      {
        path: 'countryId',
        select: ['name'],
      },
      {
        path: 'provinceId',
        select: ['name'],
      },
      {
        path: 'cityId',
        select: ['name'],
      },
      {
        path: 'postalCodeId',
        select: ['postalCode'],
      },
    ],
  },
]

const useIPAddress = ({ loadOptionsLocation }) => {
  const [loading, setLoading] = useState(false)
  const [paginator, setPaginator] = useState({})
  const [ipDevicesListData, setIPDevicesListData] = useState([])
  const [editID, setEditID] = useState()
  const [activeIPDevices, setActiveIPDevices] = useState(false)
  const [locationValue, setLocationValue] = useState({})

  const [submitLoading, setSubmitLoading] = useState(false)

  const asyncSelectRefLocation = useRef(null)

  const onClear = () => {
    asyncSelectRefLocation.current.select.select.clearValue()
  }

  useEffect(() => {
    getIpDevicesData()
  }, [])

  useEffect(() => {
    if (activeIPDevices) {
      loadOptionsLocation()
    }
  }, [activeIPDevices])

  useEffect(() => {
    if (editID) {
      getEditData()
    }
  }, [editID])

  const getLocationQuery = () => {
    const { roleId = {}, locationIds = [] } = getUser()
    if (roleId.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
      return {
        _id: {
          $in: locationIds,
        },
      }
    }
  }

  const getIpDevicesData = async () => {
    const value = getLocationQuery()
    setLoading(true)
    try {
      const data = {
        query: {
          ...value,
        },
        options: {
          sort: {
            createdAt: -1,
          },
          populate: populate,
          select: [],
          page: paginator?.currentPage || 1,
          offset:
            (paginator?.currentPage - 1) * Number(paginator?.perPage) || 0,
          limit: paginator?.perPage || 10,
          pagination: true,
        },
      }
      await commonApi({
        action: 'getAllIPDevices',
        data,
      }).then(({ DATA = {}, MESSAGE }) => {
        const { paginator = {}, data = [] } = DATA
        setIPDevicesListData(data)
        setPaginator(paginator)
      })
    } finally {
      setLoading(false)
    }
  }

  const onClickSubmit = async values => {
    setSubmitLoading(true)
    try {
      await commonApi({
        parameters: editID ? [editID] : [],
        action: editID ? 'updateIpAddress' : 'addIPAddress',
        data: values,
      }).then(async ({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        closeBtn()
        await getIpDevicesData()
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleActiveChange = async (id, isActive) => {
    const data = {
      isActive: isActive === true ? false : true,
    }
    if (data) {
      setLoading(true)
      try {
        await commonApi({
          parameters: [id],
          action: 'updateIpAddress',
          data,
        }).then(({ DATA, MESSAGE }) => {
          toast.success(MESSAGE)
          getIpDevicesData()
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      ipAddress: '',
      locationIds: '',
    },
    validationSchema: Yup.object({
      ipAddress: Yup.string().required('Please enter address.'),
      locationIds: Yup.string().required('Please select location.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const closeBtn = () => {
    formik.resetForm()
    onClear()
    setEditID()
    const openAddOwner = document.getElementById('ProfileSettingIPDevicesModal')
    openAddOwner.classList.remove('active')
    setActiveIPDevices(false)
  }

  const EditLocationModal = () => {
    setActiveIPDevices(true)
    const editLocation = document.getElementById('ProfileSettingIPDevicesModal')
    editLocation.classList.add('active')
  }

  const getEditData = async () => {
    EditLocationModal()

    setSubmitLoading(true)
    try {
      await commonApi({
        parameters: [editID],
        action: 'getIpAddress',
      }).then(async ({ DATA, MESSAGE }) => {
        formik.setValues({
          ipAddress: DATA?.ipAddress,
          locationIds: DATA?.locationIds?.[0]?.id,
        })

        setLocationValue({
          value: DATA?.locationIds?.[0]?.id,
          label: DATA?.locationIds?.[0]?.locationName,
        })
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  return {
    ipDevicesListData,
    loading,
    submitLoading,
    paginator,
    setPaginator,
    setIPDevicesListData,
    setLoading,
    populate,
    editID,
    setEditID,
    getIpDevicesData,
    formik,
    closeBtn,
    EditLocationModal,
    setActiveIPDevices,
    activeIPDevices,
    asyncSelectRefLocation,
    locationValue,
    setLocationValue,
    handleActiveChange,
  }
}

export default useIPAddress
