import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import commonApi from '@/api/common'
import { MASTER_CODE, REQUIRED_FIELD, USER_ROLE_TYPE } from '@/utils/constant'
import toast from 'react-hot-toast'
import { getPermission, getUser } from '@/utils/localStorage'

const options = {
  select: [],
  populate: [{ path: 'locationIds' }],

  sort: {
    createdAt: -1,
  },
}

const usePage = () => {
  const [pages, setPages] = useState([])
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState({})

  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [activePage, setActivePage] = useState(false)
  const [editID, setEditID] = useState(null)

  const createForm = async () => {
    await setActivePage(true)
    const addProduct = document.getElementById('PageModal')
    addProduct.classList.add('active')
  }

  const deletePages = async () => {
    await setActivePage(true)
    const deleteItem = document.getElementById('DeletePage')
    deleteItem.classList.add('active')
  }

  const clearValue = () => {
    formik.setValues({
      body: '',
      location: '',
    })
  }

  const closeBtn = async () => {
    await setActivePage(false)
    const deleteItem = document.getElementById('DeletePage')
    deleteItem.classList.remove('active')
    const addProduct = document.getElementById('PageModal')
    addProduct.classList.remove('active')
    const modalBody = document.getElementById('top-div-product')
    modalBody.scrollTop = 0
    formik.resetForm()
    setEditID()
    clearValue()
  }

  const [productLocationOptionsData, setProductLocationOptionsData] = useState(
    []
  )

  const [locationValue, setLocationValue] = useState({})

  const getLocation = () => {
    const { roleId = {}, locationIds = [] } = getUser()

    return {
      locationIds: {
        $in: locationIds.map((x = {}) => x._id),
      },
    }
  }

  const getMatchLocation = () => {
    const { roleId = {}, locationIds = [] } = getUser()
    return {
      match: {
        locationId: {
          $in: locationIds.map((x = {}) => x._id),
        },
      },
    }
  }

  useEffect(() => {
    getAllPages()
  }, [])

  const getAllPages = async () => {
    setLoading(true)
    const value = getLocation()
    const location = getMatchLocation()
    try {
      const data = {
        query: {},
        options: {
          select: [],
          populate: [{ path: 'locationIds' }],
          sort: {
            createdAt: -1,
          },
        },
      }

      await commonApi({
        action: 'adminPageList',
        data,
      }).then(({ DATA = {} }) => {
        setDataQueryOptions({ query: data.query, options: data.options })
        setPaginator(DATA.paginator)
        setPages(DATA.data)
        console.log(DATA.data)
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(`activePage`, activePage)

    // console.log(`editID`, editID)

    if (activePage && !editID) {
      loadOptionsProductLocation()
    }
  }, [activePage, editID])

  const loadOptionsProductLocation = async (inputValue, callback) => {
    let locations = []
    const {
      locationIds = [],
      roleId: { code },
    } = getUser()
    if (code !== USER_ROLE_TYPE.SUPER_ADMIN) {
      let m = {
        label: locationIds?.[0]?.locationName,
        value: locationIds?.[0]?._id,
      }
      locations = [m]
      setProductLocationOptionsData(locations)
      formik.setFieldValue('locationId', m.value)
      setLocationValue(m)
    } else {
      const data = {
        query: {},
        options: {
          select: [],
        },
      }
      const searchData = {
        query: {
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
        },
      }
      const sendData = inputValue === undefined ? data : searchData
      await commonApi({
        action: 'findLocation',
        data: sendData,
      }).then(({ DATA = {} }) => {
        const location = DATA.data?.map((data = {}) => ({
          value: data.id,
          label: data.locationName,
        }))
        callback?.(location)
        setProductLocationOptionsData(location)
      })
    }
  }

  const onClickSubmit = async (values = {}) => {
    console.log(`values`, values)

    setSubmitLoading(true)
    try {
      const data = {
        body: values.body,
        locationIds: [values.locationId],
      }

      await commonApi({
        parameters: editID ? [editID] : [],
        action: editID ? 'updateAdminPage' : 'addAdminPage',
        data,
      }).then(async ({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        await closeBtn()
        await getAllPages()
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      locationId: '',
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string().required('Please enter the content.'),
      locationId: Yup.string().required('You must enter the content.'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const editForm = async id => {
    await setActivePage(true)

    setEditID(id)

    createForm()

    try {
      await commonApi({
        action: 'findAdminPage',
        parameters: [id],
        data: {
          options: {
            select: [],
            populate: ['locationIds'],
          },
        },
      }).then(({ DATA = {} }) => {
        const data = DATA

        console.log(data)

        let locations = []

        setEditID(data.id)
        formik.setValues({
          body: data.body,
          locationId: data?.locationIds?.[0],
        })

        let m = {
          label: data?.locationIds?.[0]?.locationName,
          value: data?.locationIds?.[0]?._id,
        }
        locations = [m]
        setProductLocationOptionsData(locations)
        formik.setFieldValue('locationId', m.value)

        // const location = {
        //   value: data?.locationIds?.[0],
        // }
        // setProductLocationOptionsData([location])
        // formik.setFieldValue('locationId', m.value)
        setLocationValue(m)
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const openDeleteModal = async id => {
    await deletePages()
  }

  const deletePage = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    try {
      await commonApi({
        action: 'deleteAdminPage',
        parameters: [id],
      }).then(async ({ DATA = {}, MESSAGE }) => {
        toast.success(MESSAGE)
        await closeBtn()
      })
    } finally {
      await getAllPages()
      setLoading(false)
    }
  }

  return {
    loading,
    editID,
    createForm,
    closeBtn,
    editForm,
    openDeleteModal,
    deletePages,
    activePage,
    formik,
    submitLoading,
    // Pagination State
    pages,
    paginator,
    setPaginator,
    setPages,
    setLoading,
    dataQueryOptions,
    // Dropdown State and Method
    loadOptionsProductLocation,
    productLocationOptionsData,
    setProductLocationOptionsData,
    deletePage,

    locationValue,
    setLocationValue,
  }
}

export default usePage
