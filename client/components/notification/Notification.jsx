import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ToggleButton from '@/widget/ToggleButton'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
export default function Notification() {
  const filterRemove = () => {
    const filterModal = document.getElementById('filter_modal')
    filterModal.classList.remove('active')
  }
  const CloseBTN = () => {
    const notificationModal = document.getElementById('notificationModal')
    notificationModal.classList.remove('active')
  }

  const [startDate, setStartDate] = useState(new Date())
  return (
    <>
      <section
        id='notificationModal'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'
            onClick={() => CloseBTN()}></div>
          <div className='fixed inset-y-0 right-0 flex max-w-lg activity-modal sm:pl-10'>
            <div className='w-screen max-w-xl'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Notifications
                      </h2>
                      <p className='text-sm text-gray-400'>
                        You have{' '}
                        <span className='text-yellowBg'>
                          20 New Notification
                        </span>
                      </p>
                    </div>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        className='focus:outline-none '
                        onClick={CloseBTN}>
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
                <div className='relative grid gap-4 p-4 modal-body'>
                  <Link href='#'>
                    <a className='flex items-center p-4 rounded-lg single-notification bg-grayMid'>
                      <div>
                        <div className='flex items-center justify-center w-10 h-10 bg-transparent rounded-full notif-icon'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='#22C55E'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='ml-3 notif-text'>
                        <h6>New User registration</h6>
                        <p className='my-1 text-gray-400'>
                          Michael registration to the system as ...
                        </p>
                        <p className='text-xs text-gray-600'>26 min ago</p>
                      </div>
                    </a>
                  </Link>
                  <Link href='#'>
                    <a className='flex items-center p-4 rounded-lg single-notification bg-grayMid'>
                      <div>
                        <div className='flex items-center justify-center w-10 h-10 bg-transparent rounded-full notif-icon'>
                          <img
                            src='https://picsum.photos/200'
                            className='object-cover w-10 h-10 rounded-full'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='ml-3 notif-text'>
                        <h6>Amanda</h6>
                        <p className='my-1 text-gray-400'>
                          Hi, can i get help at current event ?
                        </p>
                        <p className='text-xs text-gray-600'>26 min ago</p>
                      </div>
                    </a>
                  </Link>
                  <Link href='#'>
                    <a className='flex items-center p-4 rounded-lg single-notification bg-grayMid'>
                      <div>
                        <div className='flex items-center justify-center w-10 h-10 bg-transparent rounded-full notif-icon'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='#FBD63C'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='ml-3 notif-text'>
                        <h6>San Francisco Store</h6>
                        <p className='my-1 text-gray-400'>
                          Temporary deactivated by{' '}
                          <span className='text-blueBg'>mike</span>
                        </p>
                        <p className='text-xs text-gray-600'>26 min ago</p>
                      </div>
                    </a>
                  </Link>
                  <Link href='#'>
                    <a className='flex items-center p-4 rounded-lg single-notification bg-grayMid'>
                      <div>
                        <div className='flex items-center justify-center w-10 h-10 bg-transparent rounded-full notif-icon'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='#FBD63C'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='ml-3 notif-text'>
                        <h6>Miami Store </h6>
                        <p className='my-1 text-gray-400'>
                          Temporary deactivated by
                          <span className='text-blueBg'> abrham</span>
                        </p>
                        <p className='text-xs text-gray-600'>26 min ago</p>
                      </div>
                    </a>
                  </Link>
                  <Link href='#'>
                    <a className='flex items-center p-4 rounded-lg single-notification bg-grayMid'>
                      <div>
                        <div className='flex items-center justify-center w-10 h-10 bg-transparent rounded-full notif-icon'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='#EF4444'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='ml-3 notif-text'>
                        <h6>Critical Error </h6>
                        <p className='my-1 text-gray-400'>
                          The system has restarted
                        </p>
                        <p className='text-xs text-gray-600'>26 min ago</p>
                      </div>
                    </a>
                  </Link>
                  <Link href='#'>
                    <a className='flex items-center p-4 rounded-lg single-notification bg-grayMid'>
                      <div>
                        <div className='flex items-center justify-center w-10 h-10 bg-transparent rounded-full notif-icon'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='#4ADE80'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='ml-3 notif-text'>
                        <h6>Order Canceled</h6>
                        <p className='my-1 text-gray-400'>
                          Vitamin Juice order id{' '}
                          <span className='text-blueBg'>#1530</span>
                        </p>
                        <p className='text-xs text-gray-600'>26 min ago</p>
                      </div>
                    </a>
                  </Link>
                  <Link href='#'>
                    <a className='flex items-center p-4 rounded-lg single-notification bg-grayMid'>
                      <div>
                        <div className='flex items-center justify-center w-10 h-10 bg-transparent rounded-full notif-icon'>
                          <img
                            src='https://picsum.photos/200'
                            className='object-cover w-10 h-10 rounded-full'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='ml-3 notif-text'>
                        <h6>Cecillia</h6>
                        <p className='my-1 text-gray-400'>
                          I get error when adding new customer, please help asap
                          if you have time n.....
                        </p>
                        <p className='text-xs text-gray-600'>26 min ago</p>
                      </div>
                    </a>
                  </Link>
                  <Link href='#'>
                    <a className='block w-full p-2 text-center transition border border-gray-500 rounded-lg bg-transprent hover:border-yellowBg'>
                      View all notification (20)
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
