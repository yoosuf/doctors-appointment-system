import React, { useState } from 'react'
import Link from 'next/link'
import CloseIcon from 'icons/CloseIcon'

const ActivityModal = () => {
  const activityRemove = () => {
    let activity = document.getElementById('activityModal')
    activity.classList.remove('active')
  }
  return (
    <>
      <section
        id='activityModal'
        className='fixed inset-0 z-10 overflow-hidden activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
            <div className='w-screen max-w-md'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-sm font-medium' id='slide-over-title'>
                      Activity Title
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        onClick={activityRemove}
                        className='focus:outline-none '>
                        <span className='sr-only'>Close panel</span>
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='relative flex-1 p-4 modal-body'>
                  <div className='flex items-center p-3 single-activity bg-grayMid rounded-xl'>
                    <img
                      src='https://picsum.photos/200'
                      className='w-10 h-10 rounded-full'
                      alt=''
                    />
                    <div className='ml-4 activity-text'>
                      <div className='flex items-center'>
                        <a href='#' className='text-sm text-blueBg'>
                          Jerry Bonds
                          <span className='ml-2 text-gray-400'>
                            added vitamint c serum to{' '}
                          </span>
                          #appointmentid
                        </a>
                      </div>
                      <p className='mt-1 text-xs text-gray-400'>
                        June 28,2020 10:00pm
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center p-3 mt-3 single-activity bg-grayMid rounded-xl'>
                    <img
                      src='https://picsum.photos/200'
                      className='w-10 h-10 rounded-full'
                      alt=''
                    />
                    <div className='ml-4 activity-text'>
                      <div className='flex items-center'>
                        <a href='#' className='text-sm text-blueBg'>
                          Jerry Bonds
                          <span className='ml-2 text-gray-400'>
                            added vitamint c serum to{' '}
                          </span>
                          #appointmentid
                        </a>
                      </div>
                      <p className='mt-1 text-xs text-gray-400'>
                        June 28,2020 10:00pm
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center p-3 mt-3 single-activity bg-grayMid rounded-xl'>
                    <img
                      src='https://picsum.photos/200'
                      className='w-10 h-10 rounded-full'
                      alt=''
                    />
                    <div className='ml-4 activity-text'>
                      <div className='flex items-center'>
                        <a href='#' className='text-sm text-blueBg'>
                          Jerry Bonds
                          <span className='ml-2 text-gray-400'>
                            added vitamint c serum to{' '}
                          </span>
                          #appointmentid
                        </a>
                      </div>
                      <p className='mt-1 text-xs text-gray-400'>
                        June 28,2020 10:00pm
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center p-3 mt-3 single-activity bg-grayMid rounded-xl'>
                    <img
                      src='https://picsum.photos/200'
                      className='w-10 h-10 rounded-full'
                      alt=''
                    />
                    <div className='ml-4 activity-text'>
                      <div className='flex items-center'>
                        <a href='#' className='text-sm text-blueBg'>
                          Jerry Bonds
                          <span className='ml-2 text-gray-400'>
                            added vitamint c serum to{' '}
                          </span>
                          #appointmentid
                        </a>
                      </div>
                      <p className='mt-1 text-xs text-gray-400'>
                        June 28,2020 10:00pm
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center p-3 mt-3 single-activity bg-grayMid rounded-xl'>
                    <img
                      src='https://picsum.photos/200'
                      className='w-10 h-10 rounded-full'
                      alt=''
                    />
                    <div className='ml-4 activity-text'>
                      <div className='flex items-center'>
                        <a href='#' className='text-sm text-blueBg'>
                          Jerry Bonds
                          <span className='ml-2 text-gray-400'>
                            added vitamint c serum to{' '}
                          </span>
                          #appointmentid
                        </a>
                      </div>
                      <p className='mt-1 text-xs text-gray-400'>
                        June 28,2020 10:00pm
                      </p>
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

export default ActivityModal
