import commonApi from '@/api/common'
import { useEffect, useState } from 'react'

const useCustomerFile = ({ id }) => {
  const [loading, setLoading] = useState(false)

  const [files, setFiles] = useState([])
  const [paginator, setPaginator] = useState({})
  const [dataQueryOptions, setDataQueryOptions] = useState()

  const [activeFile, setActiveFile] = useState(false)

  const [editData, setEditData] = useState()
  const openEdit = data => {
    setEditData(data)
  }

  const openAddFileModal = async () => {
    const addFile = document.getElementById('AddCustomerFileModal')
    addFile.classList.add('active')
    await setActiveFile(true)
  }

  useEffect(() => {
    if (id) {
      getAllFilesList()
    }
  }, [id])

  const getAllFilesList = async (searchVal) => {
    setLoading(true)
    try {
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
          populate: [{ path: 'addedBy', select: ['id'] }],
          page: paginator.currentPage || 1,
          offset: (paginator.currentPage - 1) * Number(paginator.perPage) || 0,
          limit: paginator.perPage || 10,
          pagination: true,
        },
      }
      if (searchVal) {
        data.query.$or = [
          {
            title: {
              $regex: searchVal,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: searchVal,
              $options: 'i',
            },
          },
        ]
      }

      await commonApi({
        action: 'findFile',
        data,
      }).then(({ DATA = {} }) => {
        setPaginator(DATA.paginator)
        setFiles(DATA.data)
        setDataQueryOptions({ query: data.query, options: data.options })
      })
    } finally {
      setLoading(false)
    }
  }
  const onChangeSearch = async e => {
    getAllFilesList(e.target.value)

  }

  return {
    loading,
    files,
    setFiles,
    paginator,
    setPaginator,
    dataQueryOptions,
    getAllFilesList,
    activeFile,
    setActiveFile,
    openAddFileModal,
    openEdit,
    editData,
    setEditData,
    onChangeSearch
  }
}

export default useCustomerFile
