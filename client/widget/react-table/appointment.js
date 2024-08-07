import { getUser } from '@/utils/localStorage'
import moment from 'moment'
import React, { useState } from 'react'
import { DISPLAY } from '@/utils/constant'
import { timeDisplay } from '@/utils/helper'
import StatusPopover from './StatusPopover' // Import the StatusPopover component
import { PatientPopover } from '@/components/AppUi/Appointment/PatientPopover'

const AppointmentColumn = (
  that,
  onViewData,
  onClickEdit,
  openModal,
  onCancelEvent,
  showPatient,
  showColumn
) => [
  {
    data: 'id',
    name: 'id',
    Header: 'id',
    accessor: 'id',
    className: 'flex pl-2 ml-2 items-center text-blue-400',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => {
      return <div>{Date.parse(original.createdAt)}</div>
    },
  },
  {
    data: 'locationId.locationName',
    name: 'locationId.locationName',
    Header: 'location',
    accessor: 'locationId.locationName',
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'time',
    name: 'time',
    Header: 'appointment At',
    accessor: 'time',
    className: 'flex items-center text-center',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => {
      return <>{moment(original.date).format('MM-DD-YYYY HH:mm:ss')}</>
    },
  },

  {
    data: 'customer',
    name: 'customer',
    Header: 'customer',
    accessor: 'customer',
    className: 'flex items-center text-center',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original: { userId = {} } }) => (
      <>{`${userId?.firstName} ${userId?.lastName}`}</>
    ),
  },
  {
    data: 'service',
    name: 'service',
    Header: 'service',
    accessor: 'service',
    className: 'flex items-center text-center',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => (
      <>{original.serviceIds.map(service => service.name).join(', ')}</>
    ),
  },
  {
    data: 'status',
    name: 'status',
    Header: 'status',
    accessor: 'status',
    className: 'flex items-center text-center',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original: { status } }) => {
      const statusClasses = {
        PROPOSED: 'bg-blueBg text-blueText',
        confirmed: 'bg-yellowBg text-black',
        'in-progress': 'bg-whiteMid text-whiteText',
        canceled: 'bg-red-800 text-slate-100',
        completed: 'bg-greenBg text-greenText',
        suspended: 'bg-red-500 text-greenText',
      }
      const getStatusClass = status =>
        statusClasses[status] || statusClasses.confirmed
      return (
        <div
          className={`text-sm px-2 py-0.5 rounded-lg ${getStatusClass(
            status
          )}`}>
          {status}
        </div>
      )
    },
  },
  {
    data: 'remarks',
    name: 'remarks',
    Header: 'Remarks',
    accessor: 'remarks',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => <>{original?.remarks && original?.remarks}</>,
  },

  {
    data: 'action',
    name: 'action',
    Header: 'Action',
    accessor: 'action',
    className: ' flex items-center',
    Cell: ({ original = {} }) => (
      <div className='flex'>
        <a className='mr-2 cursor-pointer' onClick={() => onViewData(original)}>
          <svg
            fill='rgba(156, 163, 175,1)'
            className='w-5 h-5'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' />
          </svg>
        </a>

        {/* <a
            className='mr-2 cursor-pointer'
            onClick={() => onClickEdit(original)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              viewBox='0 0 20 20'
              fill='rgba(156, 163, 175,1)'>
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
          </a> */}

        {/* <a className='cursor-pointer' onClick={() => openModal(original)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              viewBox='0 0 20 20'
              fill='rgba(156, 163, 175,1)'>
              <path
                fillRule='evenodd'
                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </a> */}
      </div>
    ),
  },
]
export default AppointmentColumn
