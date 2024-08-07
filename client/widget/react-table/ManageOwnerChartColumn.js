import React from 'react'
import ToggleButton from '../ToggleButton'

const ManageOwnerChartColumn = that => [
  {
    data: 'chartName',
    name: 'chartName',
    Header: 'Chart Name',
    accessor: 'chartName',
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'type',
    name: 'type',
    Header: 'Type',
    accessor: 'type',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },

  {
    data: 'action',
    name: 'action',
    Header: 'Enable template',
    accessor: 'action',
    className: ' flex items-center',
    Cell: props => <ToggleButton />,
    search: {
      value: null,
      regex: false,
    },
  },
]
export default ManageOwnerChartColumn
