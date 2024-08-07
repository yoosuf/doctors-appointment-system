import { COMPONENT_ACCESS, ROUTE_ACCESS } from '@/utils/constant'
import { componentAccess } from '@/utils/helper'
import React from 'react'
import 'react-responsive-modal/styles.css'
import DeletePopupModal from '../modal/DeletePopupModal'
import IconAction from './partial-update-icon'

const SubMasterColumn = (
  that,
  openEdit,
  onChangeActive,
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
    className: 'flex pl-2 ml-2 items-center ',
    Cell: props => (
      <div>
        {(paginator?.currentPage - 1) * paginator?.perPage + props.index + 1}
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'name',
    name: 'name',
    Header: 'name',
    accessor: 'name',
    className: 'flex items-center text-left',
    Cell: props => {
      return (
        <div className='white-space-break-spaces'>{props.original.name}</div>
      )
    },
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
    data: 'active',
    name: 'active',
    Header: 'active',
    accessor: 'active',
    className: ' flex items-center',
    Cell: props => (
      <IconAction original={props.original} onChangeActive={onChangeActive} />
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
    show:
      componentAccess(ROUTE_ACCESS.MASTER, COMPONENT_ACCESS.update) ||
      componentAccess(ROUTE_ACCESS.MASTER, COMPONENT_ACCESS.softDelete)
        ? true
        : false,
    className: ' flex items-center',
    Cell: props => (
      <div className='flex'>
        {componentAccess(ROUTE_ACCESS.MASTER, COMPONENT_ACCESS.update) && (
          <a
            onClick={() => openEdit(props.original.id)}
            className='cursor-pointer'>
            {/*  */}
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

        {componentAccess(ROUTE_ACCESS.MASTER, COMPONENT_ACCESS.softDelete) && (
          <a
            onClick={() => openModal(props.original)}
            className='ml-6 cursor-pointer'>
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
export default SubMasterColumn
