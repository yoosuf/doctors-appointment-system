import { componentAccess } from '@/utils/helper'
import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import React from 'react'
import DeletePopupModal from '../modal/DeletePopupModal'
import IconAction from './partial-update-icon'

const CityColumn = (
  that,
  onChangeActive,
  openEdit,
  openDeleteModal,
  openModal,
  closeModal,
  onClickDelete,
  label,
  deleteID,
  paginator
) => [
  {
    data: 'no',
    name: 'no',
    Header: '#',
    accessor: 'no',
    width: 50,
    Cell: props => <div>
      {(((paginator?.currentPage - 1) * (paginator?.perPage)) + props.index + 1)}
     </div>,
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'name',
    name: 'name',
    Header: 'city',
    accessor: 'name',
    className: 'flex items-center text-uppercase text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'code',
    name: 'code',
    Header: 'code',
    accessor: 'code',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'state',
    name: 'state',
    Header: 'state',
    accessor: 'state',
    className: 'flex items-center text-left',
    Cell: props => (
      <div>{props?.original?.provinceId?.name}</div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'country',
    name: 'country',
    Header: 'country',
    accessor: 'country',
    className: 'flex items-center text-left',
    Cell: props => (
      <div>{props?.original?.provinceId?.countryId?.name}</div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },

  {
    data: 'active',
    name: 'active',
    Header: 'active',
    accessor: 'active',
    className: ' flex items-center',
    Cell: props => (
      <IconAction
        original={props.original}
        onChangeActive={onChangeActive}
      />
    ),
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
    className: ' flex items-center',
    Cell: props => (
      <div className='flex'>
        {componentAccess(ROUTE_ACCESS.CITY, COMPONENT_ACCESS.update) && (
          <a
            className='cursor-pointer'
            onClick={() => openEdit(props.original?.id)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='#9CA3AF'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
              />
            </svg>
          </a>
        )}

        {componentAccess(ROUTE_ACCESS.CITY, COMPONENT_ACCESS.softDelete) && (
          <a
            className='ml-6 cursor-pointer'
            onClick={() => openModal(props.original)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='#9CA3AF'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </a>
        )}

        {openDeleteModal && (
          <DeletePopupModal
            closeModal={closeModal}
            onClickDelete={onClickDelete}
            label={label}
            data={deleteID}
          />
        )}
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
]
export default CityColumn
