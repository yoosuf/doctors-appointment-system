import commonApi from '@/api/common'
import { REQUIRED_FIELD, SERVICES_TYPE } from '@/utils/constant'
import { useFormik } from 'formik'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

const useAddService = props => {
  const asyncSelectRefServiceCategory = useRef(null)
  const asyncSelectRefServiceLocation = useRef(null)
  const asyncTimeDurationRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [timeDuration, setTimeDuration] = useState('')
  const [serviceLocationOptionsData, setServiceLocationOptionsData] = useState(
    []
  )
  const [serviceCategoryOptionsData, setServiceCategoryOptionsData] = useState(
    []
  )
  const [locationValue, setLocationValue] = useState([])
  const [categoryValue, setCategoryValue] = useState({})
  const [showDuration, setShowDuration] = useState(false)

  const closeBtn = async () => {
    await props.setActiveService(false)
    await props?.setEditData()
    onClear()
    setTimeDuration('')
    formik.resetForm()
    const AddService = document.getElementById('AddServicesModal')
    AddService.classList.remove('active')
  }

  const openServiceModal = () => {
    props.setActiveService(true)
    const AddService = document.getElementById('AddServicesModal')
    AddService.classList.add('active')
  }

  const onClear = () => {
    asyncSelectRefServiceCategory?.current?.select?.select?.clearValue()
    asyncSelectRefServiceLocation?.current?.select?.select?.clearValue()
    asyncTimeDurationRef.current.select.select.clearValue()
    setLocationValue([])
    setCategoryValue({})
  }

  const loadOptionsServiceCategory = async (inputValue, callback) => {
    const data = {
      query: {
        isActive: true,
      },
      options: {
        select: [],
        populate: ['type'],
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
      setServiceCategoryOptionsData(category)
    })
  }

  const loadOptionsServiceLocation = async (inputValue, callback) => {
    const data = {
      query: {},
      options: {
        select: [],
      },
    }
    await commonApi({
      action: 'findLocation',
      data,
    }).then(({ DATA }) => {
      const location = DATA?.data?.map(data => ({
        value: data?.id,
        label: data?.locationName,
      }))
      const allLoc = [
        { label: 'Assign service to all locations', value: 'all' },
        ...location,
      ]
      callback?.(allLoc)
      setServiceLocationOptionsData(allLoc)
    })
  }

  useEffect(() => {
    if (props.activeService) {
      loadOptionsServiceCategory()
      loadOptionsServiceLocation()
    }
  }, [props.activeService])

  const onClickEdit = async value => {
    if (!value) return false
    openServiceModal()

    setLoading(true)
    try {
      const data = {
        query: {
          _id: value?.id,
        },
        options: {
          select: [],
          populate: ['categoryId', 'locationIds'],
        },
      }
      await commonApi({
        action: 'findService',
        data,
      }).then(async ({ DATA }) => {
        const detail = DATA?.data?.[0]

        let locationIds = []

        await detail?.locationIds?.map(l => {
          locationIds = [...locationIds, l?._id]
        })

        await detail?.locationIds?.map(async location => {
          await setLocationValue(locationValue => [
            ...locationValue,
            {
              label: location?.locationName,
              value: location?._id,
            },
          ])
        })

        formik.setFieldValue('locationIds', locationIds)
        formik.setFieldValue('name', detail?.name)
        formik.setFieldValue('description', detail?.description)
        formik.setFieldValue('categoryId', detail?.categoryId?._id)
        formik.setFieldValue('price', detail?.price)
        formik.setFieldValue('timeDuration', detail?.timeDuration)
        formik.setFieldValue('items', detail?.items)

        // formik.setFieldValue('servedBy', detail?.servedBy)

        await setCategoryValue({
          label: detail?.categoryId?.name,
          value: detail?.categoryId?._id,
        })

        if (detail?.categoryId?.name === SERVICES_TYPE.IV_THERAPHIES) {
          setShowDuration(true)
        } else {
          setShowDuration(false)
        }

        setTimeDuration({
          label:
            detail?.timeDuration === 90
              ? '90 Min'
              : detail?.timeDuration === 60
              ? '60 Min'
              : '30 Min',
          value: detail?.timeDuration?.toString() || '30',
        })
        await loadOptionsServiceCategory()
        await loadOptionsServiceLocation()
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (props.editData) {
      onClickEdit(props.editData)
    }
  }, [props.editData])

  const onClickSubmit = async values => {
    setLoading(true)
    try {
      const data = {
        ...values,
        locationIds: values?.locationIds?.find(x => x !== 'all')
          ? values?.locationIds
          : undefined,
        allLocation: values?.locationIds?.find(x => x === 'all')
          ? true
          : undefined,
        price: values?.price?.toString(),
      }

      await commonApi({
        parameters: props?.editData ? [props?.editData?.id] : [],
        action: props?.editData ? 'updateService' : 'addService',
        data,
      }).then(async ({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        await closeBtn()
        await props?.getAllServices()
      })
    } finally {
      setLoading(false)
    }
  }

  const initialValues = {
    categoryId: '',
    locationIds: [],
    name: '',
    description: '',
    items: [{ name: '', price: '' }],
    price: '',
    timeDuration: '',
    // servedBy: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter name.'),
    description: Yup.string().required('Please enter description.'),
    items: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Item name is required'),
          price: Yup.number().positive('Price must be positive').nullable(true), // Price is nullable
        })
      )
      .notRequired(),
    price: Yup.string().required('Please enter price.'),
    categoryId: Yup.string().required('Please select category.'),
    locationIds: Yup.array()
      .min(1, REQUIRED_FIELD)
      .required('Please select location.'),
    timeDuration: Yup.string().required('Please enter time duration.'),
    // servedBy: Yup.string()
    //   .required('Please choose an option.')
    //   .oneOf(['NURSE', 'CHIROPRACTOR'])
    //   .default('CHIROPRACTOR'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await onClickSubmit(values)
      } catch (error) {
        formikHelpers.resetForm()
      } finally {
        formikHelpers.setSubmitting(false)
      }
    },
  })

  const getItems = useCallback(() => formik.values.items, [formik.values.items])

  const addItem = useCallback(() => {
    const items = getItems()
    // Add a new item if there are no items or the last item is filled
    if (items.length === 0 || items[items.length - 1].name !== '') {
      formik.setFieldValue('items', [
        ...items,
        { name: '', price: '' }, // no need for id
      ])
    }
  }, [getItems, formik.setFieldValue])

  const removeItem = useCallback(
    index => {
      const items = getItems()
      const newItems = [...items]
      newItems.splice(index, 1) // Remove item by index
      formik.setFieldValue('items', newItems)
    },
    [getItems, formik.setFieldValue]
  )

  const isLastItemFilled = useMemo(() => {
    const items = getItems()
    const lastItem = items[items.length - 1]
    return lastItem && lastItem.name !== ''
  }, [getItems])

  const onChangeLocation = async data => {
    let arr = []
    if (data.find(x => x.value === 'all') && data[0]?.value !== 'all') {
      setLocationValue({
        label: 'Assign service to all locations',
        value: 'all',
      })
      formik.setFieldValue('locationIds', ['all'])
    } else {
      if (data.find(x => x.value === 'all') && data.length === 1) {
        setLocationValue({
          label: 'Assign service to all locations',
          value: 'all',
        })
        formik.setFieldValue('locationIds', ['all'])
      } else {
        setLocationValue(data.filter(x => x.value !== 'all'))
        await data?.map(d => {
          arr = [...arr, d?.value]
        })
        formik.setFieldValue(
          'locationIds',
          arr.filter(x => x !== 'all')
        )
      }
    }
  }

  const onChangeServiceCategory = async data => {
    formik.setFieldValue('categoryId', data?.value)
    formik.setFieldValue('timeDuration', '')
    setTimeDuration('')
    await setCategoryValue({
      label: data?.label,
      value: data?.value,
    })
  }

  return {
    formik,
    loading,
    closeBtn,
    // Service Category Dropdown State
    loadOptionsServiceCategory,
    serviceCategoryOptionsData,
    categoryValue,
    setCategoryValue,
    // Service Location Dropdown State
    loadOptionsServiceLocation,
    serviceLocationOptionsData,
    locationValue,
    setLocationValue,
    // Ref State
    asyncSelectRefServiceCategory,
    asyncSelectRefServiceLocation,
    onChangeLocation,
    onChangeServiceCategory,
    asyncTimeDurationRef,
    timeDuration,
    setTimeDuration,
    showDuration,
    setShowDuration,
    addItem,
    removeItem,
    isLastItemFilled,
  }
}

export default useAddService
