import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { REQUIRED_FIELD, MASTER_CODE } from '@/utils/constant'
import toast from 'react-hot-toast'
import commonApi from '@/api/common'
import { getUser } from '@/utils/localStorage'

const TYPES = [
  {
    label: 'PNG',
    value: 'image/png',
  },
  {
    label: 'JPG/JPEG',
    value: 'image/jpg,image/jpeg',
  },
  {
    label: 'PDF',
    value: 'application/pdf',
  },
  {
    label: 'DOC/DOCX',
    value: '.doc,.docx',
  },
]

const usePatientAddFile = props => {
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState()
  const [editID, setEditID] = useState()

  // File Category State
  const [fileCategoryOptionsData, setFileCategoryOptionsData] = useState([])
  const [fileCategoryValue, setFileCategoryValue] = useState({})

  // File Type State
  const [fileTypeOptionsData, setFileTypeOptionsData] = useState(TYPES)
  const [fileTypeValue, setFileTypeValue] = useState({})

  const closeBtn = async () => {
    await props.setActiveFile(false)
    const addFile = document.getElementById('AddPatientFileModal')
    addFile.classList.remove('active')

    const modalBody = document.getElementById('top-div-file')
    modalBody.scrollTop = 0

    // Reset Value
    formik.resetForm()
    setImage()
    setFileCategoryValue({})
    setFileTypeValue({})
    setEditID()
    props.setEditData()
  }

  useEffect(() => {
    if (props.activeFile) {
      loadOptionsServiceCatgory()
    }
  }, [props.activeFile])

  const loadOptionsServiceCatgory = async (inputValue, callback) => {
    const data = {
      query: {
        code: [MASTER_CODE.FILE_CATEGORY],
      },
      options: {
        select: [],
      },
    }
    await commonApi({
      action: 'findMaster',
      data,
    }).then(async ({ DATA = [] }) => {
      const category = DATA?.[0]?.subMasters
      const fileCategoryData = category?.map(data => ({
        value: data?._id,
        label: data?.name,
      }))
      setFileCategoryOptionsData(fileCategoryData)
      callback?.(fileCategoryData)
    })
  }

  const onClickSubmit = async values => {
    setLoading(true)
    const { id } = getUser()
    try {
      const data = {
        ...values,
        patientId: id,
      }
      await commonApi({
        parameters: editID ? [editID] : [],
        action: editID ? 'updatePatientFile' : 'addPatientFile',
        data,
      }).then(async ({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        await closeBtn()
        props.getAllFilesList()
      })
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      imageIds: [],
      description: '',
      type: '',
      slug: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter title."),
      imageIds: Yup.array()
        .min(1, 'Please select the file')
        .required('Please select the file'),
      description: Yup.string().required("Please enter description."),
      slug: Yup.string().required("Please select file category."),
      // type: Yup.string().required("Please select type."),
    }),
    onSubmit: values => {
      onClickSubmit(values)
    },
  })

  useEffect(() => {
    if (props.editData) {
      openEditFileModal(props.editData.id)
    }
  }, [props.editData])

  const openEditFileModal = async id => {
    if (!id) return false
    await props.openAddFileModal()

    setLoading(true)
    try {
      const data = {
        query: {
          _id: id,
        },
        options: {
          select: [],
          populate: ['slug'],
        },
      }
      await commonApi({
        action: 'findPatientFile',
        data,
      }).then(({ DATA = {} }) => {
        const { data = [] } = DATA
        const file = data?.[0]

        setEditID(file?.id)

        formik.setValues({
          title: file?.title,
          description: file?.description,
          type: file?.type,
          slug: file?.slug?._id,
          imageIds: [file?.imageIds?.[0]?._id],
        })

        setImage(file?.imageIds?.[0])

        const category = { value: file.slug?._id, label: file?.slug?.name }
        setFileCategoryValue(category)

        const selectedType = TYPES.find(x => x.value === file?.type)
        setFileTypeValue(selectedType)
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    closeBtn,
    formik,
    image,
    setImage,
    editID,
    // File Category Dropdown State
    fileCategoryOptionsData,
    setFileCategoryOptionsData,
    fileCategoryValue,
    setFileCategoryValue,
    // File Type Dropdown State
    fileTypeOptionsData,
    setFileTypeOptionsData,
    fileTypeValue,
    setFileTypeValue,
  }
}

export default usePatientAddFile
