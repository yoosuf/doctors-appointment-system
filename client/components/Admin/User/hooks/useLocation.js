import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'

const useLocation = ({ locationIds }) => {
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [locationData, setLocationData] = useState([])

  const [open, setOpen] = useState(false)
  const [label, setLabel] = useState()
  const [deleteID, setDeleteID] = useState()

  const openModal = (data = {}) => {
    setLabel(data.locationName.toLowerCase() + ' location')
    setDeleteID(data.id)
    setOpen(true)
  }

  const closeModal = () => {
    setLabel()
    setDeleteID()
    setOpen(false)
  }

  const [editData, setEditData] = useState()

  const getLocationData = async value => {
    const data = {
      query: {
        // isActive: true,
        // isDelete: false,
        _id: {
          $in: value ? value : locationIds,
        },
      },
      options: {
        select: [],
        populate: [
          'subOwnerId',
          'locationAddressId',
          {
            path: 'locationAddressId',
            
          },
        ],
      },
    }

    if (data) {
      setLoading(true)
      try {
        await commonApi({
          action: 'findLocation',
          data,
        }).then(({ DATA }) => {
          setLocationData(DATA?.data)
        })
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (locationIds) {
      getLocationData()
    }
  }, [locationIds])

  const onChangeActive = async value => {
    const data = {
      isActive: value?.isActive === true ? false : true,
    }
    if (data) {
      setLoading(true)
      try {
        await commonApi({
          parameters: value?.id ? [value?.id] : [],
          action: 'updateLocation',
          data,
        }).then(({ DATA }) => {
          getLocationData()
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const onClickDelete = async (id, userId) => {
    const data = {
      userId: userId,
    }

    await commonApi({
      parameters: id ? [id] : [],
      action: 'deleteLocation',
      data,
    }).then(async ({ DATA, MESSAGE }) => {
      closeModal()
      await getLocationData()
    })
  }

  const openLocationModal = () => {
    const addLocation = document.getElementById('AddLocationNewModal')
    addLocation.classList.add('active')
  }

  const onClickEdit = async id => {
    if (!id) return false
    openLocationModal()
    setSubmitLoading(true)
    try {
      const data = {
        query: { _id: id },
        options: {
          select: [],
          populate: [
            'subOwnerId',
            {
              path: 'locationAddressId',
              populate: [
                {
                  path: 'cityId',
                  model: 'city',
                },
                {
                  path: 'provinceId',
                  model: 'province',
                },
                {
                  path: 'postalCodeId',
                  model: 'postalCode',
                },
              ],
            },
            {
              path: 'billingAddressId',
              populate: [
                {
                  path: 'cityId',
                  model: 'city',
                },
                {
                  path: 'provinceId',
                  model: 'province',
                },
                {
                  path: 'postalCodeId',
                  model: 'postalCode',
                },
              ],
            },
          ],
        },
      }
      await commonApi({
        action: 'findLocation',
        data,
      }).then(({ DATA = {} }) => {
        setEditData(DATA.data?.[0])
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  return {
    loading,
    submitLoading,
    setSubmitLoading,
    locationData,
    onChangeActive,
    onClickDelete,
    open,
    openModal,
    closeModal,
    label,
    deleteID,
    getLocationData,
    onClickEdit,
    editData,
    setEditData,
  }
}

export default useLocation
