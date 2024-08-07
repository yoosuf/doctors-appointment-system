import commonApi from '@/api/common'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import { componentAccess } from '@/utils/helper'
import React, { useState, useEffect } from 'react'

const useServices = () => {
  const [deleteID, setDeleteID] = useState()
  const [label, setLabel] = useState()
  // Delete Modal State
  const [isActiveDelete, setIsActiveDelete] = useState(false)

  const closeModal = () => {
    setDeleteID(), setIsActiveDelete(false), setLabel()
  }

  const openModal = data => {
    setDeleteID(data?.id), setLabel(data?.name), setIsActiveDelete(true)
  }

  const [loading, setLoading] = useState(false)
  const [activeService, setActiveService] = useState(false)

  const [service, setService] = useState([])
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState({})

  const [editData, setEditData] = useState()

  useEffect(() => {
    componentAccess(ROUTE_ACCESS.SERVICE, COMPONENT_ACCESS.findAll) &&
      getAllServices()
  }, [])

  const getAllServices = async () => {
    setLoading(true)
    try {
      const data = {
        query: {
          isActive: true,
        },
        options: {
          select: [],
          sort: {
            createdAt: -1,
          },
          populate: ['categoryId', 'locationIds'],
        },
      }
      await commonApi({
        action: 'findService',
        data: data,
      }).then(({ DATA = {} }) => {
        setService(DATA.data)
        setPaginator(DATA.paginator)
        setDataQueryOptions(data)
      })
    } finally {
      setLoading(false)
    }
  }

  const onClickEdit = data => {
    setEditData(data)
  }

  const onClickDelete = async id => {
    if (!id) return false
    const data = {
      isActive: false,
    }
    await commonApi({
      parameters: [id],
      action: 'updateService',
      data,
    }).then(async ({ DATA }) => {
      closeModal()
      await getAllServices()
    })
  }

  return {
    loading,
    service,
    paginator,
    setPaginator,
    setLoading,
    setService,
    dataQueryOptions,
    activeService,
    setActiveService,
    getAllServices,
    onClickEdit,
    editData,
    setEditData,
    // Modal State
    isActiveDelete,
    openModal,
    closeModal,
    deleteID,
    label,
    onClickDelete,
  }
}

export default useServices
