import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ToggleButton from '@/widget/ToggleButton'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function EditFiles() {
  const filterRemove = () => {
    const filterModal = document.getElementById('filter_modal')
    filterModal.classList.remove('active')
  }
  const [startDate, setStartDate] = useState(new Date())

  return (
    <>
      <section
        id='activityModal'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main active'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
            <div className='w-screen max-w-xl'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Edit Files
                      </h2>
                      <p className='text-sm text-gray-400'>
                        Get started by filling in the information below to add
                        note
                      </p>
                    </div>
                    <div className='flex items-center ml-3 h-7'>
                      <button className='focus:outline-none '>
                        <span className='sr-only'>Close panel</span>
                        <svg
                          className='w-6 h-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='#fff'
                          aria-hidden='true'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className='relative flex-1 p-4 modal-body'>
                  <div className='grid gap-2 pb-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Title</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='form-group'>
                        <input
                          type='text'
                          className='w-full px-3 py-2 text-sm placeholder-gray-500 bg-transparent border border-gray-500 rounded-lg'
                          placeholder='Some title'
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-3 mt-3'>
                        <Menu
                          as='div'
                          className='relative inline-block w-full text-left'>
                          {({ open }) => (
                            <>
                              <div>
                                <Menu.Button className='flex items-center justify-between w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg'>
                                  Select File Categories
                                  <div className='absolute text-gray-400 right-2'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                      className='w-5 h-5 ml-2 -mr-1'
                                      aria-hidden='true'>
                                      <path
                                        fillRule='evenodd'
                                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                        clipRule='evenodd'></path>
                                    </svg>
                                  </div>
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
                                  className='absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
                                          Edit
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                        <Menu
                          as='div'
                          className='relative inline-block w-full text-left'>
                          {({ open }) => (
                            <>
                              <div>
                                <Menu.Button className='flex items-center justify-between w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg'>
                                  PNG
                                  <div className='absolute text-gray-400 right-2'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                      className='w-5 h-5 ml-2 -mr-1'
                                      aria-hidden='true'>
                                      <path
                                        fillRule='evenodd'
                                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                        clipRule='evenodd'></path>
                                    </svg>
                                  </div>
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
                                  className='absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
                                          JPG
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
                    </div>
                  </div>
                  <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Date</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='form-group'>
                        <DatePicker
                          dateFormat="MM-dd-yyyy"
                          selected={startDate}
                          onChange={date => setStartDate(date)}
                          placeholder='Date of birth'
                          className='w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>File</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='p-6 border border-gray-500 border-dashed selected-img rounded-xl'>
                        <img
                          src='https://picsum.photos/500'
                          className='object-cover w-full h-48 rounded-xl'
                          alt=''
                        />
                      </div>
                      <p className='py-2 text-sm text-gray-400'>
                        2203-screencast
                      </p>
                      <div className='flex items-center inline-block px-4 py-2 text-sm font-medium text-center text-white transition border border-gray-700 rounded-lg cursor-pointer bg-transprent hover:border-yellowBg'>
                        <label
                          htmlFor='file-upload'
                          className='relative py-3 cursor-pointer'>
                          <div className='flex items-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='18'
                              height='14'
                              viewBox='0 0 18 14'
                              fill='none'>
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M0.25 0.125V13.875H17.75V0.125H0.25ZM1.5 1.375H16.5V10.0664L13.1992 6.74609L12.75 6.29688L9.91797 9.12891L6.32422 5.49609L5.875 5.04688L1.5 9.42188V1.375ZM12.75 3.875C12.75 3.18408 13.3091 2.625 14 2.625C14.6909 2.625 15.25 3.18408 15.25 3.875C15.25 4.56592 14.6909 5.125 14 5.125C13.3091 5.125 12.75 4.56592 12.75 3.875ZM5.875 6.82422L11.6172 12.625H1.5V11.1992L5.875 6.82422ZM16.5 11.8242L12.75 8.07422L10.7969 10.0078L13.3945 12.625H16.5V11.8242Z'
                                fill='#9CA3AF'
                              />
                            </svg>
                            <span className='ml-2'>Change File</span>
                          </div>
                          <input
                            id='file-upload'
                            name='file-upload'
                            type='file'
                            className='sr-only'
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-2 pb-4 mt-4 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>File Description</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='grid grid-cols-12 gap-4'>
                        <textarea
                          placeholder='write something.'
                          className='w-full col-span-12 p-3 text-gray-500 bg-transparent border border-gray-500 rounded-lg h-28'></textarea>
                        <div className='flex items-center justify-between col-span-12'>
                          <div>
                            <h4 className='text-sm font-medium'>
                              Include in Patient’s Chart
                            </h4>
                          </div>
                          <div>
                            <ToggleButton />
                          </div>
                        </div>
                        <div className='flex items-center justify-between col-span-12'>
                          <div>
                            <h4 className='text-sm font-medium'>
                              Not Visible To Patient
                            </h4>
                          </div>
                          <div>
                            <ToggleButton />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-auto'>
                    <div className='flex items-center justify-end col-span-12 pt-4 mt-3 border-t border-gray-700 buttons'>
                      <Link href='#'>
                        <a className='block px-4 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg bg-transprent hover:border-yellowBg'>
                          Delete
                        </a>
                      </Link>
                      <Link href='#'>
                        <a className='block px-4 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400'>
                          Save
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
