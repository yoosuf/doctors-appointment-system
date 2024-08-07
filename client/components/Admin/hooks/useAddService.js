import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import commonApi from '@/api/common'
import { REQUIRED_FIELD } from '@/utils/constant'
import toast from 'react-hot-toast'

const useAddService = props => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState([])
  const [serviceLocationOptionsData, setServiceLocationOptionsData] = useState([])
  const [serviceCategoryOptionsData, setServiceCategoryOptionsData] = useState([])
  const [timeDuration, setTimeDuration] = useState("")

  const asyncSelectRefServiceCategory = useRef(null)
  const asyncSelectRefServiceLocation = useRef(null)
  const asyncTimeDurationRef = useRef(null)

  const [selectedCategoryValue, setSelectedCategoryValue] = useState({})

  const onClear = () => {
    setSelectedCategoryValue({})
    asyncSelectRefServiceLocation.current.select.select.clearValue()
  }

  const closeBtn = () => {
    props.setActiveService(false)
    const AddService = document.getElementById('AddServiceModal')
    AddService.classList.remove('active')
    formik.resetForm()
    setTimeDuration('')
    setImage([])
    setServiceLocationOptionsData([])
    setServiceCategoryOptionsData([])
    const modalBody = document.getElementById('top-div-service')
    modalBody.scrollTop = 0
    onClear()
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
    }).then(({ DATA = {} }) => {
      const data = DATA.data
      const filterCategory = data?.filter(
        (d = {}) => d.type?.code === 'SERVICE'
      )
      const category = filterCategory?.map((data = {}) => ({
        value: data.id,
        label: data.name,
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

  const onClickSubmit = async values => {
    setLoading(true)
    try {
      const data = {
        ...values,
        locationId: values?.locationId?.find(x => x.value !== 'all')
          ? values?.locationId?.map(x => x.value)
          : undefined,
        allLocation: values?.locationId?.find(x => x.value === 'all')
          ? true
          : undefined,
        price: values?.price?.toString(),
      }

      await commonApi({
        action: 'addService',
        data,
      }).then(async ({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        closeBtn()
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      categoryId: '',
      locationId: [],
      imageIds: [],
      timeDuration: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter name."),
      description: Yup.string().required("Please enter description."),
      price: Yup.string().required("Please enter price."),
      categoryId: Yup.string().required("Please enter category."),
      locationId: Yup.array().min(1, "Please select location.").required("Please enter location."),
      imageIds: Yup.array().min(1, "Please select image.").required("Please select image."),
      timeDuration: Yup.string().required("Please enter Time duration."),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    formik,
    loading,
    image,
    setImage,
    closeBtn,
    // Service Category Dropdown State
    loadOptionsServiceCategory,
    serviceCategoryOptionsData,
    // Service Location Dropdown State
    loadOptionsServiceLocation,
    serviceLocationOptionsData,
    // Ref State
    selectedCategoryValue,
    setSelectedCategoryValue,
    asyncSelectRefServiceLocation,
    timeDuration,
    setTimeDuration,
  }
}

export default useAddService
