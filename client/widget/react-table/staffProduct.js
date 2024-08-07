import React from 'react'
import ToggleButton from '../ToggleButton'
import Link from 'next/link'

const StaffProductColumn = that => [
  {
    data: 'name',
    name: 'name',
    Header: 'product name',
    accessor: 'name',
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'category',
    name: 'category',
    Header: 'category',
    accessor: 'category',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'price',
    name: 'price',
    Header: 'price',
    accessor: 'price',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },

  {
    data: 'offer',
    name: 'offer',
    Header: 'offer Product',
    accessor: 'offer',
    className: ' flex items-center',
    Cell: props => <ToggleButton />,
    search: {
      value: null,
      regex: false,
    },
  },
]
export default StaffProductColumn
