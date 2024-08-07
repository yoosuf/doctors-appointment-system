import commonApi from '@/api/common'
import { getUser } from '@/utils/localStorage'
import React, { useState, useEffect } from 'react'

const usePatientFiles = ({patientFileData}) => {
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState(patientFileData.DATA.data)
  const [paginator, setPaginator] = useState(patientFileData.DATA.paginator)

  const [activeFile, setActiveFile] = useState(false)

  const [editData, setEditData] = useState()

  const [openDeleteModal, setDeleteModal] = useState(false)
  const [label, setLabel] = useState()
  const [deleteID, setDeleteID] = useState()

  const openModal = value => {
    setDeleteModal(true)
    setDeleteID(value.id)
    setLabel(value.title)
  }

  const closeModal = () => {
    setDeleteID(), setLabel(), setDeleteModal(false)
  }

  const openAddFileModal = () => {
    setActiveFile(true)
    const addFile = document.getElementById('AddPatientFileModal')
    addFile.classList.add('active')
  }

  // useEffect(() => {
  //   getAllFilesList()
  // }, [])

  const getAllFilesList = async () => {
    setLoading(true)
    try {
      const { id } = getUser()
      const data = {
        query: {
          isDeleted: false,
          patientId: id,
        },
        options: {
          select: [],
          sort: {
            createdAt: -1,
          },
          limit: 20,
          pagination: true,
        },
      }
      await commonApi({
        action: 'findPatientFile',
        data,
      }).then(({ DATA = {} }) => {
        const { data = [], paginator = {} } = DATA
        setPaginator(paginator)
        setFiles(data)
      })
    } finally {
      setLoading(false)
    }
  }

  const openEdit = data => {
    setEditData(data)
  }

  const onChangeSearch = async e => {
    const { id } = getUser()
    const data = {
      query: {
        isDeleted: false,
        patientId: id,
        $or: [
          {
            title: {
              $regex: e.target.value,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: e.target.value,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
      },
    }
    await commonApi({
      action: 'findPatientFile',
      data,
    }).then(({ DATA = {} }) => {
      const { data = [], paginator = {} } = DATA
      setPaginator(paginator)
      setFiles(data)
    })
  }

  const onClickDelete = async id => {
    if (!id) return false
    setLoading(true)
    try {
      await commonApi({
        parameters: [id],
        action: 'deletePatientFile',
      }).then(({ DATA }) => {
        closeModal()
        getAllFilesList()
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    files,
    activeFile,
    setActiveFile,
    openAddFileModal,
    getAllFilesList,
    paginator,
    openEdit,
    editData,
    setEditData,
    onChangeSearch,
    // Delete Modal State
    openDeleteModal,
    openModal,
    closeModal,
    onClickDelete,
    label,
    deleteID,
  }
}

export default usePatientFiles
