import React from 'react'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import ActivityTableList from '@/widget/react-table/activityTableList'
import InvoiceColumn from '@/widget/react-table/InvoiceColumn'
import SearchIcon from '@/widget/image/SearchIcon'
import useCustomerBilling from '@/components/Admin/Customer/hooks/useCustomerBilling'
import AsyncSelect from 'react-select/async'
import { customStyles } from '@/utils/helper'
import moment from 'moment'
import RangePicker from '@/widget/range-picker'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const listData = [
  { date: '6/5/2020', description: 'Multi purchase', amount: '$19.99' },
  { date: '6/5/2020', description: 'Multi purchase', amount: '$19.99' },
  { date: '6/5/2020', description: 'Multi purchase', amount: '$19.99' },
  { date: '6/5/2020', description: 'Multi purchase', amount: '$19.99' },
  { date: '6/5/2020', description: 'Multi purchase', amount: '$19.99' },
  { date: '6/5/2020', description: 'Multi purchase', amount: '$19.99' },
  { date: '6/5/2020', description: 'Multi purchase', amount: '$19.99' },
]
const UserManagementInvoice = ({ id }) => {
  const {
    loading,
    setLoading,
    billingData,
    setBillingData,
    dataQueryOptions,
    paginator,
    setPaginator,
    openInvoicePDF,
    handleDatePicker,
    selectionRange,
    handleSelect,
    setShowDate,
    showDate,
    selectedLocationValue,
    setSelectedLocationValue,
    locationOptionsData,
    loadOptionsLocation
  } = useCustomerBilling({ id })
  return (
    <>
      <div className='mt-5 overflow-hidden rounded-lg invoice bg-primary th-rounded-none'>
        <div className='grid grid-cols-12 gap-4 p-4'>
          <div className='col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6'>
            <div className='relative flex items-center w-full'>
              <div className='absolute left-3'>
                <SearchIcon />
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                placeholder='Search'
              />
            </div>
          </div>
          <div className='hidden col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6 lg:block'></div>
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
          
          <div className='col-span-12 lg:col-span-2 md:col-span-3 sm:col-span-6'>
            <AsyncSelect
              styles={customStyles}
              // isMulti
              isSearchable
              hideSelectedOptions={true}
              // cacheOptions
              className='relative w-full text-sm text-left'
              placeholder='Select/Search location'
              id='locationId'
              value={selectedLocationValue}
              defaultOptions={locationOptionsData}
              
              loadOptions={loadOptionsLocation}
              // filterOption={() => true}
              onInputChange={value => {
                if (value === '' && locationOptionsData.length === 0) {
                  loadOptionsLocation()
                }
              }}
              onChange={async data => {
                setSelectedLocationValue(data)
              }}
            />
          </div>
                  </div>
        {/* table */}

        <div>
          <ActivityTableList
            columns={InvoiceColumn(this, openInvoicePDF)}
            page={1}
            data={billingData}
            recordsFiltered={15}
            loading={loading}
            setLoading={setLoading}
            setTableData={setBillingData}
            paginator={paginator}
            setPaginator={setPaginator}
            dataQueryOptions={dataQueryOptions}
            module='findOrder'
          />
        </div>

        {/* /table */}
      </div>
    </>
  )
}

export default UserManagementInvoice
