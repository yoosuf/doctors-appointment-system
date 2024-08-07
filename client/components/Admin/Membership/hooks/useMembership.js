import commonApi from '@/api/common'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const useMembership = () => {
  const [loading, setLoading] = useState(false)

  const [deleteID, setDeleteID] = useState()
  const [label, setLabel] = useState()

  const [editData, setEditData] = useState()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const closeModal = () => {
    setOpenDeleteModal(false), setDeleteID(), setLabel()
  }

  const openModal = (data = {}) => {
    setLabel(data.name)
    setDeleteID(data.id)
    setOpenDeleteModal(true)
  }

  const [memberShipList, setMemberShipList] = useState([])

  useEffect(() => {
    getAllMemberShipData()
  }, [])

  const getAllMemberShipData = async () => {
    setLoading(true)
    try {
      const data = {
        query: {
          isDeleted: false,
        },
        options: {
          select: [],
          populate: [
            {
              path: 'planAccess',
              populate: ['categoryId'],
            },
            {
              path: 'duration',
            },
          ],
          sort: {
            createdAt: -1,
          },
        },
      }
      await commonApi({
        action: 'findMembership',
        data,
      }).then(({ DATA = {} }) => {
        const { data = [] } = DATA
        setMemberShipList(data)
      })
    } finally {
      setLoading(false)
    }
  }

  const onClickDelete = async id => {
    if (!id) return false
    await commonApi({
      parameters: [id],
      action: 'deleteMembership',
    }).then(async ({ DATA, MESSAGE }) => {
      toast.success(MESSAGE)
      closeModal()
      await getAllMemberShipData()
    })
  }

  const openEditModal = id => {
    setEditData(id)
  }

  return {
    loading,
    memberShipList,
    getAllMemberShipData,
    openModal,
    closeModal,
    openDeleteModal,
    deleteID,
    label,
    onClickDelete,
    openEditModal,
    editData,
    setEditData,
  }
}

export default useMembership
