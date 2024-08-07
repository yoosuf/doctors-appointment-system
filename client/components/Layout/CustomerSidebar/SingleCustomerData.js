import ActiveIcon from '@/widget/image/ActiveIcon'
import React from 'react'

export default function SingleCustomerData(props) {
  const {
    onClickCustomer = () => {},
    item = {},
    perName = '',
    perImg,
    isActive = false,
    perNum = '',
    id = '',
    perLocation = [],
  } = props

  return (
    <>
      <button className='w-full' onClick={e => onClickCustomer(e, item)}>
        <button
          className={`${
            id === item.id ? 'bg-grayMid' : 'bg-transparent'
          } single-person-list w-full flex justify-between items-center px-5 py-4 border-b border-gray-500 transition hover:bg-grayMid`}>
          <div className='flex items-center'>
            <img
              src={perImg}
              className='object-cover w-10 h-10 rounded-full'
              alt='Snapcrack'
            />
            <div className='ml-3'>
              <div className='flex items-center'>
                <h3 className='mr-2 font-medium'>{perName}</h3>
                {isActive && <ActiveIcon />}
              </div>
              <p className='text-sm text-left text-gray-400'>{perNum}</p>
              {perLocation.map((data = {}, key = '') => {
                return (
                  <p className='text-sm text-left text-gray-400' key={key}>
                    {data.locationName}
                  </p>
                )
              })}
            </div>
          </div>
          <div className='right-arrow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              viewBox='0 0 20 20'
              fill='#9CA3AF'>
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </button>
      </button>
    </>
  )
}
