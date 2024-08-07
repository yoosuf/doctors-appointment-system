import React, { useState, Fragment, useEffect } from 'react'
import AddSOAP from '@/components/Desk/Appointment/Chart/AddSOAP'
import useServeCustomer from '@/components/Desk/Appointment/hooks/useServeCustomer'
import routes from '@/utils/routes'
import ActiveIcon from '@/widget/image/ActiveIcon'
import CloseIcon from '@/widget/image/CloseIcon'
import Loader from '@/widget/loader'
import { parseInt } from 'lodash'
import Link from 'next/link'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import AddDailyIntakeChart from './Chart/AddDailyIntakeChart'
import AppointmentOverview from './AppointmentOverview'
import AppointmentVisit from './AppointmentVisit'
import UserActivity from './UserActivity'
import MedicalHistory from './MedicalHistory'
import EditDailyIntakeChart from './Chart/EditDailyIntakeChart'
import EditSOAPSheet from '@/components/Desk/Appointment/Chart/EditSOAP'
import CancelAppointment from './CancelAppointment'
import AlertsTabPanel from './Alert/AlertsTabPanel'
import AlertSideSheet from './Alert/AlertSideSheet'
import usePatientAlert from '@/components/Desk/Appointment/Alert/hooks/useAlert'
import Avatar from '@/components/AppUi/User/Avatar'
import NurseSOAP from './Chart/NurseSOAP'
import { formattedMembershipObj } from '@/utils/membership'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function WaitlistModal ({
  appointmentDetail = {},
  listAllChart,
  chartList,
  setChartList,
  loading,
  servicesToServe,
  openSOAPModal,
  closeSOAPModal,

  openEditSOAPModal,
  closeEditSOAPModal,
  activeSOAPChart,
  // Table function
  findWaitList,
  findServeCustomerList,
  onClickNoShow,
  noShowLoader,
  setRefreshData,
}) {
  const { selectedTabIndex, setSelectedTabIndex } = usePatientAlert({
    patientId,
  })
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [isNurseSOAPModalOpen, setNurseSOAPModalOpen] = useState(false)

  const [dailyIntakeData, setDailyIntakeData] = useState({})
  const [soapData, setSoapData] = useState({})
  const [chartObj, setChartObj] = useState({})
  const [patientObj, setPatientObj] = useState({})
  const [chartData, setChartData] = useState({})

  const [membership, setmembership] = useState({})

  const { time, onCompleted, serveLoading, closeBtn } = useServeCustomer({
    setChartList,
    findWaitList,
    findServeCustomerList,
    appointmentDetail,
  })

  const {
    patientId: patient = {},
    serviceIds: service = [],
    patientId = {},
    userId = {},
  } = appointmentDetail

  useEffect(() => {
    if (patientObj) {
      setPatientObj(patientId)
    }
  }, [])

  useEffect(() => {

    // console.log(`MEMBERSHIP OBJ FROM WAIT LIST:`,JSON.stringify(appointmentDetail?.userId?.membership))
    // console.log(
    //   `APPOINTMET MEMBERSHIP OBJ  `,
    //   formattedMembershipObj(appointmentDetail?.userId?.membership)
    // )
    setmembership(formattedMembershipObj(appointmentDetail?.userId?.membership))
  }, [appointmentDetail])

  const updateSoapData = value => {
    setSoapData(value)
  }

  // Function to update the state in the parent component
  const updateIntakeData = value => {
    setDailyIntakeData(value)
  }

  const setChartObject = value => {
    setChartObj(value)
  }

  const openCancelModal = () => {
    setIsCancelModalOpen(true)
  }

  const closeCancelModal = () => {
    setIsCancelModalOpen(false)
  }

  const openNurseSOAPModal = () => {
    setNurseSOAPModalOpen(true)
  }

  const closeNurseSOAPlModal = () => {
    setChartData({})
    setNurseSOAPModalOpen(false)
  }

  const openAlertModal = () => {
    setIsAlertModalOpen(true)
  }

  const closeAlertModal = () => {
    setIsAlertModalOpen(false)
  }

  const handleTabSelect = index => {
    setSelectedTabIndex(index)
  }

  const tabTitles = ['Overview', 'Alerts ', 'Activity', 'Visit', 'History']

  return (
    <>
      <section
        id='waitlistModal'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>
          {/* onClick={() => closeBtn()} removed  */}
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal'>
            <div className='relative w-screen max-w-xl'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='flex items-center profile-main'>
                        <Avatar
                          imageUrl={
                            appointmentDetail?.userId?.profile_image?.uri
                          }
                          userType={`Patient`}
                          size={`h-16 w-16 mr-6 object-cover`}
                        />
                        <div>
                          <div className='flex items-center main-per-name'>
                            <h3 className='mr-3 text-xl font-semibold'>
                              {appointmentDetail?.userId?.fullName }
                            </h3>
                            {appointmentDetail?.userId?.isActive && (
                              <ActiveIcon />
                            )}
                          </div>

                          
                          <div className='items-center main-per-detail lg:flex'>
                            <div className='flex items-center mt-2 membership'>
                              <p className={`text-gray-500 `}>
                                Subsctiption type:{' '}
                                {membership?.name ?? 'Not subscribed yet'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        type='button'
                        className='focus:outline-none '
                        onClick={closeBtn}>
                        <span className='sr-only'>Close panel</span>
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='relative flex-1 modal-body '>
                  <div>
                    <Tabs
                      selectedIndex={selectedTabIndex}
                      onSelect={handleTabSelect}>
                      <div className='sticky top-0 z-10 px-2 bg-grayMid'>
                        <TabList className='flex w-full overflow-x-auto border-b border-grayMid'>
                          {tabTitles.map((title, index) => (
                            <Tab
                              key={index}
                              className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                              <span className='cursor-pointer'>{title}</span>
                            </Tab>
                          ))}
                        </TabList>
                      </div>

                      <TabPanel>
                        <AppointmentOverview
                          appointmentDetail={appointmentDetail}
                          services={service}
                          chartList={chartList}
                          openSOAPModal={openSOAPModal}
                          updateIntakeData={updateIntakeData}
                          openEditSOAPModal={openEditSOAPModal}
                          updateSoapData={updateSoapData}
                          setChartObj={setChartObj}
                          setChartData={setChartData}
                          openNurseSOAPModal={openNurseSOAPModal}
                        />
                      </TabPanel>

                      <TabPanel>
                        <AlertsTabPanel
                          patientId={appointmentDetail?.userId?._id}
                        />
                      </TabPanel>
                      <TabPanel>
                        <UserActivity id={appointmentDetail?.userId?._id} />
                      </TabPanel>
                      <TabPanel>
                        <AppointmentVisit id={appointmentDetail?.userId?._id} />
                      </TabPanel>
                      <TabPanel>
                        <MedicalHistory
                          id={appointmentDetail?.userId?._id}
                          setUserData={appointmentDetail?.user}
                        />
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
                <div className='flex-wrap gap-1 p-5 border-t modal-footer border-grayLight flex-bet'>
                  <div></div>
                  <div className='flex-wrap gap-2 flex-ver'>
                    <button
                      type='button'
                      onClick={openCancelModal}
                      className={`${
                        noShowLoader ? 'cursor-not-allowed' : 'cursor-pointer'
                      } flex-ver px-3 py-2 rounded-lg bg-red-500 text-gray-200 font-medium gap-2`}>
                      Cancel Visit
                    </button>

                    <button
                      onClick={() => {
                        setPatientObj(patientId)
                        openAlertModal()
                      }}
                      // disabled={alertLoader ? true : false}
                      className={`flex-ver px-3 py-2 cursor-pointer rounded-lg bg-yellowBg text-gray-900 font-medium gap-2`}>
                      Add an Alert
                    </button>


                    <button
                      type='button'
                      onClick={event => {
                        onCompleted(event, appointmentDetail.id)
                      }}
                      disabled={serveLoading ? true : false}
                      className={`flex items-center justify-center gap-4  px-3 py-2 w-44 rounded-lg bg-greenBg text-gray-900 font-medium ${
                        serveLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                      }`}>
                      <div>
                        {parseInt(time / 60) + ':' + parseInt(time % 60)}
                      </div>{' '}
                      <div>Completed</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {loading && <Loader customClass='absolute' />}
          </div>
        </div>
      </section>

      <AddDailyIntakeChart
        appointmentDetail={appointmentDetail}
        listAllChart={listAllChart}
      />

      <EditDailyIntakeChart
        appointmentDetail={{
          ...appointmentDetail,
          dailyIntakeChart: dailyIntakeData,
        }}
        clearDailyIntakeData={() => setDailyIntakeData({})}
        listAllChart={listAllChart}
      />

      <AddSOAP
        closeSOAPModal={closeSOAPModal}
        activeSOAPChart={activeSOAPChart}
        appointmentDetail={appointmentDetail}
        patientId={appointmentDetail?.patientId}
        listAllChart={listAllChart}
      />

      <EditSOAPSheet
        closeEditSOAPModal={closeEditSOAPModal}
        activeSOAPChart={activeSOAPChart}
        appointmentDetail={appointmentDetail}
        editSOAP={soapData}
        patientId={appointmentDetail?.userId}
        listAllChart={listAllChart}
        clearSoapData={() => setSoapData({})}
      />

      {isCancelModalOpen && (
        <CancelAppointment
          isOpen={isCancelModalOpen}
          closeModal={() => {
            closeCancelModal()
            setSelectedTabIndex(3)
          }}
          closeParentModel={() => {
            closeBtn()
            setRefreshData(true)
            setSelectedTabIndex(0)
          }}
          appointmentDetail={appointmentDetail}
        />
      )}

      {isAlertModalOpen && (
        <AlertSideSheet
          isOpen={isAlertModalOpen}
          closeModal={() => {
            closeAlertModal()
            setSelectedTabIndex(1)
          }}
          closeParentModel={() => {
            closeBtn()
            setRefreshData(true)
            setSelectedTabIndex(0)
          }}
          patientId={appointmentDetail.userId._id}
        />
      )}

      {isNurseSOAPModalOpen && (
        <NurseSOAP
          listAllChart={listAllChart}
          servicesToServe={servicesToServe}
          appointmentDetail={appointmentDetail}
          isOpen={isNurseSOAPModalOpen}
          closeModal={() => {
            closeNurseSOAPlModal()
          }}
          chartData={chartData}
        />
      )}
    </>
  )
}
