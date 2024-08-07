import commonApi from '@/api/common'
import {
  EMAIL_VALIDATION,
  REQUIRED_FIELD,
  USER_ROLE_TYPE
} from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

const useCustomerAccount = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [isActive, setActive] = useState(true)
  const [activeEmailNotification, setActiveEmailNotification] = useState(true)

  const [locationOptionsData, setLocationOptionsData] = useState([])
  const [selectLocationValue, setSelectLocationValue] = useState({})

  useEffect(() => {
    if (id) {
      getCustomerData()

      const {
        roleId: { code },
      } = getUser()
      if (
        code === USER_ROLE_TYPE.SUPER_ADMIN ||
        code === USER_ROLE_TYPE.OWNER
      ) {
        loadOptionsLocation()
      }
    }
  }, [id])

  const getCustomerData = async () => {
    setLoading(true)
    try {
      const data = {
        query: {
          _id: id,
        },
        options: {
          select: [
            'isActive',
            'email',
            'locationIds',
            'emailNotifications',
          ],
          populate: [{ path: 'locationIds' }],
        },
      }
      await commonApi({
        // parameters: [id],
        action: 'getPatientList',
        data,
      }).then(({ DATA = {} }) => {
        const data = DATA.data?.[0]
        const { locationIds = [] } = DATA.data?.[0]
        formik.setValues({
          email: data?.email,
          locationIds: data?.locationIds?.[0]?._id,
          isActive: data?.isActive
        })

        if (locationIds.length) {
          const location = {
            label: locationIds?.[0]?.locationName,
            value: locationIds?.[0]?._id,
          }
          setSelectLocationValue(location)
          // setLocationOptionsData([location])
        }

        // setActive(data.isActive)
        setActiveEmailNotification(data.emailNotifications)
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      locationIds: '',
      isActive: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(EMAIL_VALIDATION, 'Invalid email address')
        .required("Please enter email."),
      locationIds: Yup.string().required("Please select location."),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  const onClickSubmit = (values = {}) => {
    const data = {
      ...values,
      locationIds: [values.locationIds],
      // isActive: isActive
    }
    commonApi({
      parameters: [id],
      action: 'updateAdminPatient',
      data,
    }).then(({ MESSAGE }) => {
      toast.success(MESSAGE)
    })
  }

  const onClickNotificationChange = e => {
    e.preventDefault()
    const data = {
      emailNotifications: activeEmailNotification,
    }
    commonApi({
      parameters: [id],
      action: 'updateAdminPatient',
      data,
    }).then(({ MESSAGE }) => {
      toast.success(MESSAGE)
    })
  }

  const loadOptionsLocation = async (inputValue, callback = () => { }) => {
    const data = {
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

    const allData = {
      query: {
        // isDeleted: false,
      },
      options: {
        select: [],
        sort: {
          createdAt: -1,
        },
      },
    }

    const sendData = inputValue === undefined ? allData : data

    await commonApi({
      action: 'findLocation',
      data: sendData,
    }).then(({ DATA = {} }) => {
      let location = []
      DATA.data?.forEach((loc = {}) => {
        location = [
          ...location,
          {
            label: loc.locationName,
            value: loc.id,
          },
        ]
      })
      setLocationOptionsData(location)
      callback(location)
    })
  }

  return {
    loading,
    formik,
    onClickNotificationChange,
    isActive,
    setActive,
    activeEmailNotification,
    setActiveEmailNotification,
    // Location Dropdown State
    locationOptionsData,
    setLocationOptionsData,
    selectLocationValue,
    setSelectLocationValue,
    loadOptionsLocation,
  }
}

export default useCustomerAccount
