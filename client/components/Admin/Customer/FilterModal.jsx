import React, { useState } from 'react'


export default function FilterModal({
  filterData,
  filterRemove,
  onClickApplyFilter,
}) {
  const [data, setData] = useState(filterData)
  const changeFilter = (e) => {
    let num = Number(e.target.value)
    if (e.target.checked) {
      let res = data.isActive === undefined ? num : num === 0 ? 0 : data.isActive === num ? num : 0
      setData({ isActive: res })
    } else {
      let res = num === 0 ? undefined : data.isActive === num ? undefined : num === 1 ? 2 : 1
      setData({ isActive: res })
    }
  }
  return (
    <>
      <div
        id='filter_modal'
        className='filter-modal chat-sidebar bg-primary xl:block hidden p-5 border-r border-gray-500  absolute top-0 w-full active'>
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

        <div className='mt-8'>
          <h3 className='text-sm font-medium inline-block'>Status</h3>
          <div className='form-check flex items-center mr-3 mt-3'>
            <input
              className='form-check-input h-4 w-5'
              type='checkbox'
              checked={data.isActive === 0}
              value={0}
              id='allstatus'
              onChange={changeFilter}
            />
            <label
              className='form-check-label ml-2 text-sm text-gray-400'
              htmlFor='allstatus'>
              All
            </label>
          </div>
          <div className='form-check flex items-center mr-3 mt-3'>
            <input
              className='form-check-input h-4 w-5'
              type='checkbox'
              checked={data.isActive === 1 || data.isActive === 0}
              value={1}
              id='verify'
              onChange={changeFilter}
            />
            <label
              className='form-check-label ml-2 text-sm text-gray-400'
              htmlFor='verify'
            >
              Active
            </label>
          </div>
          <div className='form-check flex items-center mr-3 mt-3'>
            <input
              className='form-check-input h-4 w-5'
              type='checkbox'
              checked={data.isActive === 2 || data.isActive === 0}
              value={2}
              id='notverify'
              onChange={changeFilter}
            />
            <label
              className='form-check-label ml-2 text-sm text-gray-400'
              htmlFor='notverify'>
              In-Active
            </label>
          </div>
          <div className='grid grid-cols-12 gap-4 mt-10'>
            <a
              onClick={filterRemove}
              className=' cursor-pointer rounded-lg bg-transprent border border-gray-700 block sm:px-4 px-2 py-2 text-sm text-center transition font-medium sm:col-span-4 col-span-12'>
              Close
            </a>

            <button
              onClick={() => onClickApplyFilter(data)}
              className='rounded-lg bg-yellowBg text-black block sm:px-8 px-2 py-2 text-center hover:bg-yellow-400 transition text-sm font-medium sm:col-span-8 col-span-12'>
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
