// import AddAppointments from '@/components/Desk/AddAppointment'
import AddChrio from '@/components/Admin/GlobalAdd/AddChrio'
import AddCustomer from '@/components/Admin/GlobalAdd/AddCustomer'
import AddOwner from '@/components/Admin/GlobalAdd/AddOwner'
import AddStaff from '@/components/Admin/GlobalAdd/AddStaff'
import AddSubOwner from '@/components/Admin/GlobalAdd/AddSubOwner'
import {
  COMPONENT_ACCESS,
  ROUTE_ACCESS,
  SHORT_CUT_KEYS,
} from '@/utils/constant'
import { componentAccess } from '@/utils/helper'
import React, { useState } from 'react'
import AddFiles from './AddFiles'
import AddLocation from './AddLocation'
import AddService from './AddService'
import { useHotkeys } from 'react-hotkeys-hook'
import AddNurse from './AddNurse'

export default function QuickAction(props) {
  const [activeOwner, setActiveOwner] = useState(false)
  useHotkeys(SHORT_CUT_KEYS.addOwner, () => openOwnerModal(), [activeOwner])

  const [activeSubOwner, setActiveSubOwner] = useState(false)
  useHotkeys(SHORT_CUT_KEYS.addSubOwner, () => openAddSubOwnerModal(), [
    activeSubOwner,
  ])

  const [activeChrio, setActiveChrio] = useState(false)
  useHotkeys(SHORT_CUT_KEYS.addSubChiro, () => openAddChrioModal(), [
    activeChrio,
  ])

  const [activeStaff, setActiveStaff] = useState(false)
  useHotkeys(SHORT_CUT_KEYS.addStaff, () => openStaffModal(), [activeStaff])

  const [activeCustomer, setActiveCustomer] = useState(false)
  useHotkeys(SHORT_CUT_KEYS.addCustomer, () => openCustomerModal(), [
    activeCustomer,
  ])

  const [activeLocation, setActiveLocation] = useState(false)
  useHotkeys(SHORT_CUT_KEYS.addLocation, () => openAddLocationModal(), [
    activeLocation,
  ])

  const [activeAppointment, setActiveAppointment] = useState(false)
  useHotkeys(SHORT_CUT_KEYS.addAppointment, () => openAppointmentModal(), [
    activeAppointment,
  ])

  const [activeFile, setActiveFile] = useState(false)
  const boxStyle =
    'cursor-pointer p-6 bg-grayMid hover:bg-grayLight transition sm:col-span-1 col-span-2 rounded-lg'

  const closeBtn = () => {
    const quickActionModal = document.getElementById('quickAction')
    quickActionModal.classList.remove('active')
  }

  const openOwnerModal = async () => {
    await setActiveOwner(true)
    const openAddOwner = document.getElementById('AddOwnerModal')
    openAddOwner.classList.add('active')
  }

  const openStaffModal = async () => {
    await setActiveStaff(true)
    const openAddStaff = document.getElementById('AddStaffModal')
    openAddStaff.classList.add('active')
  }

  const openCustomerModal = async () => {
    await setActiveCustomer(true)
    const openAddCustomer = document.getElementById('AddCustomerModal')
    openAddCustomer.classList.add('active')
  }

  const openAddSubOwnerModal = async () => {
    await setActiveSubOwner(true)
    const openAddSubOwner = document.getElementById('AddSubOwnerModal')
    openAddSubOwner.classList.add('active')
  }

  const openAddChrioModal = async () => {
    await setActiveChrio(true)
    const openAddChrio = document.getElementById('AddChrioModal')
    openAddChrio.classList.add('active')
  }

  const openAddLocationModal = async () => {
    await setActiveLocation(true)
    const addLocation = document.getElementById('AddLocationModal')
    addLocation.classList.add('active')
  }

  const openAddServiceModal = async () => {
    await setActiveService(true)
    const addService = document.getElementById('AddServiceModal')
    addService.classList.add('active')
  }

  const openAddFileModal = async () => {
    await setActiveFile(true)
    const addFile = document.getElementById('AddFileModal')
    addFile.classList.add('active')
  }

  const openAppointmentModal = async () => {
    await setActiveAppointment(true)
    const addAppointment = document.getElementById('AddAppointmentModal')
    addAppointment.classList.add('active')
  }
  const openNurseModal = async () => {
    await setActiveAppointment(true)
    const addNurseModal = document.getElementById('AddNurseModal')
    addNurseModal.classList.add('active')
  }
  return (
    <>
      <section
        id='quickAction'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'
            onClick={() => closeBtn()}></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
            <div className='w-screen max-w-lg'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Quick Actions
                      </h2>
                      <p className='text-sm text-gray-400'>
                        Quick actions to add several data
                      </p>
                    </div>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        onClick={closeBtn}
                        className='focus:outline-none '>
                        <span className='sr-only'>Close panel</span>

                        <svg
                          className='w-6 h-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='#fff'
                          aria-hidden='true'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className='relative flex-1 p-4 modal-body sm:p-8'
                  id='top-div'>
                  <div className='grid grid-cols-2 gap-4'>
                    {componentAccess(
                      ROUTE_ACCESS.OWNER,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a onClick={openOwnerModal} className={boxStyle}>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>Owner</h4>
                        <p className='text-sm text-gray-400'>
                          Add new owner to the store{' '}
                          <span className='text-yellowBg'>(Shortcut Q+1)</span>
                        </p>
                      </a>
                    )}

                    {componentAccess(
                      ROUTE_ACCESS.SUB_OWNER,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a onClick={openAddSubOwnerModal} className={boxStyle}>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>
                          Sub Owner
                        </h4>
                        <p className='text-sm text-gray-400'>
                          Add new sub owner to the store{' '}
                          <span className='text-yellowBg'>(Shortcut Q+2)</span>
                        </p>
                      </a>
                    )}

                    {componentAccess(
                      ROUTE_ACCESS.CHIROPRACTOR,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a onClick={openAddChrioModal} className={boxStyle}>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>Chiro</h4>
                        <p className='text-sm text-gray-400'>
                          Add new chiro to the store{' '}
                          <span className='text-yellowBg'>(Shortcut Q+3)</span>
                        </p>
                      </a>
                    )}


                    {componentAccess(
                      ROUTE_ACCESS.SUB_OWNER,
                      COMPONENT_ACCESS.create
                    ) && (
                    <a onClick={() => openNurseModal()} className={boxStyle}>
                      <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-6 h-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                          />
                        </svg>
                      </div>
                      <h4 className='mb-1 text-base font-medium'>Nurse</h4>
                      <p className='text-sm text-gray-400'>
                        Add new nurse to the store{' '}
                        <span className='text-yellowBg'>(Shortcut Q+4)</span>
                      </p>
                    </a>
                    )}
                    {componentAccess(
                      ROUTE_ACCESS.SUB_OWNER,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a onClick={openStaffModal} className={boxStyle}>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>Staff</h4>
                        <p className='text-sm text-gray-400'>
                          Add new staff such as practitioner, front desk and
                          other staff type to the store{' '}
                          <span className='text-yellowBg'>(Shortcut Q+5)</span>
                        </p>
                      </a>
                    )}

                    {componentAccess(
                      ROUTE_ACCESS.PATIENT,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a className={boxStyle} onClick={openCustomerModal}>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>Customer</h4>
                        <p className='text-sm text-gray-400'>
                          Add new customer{' '}
                          <span className='text-yellowBg'>(Shortcut Q+6)</span>
                        </p>
                      </a>
                    )}

                    {componentAccess(
                      ROUTE_ACCESS.APPOINTMENT,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a onClick={openAppointmentModal} className={boxStyle}>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>
                          Appointment
                        </h4>
                        <p className='text-sm text-gray-400'>
                          Add new appointment{' '}
                          <span className='text-yellowBg'>(Shortcut Q+7)</span>
                        </p>
                      </a>
                    )}

                    {/* {componentAccess(
                      ROUTE_ACCESS.FILE,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a onClick={openAddFileModal} className={boxStyle}>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>
                          Add Files
                        </h4>
                        <p className='text-sm text-gray-400'>
                          Add new owner and sub owner to the store
                        </p>
                      </a>
                    )} */}

                    {componentAccess(
                      ROUTE_ACCESS.LOCATION,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a onClick={openAddLocationModal} className={boxStyle}>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>Location</h4>
                        <p className='text-sm text-gray-400'>
                          Add new store in any location{' '}
                          <span className='text-yellowBg'>(Shortcut Q+8)</span>
                        </p>
                      </a>
                    )}

                   

                    {componentAccess(
                      ROUTE_ACCESS.SERVICE,
                      COMPONENT_ACCESS.create
                    ) && (
                      <a
                        onClick={openAddServiceModal}
                        className='col-span-2 p-6 transition rounded-lg bg-grayMid hover:bg-grayLight'>
                        <div className='w-10 h-10 mb-5 text-gray-200 rounded-full flex-cen bg-grayLight'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M8.875 0.25C7.42525 0.25 6.25 1.42525 6.25 2.875C6.25 5.5 10.75 7.75 10.75 7.75C10.75 7.75 15.25 5.5 15.25 2.875C15.25 1.42525 14.0747 0.25 12.625 0.25C11.8892 0.25 11.2262 0.55498 10.75 1.04248C10.2738 0.55498 9.61075 0.25 8.875 0.25ZM8.875 1.75C9.178 1.75 9.46323 1.87009 9.67773 2.08984L10.0776 2.5H11.4224L11.8223 2.08984C12.0368 1.87009 12.322 1.75 12.625 1.75C13.2452 1.75 13.75 2.25475 13.75 2.875C13.75 3.82075 12.1705 5.18188 10.75 6.03613C9.32875 5.18113 7.75 3.82075 7.75 2.875C7.75 2.25475 8.25475 1.75 8.875 1.75ZM11.1892 9.34332L12.4141 8.48389L15.2383 12.5122L10.5552 15.7554L5.23633 13L6.54883 12.3408C7.80451 11.7092 9.79241 10.7085 9.81689 10.6958C9.95714 10.6115 10.0354 10.4458 9.98535 10.2725C9.92524 10.0644 9.72862 9.95612 9.521 10.0161H9.51807L4.41602 11.4385L1.94629 13.1377L2.72119 16.3003L5.5542 15.2764L10.6943 17.9395L18.855 12.2896L19.7075 13.5229L10.8057 19.6855L5.4458 16.9111L1.66211 18.2778L0.241211 12.4873L3.77148 10.0615L9.10498 8.57471H9.10645C9.90622 8.34434 10.7479 8.6817 11.1892 9.34332ZM11.23 9.40718C11.3135 9.54431 11.3803 9.69423 11.4268 9.85498V9.85645C11.6674 10.6899 11.2975 11.5659 10.5757 11.9907L10.5684 11.9951L10.5596 12.001C10.5555 12.0033 9.41646 12.5768 8.53516 13.0205L10.4424 14.0078L13.1436 12.1372L11.23 9.40718Z'
                              fill='#E4E4E7'
                            />
                          </svg>
                        </div>
                        <h4 className='mb-1 text-base font-medium'>Service</h4>
                        <p className='text-sm text-gray-400'>
                          Assing new services to the store{' '}
                          <span className='text-yellowBg'>(Shortcut Q+10)</span>
                        </p>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddStaff activeStaff={activeStaff} setActiveStaff={setActiveStaff} />
      <AddOwner activeOwner={activeOwner} setActiveOwner={setActiveOwner} />
      <AddCustomer
        activeCustomer={activeCustomer}
        setActiveCustomer={setActiveCustomer}
      />
      <AddSubOwner
        activeSubOwner={activeSubOwner}
        setActiveSubOwner={setActiveSubOwner}
      />
      <AddChrio activeChrio={activeChrio} setActiveChrio={setActiveChrio} />
      <AddLocation
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
      />

      {/* <AddService
        activeService={activeService}
        setActiveService={setActiveService}
      /> */}
      <AddFiles activeFile={activeFile} setActiveFile={setActiveFile} />
      {/* Commented dur to error */}
      {/* <AddAppointments
        activeAppointment={activeAppointment}
        setActiveAppointment={setActiveAppointment}
      /> */}
      <AddNurse
        activeAppointment={activeAppointment}
        setActiveAppointment={setActiveAppointment}
      />
    </>
  )
}
