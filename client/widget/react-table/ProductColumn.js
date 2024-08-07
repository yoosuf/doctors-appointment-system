import moment from 'moment'
import React from 'react'

const ProductColumn = that => [
  {
    data: 'date',
    name: 'date',
    Header: 'DATE',
    accessor: 'createdAt',
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => (
      <div>{moment(original.createdAt).format('MMM Do, YYYY HH:mm a')}</div>
    ),
    width: 180,
  },
  {
    data: 'location',
    name: 'location',
    Header: 'LOCATION',
    accessor: 'location',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => <>{original.locationId?.locationName}</>,
  },

  {
    data: 'staffMember',
    name: 'staffMember',
    Header: 'STAFF MEMBER',
    accessor: 'staffMember',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'product',
    name: 'product',
    Header: 'PRODUCT',
    accessor: 'product',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => <>{original.products?.[0]?.productId?.name}</>,
  },
  {
    data: 'qty',
    name: 'qty',
    Header: 'QTY',
    accessor: 'qty',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => <>{original.products?.[0]?.qty}</>,
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
    Header: '',
    accessor: 'action',
    className: 'justify-center flex items-center',
    Cell: props => (
      <div>
        <p className=' text-blueBg text-sm '>View</p>
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
]
export default ProductColumn
