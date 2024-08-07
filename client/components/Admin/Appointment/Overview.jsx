import SnapCrackButton from '@/widget/common-button'
import React, { useState } from 'react'
import { YellowBtn } from '@/widget/button/YellowBTN'
const moment = require('moment'); 

export default function Overview(props) {
  const { onClose, appotmentData } = props

  function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes and ${remainingSeconds} seconds`;
}

  return (
    <>
      <section
        id='AppointmentOverviewModal'
        className='fixed inset-0 z-10 flex overflow-hidden text-sm activity-modal-main flex-column'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'
            onClick={e => {
              e.preventDefault()
              if (onClose) onClose()
            }}></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
            <div className='w-screen max-w-2xl'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-base font-medium' id='slide-over-title'>
                      Appointment Overview
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        className='focus:outline-none '
                        onClick={e => {
                          e.preventDefault()
                          if (onClose) onClose()
                        }}>
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
                <div
                  className='relative flex flex-col p-4 modal-body'
                  id='top-div-appointment'>
                  <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Location Info</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-2 form-group'>
                          {appotmentData?.locationId?.locationName}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Customer</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-12'>
                          <div className='flex flex-wrap items-start gap-3 sm:flex-nowrap'>
                            <div className='relative flex items-center w-full'>
                              <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                                <p>
                                  {`${appotmentData?.userId?.firstName} ${appotmentData?.userId?.lastName}`}
                                </p>

                                <p>{appotmentData?.userId?.email}</p>
                                <p>{appotmentData?.userId?.phone}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Services</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-12'>
                          <div className='flex flex-wrap items-start gap-3 sm:flex-nowrap'>
                            <div className='relative flex items-center w-full'>
                              <div className='w-full'>
                                {appotmentData?.services?.map(
                                  (service, index) => (
                                    <div
                                      key={index}
                                      className='p-4 mb-4 bg-gray-700 rounded-lg shadow-md'>
                                      <p className='font-semibold text-gray-400'>
                                        <span className='font-bold'>Name:</span>{' '}
                                        {service.name}
                                      </p>

                                      {service.status !== 'SUSPENDED' && (
                                        <>
                                          <p className='font-semibold text-gray-400'>
                                            <span className='font-bold'>
                                              Server Name:
                                            </span>{' '}
                                            {service.serverName}
                                          </p>
                                          <p className='font-semibold text-gray-400'>
                                            <span className='font-bold'>
                                              Started at:
                                            </span>{' '}
                                            {/* {moment(service.startedAt).format('MM-DD-YYYY HH:mm:ss')} */}
                                            {service.startedAt && moment(service.startedAt).format('MM-DD-YYYY HH:mm:ss')}

                                          </p>
                                          <p className='font-semibold text-gray-400'>
                                            <span className='font-bold'>
                                              Wait Time:
                                            </span>{' '}
                                            {service.waitTime && secondsToMinutes(service.waitTime)}
                                          </p>
                                          <p className='font-semibold text-gray-400'>
                                            <span className='font-bold'>
                                              Ended at:
                                            </span>{' '}
                                            {service.endedAt && moment(service.endedAt).format('MM-DD-YYYY HH:mm:ss')}
                                          </p>
                                          <p className='font-semibold text-gray-400'>
                                            <span className='font-bold'>
                                              Served Time:
                                            </span>{' '}
                                            {service.servedTime && secondsToMinutes(service.servedTime)}
                                          </p>
                             
                                          <p className='font-semibold text-gray-400'>
                                            <span className='font-bold'>
                                              Status:
                                            </span>{' '}
                                            {service.status}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Appointment Info</h4>
                    </div>

                    <div className='col-span-9'>
                      <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-12'>
                          <div className='flex flex-wrap items-start gap-3 sm:flex-nowrap'>
                            <div className='relative flex items-center w-full'>
                              <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                                {moment(appotmentData.appointmentDate).format('MM-DD-YYYY HH:mm:ss')}

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Appointment Status</h4>
                    </div>

                    <div className='col-span-9'>
                      <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-12'>
                          <div className='flex flex-wrap items-start gap-3 sm:flex-nowrap'>
                            <div className='relative flex items-center w-full'>
                              <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                                {appotmentData?.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='grid gap-2 pb-4 mt-4 border-b border-gray-700 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Note</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-12'>
                          <div className='flex flex-wrap items-start gap-3 sm:flex-nowrap'>
                            <div className='relative flex items-center w-full'>
                              <div className='w-full text-gray-500 bg-transparent rounded-lg'>
                                {appotmentData?.notes}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
