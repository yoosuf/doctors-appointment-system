import useCustomerActivity from '@/components/Admin/Customer/hooks/useCustomerActivity'
import SearchIcon from '@/widget/image/SearchIcon'
import RangePicker from '@/widget/range-picker'
import ReactTableList from '@/widget/react-table/ReactTableList'
import moment from 'moment'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import ActivityColumn from '@/widget/react-table/ActivityColumn'
import ActivityModal from './ActivityModal'
const UserManagementActivity = ({ id }) => {
  const {
    loading,
    activityList,
    pagination,
    dataQueryOptions,
    setLoading,
    setPagination,
    setActivityList,
    selectionRange,
    handleSelect,
    setSearchValue,
  } = useCustomerActivity({ id })
  const OpenActivity = () => {
    const activity = document.getElementById('activityModal')
    activity.classList.add('active')
  }
  const [showDate, setShowDate] = useState(false)

  const handleDatePicker = () => {
    setShowDate(!showDate)
  }
  const debounced = useDebouncedCallback(e => {
    setSearchValue(e.target.value)
  }, 500)
  return (
    <>
      <div className='activity'>
        <div className='grid grid-cols-12 gap-2 mt-5'>
          <div className='col-span-12 lg:col-span-4 2xl:col-span-6'>
            <h3 className='font-medium'>Activity</h3>
            <p className='text-sm text-gray-500'>User activity</p>
          </div>
          <div className='relative col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3'>
            <div className='grid grid-cols-12' onClick={handleDatePicker}>
              <a className='py-2.5 col-span-2 px-2 bg-transparent rounded-l-lg flex items-center justify-center border border-gray-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4'
                  viewBox='0 0 20 20'
                  fill='#6B7280'>
                  <path
                    fillRule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
              <div className='w-full col-span-8'>
                <input
                  type='text'
                  className='w-full px-2 py-2.5 bg-transparent border border-gray-700 text-gray-500 text-sm h-full text-center'
                  value={
                    moment(selectionRange.startDate).format('MMM Do YYYY') +
                    ' - ' +
                    moment(selectionRange.endDate).format('MMM Do YYYY')
                  }
                />
              </div>
              <a className='py-2.5 col-span-2 px-2 bg-transparent rounded-r-lg flex items-center justify-center border border-gray-700'>
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
            <div className='absolute right-0 col-span-8 cursor-pointer z-999 top-10'>
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
          <div className='col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3'>
            <div className='w-full'>
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
        </div>

        {/* table */}
        <div className='mt-8 '>
          <ReactTableList
            columns={ActivityColumn(this, OpenActivity, pagination)}
            OpenActivity={OpenActivity}
            page={1}
            data={activityList}
            recordsFiltered={15}
            loading={loading}
            paginator={pagination}
            module='userActivity'
            setTableData={setActivityList}
            setPaginator={setPagination}
            setLoading={setLoading}
            dataQueryOptions={dataQueryOptions}
          />
        </div>
        {/* /table */}

        <ActivityModal />
      </div>
    </>
  )
}

export default UserManagementActivity
