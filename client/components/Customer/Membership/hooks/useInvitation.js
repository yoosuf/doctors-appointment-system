import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { formattedMembershipObj } from '@/utils/membership'
import debounce from 'lodash/debounce' // Import debounce from lodash

const initialValues = {
  invitations: [{ email: '', categoryId: '' }],
}

const validationSchema = Yup.object().shape({
  invitations: Yup.array().of(
    Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      categoryId: Yup.string().required('You must select at least one package'),
    })
  ),
})

const useInvitation = ({ userData }) => {
  const [loading, setLoading] = useState(false)
  const [invitations, setInvitations] = useState([])
  const [membershipPackages, setMembershipPackages] = useState([])
  const [remainingQuotas, setRemainingQuotas] = useState({})

  useEffect(() => {
    const fetchMemberProfile = async () => {
      try {
        const data = await commonApi({ action: 'getPatientObject' })
        const formattedMembership = formattedMembershipObj(data?.membership)
        setMembershipPackages(formattedMembership?.categories ?? [])
        const quotas = {}
        formattedMembership.categories.forEach(category => {
          quotas[category._id] = category.remainingQuota
        })
        setRemainingQuotas(quotas)
      } catch (error) {
        console.error('Error fetching member profile:', error)
        // toast.error('Failed to fetch member profile')
      }
    }

    const fetchInvitations = async () => {
      setLoading(true)
      try {
        const response = await commonApi({
          action: 'customerGetAllInvitations',
        })
        const { DATA } = response
        console.log(DATA)
        setInvitations(DATA)
      } finally {
        setLoading(false)
      }
    }



    fetchMemberProfile()
    fetchInvitations()
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(JSON.stringify(values))
      await createInvitation(values)
      toast.success(`The invitation has been sent.`)
      resetForm()
      closeBtn()
    },
  })

  const updateInvitations = newInvitations => {
    formik.setFieldValue('invitations', newInvitations)
  }

  const handleAddInvitation = () => {
    const newInvitations = [
      ...formik.values.invitations,
      { email: '', categoryId: membershipPackages[0]?._id || '' },
    ]
    updateInvitations(newInvitations)
  }

  const handleRemoveInvitation = index => {
    const newInvitations = [...formik.values.invitations]
    const removedInvitation = newInvitations[index]
    newInvitations.splice(index, 1)
    updateInvitations(newInvitations)

    // Restore remainingQuota for the corresponding category
    const categoryId = removedInvitation.categoryId
    setRemainingQuotas(prevQuotas => ({
      ...prevQuotas,
      [categoryId]: prevQuotas[categoryId] + 1,
    }))
  }

  const closeBtn = () => {
    Object.keys(formik.values).forEach(field => {
      formik.setFieldValue(field, '')
    })
    formik.resetForm()
    const element = document.getElementById('InvitationModel')
    if (element) {
      element.classList.remove('active')
    }
  }

  /**
   * checkEmailExistance after email is entered
   * @param {*} email
   */
  const checkEmailExistance = async email => {
    setLoading(true)
    try {
      const { DATA, MESSAGE } = await commonApi({
        action: 'customerCheckEmailExistance',
        data: { email: email },
      })
      console.log(DATA)
      return DATA // Assuming the API returns a boolean indicating email existence
    } finally {
      setLoading(false)
    }
  }

  /**
   * createInvitation
   * @param {*} values
   */
  const createInvitation = async values => {
    setLoading(true)
    try {
      await commonApi({
        action: 'customerInvitationCreate',
        data: values.invitations,
      }).then(async ({ DATA, MESSAGE }) => {
        console.log(DATA)
        console.log(MESSAGE)
      })
    } finally {
      setLoading(false)
    }
  }

  // const handleEmailChange = async (index, email) => {
  //   formik.setFieldValue(`invitations.${index}.email`, email);
  //   if (email) {
  //     const emailExists = await checkEmailExistance(email);
  //     if (emailExists) {
  //       formik.setFieldError(`invitations.${index}.email`, 'Email is already taken');
  //     }
  //   }
  // };

  const debouncedEmailCheck = debounce(async (index, email) => {
    if (email) {
      const emailExists = await checkEmailExistance(email)
      console.log(`emailExists`, emailExists)
      return emailExists ? 'Email is already taken' : '' // Return error message if email exists, otherwise return empty string
    }
    return '' // Return empty string if email is empty
  }, 500)

  const handleEmailChange = async (index, email) => {
    formik.setFieldValue(`invitations.${index}.email`, email)
    // const errorMessage = await debouncedEmailCheck(index, email);

    // console.log(`errorMessage`, errorMessage);
    // if (errorMessage !== '') {
    //   formik.setFieldError(`invitations.${index}.email`, errorMessage); // Set field error based on the email existence check result
    // }
  }

  return {
    loading,
    closeBtn,
    membershipPackages,
    handleAddInvitation,
    handleRemoveInvitation,
    remainingQuotas,
    setRemainingQuotas,
    handleEmailChange,
    invitations,
    formik,
  }
}

export default useInvitation
