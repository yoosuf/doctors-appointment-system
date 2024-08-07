import useAppointment from '@/components/Admin/Appointment/hooks/useAppointment'
import PlusIcon from '@/widget/image/PlusIcon'
import SearchIcon from '@/widget/image/SearchIcon'
import DeletePopupModal from '@/widget/modal/DeletePopupModal'
import RangePicker from '@/widget/range-picker'
import AppointmentColumn from '@/widget/react-table/appointment'
import ReactTableList from '@/widget/react-table/ReactTableList'
import { Menu, Transition } from '@headlessui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
// import AddAppointment from './AddAppointment'
import Overview from './Overview'
import { useDebouncedCallback } from 'use-debounce'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const EventAppointment = props => {
  
  const [activeAppointment, setActiveAppointment] = useState(false)
  const [singleAppointment, setSingleAppointment] = useState(false)
  const [appotmentData, setAppotmentData] = useState({})

  
  const router = useRouter()
  
  const {
    loading,
    role,
    dataQueryOptions,
    paginator,
    listData,
    setLoading,
    setListData,
    setPaginator,
    getAllData,
    onClickEdit,
    editData,
    setEditData,
    editAppointment,
    setEditAppointment,
    // Dropdown State
    event,
    selectedEvent,
    setSelectedEvent,
    // Delete Modal State
    openModal,
    closeModal,
    openDeleteModal,
    deleteID,
    label,
    onClickDelete,
    // Cancel Event Function
    onCancelEvent,
    handleDatePicker,
    selectionRange,
    handleSelect,
    setShowDate,
    showDate,
    onChangeSearch,
    showColumn,
    setShowColumn,
    handleChange,
  } = useAppointment()

  const debounced = useDebouncedCallback(e => {
    onChangeSearch(e)
  }, 500)

  // const openAddAppointmentModal = async () => {
  //   await setActiveAppointment(true)
  //   const addAppointment = document.getElementById('AddAppointmentModal')
  //   addAppointment.classList.add('active')
  // }

  // const closeAppointmentModal = async () => {
  //   await setActiveAppointment(false)
  //   const addAppointment = document.getElementById('AddAppointmentModal')
  //   addAppointment.classList.remove('active')
  // }


  const openAppointmentOverviewModal = async () => {
    await setSingleAppointment(true)
    const addAppointment = document.getElementById('AppointmentOverviewModal')
    addAppointment.classList.add('active')
  }

  const closeAppointmentOverviewModal = async () => {
    await setSingleAppointment(false)
    const addAppointment = document.getElementById('AppointmentOverviewModal')
    addAppointment.classList.remove('active')
  }

  const onViewData = data => {

    openAppointmentOverviewModal()
    setAppotmentData(data)
    console.log(data)
  }

  return (
    <>
      <div className='p-4 calender sm:p-6'>
        <div className='grid items-center grid-cols-12 gap-4 mb-5'>
          <div className='col-span-12 xl:col-span-9 md:col-span-7 sm:col-span-6'>
            <h3 className='font-medium text-left'>{selectedEvent?.name}</h3>
          </div>
          <div className='flex items-center col-span-12 xl:col-span-3 md:col-span-5 sm:col-span-6'>
            <div className='relative flex items-center w-full'>
              <div className='absolute left-3'>
                <SearchIcon />
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                placeholder={`Search ${selectedEvent.name}`}
                onChange={e => {
                  debounced(e)
                }}
              />
            </div>
            <div className='ml-3'>
              <Menu as='div' className='relative inline-block w-full text-left'>
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button>
                        <a
                          className='w-10 h-10 rounded-lg bg-yellowBg flex-cen'
                          // onClick={() => openAddAppointmentModal()}
                          >
                          <PlusIcon />
                        </a>
                      </Menu.Button>
                    </div>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
        <div className='rounded-lg bg-primary th-rounded-none'>
          <div className='rounded-lg products bg-primary'>
            <div className='relative flex flex-col flex-wrap items-center justify-between gap-4 p-4 sm:flex-row'>
              <div className='relative w-full sm:w-auto'>
                <div
                  className='grid w-full grid-cols-12'
                  onClick={handleDatePicker}>
                  <a className='flex items-center justify-center col-span-2 px-2 py-2 bg-transparent border border-gray-700 rounded-l-lg'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='#6B7280'>
                      <path
                        fillRule='evenodd'
                        d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                  <div className='relative w-full col-span-8'>
                    <input
                      type='text'
                      className='w-full h-full px-2 py-2 text-sm text-center text-gray-500 bg-transparent border border-gray-700 cursor-pointer'
                      value={
                        moment(selectionRange.startDate).format('MMM Do YYYY') +
                        ' - ' +
                        moment(selectionRange.endDate).format('MMM Do YYYY')
                      }
                    />
                  </div>
                  <a className='flex items-center justify-center col-span-2 px-2 py-2 bg-transparent border border-gray-700 rounded-r-lg'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='#6B7280'>
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </div>
                <div className='absolute bottom-0 z-50 col-span-8 cursor-pointer top-full'>
                  {showDate ? (
                    <RangePicker
                      selectionRange={selectionRange}
                      handleSelect={handleSelect}
                      setShowDate={setShowDate}
                      showDate={showDate}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            {/* table */}

            {/* {JSON.stringify(listData)} */}
            <div>
              <ReactTableList
                columns={AppointmentColumn(
                  this,
                  onViewData,
                  onClickEdit,
                  openModal,
                  onCancelEvent,
                  selectedEvent.code === 'EVENT' ? false : true,
                  showColumn
                )}
                page={1}
                data={listData}
                recordsFiltered={15}
                loading={loading}
                paginator={paginator}
                module='findAppointment'
                setTableData={setListData}
                setPaginator={setPaginator}
                setLoading={setLoading}
                dataQueryOptions={dataQueryOptions}
                onRowClick={rowData => console.log(rowData)} // Add this line
              />
            </div>
          </div>
        </div>
      </div>

      
      {/* <AddAppointment
        activeAppointment={activeAppointment}
        setActiveAppointment={setActiveAppointment}
        getAllData={getAllData}
        closeAppointmentModal={closeAppointmentModal}
        editAppointment={editAppointment}
        setEditAppointment={setEditAppointment}
      /> */}

      <Overview
        activeAppointment={singleAppointment}
        setActiveAppointment={setActiveAppointment}
        appotmentData={appotmentData}
        onClose={closeAppointmentOverviewModal}
      />

      {openDeleteModal && (
        <DeletePopupModal
          closeModal={closeModal}
          onClickDelete={onClickDelete}
          label={label}
          data={deleteID}
        />
      )}
    </>
  )
}
export default EventAppointment
