import React from 'react'
import Link from 'next/link'
import ToggleButton from '../ToggleButton'
import DeletePopupModal from '../modal/DeletePopupModal'
import EditIcon from '../image/EditIcon'
import DeleteIcon from '../image/DeleteIcon'

const ManageOwnerLocationColumn = (
  that,
  onChangeActive,
  onClickDelete,
  open,
  openModal,
  closeModal,
  onClickEdit,
  id,
  label,
  deleteID
) => [
  {
    data: 'locationName',
    name: 'locationName',
    Header: 'location',
    accessor: 'locationName',
    className: 'flex pl-2 ml-2 items-center ',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'subOwner',
    name: 'subOwner',
    Header: 'SUB OWNER',
    accessor: 'subOwner',
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original }) => (
      <div>
        {original?.subOwnerId ? original?.subOwnerId?.firstName + ' ' + original?.subOwnerId?.lastName :''}
      </div>
    ),
  },
  {
    width: 300,
    data: 'address',
    name: 'address',
    Header: 'address',
    accessor: 'address',
    className: 'flex items-center',
    search: {
      value: null,
      regex: false,
    },
    Cell: ({ original }) => (
      <div>
        {original?.locationAddressId?.addressLine1 +
          ', ' +
          original?.locationAddressId?.addressLine2 +
          ', '}
      </div>
    ),
  },
  {
    data: 'locationAddressId.phone',
    name: 'locationAddressId.phone',
    Header: 'phone',
    accessor: 'locationAddressId.phone',
    className: ' flex items-center',
    search: {
      value: null,
      regex: false,
    },
    Cell: props => <div>{props?.original?.locationAddressId?.phone}</div>,
  },
  {
    data: 'action',
    name: 'action',
    Header: 'Action',
    accessor: 'action',
    className: 'flex items-center',
    Cell: (props = {}) => (
      <label className='switch'>
        <input
          type='checkbox'
          checked={props?.original?.isActive}
          onChange={() => onChangeActive(props.original)}
        />
        <span className='slider round'></span>
      </label>
      // <div className='flex'>
      //   <a
      //     className='cursor-pointer'
      //     onClick={() => onClickEdit(props.original?.id)}>
      //     <EditIcon />
      //   </a>

      //   <a
      //     onClick={() => openModal(props.original)}
      //     className='ml-6 cursor-pointer'>
      //     <DeleteIcon />
      //   </a>
      //   {open && (
      //     <DeletePopupModal
      //       closeModal={closeModal}
      //       label={label}
      //       onClickDelete={onClickDelete}
      //       data={deleteID}
      //       userId={id}
      //     />
      //   )}
      // </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
]
export default ManageOwnerLocationColumn
