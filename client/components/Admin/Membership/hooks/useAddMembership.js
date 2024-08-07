import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import commonApi from '@/api/common'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const intervalDuration = {
  MONTH: 'month',
  YEAR: 'year',
}

const durationOptions = Object.entries(intervalDuration).map(
  ([key, value]) => ({
    label: String(value),
    value: String(value),
  })
)

const initialValues = {
  name: '',
  description: '',
  interval: '',
  price: '',
  categories: [
    {
      _id: '',
      quota: '',
    },
  ],
}

const validationSchema = Yup.object({
  name: Yup.string().required('Please enter name.'),
  description: Yup.string().required('Please enter description.'),
  interval: Yup.string().required('Please enter duration.'),
  price: Yup.string().required('Please enter price.'),
  categories: Yup.array().of(
    Yup.object().shape({
      _id: Yup.string().required('Category is required'),
      quota: Yup.string().required('Quota is required'),
    })
  ),
})

const useAddMembership = props => {
  const [loading, setLoading] = useState(false)

  const [editID, setEditID] = useState('')

  const closeBtn = handleReset => {
    props.setActiveMembership(false)
    const addMembership = document.getElementById('AddMembershipModal')
    addMembership.classList.remove('active')
    handleReset

    setEditID('')
  }

  const openMemeberShipModal = async () => {
    await props.setActiveMembership(true)
    const addMembership = document.getElementById('AddMembershipModal')
    addMembership.classList.add('active')
  }

  const [serviceOptionsData, setServiceOptionsData] = useState([])

  const loadOptionsService = async (inputValue, callback) => {
    const data = {
      query: {
        isActive: true,
      },
      options: {
        select: [],
      },
    }
    await commonApi({
      action: 'findCategory',
      data,
    }).then(({ DATA }) => {
      const data = DATA?.data
      // const filterCategory = data?.filter(d => d?.type?.code === 'SERVICE')
      const category = data?.map(data => ({
        value: data?.id,
        label: data?.name,
      }))
      callback?.(category)
      setServiceOptionsData(category)
    })
  }

  useEffect(() => {
    if (props.activeMembership) {
      loadOptionsService()
    }
  }, [props.activeMembership])

  useEffect(() => {
    if (props.editData) {
      openEdit(props.editData)
    }
  }, [props.editData])

  const openEdit = async id => {
    if (!id) return false
    await openMemeberShipModal()

    setLoading(true)
    try {
      const data = {
        query: {
          _id: id,
        },
        options: {
          select: [],
        },
      }
      await commonApi({
        action: 'findMembership',
        data,
      }).then(async ({ DATA = {} }) => {
        const { data = [] } = DATA
        const {
          id,
          name,
          description,
          interval = {},
          price,
          categories = [],
        } = data?.[0]

        let categoriesData = []
        categories.forEach((plan = {}) => {
          categoriesData = [
            ...categoriesData,
            { _id: plan._id, quota: plan.quota },
          ]
        })

        await props.setEditData()

        formik.setValues({
          name: name,
          description: description,
          price: price,
          interval: interval,
          categories: categoriesData,
        })

        setEditID(id)
      })
    } finally {
      setLoading(false)
    }
  }

  const onClickSubmit = async (values, setSubmitting) => {
    let categories = []
    await values.categories.forEach((plan = {}) => {
      console.log(plan)
      categories = [
        ...categories,
        {
          _id: plan._id,
          quota: plan.quota,
        },
      ]
    })
    const data = {
      ...values,
      categories,
      price: values?.price?.toString(),
    }
    if (data) {
      setLoading(true)
      try {
        await commonApi({
          parameters: editID ? [editID] : [],
          action: editID ? 'updateMembership' : 'addMembership',
          data,
        }).then(async ({ DATA, MESSAGE }) => {
          toast.success(MESSAGE)
          closeBtn()
          await props.getAllMemberShipData()
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      onClickSubmit(values)
      resetForm()
    },
    enableReinitialize: true,
  })

  const getItems = useCallback(
    () => formik.values.categories,
    [formik.values.categories]
  )

  const addItem = useCallback(() => {
    const categories = getItems()
    // Add a new item if there are no items or the last item is filled
    formik.setFieldValue('categories', [
      ...categories,
      { _id: '', quota: '' }, // no need for id
    ])
  }, [getItems, formik.setFieldValue])

  const removeItem = useCallback(
    index => {
      const categories = getItems()
      const newCategries = [...categories]
      newCategries.splice(index, 1) // Remove item by index
      formik.setFieldValue('categories', newCategries)
    },
    [getItems, formik.setFieldValue]
  )

  return {
    loading,
    formik,
    addItem,
    removeItem,
    durationOptions,
    closeBtn,
    editID,
    // Dropdown State
    serviceOptionsData,
  }
}

export default useAddMembership
