import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Image from 'next/image'
import PlusIcon from '@/widget/image/PlusIcon'
import { getUser } from '@/utils/localStorage'
import ChartOverview from './Chart/ChartOverview'
import { USER_ROLE_TYPE, WAITING } from '@/utils/constant'
import ChartItem from '@/components/AppUi/Appointment/ChartDataItem'
import { transformMembershipData, flattenObject } from '@/utils/membership';
import commonApi from '@/api/common'

const AppointmentOverview = ({
  appointmentDetail = {},
  services = [],
  chartList,
  openSOAPModal,
  updateIntakeData,
  openEditSOAPModal = () => {},
  updateSoapData,
  setChartData,
  openNurseSOAPModal,
}) => {
  const [membership, setMembership] = useState({})

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalChartData, setModalChartData] = useState({})
  const [serviceDescription, setServiceDescription] = useState({})
  const logedInuser = getUser()

  useEffect(() => {
    if (services.length) {
      setServiceDescription(services[0])
    }
  }, [services])

  const openAddDailyIntakeModal = () => {
    const chartModal = document.getElementById('addDailyIntakeChartModal')
    chartModal.classList.add('active')
  }

  const openEditDailyIntakeModal = (e, data) => {
    e.preventDefault()
    const chartModal = document.getElementById('editDailyIntakeChartModal')
    chartModal.classList.add('active')
  }

  const openChartModal = () => {
    setIsModalOpen(true)
  }

  const closeChartModal = () => {
    setIsModalOpen(false)
  }

  const handleEditClick = (e, data) => {
    e.stopPropagation()
    e.preventDefault()

    switch (data.type) {
      case 'SOAP':
        updateSoapData(data)
        openEditSOAPModal(data)
        break
      case 'SOAP_NURSE':
        setChartData(data)
        console.log(`EDIT data`, data)
        openNurseSOAPModal(data)
        break
      case 'DAILY_INTAKE':
        updateIntakeData(data)
        openEditDailyIntakeModal(e, data)
        break
      default:
        console.warn('Unknown type:', data.type)
    }
  }




  
  useEffect(() => {
    const fetchUserData = async () => {
      if (appointmentDetail && appointmentDetail?.userId?.id && typeof appointmentDetail?.userId?.id === 'string') {
        const userId = appointmentDetail.userId.id;
        console.log('Fetching user data for user ID:', userId);
        await fetchUser(userId);
      } else {
        // console.log('Invalid appointmentDetail or userId:', appointmentDetail);
      }
    };
  
    fetchUserData();
  
  }, [appointmentDetail]);
  
  const fetchUser = async (userId) => {
    await commonApi({
      parameters: [userId],
      action: 'getPatientById',
    }).then(({ DATA = {} }) => {
      console.log('User data received:', transformMembershipData(DATA.membership));
      setMembership(transformMembershipData(DATA.membership))
    }).catch(error => {
      console.error('Error fetching user data:', error);
    })
  };

  

  return (
    <>
      <div className='waitlistModal-body common-scrollbar'>
        <div className='p-5'>
          <div className='grid gap-4 sm:grid-cols-3'>
            <div>
              <h6 className='text-sm font-medium'>Last Visit</h6>

              <a className='inline-block px-2 py-1 mt-1 text-xs text-yellow-700 bg-yellow-100 rounded-full'>
                {appointmentDetail.lastVisit
                  ? moment(appointmentDetail.lastVisit)?.format('MMM, DD, yyyy')
                  : 'First Time Visit'}
              </a>
            </div>
            

            <>
              {membership?.categories?.map((plan = {}) => {

                if (plan) {
                  const TOTAL_CREDITS = plan.quota
                  const USED_CREDITS = plan.remainingQuota

                  const widthOfCredits =
                  USED_CREDITS > 0
                      ? (USED_CREDITS * 100) / TOTAL_CREDITS
                      : 0 // Corrected to calculate width based on remaining credits
                  return (
                    <div key={plan._id} className='mt-4 rate'>
                      <h6 className='text-sm font-medium'>{plan?.name}</h6>
                      <p className='mt-1 text-sm text-gray-400'>
                        <span
                          className={
                            USED_CREDITS === 0
                              ? 'text-red-500'
                              : USED_CREDITS < TOTAL_CREDITS
                              ? 'text-greenBg'
                              : 'text-blueBg'
                          }>
                          {USED_CREDITS} / {TOTAL_CREDITS}{' '}
                        </span>
                        remaining
                      </p>
                      <div className='w-full h-2 mt-3 rounded-full progress bg-grayMid'>
                        <div
                          style={{ width: `${widthOfCredits}%` }}
                          className={`h-2 w-full rounded-full ${
                            USED_CREDITS === 0
                              ? 'bg-red-500'
                              : USED_CREDITS < TOTAL_CREDITS
                              ? 'bg-greenBg'
                              : 'bg-blueBg'
                          }`}></div>
                      </div>
                    </div>
                  )
                }
              })}
            </>
          </div>
        </div>
        <div className='p-5 border-t order border-grayLight'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold'>Order</h3>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4 sm:grid-cols-4'>
            {services.map(service => (
              <a
                className='text-center transition-all single-order'
                onClick={() => setServiceDescription(service)}>
                <div className=''>
                  <Image
                    src={
                      service.categoryId.name === 'Vitamin Injection'
                        ? '/images/Order3.svg'
                        : service.categoryId.name === 'IV Therapy'
                        ? '/images/Order2.svg'
                        : '/images/Order4.svg'
                    }
                    alt='Snapcrack'
                    width={48}
                    height={48}
                  />
                </div>
                <h4 className='mt-1 text-gray-400 transition'>
                  {service.categoryId.name}
                </h4>
              </a>
            ))}
          </div>
          <div className='p-5 mt-5 text-sm rounded-lg patient-pref bg-grayMid'>
            <h6 className='mb-4'>{serviceDescription.name}</h6>
            <h6 className='mt-2'>Descripton:</h6>
            <div className='relative grid pt-1 activity-det sm:grid-cols-2 sm:gap-3'>
              <div className='grid gap-2 sm:mb-0 mb-1.5'>
                <div className='flex-ver'>
                  <div className='w-2 h-2 mr-2 bg-gray-300 rounded-full activity-round'></div>
                  <h4 className='text-gray-400'>
                    {serviceDescription.description}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='p-5 border-t border-grayLight'>
          <div className='grid items-center justify-end grid-cols-1 gap-2 mb-5 sm:grid-cols-2'>
            <h6 className='text-base font-medium'>Latest Chart</h6>
            <div className='grid justify-end grid-cols-2 gap-2'>
              <a
                href='#'
                onClick={e => {
                  openAddDailyIntakeModal()
                }}
                className='flex items-center justify-center rounded-lg bg-yellowBg'>
                <div className='flex items-center p-2 text-black'>
                  <p>Daily Intake</p>
                  <span className='ml-2'>
                    <PlusIcon />
                  </span>
                </div>
              </a>

              <a
                href='#'
                onClick={e => {
                  e.preventDefault()
                  if (getUser().roleId.code === USER_ROLE_TYPE.CHIROPRACTOR) {
                    openSOAPModal()
                  } else {
                    setChartData({}) //
                    openNurseSOAPModal()
                  }
                }}
                className='flex items-center justify-center rounded-lg bg-yellowBg'>
                <div className='flex items-center p-2 text-black'>
                  SOAP Chart
                  <span className='ml-2'>
                    <PlusIcon />
                  </span>
                </div>
              </a>
            </div>
          </div>

          {chartList?.length ? (
            chartList.map(data => (
              <ChartItem
                key={data.id}
                data={data}
                setModalChartData={setModalChartData}
                openChartModal={openChartModal}
                openEditModal={handleEditClick}
                logedInuser={logedInuser}
              />
            ))
          ) : (
            <div className='flex items-center justify-center py-3 mb-4 border rounded-lg border-yellowBg'>
              No Data Found
            </div>
          )}
        </div>
      </div>

      {/* Render the Modal component */}
      <ChartOverview
        isOpen={isModalOpen}
        closeModal={closeChartModal}
        chartData={modalChartData}
      />
    </>
  )
}

export default AppointmentOverview
