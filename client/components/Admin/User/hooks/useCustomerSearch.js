import { useEffect, useState } from 'react'
import commonApi from '@/api/common'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const useCustomerSearch = () => {
  const [id, setId] = useState()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [searchResultData, setSearchResultData] = useState({})
  const [loading, setLoading] = useState(false)

  const onClear = () => {
    setFirstName('')
    setLastName('')
    setDob()
    setSearchResultData({})
  }

  const formatDate = date => {
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const onClickSubmit = async value => {
    const formattedDate = formatDate(value?.dob)
    // console.log(formattedDate);
    // step 3: format the data for submission
    const formatedData = {
      query: {
        firstName: value?.firstName,
        lastName: value?.lastName,
        dob: formattedDate,
      },
    }
    setLoading(true)
    try {
      await commonApi({
        action: 'getPatientSearch',
        data: formatedData,
        // options: {
        //   populate: [
        //     {
        //       path: 'profile_image',
        //       select: ['uri'],
        //     },
        //     { path: 'membership._id', model: 'membership' },
        //     { path: 'membership.categories._id', model: 'category' },
        //   ],
        // },
      }).then(async ({ DATA = {} }) => {
        console.log(DATA)
        setLoading(false)

        // const data = _.groupBy(DATA.data, function (value = {}) {
        //   return value.firstName?.charAt(0)
        // })

        // const newData = Object.keys(data)
        //   .sort()
        //   .reduce((obj, key) => {
        //     // eslint-disable-next-line no-param-reassign
        //     obj[key] = data[key]
        //     return obj
        //   }, {})

        // const firstData = newData[Object.keys(newData)[0]]
        setId(DATA?.id)
        setSearchResultData(DATA)

        
      })
    } catch(e) {
      setSearchResultData({})

    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: ``,
      lastName: ``,
      dob: ``,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Please enter the first name.'),
      lastName: Yup.string().required('Please enter the last name.'),
      dob: Yup.date()
        .max(new Date(), 'Date of Birth cannot be in the future')
        .required('Date of Birth is required'),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  return {
    formik,
    loading,
    onClickSubmit,
    id,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    dob,
    setDob,
    onClear,
    searchResultData,
    setSearchResultData,
  }
}
export default useCustomerSearch
