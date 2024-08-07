import React from 'react'
import TitleBox from '../titleBox'

const AtBatCustomerColumn = (that, onClickServe, onSendAlert, addAlertModel, showCompleted, uniquePatientIdList) => [
  {
    data: 'customer',
    name: 'customer',
    Header: 'customer',
    accessor: 'customer',
    className: ' flex items-center',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original = {} }) => {
      return (
        <div className='flex items-center ml-2'>
          <TitleBox customer={original.userId} uniquePatientIdList={uniquePatientIdList} />
        </div>
      )
    },
  },
  {
    data: 'action',
    name: 'action',
    Header: '',
    accessor: 'action',
    width: 120,
    className: ' flex items-center',
    Cell: ({ original = {} }) => (
      !showCompleted && <div className='flex items-center'>

        {original?.userId?.alert?.length > 0 ? (
          <a className='cursor-pointer ' onClick={() => onSendAlert(original.userId._id)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-red-500'
              viewBox='0 0 20 20'
              fill='#ff0000'>
              <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
            </svg>
          </a>
        ) : (
          <a className='cursor-pointer ' onClick={() => addAlertModel(original.userId._id)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-red-500'
              viewBox='0 0 20 20'
              fill='#9ca3af'>
              <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
            </svg>
          </a>
        )}

        <a
          className='ml-6 cursor-pointer'
          onClick={() => onClickServe(original._id)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            viewBox='0 0 20 20'
            fill='#22C55E'>
            <path
              fillRule='evenodd'
              d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
              clipRule='evenodd'
            />
          </svg>
        </a>
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
]
export default AtBatCustomerColumn
