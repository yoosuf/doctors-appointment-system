import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import commonApi from '@/api/common'
import toast from 'react-hot-toast'

const useSubMaster = () => {
  const [loading, setLoading] = useState(false)
  const [masterData, setMasterData] = useState([])
  const [subMasterTableData, setSubMasterTableData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState({})
  const [parentId, setParentId] = useState()
  const [editID, setEditID] = useState()
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [label, setLabel] = useState()
  const [deleteID, setDeleteID] = useState()
  const [sidebarLoader, setSidebarLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [parentCode, setParentCode] = useState()

  const openSubMasterModal = () => {
    const openSubMaster = document.getElementById('AddSubMasterFormModal')
    openSubMaster.classList.add('active')
  }

  const closeBtn = () => {
    const openAddCustomer = document.getElementById('AddSubMasterFormModal')
    openAddCustomer.classList.remove('active')
    formik.resetForm()
    setEditID()
  }

  const openModal = value => {
    setDeleteModal(true)
    setDeleteID(value.id)
    setLabel(value.name)
  }

  const closeModal = () => {
    setDeleteID(), setLabel(), setDeleteModal(false)
  }

  const allMasterData = async () => {
    const data = {
      query: {
        parentId: {
          $exists: false,
        },
      },
      options: {
        sort: {
          updatedAt: -1,
        },
        select: [],
        page: paginator?.currentPage || 1,
        offset: (paginator?.currentPage - 1) * Number(paginator?.perPage) || 0,
        limit: paginator?.perPage || 10,
        pagination: true,
      },
    }
    setSidebarLoading(true)
    try {
      await commonApi({
        action: 'findMaster',
        data,
      }).then(({ DATA }) => {
        setMasterData(DATA?.data)
        setParentId(DATA?.data?.[0]?.id)
        setParentCode(DATA?.data?.[0]?.code)
      })
    } finally {
      setSidebarLoading(false)
    }
  }

  useEffect(() => {
    allMasterData()
  }, [])

  const getInitialTableData = async (
    masterData,
    searchVal = searchValue,
    intialPage,
    deleteStatus
  ) => {
    const data = {
      query: {
        parentId: parentId || masterData?.[0]?.id,
      },
      options: {
        sort: {
          updatedAt: -1,
        },
        select: [],
      },
    }

    if (searchVal) {
      data.query.$or = [
        {
          name: {
            $regex: searchVal,
            $options: 'i',
          },
        },
        {
          code: {
            $regex: searchVal,
            $options: 'i',
          },
        },
      ]
    }

    if (intialPage || searchVal) {
      data.options = {
        ...data.options,
        offset: 0,
        page: 1,
      }
    }

    if (deleteStatus && paginator?.itemCount % 10 === 1) {
      data.options = {
        ...data.options,
        page: paginator?.currentPage - 1 || 1,
        offset:
          (paginator?.currentPage - 2) * Number(paginator?.perPage) > 0
            ? (paginator?.currentPage - 2) * Number(paginator?.perPage)
            : 0,
      }
    }

    setDataQueryOptions({ query: data.query, options: data.options })
    if (data) {
      setLoading(true)
      try {
        await commonApi({
          action: 'findMaster',
          method: 'post',
          data,
        }).then(({ DATA }) => {
          setSubMasterTableData(DATA?.data)
          setPaginator(DATA?.paginator)
        })
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (masterData?.length && parentId) {
      getInitialTableData(masterData, null)
    } else {
      setSubMasterTableData([])
    }
  }, [masterData, parentId])

  const openEdit = async id => {
    if (!id) return false
    openSubMasterModal()

    setSubmitLoading(true)
    try {
      await commonApi({
        parameters: id ? [id] : [],
        action: 'getMaster',
      }).then(({ DATA }) => {
        setEditID(DATA.id)
        formik.setFieldValue('name', DATA.name)
        formik.setFieldValue('code', DATA.code)
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const onClickDelete = async id => {
    if (!id) return false

    await commonApi({
      parameters: [id],
      action: 'deleteMaster',
    }).then(async ({ MESSAGE }) => {
      closeModal()
      await getInitialTableData(undefined, searchValue, false, true)

      toast.success(MESSAGE)
    })
  }

  const onChangeInputSearch = async e => {
    const searchValue = e.target.value
    setSidebarLoading(true)
    try {
      if (searchValue) {
        const data = {
          query: {
            parentId: {
              $exists: false,
            },
            $or: [
              {
                name: {
                  $regex: searchValue,
                  $options: 'i',
                },
              },
              {
                code: {
                  $regex: searchValue,
                  $options: 'i',
                },
              },
            ],
          },
          options: {
            select: [],
          },
        }
        await commonApi({
          action: 'findMaster',
          data,
        }).then(({ DATA = {} }) => {
          if (DATA.data?.length) {
            setMasterData(DATA.data)
            setParentId(DATA.data?.[0]?.id)
            setParentCode(DATA.data?.[0]?.code)
          } else {
            setMasterData([])
            setSubMasterTableData([])
            setParentId()
            setParentCode()
          }
        })
      } else {
        allMasterData()
      }
    } finally {
      setSidebarLoading(false)
    }
  }

  const onClickSubmit = async values => {
    const data = {
      ...values,
      parentId: parentId,
      parentCode: parentCode,
    }

    if (data) {
      setSubmitLoading(true)
      try {
        await commonApi({
          parameters: editID ? [editID] : [],
          action: editID ? 'updateMaster' : 'addMaster',
          data: data,
        }).then(async ({ DATA, MESSAGE }) => {
          closeBtn()
          await setEditID()
          await getInitialTableData(undefined, searchValue, true)
          toast.success(MESSAGE)
        })
      } finally {
        setSubmitLoading(false)
      }
    }
  }

  const onChangeActive = async value => {
    const { id, isActive } = value
    const data = {
      isActive: isActive === true ? false : true,
    }
    if (data) {
      setLoading(true)
      try {
        await commonApi({
          parameters: [id],
          action: 'partiallyUpdateMaster',
          data,
        }).then(({ DATA, MESSAGE }) => {
          toast.success(MESSAGE)
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const onChangeSearch = async e => {
    setSearchValue(e.target.value)
    getInitialTableData(undefined, e.target.value)
  }

  const validate = values => {
    const errors = {}

    if (!values.name) {
      errors.name = 'This field is required'
    }

    if (!values.code) {
      errors.code = 'This field is required'
    } else if (!/^[\dA-Z_|]{2,}$/u.test(values.code)) {
      errors.code = 'Only use A-Z, 0-9, _'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
    },
    validate,
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    formik,
    loading,
    sidebarLoader,
    submitLoading,
    openSubMasterModal,
    closeBtn,
    subMasterTableData,
    masterData,
    parentId,
    setParentId,
    setParentCode,
    onChangeInputSearch,
    openEdit,
    editID,
    onChangeSearch,
    onChangeActive,
    openDeleteModal,
    openModal,
    closeModal,
    onClickDelete,
    label,
    deleteID,
    paginator,
    setSearchValue,
    searchValue,
    setPaginator,
    setSubMasterTableData,
    setLoading,
    dataQueryOptions,
  }
}

export default useSubMaster
