import React from 'react'
import ToggleButton from '../ToggleButton'
import Link from 'next/link'
import { TickName } from '../TickName'

const StaffViewBatColumn = that => [
  {
    data: 'customer',
    name: 'customer',
    Header: 'customer',
    accessor: 'customer',

    className: 'flex items-center text-left',
    Cell: props => (
      <div className='flex items-center'>
        <div>
          <img
            src='https://picsum.photos/200'
            className='h-10 w-10 object-cover rounded-full'
            alt=''
          />
        </div>
        <div className='ml-3'>
          <TickName name='Gregory Stevenson' />
          <p className='text-sm text-gray-500'>5 min</p>
        </div>
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },

  {
    data: 'action',
    name: 'action',
    Header: ' ',
    width: 70,
    accessor: 'action',
    className: ' flex items-center',
    Cell: props => (
      <div className='text-greenBg flex items-center'>
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
            d='M5 13l4 4L19 7'
          />
        </svg>
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
]
export default StaffViewBatColumn
