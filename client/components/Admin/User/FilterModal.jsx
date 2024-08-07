import React, { useState } from 'react'

const Location = [{ name: 'All Location' }]

export default function FilterModal({
  filterData,
  onChangeFilter,
  allChecked,
  setAllChecked,
  filterRemove,
  onClickApplyFilter,
  showOnlyActive,
  setShowOnlyActive,
  verifyData,
  onChangeVerifyFilter,
  allCheckedVerify,
  setAllCheckedVerify
}) {
  const [location, setLocation] = useState(Location[0])
  return (
    <>
      <div
        id='filter_modal'
        className='filter-modal chat-sidebar bg-primary xl:block hidden p-5 border-r border-gray-500  absolute top-0 w-full'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-lg font-semibold'>Filter</h3>
            <p className='text-sm text-gray-500'>display only these options</p>
          </div>

          <a onClick={filterRemove} className='cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </a>
        </div>
        {/* <div className='form-group mt-5'>
          <label className='text-sm font-medium inline-block mb-3'>
            Location
          </label>
          <DropdownButton
            value={location}
            MAP={Location}
            onChange={setLocation}
          />
        </div> */}

        <div className='mt-8'>
          <h3 className='text-sm font-medium inline-block'>Role</h3>
          <div className='form-check flex items-center mr-3 mt-3'>
            <input
              className='form-check-input h-4 w-5'
              type='checkbox'
              checked={allChecked}
              id='allrole'
              onChange={() => { setAllChecked(!allChecked) }}
            />

            <label
              className={
                allChecked
                  ? 'form-check-label ml-2 text-sm text-yellowBg'
                  : 'form-check-label ml-2 text-sm text-gray-400'
              }
              htmlFor='allrole'>
              All
            </label>
          </div>

          {filterData?.map(data => (
            <div
              className='form-check flex items-center mr-3 mt-3'
              key={data?.id}>
              <input
                className='form-check-input h-4 w-5'
                type='checkbox'
                checked={data?.checked}
                id='allrole'
                onChange={e => onChangeFilter(data, e)}
              />

              <label
                className={
                  data?.checked === true
                    ? 'form-check-label ml-2 text-sm text-yellowBg'
                    : 'form-check-label ml-2 text-sm text-gray-400'
                }
                htmlFor='allrole'>
                {data?.label}
              </label>
            </div>
          ))}
        </div>
        <div className='mt-8'>
          <h3 className='text-sm font-medium inline-block'>Status</h3>

          <div className='form-check flex items-center mr-3 mt-3'>
            <input
              className='form-check-input h-4 w-5'
              type='checkbox'
              checked={allCheckedVerify}
              id='status'
              onChange={() => { setAllCheckedVerify(!allCheckedVerify) }}
            />

            <label
              className={
                allCheckedVerify
                  ? 'form-check-label ml-2 text-sm text-yellowBg'
                  : 'form-check-label ml-2 text-sm text-gray-400'
              }
              htmlFor='status'>
              All
            </label>
          </div>
          {verifyData?.map(data => (
            <div
              className='form-check flex items-center mr-3 mt-3'
              key={data?.id}>
              <input
                className='form-check-input h-4 w-5'
                type='checkbox'
                checked={data?.checked}
                id='status'
                onChange={e => onChangeVerifyFilter(data, e)}
              />

              <label
                className={
                  data?.checked === true
                    ? 'form-check-label ml-2 text-sm text-yellowBg'
                    : 'form-check-label ml-2 text-sm text-gray-400'
                }
                htmlFor='status'>
                {data?.label}
              </label>
            </div>
          ))}
        </div>
        <div className='mt-8'>
          <h3 className='text-sm font-medium inline-block'>Active</h3>
          <div className='form-check flex items-center mr-3 mt-3'>
            <input
              className='form-check-input h-4 w-5'
              type='checkbox'
              value=''
              id='showOnlyActive'
              checked={showOnlyActive}
              onChange={(event) => setShowOnlyActive(event.target.checked)}
            />
            <label
              className='form-check-label ml-2 text-sm text-gray-400'
              htmlFor='showOnlyActive'>
              Show only active
            </label>
          </div>
          <div className='grid grid-cols-12 gap-4 mt-10'>
            <a
              onClick={filterRemove}
              className=' cursor-pointer rounded-lg bg-transprent border border-gray-700 block sm:px-4 px-2 py-2 text-sm text-center transition font-medium sm:col-span-4 col-span-12'>
              Close
            </a>

            <button
              onClick={onClickApplyFilter}
              className='rounded-lg bg-yellowBg text-black block sm:px-8 px-2 py-2 text-center hover:bg-yellow-400 transition text-sm font-medium sm:col-span-8 col-span-12'>
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
