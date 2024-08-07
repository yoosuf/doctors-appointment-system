import React from 'react'
import TitleBox from '../titleBox'

import RealTimeTimestamp from '@/components/AppUi/Miscellaneous/RealTimeTimestamp'

const OnDeskCustomerColumn = (
  that,
  onClickServe,
  paginator = {},
  onSendAlert,
  addAlertModel,
  router,
  uniquePatientIdList
) => {
  return [
    {
      data: 'no',
      name: 'no',
      Header: 'Sr No.',
      accessor: 'no',
      width: 70,
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
      className: 'flex items-center text-left',
      width: 250,
      search: {
        value: null,
        regex: false,
      },
      Cell: ({ original = {} }) => {
        return (
          <>
            <TitleBox
              customer={original.userId}
              status={original.status}
              uniquePatientIdList={uniquePatientIdList}
            />
          </>
        )
      },
    },
    {
      data: 'waited_time',
      name: 'waited_time',
      Header: 'waited',
      accessor: 'waited_time',
      width: 130,
      Cell: ({ original = {} }) => {
        return (
          <div>
            <RealTimeTimestamp timestamp={original.date} />
          </div>
        )
      },
      className: 'flex items-center text-left',
      search: {
        value: null,
        regex: false,
      },
    },
    {
      data: 'action',
      name: 'action',
      Header: 'action',
      accessor: 'action',
      width: 120,
      className: ' flex items-center',
      Cell: ({ original = {} }) => {
        const isCursorNotAllowed = original.status === 'in-progress'
        
        // const isCursorNotAllowed = original.status === 'IN_SERVE' || uniquePatientIdList.includes(original.patientId?._id);

        // const isCursorNotAllowed =
        //   uniquePatientIdList.includes(original.patientId?._id)

        return (
          <div className='flex items-center'>
            {/* {JSON.stringify(isCursorNotAllowed)} */}
            {original?.userId?.alert?.length > 0 ? (
              <a
                className='cursor-pointer '
                onClick={() => onSendAlert(original?.userId?._id)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-red-500'
                  viewBox='0 0 20 20'
                  fill='#ff0000'>
                  <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
                </svg>
              </a>
            ) : (
              <a
                className='cursor-pointer '
                onClick={() => addAlertModel(original?.userId?._id)}>
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
              className={`ml-6 cursor-pointer ${
                isCursorNotAllowed ? 'cursor-not-allowed' : ''
              }`}
              onClick={
                isCursorNotAllowed ? () => {} : () => onClickServe(original._id)
              }>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                viewBox='0 0 20 20'
                fill={isCursorNotAllowed ? 'gray' : '#22C55E'}>
                <path
                  fillRule='evenodd'
                  d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </div>
        )
      },
      search: {
        value: null,
        regex: false,
      },
    },
  ]
}
export default OnDeskCustomerColumn
