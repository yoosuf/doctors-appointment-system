import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { REQUIRED_FIELD } from '@/utils/constant'
import { values } from 'lodash'
import toast from 'react-hot-toast'

const useUserAccount = ({ 
  id,
  setID = () => { },
  setUserData = () => { },
  setData = () => { },
 }) => {

  const [edit, setEdit] = useState(false)

  const [loading, setLoading] = useState(false)

  const [isActive, setActive] = useState(true)

  const [defaultRoleId, setDefaultRoleId] = useState({})
  const [roleOptionsData, setRoleOptionsData] = useState([])

  const [userID, setUserID] = useState()

  const getUserData = async () => {
    setLoading(true)
    try {
      const data = {
        query: {},
        options: {
          select: ['id', 'email', 'role', 'isActive'],
          populate: ['roleId'],
        },
      }
      await commonApi({
        parameters: id ? [id] : [],
        action: 'getUser',
        data,
      }).then(async ({ DATA }) => {
        const data = DATA?.data?.[0]

        setUserID(data?.id)

        formik.setFieldValue('email', data?.email)
        formik.setFieldValue('roleId', data?.roleId?._id)

        data?.isActive === true ? setActive(true) : setActive(false)

        setDefaultRoleId({
          label: data?.roleId?.name,
          value: data?.roleId?._id,
        })

        const role = {
          label: data?.roleId?.name,
          value: data?.roleId?._id,
        }

        const dataRole = Array.isArray(role) ? role : [role]
        const roleOptions = dataRole?.map(data => ({
          value: data?.value,
          label: data?.label,
        }))
        setRoleOptionsData(roleOptions)
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getUserData()
    }
  }, [id])

  const onClickSubmit = async values => {
    const data = {
      ...values,
      isActive: isActive,
    }
    setLoading(true)
    try {
      await commonApi({
        parameters: userID ? [userID] : [],
        action: 'updateUser',
        data,
      }).then(({ DATA={}, MESSAGE }) => {
        setID(DATA.id)
        setUserData(DATA)
        setData(prev => ({
          ...prev,
        }))


        toast.success(MESSAGE)
        // getInitialSideBarData()
        setEdit(false)
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      roleId: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required("Please enter email."),
      roleId: Yup.string().required("Please enter role."),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  // const onClickDeleteUser = async () => {
  //   const data = {}
  //   await commonApi({
  //     parameters: userID ? [userID] : [],
  //     action: 'deleteUser',
  //     data,
  //   }).then(({ DATA, MESSAGE }) => {
  //     toast.success(MESSAGE)
  //     // closeModal()
  //     // getInitialSideBarData()
  //   })
  // }

  return {
    loading,
    formik,
    isActive,
    setActive,
    defaultRoleId,
    roleOptionsData,
    getUserData,
    edit,
    setEdit,
  }
}

export default useUserAccount
