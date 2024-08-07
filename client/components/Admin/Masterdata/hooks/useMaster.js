import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import commonApi from '@/api/common'
import toast from 'react-hot-toast'
import { REQUIRED_FIELD } from '@/utils/constant'

const useMaster = () => {
  const [loading, setLoading] = useState(false)
  const [editID, setEditID] = useState()
  const [masterTableData, setMasterTableData] = useState([])
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [label, setLabel] = useState()
  const [deleteID, setDeleteID] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState({})

  const [submitLoading, setSubmitLoading] = useState(false)

  const openModal = value => {
    setDeleteModal(true)
    setDeleteID(value.id)
    setLabel(value.name)
  }

  const closeModal = () => {
    setDeleteID(), setLabel(), setDeleteModal(false)
  }

  const openMasterModal = () => {
    const openMaster = document.getElementById('AddMasterFormModal')
    openMaster.classList.add('active')
  }

  const closeBtn = () => {
    const openAddCustomer = document.getElementById('AddMasterFormModal')
    openAddCustomer.classList.remove('active')
    formik.resetForm()
    setEditID()
  }

  const getInitialTableData = async (searchVal, intialPage, deleteStatus) => {
    setLoading(true)
    try {
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
          offset:
            (paginator?.currentPage - 1) * Number(paginator?.perPage) || 0,
          limit: paginator?.perPage || 10,
          pagination: true,
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
      await commonApi({
        action: 'findMaster',
        data,
      }).then(({ DATA }) => {
        setMasterTableData(DATA?.data)
        setPaginator(DATA.paginator)
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getInitialTableData()
  }, [])

  const onClickSubmit = async values => {
    setSubmitLoading(true)
    const data = {
      ...values,
      isActive: true,
    }
    try {
      await commonApi({
        parameters: editID ? [editID] : [],
        action: editID ? 'updateMaster' : 'addMaster',
        data,
      }).then(async ({ DATA, MESSAGE }) => {
        closeBtn()
        await setEditID()
        await getInitialTableData(searchValue, true)
        toast.success(MESSAGE)
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const openEdit = async id => {
    if (!id) return false

    openMasterModal()

    setSubmitLoading(true)
    try {
      await commonApi({
        parameters: id ? [id] : [],
        action: 'getMaster',
      }).then(({ DATA }) => {
        formik.setFieldValue('name', DATA.name)
        formik.setFieldValue('code', DATA.code)

        setEditID(DATA.id)
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
    }).then(({ MESSAGE }) => {
      getInitialTableData(searchValue, false, true)
      closeModal()
      toast.success(MESSAGE)
    })
  }

  const onChangeActive = async value => {
    const { id, isActive } = value
    const data = {
      isActive: isActive === true ? false : true,
    }
    setLoading(true)
    if (data) {
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
    getInitialTableData(e.target.value)
  }

  const validate = values => {
    const errors = {}

    if (!values.name) {
      errors.name = REQUIRED_FIELD
    }

    if (!values.code) {
      errors.code = REQUIRED_FIELD
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
    closeBtn,
    masterTableData,
    openMasterModal,
    loading,
    submitLoading,
    onChangeSearch,
    openEdit,
    onChangeActive,
    editID,
    openDeleteModal,
    openModal,
    closeModal,
    onClickDelete,
    label,
    deleteID,
    paginator,
    setPaginator,
    setMasterTableData,
    setLoading,
    dataQueryOptions,
  }
}

export default useMaster
