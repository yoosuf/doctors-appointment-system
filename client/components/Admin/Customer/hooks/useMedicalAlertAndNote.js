import commonApi from '@/api/common'
import { getUser } from '@/utils/localStorage'
import React, { useState, useEffect } from 'react'

const useMedicalAlertAndNote = ({ id }) => {
  const [openMedicalAlert, setOpenMedicalAlert] = useState(false)
  const [openHealthNote, setOpenHealthNote] = useState(false)

  const [alertValue, setAlertValue] = useState('')
  const [noteValue, setNoteValue] = useState('')

  const [notes, setNotes] = useState([])

  const onCancelHealthNote = e => {
    e.preventDefault()
    setOpenHealthNote(false)
    setNoteValue('')
  }

  const onCancelMedicalAlert = e => {
    e.preventDefault()
    setOpenMedicalAlert(false)
    setAlertValue('')
  }

  useEffect(() => {
    patientNotesListData()
  }, [id])

  const patientNotesListData = async () => {
    const data = {
      query: {
        userId: id,
        type: { $in: ['NOTE', 'ALERT'] },
      },
    }
    await commonApi({
      action: 'noteList',
      data,
    }).then(({ DATA = {} }) => {
      setNotes(DATA.data)
    })
  }

  const onSubmitHealthNote = e => {
    e.preventDefault()
    if (noteValue === '') return false
    const data = {
      userId: id,
      chiroId: getUser()?.id,
      desc: noteValue,
      type: 'NOTE',
    }
    commonApi({
      action: 'addOrUpdateNote',
      data,
    }).then(({ DATA = {} }) => {
      setOpenHealthNote(false)
      setNoteValue('')
      patientNotesListData()
    })
  }

  const onSubmitMedicalAlert = e => {
    e.preventDefault()
    if (alertValue === '') return false
    const data = {
      userId: id,
      chiroId: getUser()?.id,
      desc: alertValue,
      type: 'ALERT',
    }
    commonApi({
      action: 'addOrUpdateNote',
      data,
    }).then(({ DATA = {} }) => {
      setOpenMedicalAlert(false)
      setAlertValue('')
      patientNotesListData()
    })
  }

  const onEdit = (e, data = {}) => {
    e.preventDefault()
    if (data.type === 'ALERT') {
      setAlertValue(data.desc)
      setOpenMedicalAlert(true)
    } else {
      setNoteValue(data.desc)
      setOpenHealthNote(true)
    }
  }

  return {
    notes,
    openMedicalAlert,
    setOpenMedicalAlert,
    openHealthNote,
    setOpenHealthNote,
    onCancelHealthNote,
    onCancelMedicalAlert,
    onSubmitHealthNote,
    onSubmitMedicalAlert,
    alertValue,
    setAlertValue,
    noteValue,
    setNoteValue,
    onEdit,
  }
}

export default useMedicalAlertAndNote
