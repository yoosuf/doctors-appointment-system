import React from 'react'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ArchiveIcon,
  ArrowCircleRightIcon,
  ChevronDownIcon,
  DuplicateIcon,
  HeartIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
} from '@heroicons/react/24/solid'
import { YellowBtn } from '@/widget/button/YellowBTN'
import { TickName } from '@/widget/TickName'
import StaffViewDeskColumn from '@/widget/react-table/staffViewDesk'
import ReactTableList from '@/widget/react-table/ReactTableList'
import StaffViewBatColumn from '@/widget/react-table/staffViewBat'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const StaffView = () => {
  const listData = [
    { no: '1', waited: '10 min', remained: '3/2', estWait: '1 min' },
    { no: '1', waited: '10 min', remained: '3/2', estWait: '1 min' },
    { no: '1', waited: '10 min', remained: '3/2', estWait: '1 min' },
    { no: '1', waited: '10 min', remained: '3/2', estWait: '1 min' },
  ]
  return (
    <>
      <div className='p-5 overflow-auto details-sec'>
        <div className='flex-wrap gap-3 flex-bet'>
          <div className=''>
            <h3 className='font-medium'>Overview</h3>
            <p className='text-sm text-gray-500'>The village</p>
          </div>
          <div className='flex flex-wrap items-center gap-3 '>
            <div className=''>
              <Menu as='div' className='relative inline-block w-full text-left'>
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className='flex items-center w-full px-3 py-2 text-sm bg-transparent border border-gray-700 rounded-lg'>
                        The Village
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5 ml-auto'
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
                        className='absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
            <div className=''>
              <div className='grid grid-cols-12'>
                <Link href='#'>
                  <a className='flex items-center justify-center col-span-2 px-2 py-2 bg-transparent border border-gray-700 rounded-l-lg'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='#6B7280'>
                      <path
                        fillRule='evenodd'
                        d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </Link>
                <div className='w-full col-span-8'>
                  <div
                    type='text'
                    className='w-full h-full px-2 py-2 text-sm text-center text-gray-500 bg-transparent border border-gray-700'>
                    01 May - 07 May
                  </div>
                </div>
                <Link href='#'>
                  <a className='flex items-center justify-center col-span-2 px-2 py-2 bg-transparent border border-gray-700 rounded-r-lg'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      viewBox='0 0 20 20'
                      fill='#6B7280'>
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            <div className=''>
              <Menu as='div' className='relative inline-block w-full text-left'>
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className='flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 rounded-lg bg-yellowBg'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5 mr-1'
                          viewBox='0 0 20 20'
                          fill='currentColor'>
                          <path
                            fillRule='evenodd'
                            d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                            clipRule='evenodd'
                          />
                        </svg>
                        view as staff
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5 ml-1'
                          viewBox='0 0 20 20'
                          fill=''>
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
                        className='absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
            <div>
              <Link href='#'>
                <a className='w-10 h-10 bg-transparent border border-gray-700 rounded-lg flex-cen'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 mt-6 overflow-hidden rounded-lg dashboard-table lg:col-span-8'>
            <div className='grid grid-cols-12 gap-4 p-4 bg-primary h-73'>
              <div className='col-span-12 lg:col-span-8 sm:col-span-6'>
                <h3 className='h-full gap-1 font-medium flex-ver'>
                  On Desk <span className='text-gray-500'>(5)</span>
                </h3>
              </div>
              <div className='col-span-12 lg:col-span-4 sm:col-span-6'>
                <div className='relative flex items-center w-full'>
                  <div className='absolute left-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#9CA3AF '>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                    </svg>
                  </div>
                  <input
                    type='text'
                    className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                    placeholder='Search'
                  />
                </div>
              </div>
            </div>
            {/* table */}

            <div>
              <ReactTableList
                columns={StaffViewDeskColumn(this)}
                page={1}
                data={listData}
                recordsFiltered={15}
                //loading={isLoading}
              />
            </div>

            {/* /table */}
          </div>
          <div className='col-span-12 lg:col-span-4'>
            {/* table */}

            <div className='mt-6 overflow-hidden rounded-lg responsive-table'>
              <div className='p-4 h-73 bg-primary flex-ver'>
                <h3 className='font-medium'>
                  At Bat <span className='text-gray-500'>(5)</span>
                </h3>
              </div>
              <div>
                <ReactTableList
                  columns={StaffViewBatColumn(this)}
                  page={1}
                  data={listData}
                  recordsFiltered={15}
                  //loading={isLoading}
                />
              </div>
            </div>
            {/* /table */}
          </div>
        </div>
      </div>
    </>
  )
}

export default StaffView
