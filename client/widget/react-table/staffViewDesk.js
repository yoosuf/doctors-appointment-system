import React from 'react'
import ToggleButton from '../ToggleButton'
import Link from 'next/link'
import { TickName } from '../TickName'

const StaffViewDeskColumn = that => [
  {
    data: 'no',
    name: 'no',
    Header: <input type='checkbox' className='h-4 w-4' />,
    width: 50,
    accessor: 'no',
    Cell: props => {
      return <div>{props.index + 1}</div>
    },
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'customer',
    name: 'customer',
    Header: 'customer',
    accessor: 'customer',
    width: 300,
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
    data: 'waited',
    name: 'waited',
    Header: 'waited',
    accessor: 'waited',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'remained',
    name: 'remained',
    Header: 'remained',
    accessor: 'remained',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  
  {
    data: 'action',
    name: 'action',
    Header: ' ',
    accessor: 'action',
    className: ' flex items-center',
    Cell: props => (
      <div className='flex items-center'>
        <Link href='#'>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='#9CA3AF'>
              <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
            </svg>
          </a>
        </Link>
        <Link href='#'>
          <a className='ml-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='#22C55E'>
              <path
                fillRule='evenodd'
                d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                clipRule='evenodd'
              />
            </svg>
          </a>
        </Link>
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
]
export default StaffViewDeskColumn
