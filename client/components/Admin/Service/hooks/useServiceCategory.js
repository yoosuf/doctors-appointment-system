import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import commonApi from '@/api/common'
import {
  COMPONENT_ACCESS,
  MASTER_CODE,
  REQUIRED_FIELD,
  ROUTE_ACCESS,
} from '@/utils/constant'
import toast from 'react-hot-toast'
import { componentAccess } from '@/utils/helper'

const allData = {
  query: {},
  options: {
    select: [],
  },
}

const useServiceCategory = ({
  activeServiceCategory,
  setActiveServiceCategory,
}) => {
  const [loading, setLoading] = useState(false)
  const [editID, setEditID] = useState()

  const [deleteID, setDeleteID] = useState()
  const [label, setLabel] = useState()

  const [serviceCategory, setServiceCategory] = useState([])

  const [isActiveDelete, setIsActiveDelete] = useState(false)

  const [submitLoading, setSubmitLoading] = useState(false)

  const closeModal = () => {
    setDeleteID(), setIsActiveDelete(false), setLabel()
  }

  const openModal = data => {
    setDeleteID(data?.id), setLabel(data?.name), setIsActiveDelete(true)
  }

  const closeBtn = async () => {
    setActiveServiceCategory(false)
    const ServiceCategory = document.getElementById('AddCategoryModal')
    ServiceCategory.classList.remove('active')
    await setEditID()
    setServiceCategoryValue({})
    formik.resetForm()
  }

  const openCategoryModal = () => {
    setActiveServiceCategory(true)
    const ServiceCategory = document.getElementById('AddCategoryModal')
    ServiceCategory.classList.add('active')
  }

  useEffect(() => {
    componentAccess(ROUTE_ACCESS.CATEGORY, COMPONENT_ACCESS.findAll) &&
      getAllServiceCategory()
  }, [])

  const getAllServiceCategory = async () => {
    setLoading(true)
    try {
      const data = {
        query: {
          isActive: true,
        },
        options: {
          sort: {
            createdAt: -1,
          },
          select: [],
        },
      }
      await commonApi({
        action: 'findCategory',
        data,
      }).then(({ DATA = {} }) => {
        setServiceCategory(DATA.data)
      })
    } finally {
      setLoading(false)
    }
  }

  const [serviceCategoryOptionsData, setServiceCategoryOptionsData] = useState(
    []
  )

  const [serviceCategoryValue, setServiceCategoryValue] = useState({})

  useEffect(() => {
    if (activeServiceCategory) {
      loadOptionsServiceCategory()
    }
  }, [activeServiceCategory])

  const loadOptionsServiceCategory = async (inputValue, callback) => {
    const data = {
      query: {
        code: [MASTER_CODE.SERVICE_TYPE],
      },
      options: {
        select: [],
      },
    }
    await commonApi({
      action: 'findMaster',
      data,
    }).then(async ({ DATA = [] }) => {
      const category = DATA?.[0]?.subMasters
      const serviceCategoryData = category?.map((data = {}) => ({
        value: data._id,
        label: data.name,
      }))
      setServiceCategoryOptionsData(serviceCategoryData)
      callback?.(serviceCategoryData)
    })
  }

  const onClickEdit = async data => {
    if (data) {
      openCategoryModal()

      setSubmitLoading(true)
      try {
        const sendData = {
          query: {
            _id: data?.id,
          },
          options: {
            select: [],
            populate: ['type'],
          },
        }
        await commonApi({
          action: 'findCategory',
          data: sendData,
        }).then(({ DATA = {} }) => {
          const { data = [] } = DATA
          const detail = data?.[0]
          setEditID(detail?.id)

          formik.setFieldValue('name', detail?.name)
          formik.setFieldValue('description', detail?.description)
          formik.setFieldValue('servedBy', detail?.servedBy)
        })
      } finally {
        setSubmitLoading(false)
      }
    }
  }

  const onClickSubmit = async values => {

    console.log(values);

    setSubmitLoading(true)
    try {
      await commonApi({
        parameters: editID ? [editID] : [],
        action: editID ? 'updateCategory' : 'addCategory',
        data: values,
      }).then(async ({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        await closeBtn()
        await getAllServiceCategory()
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      servedBy: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(REQUIRED_FIELD),
      description: Yup.string().required(REQUIRED_FIELD),
      servedBy: Yup.string()
        .required('Please choose an option.')
        .oneOf(['NURSE', 'CHIROPRACTOR'])
        .default('CHIROPRACTOR'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const onClickDelete = async id => {
    if (!id) return false
    const data = {
      isActive: false,
    }

    await commonApi({
      parameters: [id],
      action: 'updateCategory',
      data,
    }).then(async ({ DATA }) => {
      closeModal()
      await getAllServiceCategory()
    })
  }

  return {
    loading,
    submitLoading,
    closeBtn,
    formik,
    serviceCategoryOptionsData,
    serviceCategoryValue,
    setServiceCategoryValue,
    serviceCategory,
    onClickEdit,
    editID,
    closeModal,
    openModal,
    isActiveDelete,
    onClickDelete,
    label,
    deleteID,
  }
}

export default useServiceCategory
