import useChiro from '@/components/Desk/Appointment/hooks/useChiro'
import PlusIcon from '@/widget/image/PlusIcon'
import SearchIcon from '@/widget/image/SearchIcon'
import UserIcon from '@/widget/image/UserIcon'
import AtBatCustomerColumn from '@/widget/react-table/AtBatCustomerColumn'
import OnDeskCustomerColumn from '@/widget/react-table/OnDeskCustomerColumn'
import ReactTableList from '@/widget/react-table/ReactTableList'
import ToggleButton from '@/widget/ToggleButton'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import InstantAppointmentForm from '../Appointment/InstantAppointmentForm'
import WaitlistModal from '../Appointment/WaitlistModal'
import { useRouter } from 'next/router'
import AlertModel from '../Appointment/Alert/AlertModel'
import AlertSideSheet from '../Appointment/Alert/AlertSideSheet'
import { getUser } from '@/utils/localStorage'
import { getRole, dateDisplay } from '@/utils/helper'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const FrontDeskDashboard = ({user, services}) => {
  const {
    loading,
    waitListLoader,
    setWaitListLoader,
    serveListLoader,
    setServeListLoader,
    onClickNoShow,
    noShowLoader,
    onClickServe,
    onSendAlert,
    onDeskCustomer = [],
    atBatCustomer = [],
    appointmentDetail,
    setLoading,
    onChangeSearch,
    // Paginator
    atBatPaginator,
    onDeskPaginator,
    setAtBatPaginator,
    setOnDeskPaginator,
    setAtBatCustomer,
    setOnDeskCustomer,
    atBatQueryOptions,
    onDeskQueryOptions,
    listAllChart,
    chartList,
    setChartList,
    // Chart Function
    openSOAPModal,
    closeSOAPModal,
    openEditSOAPModal,
    closeEditSOAPModal,

    activeSOAPChart,
    // Table function
    findWaitList,
    findServeCustomerList,
    showCompleted,
    setShowCompleted,
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
  } = useChiro()

  const [activeAppointment, setActiveAppointment] = useState(false)
  const [refreshData, setRefreshData] = useState(false)
  const [uniquePatientIdList, setUniquePatientIdList] = useState([])

  const router = useRouter()
  const debounced = useDebouncedCallback(e => {
    onChangeSearch(e)
  }, 500)

  const openAppointmentModal = async () => {
    // await setActiveAppointment(true)
    const addAppointment = document.getElementById('AddAppointmentModal')
    addAppointment.classList.add('active')
  }
  const openInstantAppointmentModal = async () => {
    await setActiveAppointment(true)
    const addAppointment = document.getElementById('InstantAppointmentModal')
    addAppointment.classList.add('active')
  }

  useEffect(() => {
    if (refreshData) {
      // setServeListLoader(true)
      setShowCompleted(true)
      setRefreshData(false)
    }
  }, [refreshData])

  // should be used in future
  useEffect(() => {
    waitingAppointments
  }, [alertFormModalOpen])

  useEffect(() => {
    setUniquePatientIdList([
      ...new Set(appointments.map(appointment => appointment?.userId?._id)),
    ])
  }, [appointments])


  // useEffect(() => {
  //   console.log(`chartList`, chartList)

  //   console.log(`waitingAppointments`, waitingAppointments)


  //   console.log(`uniquePatientIdList`, uniquePatientIdList)
  // }, [appointments, uniquePatientIdList, chartList])

  // const uniquePatientIdList = [...new Set(appointments.map(appointment => appointment.patientId?._id))];

  return (
    <>


      <div className='p-5 overflow-auto details-sec'>
        <div className='flex flex-col flex-wrap justify-between gap-4 md:flex-row md:items-center'>
          <div className=''>
            <h3 className='font-medium'>Waitlist</h3>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <UserIcon className='w-4 h-4' />

                <p className='ml-2 text-sm text-gray-500'>
                  {waitingAppointments.length ?? 0} customer
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center gap-3 sm:flex-row'>
            <div
              type='text'
              className='w-full h-full px-4 py-2 text-center bg-transparent border border-gray-800 rounded-lg sm:w-auto text-gray-1000 text-xsl'>
              Today, {moment().format('MMMM D YYYY')}
            </div>
            <button
              type='button'
              onClick={openInstantAppointmentModal}
              className='flex items-center justify-center w-full h-full p-2 text-sm font-medium text-center text-black transition rounded-lg cursor-pointer sm:w-auto bg-yellowBg hover:bg-yellow-400'>
              Add Instant Appointment
              <span className='ml-2'>
                <PlusIcon />
              </span>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 mt-6 overflow-hidden rounded-lg dashboard-table xl:col-span-7'>
            <div className='grid h-auto grid-cols-12 gap-4 p-4 bg-primary lg:h-20'>
              <div className='col-span-12 lg:col-span-8 sm:col-span-6'>
                <h3 className='h-full font-medium flex-ver'>
                  On Deck
                  <span className='ml-1 text-gray-500'>
                    {waitingAppointments.length})
                  </span>
                </h3>
              </div>
              <div className='col-span-12 lg:col-span-4 sm:col-span-6'>
                <div className='relative flex items-center w-full'>
                  <div className='absolute left-3'>
                    <SearchIcon />
                  </div>
                  <input
                    type='text'
                    className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                    placeholder='Search'
                    onChange={debounced}
                  />
                </div>
              </div>
            </div>
            <div>
              <ReactTableList
                columns={OnDeskCustomerColumn(
                  this,
                  onClickServe,
                  onDeskPaginator,
                  onSendAlert,
                  addAlertModel,
                  router,
                  uniquePatientIdList
                )}
                page={1}
                data={waitingAppointments}
                recordsFiltered={15}
                paginator={onDeskPaginator}
                module='findAppointment'
                setTableData={setOnDeskCustomer}
                setPaginator={setOnDeskPaginator}
                loading={waitListLoader}
                setLoading={setWaitListLoader}
                dataQueryOptions={onDeskQueryOptions}
              />
            </div>
          </div>

          <div className='col-span-12 xl:col-span-5 '>
            <div className='mt-6 overflow-hidden rounded-lg responsive-table '>
              <div className='flex items-center justify-between h-auto p-4 bg-primary lg:h-20'>
                <h3 className='font-medium'>
                  {showCompleted ? 'Completed' : 'At Bat'}
                  <span className='ml-1 text-gray-500'>
                    (
                    {showCompleted
                      ? completedAppointments.length
                      : inServeAppointments.length}
                    )
                  </span>
                </h3>
                <ToggleButton
                  checked={showCompleted}
                  setChecked={setShowCompleted}
                />
              </div>
              <div>
                <ReactTableList
                  columns={AtBatCustomerColumn(
                    this,
                    onClickServe,
                    onSendAlert,
                    addAlertModel,
                    showCompleted,
                    uniquePatientIdList
                  )}
                  page={1}
                  data={
                    showCompleted ? completedAppointments : inServeAppointments
                  }
                  recordsFiltered={15}
                  paginator={atBatPaginator}
                  module='findAppointment'
                  setTableData={setAtBatCustomer}
                  setPaginator={setAtBatPaginator}
                  loading={serveListLoader}
                  setLoading={setServeListLoader}
                  dataQueryOptions={atBatQueryOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <WaitlistModal
        appointmentDetail={appointmentDetail}
        listAllChart={listAllChart}
        chartList={chartList}
        setChartList={setChartList}
        loading={loading}
        servicesToServe={services}
        // Chart Function
        openSOAPModal={openSOAPModal}
        closeSOAPModal={closeSOAPModal}
        openEditSOAPModal={openEditSOAPModal}
        closeEditSOAPModal={closeEditSOAPModal}
        activeSOAPChart={activeSOAPChart}
        findWaitList={findWaitList}
        findServeCustomerList={findServeCustomerList}
        onClickNoShow={onClickNoShow}
        noShowLoader={noShowLoader}
        setRefreshData={setRefreshData} // Make sure it's passed correctly
      />

      {patientId && alertModalOpen && (
        <>
          <AlertModel
            isOpen={alertModalOpen}
            closeModal={() => setAlertModalOpen(false)}
            patientId={patientId}
            loading={loading}
          />
        </>
      )}

      {patientId && alertFormModalOpen && (
        <AlertSideSheet
          isOpen={setAlertFormModalOpen}
          closeModal={() => {
            setAlertFormModalOpen(false)
            setWaitListLoader(true)
            findWaitList()
            findServeCustomerList()
            setWaitListLoader(false)
          }}
          patientId={patientId}
        />
      )}

      {activeAppointment && (
        <InstantAppointmentForm
          services={services}
          appointmentCreated={() => {
            findWaitList()
          }}
          activeAppointment={activeAppointment}
          setActiveAppointment={setActiveAppointment}
        />
      )}
    </>
  )
}

export default FrontDeskDashboard
