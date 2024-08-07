import React from 'react'
import ToggleButton from '../ToggleButton'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const StaffPermissionColumn = that => [
  {
    data: 'name',
    name: 'name',
    Header: 'name',
    accessor: 'name',
    width: 200,
    className: 'flex pl-2 ml-2 items-center ',
    Cell: props => (
      <div className='flex-ver gap-4'>
        <div>
          <img
            src='https://picsum.photos/200'
            className='h-10 w-10 object-cover rounded-full'
            alt=''
          />
        </div>
        <div>
          <h4 className='text-sm font-medium'>Cameron Williamson</h4>
          <p className='text-sm text-gray-400'>username:naturepath</p>
        </div>
      </div>
    ),
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'owner',
    name: 'owner',
    Header: 'owner',
    accessor: 'owner',
    width: 150,
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'role',
    name: 'role',
    Header: 'role',
    accessor: 'role',
    width: 150,
    className: 'flex items-center text-left',
    search: {
      value: null,
      regex: false,
    },
    Cell: props => (
      <div className='flex items-center'>
        <Menu as='div' className=' inline-block text-left w-full'>
          {({ open }) => (
            <>
              <div className='z-50'>
                <Menu.Button className='flex relative items-center w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg text-sm'>
                  <span>Full Access</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 ml-auto'
                    viewBox='0 0 20 20'
                    fill='#9CA3AF'>
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </Menu.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items
                  static
                  className=' absolute z-50 py-1 mt-2 overflow-auto max-h-60 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none sm:text-sm'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'group flex items-center px-4 py-2 text-sm'
                          )}>
                          Close
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    ),
  },

  {
    data: 'active',
    name: 'active',
    Header: 'active',
    accessor: 'active',
    className: ' flex items-center justify-center',
    Cell: props => <input type='checkbox' />,
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'accessBilling',
    name: 'accessBilling',
    Header: 'access Billing',
    accessor: 'accessBilling',
    className: ' flex items-center justify-center',
    Cell: props => <input type='checkbox' />,
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'accessChart',
    name: 'accessChart',
    Header: 'access Chart',
    accessor: 'accessChart',
    className: ' flex items-center justify-center',
    Cell: props => <input type='checkbox' />,
    search: {
      value: null,
      regex: false,
    },
  },
  {
    data: 'accessShift',
    name: 'accessShift',
    Header: 'access Shift',
    accessor: 'accessShift',
    className: ' flex items-center justify-center',
    Cell: props => <input type='checkbox' />,
    search: {
      value: null,
      regex: false,
    },
  },
]
export default StaffPermissionColumn
