import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import commonApi from '@/api/common'
import toast from 'react-hot-toast'
import { getUser } from '@/utils/localStorage'
import { REQUIRED_FIELD } from '@/utils/constant'
import { useIsMount } from '@/utils/useIsMount'

const useCard = props => {
  const cardDetails = props?.cardDetails?.DATA || ''
  const [loading, setLoading] = useState(false)
  const [cardData, setCardData] = useState(cardDetails)
  const [label, setLabel] = useState()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [removeCardId, setRemoveCardId] = useState()

  const closeModal = () => {
    setOpenDeleteModal(false)
    setLabel()
    setRemoveCardId()
  }

  const openModal = (data = {}) => {
    setRemoveCardId(data._id)
    setLabel('card ending with ' + data.last4)
    setOpenDeleteModal(true)
  }

  const CloseBtn = async () => {
    const AddPaymentMethodModal = document.getElementById('AddPaymentMethod')
    AddPaymentMethodModal.classList.remove('active')

    formik.resetForm()
  }

  const expiryMonthValidation = e => {
    if (e.target.value.length === 2) {
      e.preventDefault()
    }
  }

  const expiryYearValidation = e => {
    if (e.target.value.length === 4) {
      e.preventDefault()
    }
  }

  const cardNumberValidation = e => {
    if (e.target.value.length === 16) {
      e.preventDefault()
    }
  }

  const [focus, setFocus] = useState('')

  const handleInputFocus = e => {
    if (e.target.id === 'expiry_month' || e.target.id === 'expiry_year') {
      setFocus('expiry')
    } else {
      setFocus(e.target.id)
    }
  }
  const isMount = useIsMount()
  useEffect(() => {
    if (isMount) {
      getCardList()
    }
  }, [])
  // useEffect(() => {
  //   getCardList()
  // }, [])

  const getCardList = async () => {
    setLoading(true)
    try {
      await commonApi({
        action: 'cardList',
      }).then(async ({ DATA = [] }) => {
        await setCardData(DATA)
      })
    } finally {
      setLoading(false)
    }
  }

  const onAddCard = async values => {
    if (values) {
      setLoading(true)

      console.log(JSON.stringify(values.countryId))
      try {
        const { phone, lastName } = getUser()
        const address = {
          phone: phone,
          street1: values?.addressLine1,
          street2: values?.addressLine2,
          city: values?.cityId,
          region: values?.provinceId,
          country: values?.countryId || 'United States',
          postal_code: values?.postalCodeId,
        }

        const { name, cvc, expiry_month, expiry_year, number } = values
        const numberString = number.toString()
        const numberFormat =
          numberString.substring(0, 4) +
          '-' +
          numberString.substring(4, 8) +
          '-' +
          numberString.substring(8, 12) +
          '-' +
          numberString.substring(12, 16)

        const data = {
          firstName: name,
          cvv: cvc,
          month:
            expiry_month.toString().length === 1
              ? '0' + expiry_month.toString()
              : expiry_month.toString(),
          year: expiry_year.toString(),
          number: numberFormat,
          phone: phone,
          address: address,
          lastName: lastName,
        }
        await commonApi({
          action: 'addCard',
          data,
        }).then(async ({ DATA, MESSAGE }) => {
          toast.success(MESSAGE)
          await CloseBtn()
          await getCardList()
          setFocus('name')
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      cvc: '',
      number: '',
      expiry_month: '',
      expiry_year: '',
      addressLine1: '',
      addressLine2: '',
      cityId: '',
      provinceId: '',
      countryId: '',
      postalCodeId: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter name.'),
      cvc: Yup.string()
        .min(3, 'Invalid cvv')
        .max(4, 'Invalid cvv')
        .required('Please enter CVV.'),
      number: Yup.string()
        .min(16, 'Invalid card number')
        .max(16, 'Invalid card number')
        .required('Please enter card number.'),
      expiry_month: Yup.number()
        .required(REQUIRED_FIELD)
        .min(1, 'Invalid month')
        .max(12, 'Invalid month')
        .test(
          'len',
          'Must be exactly 2 characters',
          val =>
            (val && val.toString().length === 2) ||
            (val && val.toString().length === 1)
        ),

      expiry_year: Yup.number()
        .required('Enter the expiry year.')
        .test(
          'len',
          'Must be exactly 4 characters',
          val => val && val.toString().length === 4
        )
        .min(
          new Date().getFullYear(),
          'Year must be current year or greater than current year'
        ),
      addressLine1: Yup.string().required('Please enter address.'),
      cityId: Yup.string().required('Please enter city.'),
      provinceId: Yup.string().required('Please enter state.'),
      countryId: Yup.string().required('Please select country.'),
      postalCodeId: Yup.string().required('Please enter zip code.'),
    }),
    onSubmit: values => {
      onAddCard(values)
    },
  })

  const onDeleteCard = async () => {
    await commonApi({
      action: 'deleteCard',
      data: {
        removeCardId,
      },
    }).then(async ({ DATA, MESSAGE }) => {
      toast.success(MESSAGE)
      closeModal()
      await getCardList()
    })
  }

  return {
    CloseBtn,
    loading,
    formik,
    focus,
    handleInputFocus,
    expiryMonthValidation,
    expiryYearValidation,
    cardNumberValidation,
    cardData,
    // Delete Modal State
    openModal,
    closeModal,
    openDeleteModal,
    onDeleteCard,
    label,
  }
}

export default useCard
