import React from 'react'
import ToggleButton from '../ToggleButton'
import Link from 'next/link'

const StaffLocationColumn = that => [
  {
    data: 'location',
    name: 'location',
    Header: 'location',
    accessor: 'location',
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'subOwner',
    name: 'subOwner',
    Header: 'sub Owner',
    accessor: 'subOwner',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'address',
    name: 'address',
    Header: 'address',
    accessor: 'address',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },

  {
    data: 'assign',
    name: 'assign',
    Header: 'assign to location',
    accessor: 'assign',
    className: ' flex items-center',
    Cell: props => <ToggleButton />,
    search: {
      value: null,
      regex: false,
    },
  },
]
export default StaffLocationColumn
