import commonApi from '@/api/common'
import { getUser } from '@/utils/localStorage'
import toast from 'react-hot-toast'

const useJoinEvent = (joinDone) => {
  const closeModal = () => {
    const joinEventModal = document.getElementById('joinEventModal')
    joinEventModal.classList.remove('active')
  }

  const onJoinEvent = async (e, event = {}) => {
    e.preventDefault()
    const { id } = getUser()

    const data = {
      userId: id,
      eventId: event.id,
      locationId: event.locationId?._id,
      paymentType: 'card',
    }
    await commonApi({
      action: 'patientEventCheckout',
      data,
    }).then(({ DATA, MESSAGE }) => {
      toast.success(MESSAGE)
      closeModal()
      joinDone()
    })
  }

  return {
    onJoinEvent,
    closeModal,
  }
}

export default useJoinEvent
