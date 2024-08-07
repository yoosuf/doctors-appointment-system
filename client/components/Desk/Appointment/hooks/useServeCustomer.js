import commonApi from '@/api/common'
import { useState, useEffect } from 'react'
import useTimeManage from './useTimeManage'
import socket from '@/utils/socket'; // Import the socket instance


const useServeCustomer = ({
  setChartList = () => {},
  findWaitList = () => {},
  findServeCustomerList = () => {},
  appointmentDetail = {},
}) => {
  const { time, isRunning, start, pause, reset } = useTimeManage({
    appointmentDetail,
  })
  const closeBtn = () => {
    const waitlistModal = document.getElementById('waitlistModal')
    waitlistModal.classList.remove('active')
    setChartList([])
  }

  const [serveLoading, setServeLoading] = useState(false)

  useEffect(() => {

    // console.log(`appointmentDetail, form useServeCustomer line 26`, appointmentDetail)
    if (appointmentDetail.id) {
      serveCustomer(appointmentDetail.id)
    }
  }, [appointmentDetail])

  const serveCustomer = async (id) => {
    if (!id) return false
    setServeLoading(true)
    try {
      const data = {
        waitMin: 0,
        status: 'in-progress',
      }
      await commonApi({
        parameters: [id],
        action: 'serveCustomer',
        data,
      }).then(({ DATA }) => {
        start()
        socket.emit('appointmentAdded', DATA);
        findWaitList()
        findServeCustomerList()
      })
    } finally {
      setServeLoading(false)
    }
  }

  const onCompleted = async (e, id) => {
    console.log(id)
    e.preventDefault()
    pause()
    const data = {
      servedMin: parseInt(time / 60, 10),
      status: 'completed',
    }
    await commonApi({
      parameters: [id],
      action: 'partiallyUpdateAppointment',
      data,
    }).then(async ({ DATA }) => {
      socket.emit('appointmentAdded', DATA);
      reset()
      findWaitList()
      findServeCustomerList()
      closeBtn()
    })
  }

  return {
    isRunning,
    time,
    onCompleted,
    serveLoading,
    closeBtn,
  }
}

export default useServeCustomer
