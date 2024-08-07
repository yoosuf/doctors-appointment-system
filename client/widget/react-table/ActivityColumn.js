import React from 'react'
import moment from 'moment'

const ActivityColumn = (that, OpenActivity, pagination) => [
  {
    data: 'activityName',
    name: 'activityName',
    Header: 'SR NO.',
    accessor: 'activityName',
    className: 'flex pl-2 ml-2 items-center ',
    Cell: props => (
      <div>
        {(pagination.currentPage - 1) * pagination.perPage + props.index + 1}
      </div>
    ),
    width: 70,
  },
  {
    data: 'activityName',
    name: 'activityName',
    Header: 'ACTIVITY NAME',
    accessor: 'activityName',
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'date',
    name: 'date',
    Header: 'DATE & TIME',
    accessor: 'date',
    className: ' flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => (
      <div>{moment(original.updatedAt).format('MMM Do, YYYY HH:mm a')}</div>
    ),
    width: 180,
  },
  {
    data: 'location',
    name: 'location',
    Header: 'LOCATION',
    accessor: 'location',
    className: ' flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    width: 180,
  },
  {
    data: 'ip',
    name: 'ip',
    Header: 'IP ADDRESS',
    accessor: 'ip',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    width: 180,
  },
]
export default ActivityColumn
