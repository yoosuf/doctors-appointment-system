import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import { EyeIcon } from '@heroicons/react/24/solid'

const HomeCustomerBillingColumn = (that, openOverviewModel) => [
  {
    data: 'date',
    name: 'date',
    Header: 'date',
    accessor: 'date',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => (
      <div>{moment(original.date).format('MMM DD, YYYY hh:mm')}</div>
    ),
  },
  {
    data: 'detail',
    name: 'detail',
    Header: 'order type',
    accessor: 'detail',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => original.type,
  },

  {
    data: 'total',
    name: 'total',
    Header: 'total',
    accessor: 'total',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => (
      <button>${original.totalAmount?.toFixed(2)}</button>
    ),
  },
  {
    data: 'status',
    name: 'status',
    Header: 'status',
    accessor: 'status',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => (
      <button className='px-3 py-1 text-xs font-medium text-gray-900 rounded-full bg-greenBg'>
        {original.status}
      </button>
    ),
  },
  {
    data: 'action',
    name: 'action',
    Header: 'Action',
    accessor: 'action',
    width: 80,
    className: ' flex items-center',
    Cell: ({ original = {} }) => (
      <div className='flex justify-evenly'>
        <button onClick={e => openOverviewModel(e, original)}>
          <EyeIcon className='w-6 h-6 text-gray-400' />
        </button>
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
]
export default HomeCustomerBillingColumn
