import commonApi from '@/api/common'
import { useEffect, useState, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'
import { getUser } from '@/utils/localStorage'
import socket from '@/utils/socket' // Import the socket instance


const useChiro = () => {
  const [loading, setLoading] = useState(false)
  const [onDeskCustomer, setOnDeskCustomer] = useState()
  const [onDeskPaginator, setOnDeskPaginator] = useState({})
  const [atBatCustomer, setAtBatCustomer] = useState()
  const [atBatPaginator, setAtBatPaginator] = useState({})
  const [appointmentDetail, setAppointmentDetail] = useState({})
  const [patientId, setPatientId] = useState()

  const [atBatQueryOptions, setAtBatQueryOptions] = useState({})
  const [onDeskQueryOptions, setOnDeskQueryOptions] = useState({})
  const [chartList, setChartList] = useState([])

  const [waitListLoader, setWaitListLoader] = useState(false)
  const [serveListLoader, setServeListLoader] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)

  const [alertModalOpen, setAlertModalOpen] = useState(false)
  const [alertFormModalOpen, setAlertFormModalOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(true) // Loading state
  const [appointments, setAppointments] = useState([]) // for collecting appointments

  const [waitingAppointments, setWaitingAppointments] = useState([])
  const [inServeAppointments, setInServeAppointments] = useState([])
  const [completedAppointments, setCompletedAppointments] = useState([])

  const loggedInUserRole = getUser()?.roleId?.code

  useEffect(() => {
    const handleNewAppointments = data => {
      setAppointments(data)

      let waitingAppointments = []
      let inServeAppointments = []
      let completedAppointments = []

      data.forEach(appointment => {
        appointment.services.forEach(service => {
          if (service.servedBy === loggedInUserRole) {
            switch (service.status) {
              case 'confirmed':
                waitingAppointments.push(appointment)
                break
              case 'in-progress':
                inServeAppointments.push(appointment)
                break
              case 'completed':
                completedAppointments.push(appointment)
                break
              default:
                break
            }
          }
        })
      })

      // Optionally remove duplicates if necessary
      waitingAppointments = [...new Set(waitingAppointments)]
      inServeAppointments = [...new Set(inServeAppointments)]
      completedAppointments = [...new Set(completedAppointments)]

      setWaitingAppointments(waitingAppointments)
      setInServeAppointments(inServeAppointments)
      setCompletedAppointments(completedAppointments)

      setIsLoading(false)
    }

    socket.on('appointments', handleNewAppointments)
    socket.emit('listAppointments')

    return () => {
      socket.off('appointments', handleNewAppointments)
    }
  }, [])

  const waitlistModalOpen = async () => {
    const waitlistModal = document.getElementById('waitlistModal')
    waitlistModal.classList.add('active')
  }

  // Chart State and Fuction
  const [activeSOAPChart, setActiveSOAPChart] = useState(false)
  const [editSOAP, setEditSOAP] = useState({})

  const openSOAPModal = () => {
    setActiveSOAPChart(true)
    const chartModal = document.getElementById('addSoapChartSheet')
    chartModal.classList.add('active')
  }

  const closeSOAPModal = () => {
    setActiveSOAPChart(false)
    const chartModal = document.getElementById('addSoapChartSheet')
    chartModal.classList.remove('active')
  }

  const openEditSOAPModal = (e, x) => {
    setActiveSOAPChart(true)
    setEditSOAP(x)
    const chartModal = document.getElementById('editSoapChartSheet')
    chartModal.classList.add('active')
  }

  const closeEditSOAPModal = () => {
    setActiveSOAPChart(false)
    const chartModal = document.getElementById('editSoapChartSheet')
    chartModal.classList.remove('active')
  }

  /**
   * Wait list
   */

  const findServeCustomerList = () => {}
  const findWaitList = () => {}

  const [alertLoader, setAlertLoader] = useState(false)

  /**
   * @todo work around to load the  open the model with activating the alerts tab
   * @param {*} id
   */
  const onSendAlert = async id => {
    setLoading(true)
    try {
      setPatientId(id)
      setAlertModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const addAlertModel = async id => {
    try {
      setPatientId(id)
      setAlertFormModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const [noShowLoader, setNoShowLoader] = useState(false)

  const closeServeModal = () => {
    const waitlistModal = document.getElementById('waitlistModal')
    waitlistModal.classList.remove('active')
  }

  const onClickNoShow = async (e, id) => {
    if (!id) return false
    setNoShowLoader(true)
    try {
      await commonApi({
        parameters: [id],
        action: 'noShow',
      }).then(({ DATA, MESSAGE }) => {
        toast.success(MESSAGE)
        closeServeModal()
        findWaitList()
      })
    } finally {
      setNoShowLoader(false)
    }
  }


  /**
   * Making the customer to serve list
   * @param {*} id 
   * @returns 
   */
  const onClickServe = async id => {
    // alert("CLICKEDDD")
    if (!id) return false;
  
    setLoading(true);
    try {
      console.log('Opening waitlist modal...');
      waitlistModalOpen();
  
      console.log('Fetching appointment detail for ID:', id);
      const appointmentDetailData = await fetchData(id);
  
      console.log('Fetched appointment detail:', appointmentDetailData);
      setAppointmentDetail(appointmentDetailData);
  
      console.log('Listing all charts for user ID:', appointmentDetailData?.userId?._id);
      listAllChart(appointmentDetailData?.userId?._id);
    } finally {
      setLoading(false);
    }
  };

  const onChangeSearch = e => {
    let appointments = waitingAppointments

    const inputValue = e.target.value.trim()

    if (inputValue) {
      const filteredAppointments = waitingAppointments.filter(appointment => {
        const patient = appointment.patient
        const regex = new RegExp(inputValue, 'i')

        return (
          regex.test(patient.name) ||
          regex.test(patient.email) ||
          regex.test(patient.phone)
        )
      })

      setWaitingAppointments(filteredAppointments)
    } else {
      setWaitingAppointments(appointments)
    }
  }

  const listAllChart = async id => {
    setLoading(true)
    const data = {
      query: {
        patientId: id,
      },
      options: {
        select: [],
        collation: '',
        sort: {
          createdAt: -1,
        },
        populate: [
          'created_at',
          {
            path: 'creatorId',
            populate: [
              {
                path: 'profile_image',
              },
            ],
          },
        ],
        pagination: true,
      },
      isCountOnly: false,
    }
    try {
      console.log("Request data:", data);
      await commonApi({
        action: 'findAllAppointmentChart',
        data: data,
      }).then(({ DATA = {} }) => {

        console.log("Response data:", DATA?.data);
        setChartList(DATA?.data)
      })
    } finally {
      console.log("Loading status:", loading);
      setLoading(false)
    }
  }




  /**
   * Grab single appointment
   * @param {int} id
   * @returns
   */

  const fetchData = async id => {

    const response = await commonApi({
      parameters: [id],
      action: 'appointmentDetail',
    })

    if (response && response.DATA) {

      return response.DATA
    }
  }

  return {
    loading,
    alertLoader,
    setLoading,
    waitListLoader,
    setWaitListLoader,
    serveListLoader,
    setServeListLoader,
    onSendAlert,
    onClickNoShow,
    noShowLoader,
    onClickServe,
    appointmentDetail,
    onChangeSearch,
    // Paginator
    atBatCustomer,
    onDeskCustomer,
    atBatPaginator,
    onDeskPaginator,
    setAtBatPaginator,
    setOnDeskPaginator,
    setAtBatCustomer,
    setOnDeskCustomer,
    atBatQueryOptions,
    onDeskQueryOptions,
    chartList,
    listAllChart,
    setChartList,
    // Chart Function
    openSOAPModal,
    closeSOAPModal,
    openEditSOAPModal,
    closeEditSOAPModal,
    activeSOAPChart,
    // function
    findWaitList,
    findServeCustomerList,
    showCompleted,
    setShowCompleted,
    waitlistModalOpen,
    patientId,
    setPatientId,
    alertModalOpen,
    setAlertModalOpen,
    alertFormModalOpen,
    setAlertFormModalOpen,
    addAlertModel,
    appointments,
    waitingAppointments,
    inServeAppointments,
    completedAppointments,
  }
}

export default useChiro
