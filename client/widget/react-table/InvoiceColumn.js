import React from 'react'
import moment from 'moment'

const InvoiceColumn = (that, openInvoicePDF) => [
  {
    data: 'date',
    name: 'date',
    Header: 'DATE',
    accessor: 'date',
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => (
      <>{moment(original.issueDate).format('MMM DD, YYYY')}</>
    ),
  },
  {
    data: 'description',
    name: 'description',
    Header: 'DESCRIPTION',
    accessor: 'description',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'location',
    name: 'location',
    Header: 'location',
    accessor: 'location',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => (
      <>{original.appointmentId?.locationId?.locationName || '---'}</>
    ),
  },
  {
    data: 'amount',
    name: 'amount',
    Header: 'AMOUNT',
    accessor: 'amount',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => <>${original.total?.toFixed(2)}</>,
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
        <button onClick={e => openInvoicePDF(e, original.invoiceId)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='#9CA3AF'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
            />
          </svg>
        </button>
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
]
export default InvoiceColumn
