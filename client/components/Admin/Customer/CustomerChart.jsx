import AddSOAP from '@/components/Desk/Appointment/Chart/AddSOAP'
import AddDailyIntakeChart from '@/components/Desk/Appointment/Chart/AddDailyIntakeChart'
import useCustomerChart from '@/components/Admin/Customer/hooks/useCustomerChart'
import useMedicalAlertAndNote from '@/components/Admin/Customer/hooks/useMedicalAlertAndNote'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import DownArrow from '@/widget/image/DownArrow'
import EditIcon from '@/widget/image/EditIcon'
import SearchIcon from '@/widget/image/SearchIcon'
import UserIcon from '@/widget/image/UserIcon'
import Loader from '@/widget/loader'
import Pagination from '@/widget/Pagination/Pagination'
import { Menu, Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/solid'
import AlertIcon from 'icons/AlertIcon'
import AlertYellowIcon from 'icons/AlertYellowIcon'
import DownFillArrow from 'icons/DownFillArrow'
import ExpandIcon from 'icons/ExpandIcon'
import NoData from 'icons/NoData'
import PasteIcon from 'icons/PasteIcon'
import PinIcon from 'icons/PinIcon'
import WarningIcon from 'icons/WarningIcon'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import ForceInitialAnimation from './Collapse'
import useNurseDailyIntake from '@/components/Desk/Appointment/hooks/useNurseDailyIntake'
import EditDailyIntakeChart from '@/components/Desk/Appointment/Chart/EditDailyIntakeChart'
import EditSOAPSheet from '@/components/Desk/Appointment/Chart/EditSOAP'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const UserManagementChart = ({ id, userData }) => {
  const {
    loading,
    chartList,
    paginator,
    setPaginator,
    setChartList,
    setLoading,
    dataQueryOptions,
    openEdit,
    setDailyIntakeData,
    dailyIntakeData,
    getChartList,
    role,
    editSOAP,
    setEditSOAP,
    appointmentData,
    selectedChart,
    chartTemplateData,
    onPinnedChart,
    onExportChart,
    deletChartUser,
    archieveChart,
  } = useCustomerChart({ id })

  const { formik } = useNurseDailyIntake({})

  const {
    notes = [],
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
  } = useMedicalAlertAndNote({ id })

  const openChartModalChiro = e => {
    e.preventDefault()
    const openDailyIntake = document.getElementById('addDailyIntakeChartModal')
    openDailyIntake.classList.add('active')
  }

  const openChartModalNurse = e => {
    e.preventDefault()
    formik.resetForm({})
    const openDailyIntake = document.getElementById('activityModal')
    openDailyIntake.classList.add('active')
    setEditData()
  }

  const openSOAPModalFunc = e => {
    e.preventDefault()
    openSOAPModal()
  }
  const openMedicalAlertFunc = e => {
    e.preventDefault()
    setOpenMedicalAlert(true)
  }
  const openHealthNoteFunc = e => {
    e.preventDefault()
    setOpenHealthNote(true)
  }
  const appointmentDetail = {
    patientId: {
      _id: id,
      profile_image: {
        uri: userData?.profile_image?.uri,
      },
      firstName: userData?.firstName,
      lastName: userData?.lastName,
    },
    patient: {
      name: `${userData?.firstName} ${userData?.lastName}`,
    },
  }

  // Chart State and Fuction
  const [activeSOAPChart, setActiveSOAPChart] = useState(false)

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

  const closeEditSOAPModal = () => {
    setActiveSOAPChart(false)
    const chartModal = document.getElementById('editSoapChartSheet')
    chartModal.classList.remove('active')
  }

  return (
    <>
      <div className='mt-5 chart'>
        {/* <div className='flex items-center justify-start gap-3'>
          {getUser()?.roleId?.code === USER_ROLE_TYPE.CHIROPRACTOR && (
            <button
              onClick={openMedicalAlertFunc}
              disabled={
                notes.find((note = {}) => note.type === 'ALERT') ? true : false
              }
              className={classNames(notes.find((note = {}) => note.type === 'ALERT') ?
                'cursor-not-allowed' : '', 'flex items-center justify-center gap-2 mb-4 text-gray-400 border border-gray-500 hover:border-darkYellow p-2 rounded-lg')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                  fill='#EFB100'
                />
              </svg>
              <span className=''>Medical Alert</span>
            </button>
          )}

          {getUser()?.roleId?.code === USER_ROLE_TYPE.CHIROPRACTOR && (
            <buttonAddChart
              onClick={openHealthNoteFunc}
              disabled={
                notes.find((note = {}) => note.type === 'NOTE') ? true : false
              }
              className={classNames(notes.find((note = {}) => note.type === 'ALERT') ?
                'cursor-not-allowed' : '', 'flex items-center justify-center gap-2 mb-4 text-gray-400 border border-gray-500 hover:border-greenBg p-2 rounded-lg')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 20 20'
                fill='#15803D'>
                <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z'></path>
                <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z'></path>
              </svg>
              <span className=''>Note</span>
            </button>
          )}
        </div>

        {notes.map((note = {}) => (
          <>
            {note.type === 'ALERT' ? (
              <a
                key={note.id}
                className='relative flex items-center justify-between px-4 py-3 mt-4 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-lg note1'>
                <div className='flex items-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7'
                    viewBox='0 0 20 20'
                    fill='#EFB100'>
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'></path>
                  </svg>
                  <span className='ml-3'>{note.desc}</span>
                </div>
                <button onClick={e => onEdit(e, note)} className=''>
                  <EditIcon />
                </button>
              </a>
            ) : (
              <a
                key={note.id}
                className='relative flex items-center justify-between px-4 py-3 mt-4 text-sm font-semibold text-green-700 bg-green-100 rounded-lg note1'>
                <div className='flex items-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7'
                    viewBox='0 0 20 20'
                    fill='#15803D'>
                    <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z'></path>
                    <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z'></path>
                  </svg>
                  <span className='ml-3'>NOTE : {note.desc}</span>
                </div>
                <button onClick={e => onEdit(e, note)} className=''>
                  <EditIcon />
                </button>
              </a>
            )}
          </>
        ))}

        {openMedicalAlert && (
          <div className='p-3 my-4 rounded-lg bg-grayMid'>
            <h1 className='mb-1 text-darkYellow'>Medical Alert</h1>
            <textarea
              rows={2}
              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
              value={alertValue}
              onChange={e => setAlertValue(e.target.value)}
            />
            <div className='flex items-center justify-end gap-3 mt-2'>
              <button
                className='px-2 py-1 border rounded-lg bg-primary border-redAlert hover:bg-redAlert'
                onClick={onCancelMedicalAlert}>
                Cancel
              </button>
              <button
                className='px-2 py-1 border rounded-lg bg-primary border-yellowBg hover:bg-yellowBg hover:text-black'
                onClick={onSubmitMedicalAlert}>
                Submit
              </button>
            </div>
          </div>
        )}

        {openHealthNote && (
          <div className='p-3 my-4 rounded-lg bg-grayMid'>
            <h1 className='mb-1 text-greenBg'>Health Note</h1>
            <textarea
              rows={2}
              className='w-full px-3 py-2 placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
              value={noteValue}
              onChange={e => setNoteValue(e.target.value)}
            />
            <div className='flex items-center justify-end gap-3 mt-2'>
              <button
                className='px-2 py-1 border rounded-lg bg-primary border-redAlert hover:bg-redAlert'
                onClick={onCancelHealthNote}>
                Cancel
              </button>
              <button
                className='px-2 py-1 border rounded-lg bg-primary border-yellowBg hover:bg-yellowBg hover:text-black'
                onClick={onSubmitHealthNote}>
                Submit
              </button>
            </div>
          </div>
        )}

        {role === 'CHIROPRACTOR' && (
          <div className='col-span-12 my-5 lg:col-span-2 md:col-span-3 sm:col-span-6'>
            <div className='flex justify-end'>
              <button
                onClick={openChartModal}
                className='flex items-center justify-center rounded-lg bg-yellowBg'>
                <div className='flex items-center p-2 text-black'>
                  <p className='text-sm'>Daily Intake</p>
                  <span className='ml-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 4v16m8-8H4'
                      />
                    </svg>
                  </span>
                </div>
              </button>
              <button
                type='button'
                onClick={openSOAPModalFunc}
                className='flex items-center justify-center ml-2 text-sm rounded-lg bg-yellowBg'>
                <div className='flex items-center p-2 text-black'>
                  SOAP Chart
                  <span className='ml-2'>
                    <PlusIcon />
                  </span>
                </div>
              </button>
            </div>
          </div>
        )} */}

        <div className='grid items-start justify-between grid-cols-1 gap-3 md:flex'>
          <div className='relative flex items-center w-full form-group md:w-56 sm:min-w-56'>
            <div className='absolute left-3'>
              <SearchIcon />
            </div>
            <input
              type='text'
              className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
              placeholder='Search anything'
            />
          </div>

          <div className='flex flex-wrap items-center justify-start gap-3 md:justify-end'>
            <div className='relative'>
              <Menu as='div' className='relative inline-block text-left'>
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className='inline-flex items-center justify-center w-full px-3 py-2 placeholder-gray-500 bg-transparent border rounded-md border-grayLight'>
                        <UserIcon />
                        <DownFillArrow />
                      </Menu.Button>
                    </div>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items
                        static
                        className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'group flex items-center px-4 py-2 text-sm'
                                )}>
                                Male
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'group flex items-center px-4 py-2 text-sm'
                                )}>
                                Female
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
            <button className='flex items-center justify-center p-2 border rounded-lg bg-primary border-grayLight'>
              <PinIcon />
              <span className='font-medium text-gray-500 ml-1.5'>Pinned</span>
              <div className='px-2.5 py-0.5 bg-grayLight text-xs rounded-full ml-2'>
                5
              </div>
            </button>
            <button className='justify-center flex items-center p-2.5 bg-primary rounded-lg border border-grayLight'>
              <AlertIcon />
              <span className='text-sm font-medium text-white ml-1.5'>
                Medical Alert
              </span>
            </button>
            {/* <button className=' text-gray-400 justify-center flex items-center p-2.5 rounded-lg border border-grayLight  transition hover:border-yellowBg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#9CA3AF'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                  />
                </svg>
                <span className='text-sm font-medium ml-1.5'>
                  Filter / Export
                </span>
              </button> */}
            <div className='relative'>
              <Menu as='div' className='relative inline-block w-full text-left'>
                {({ open }) => (
                  <>
                    <Menu.Button className='inline-flex items-center justify-center w-full px-3 py-2.5 gap-1.5 bg-transparent border border-grayLight rounded-lg placeholder-gray-500'>
                      <h4 className='text-sm font-medium text-gray-400'>
                        Expand All
                      </h4>
                      <ExpandIcon />
                    </Menu.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items
                        static
                        className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'group flex items-center px-4 py-2 text-sm'
                                )}>
                                abc
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'group flex items-center px-4 py-2 text-sm'
                                )}>
                                abc
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
            {(role === USER_ROLE_TYPE?.CHIROPRACTOR ||
              role === USER_ROLE_TYPE?.NURSE) && (
              <>
                <button
                  onClick={e => openChartModalChiro(e)}
                  className='bg-yellowBg text-sm rounded-lg font-medium flex items-center justify-center text-black p-2.5 gap-1.5'>
                  <p>Daily Intake</p>
                  <PlusIcon className='w-5 h-5' />
                </button>

                <button
                  type='button'
                  onClick={e => {
                    e.preventDefault()
                    openSOAPModal()
                  }}
                  className='bg-yellowBg rounded-lg flex items-center justify-center text-sm font-medium text-black p-2.5 gap-1.5'>
                  <span>SOAP Chart</span>
                  <PlusIcon className='w-5 h-5' />
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          {/* <Link href='#'>
            <a className='flex items-center px-4 py-3 mt-4 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-lg note1'>
              <div>
                <AlertYellowIcon />
              </div>
              <span className='ml-3'>
                Nothing major today. More preventitive. Had some pain in mid
                back, but it has resolved, no HA right now either. Jaw has "been
                ok"
              </span>
            </a>
          </Link>
          <Link href='#'>
            <a className='flex items-center px-4 py-3 mt-4 text-sm font-semibold text-green-700 bg-green-100 rounded-lg note1'>
              <div>
                <PasteIcon />
              </div>
              <span className='ml-3'>
                NOTE : major today. More preventitive. Had some pain in mid
                back, but it has resolved, no HA right now either. Jaw has "been
                ok"
              </span>
            </a>
          </Link> */}

          <div className='relative mt-5 charts'>
            {!selectedChart?.length ? (
              <div className='py-20'>
                <div className='flex items-center justify-center text-xl'>
                  <div>
                    <NoData />
                  </div>
                </div>
                <div className='flex items-center justify-center text-2xl'>
                  No Chart Found
                </div>
              </div>
            ) : (
              <>
                {selectedChart.map((chart = {}) => (
                  <ForceInitialAnimation
                    chart={chart}
                    openEdit={openEdit}
                    chartTemplateData={chartTemplateData}
                    onPinnedChart={onPinnedChart}
                    onExportChart={onExportChart}
                  />
                ))}
                <div className='mt-3'>
                  <Pagination
                    paginator={paginator}
                    setPaginator={setPaginator}
                    module='findAllAppointmentChart'
                    setTableData={setChartList}
                    setLoading={setLoading}
                    dataQueryOptions={dataQueryOptions}
                  />
                </div>
              </>
            )}
            {loading && <Loader customClass='absolute' />}
          </div>
        </div>
      </div>

      <AddDailyIntakeChart
        appointmentDetail={appointmentDetail}
        listAllChart={getChartList}
      />

      <EditDailyIntakeChart
        appointmentDetail={{
          ...appointmentDetail,
          dailyIntakeChart: dailyIntakeData,
        }}
        clearDailyIntakeData={() => setDailyIntakeData({})}
        listAllChart={getChartList}
      />

      <AddSOAP
        closeSOAPModal={closeSOAPModal}
        activeSOAPChart={activeSOAPChart}
        appointmentDetail={appointmentDetail}
        patientId={appointmentDetail?.patientId}
        listAllChart={getChartList}
      />

      <EditSOAPSheet
        closeEditSOAPModal={closeEditSOAPModal}
        activeSOAPChart={activeSOAPChart}
        appointmentDetail={appointmentDetail}
        editSOAP={editSOAP}
        patientId={appointmentDetail?.patientId}
        listAllChart={getChartList}
        clearSoapData={() => setEditSOAP({})} />
    </>
  )
}

export default UserManagementChart