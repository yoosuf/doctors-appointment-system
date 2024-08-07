import CloseIcon from '@/widget/image/CloseIcon'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { OutlineBtn, YellowBtn } from '@/widget/button/YellowBTN'
import JoinEventModal from './JoinEvent'

export default function EventDetailsModal({
  closeModal = () => {},
  eventDetail: event = {},
  joinDone,
}) {
  const JoinEventModalOpen = (e, data) => {
    e.preventDefault()
    const joinEventModal = document.getElementById('joinEventModal')
    joinEventModal.classList.add('active')
  }

  return (
    <>
      <section
        id='eventDetailModal'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
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
                    <h2 className='text-base font-medium' id='slide-over-title'>
                      Event Details
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        type='button'
                        className='focus:outline-none'
                        onClick={closeModal}>
                        <span className='sr-only'>Close panel</span>
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='relative flex-1 p-4 modal-body'>
                  <div className='modal-text-content'>
                    <div className='w-full h-64 overflow-hidden rounded-lg event-img min-h-64'>
                      <img
                        src='https://picsum.photos/800/800'
                        className='object-cover w-full h-64'
                        alt=''
                      />
                    </div>
                    <div className='mt-4 event-text'>
                      <div className='inline-block px-4 py-1 text-xs rounded-full bg-yellowBg text-primary'>
                        <p>Open</p>
                      </div>
                      <div className='flex gap-3 mt-3'>
                        <h2 className='text-xl font-bold'>{event.name}</h2>
                        <Link href='#'>
                          <a>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-6 h-6'
                              viewBox='0 0 20 20'
                              fill='currentColor'>
                              <path d='M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z' />
                            </svg>
                          </a>
                        </Link>
                      </div>
                      <div className='mt-6'>
                        <h6 className='font-medium'>Location</h6>
                        <p className='mt-1 text-gray-400'>
                          {event.locationId?.locationName}
                        </p>
                        <p className='text-gray-400'>
                          {event.locationId?.billingAddressId?.addressLine1 +
                            ', ' +
                            event.locationId?.billingAddressId?.addressLine2}
                        </p>
                        <p className='text-gray-400'>
                          {event.locationId?.billingAddressId?.cityId?.name +
                            ', ' +
                            event.locationId?.billingAddressId?.provinceId
                              ?.name +
                            ', ' +
                            event.locationId?.billingAddressId?.postalCodeId
                              ?.postalCode +
                            ', ' +
                            event.locationId?.billingAddressId?.countryId?.name}
                        </p>
                      </div>
                      <div className='mt-8'>
                        <h6 className='font-medium'>Date & Time</h6>
                        <p className='mt-1 text-gray-400'>
                          {moment(event.fromDateTime).format(
                            'ddd, MMM DD, YYYY, hh:mm a'
                          ) +
                            ' - ' +
                            moment(event.toDateTime).format(
                              'ddd, MMM DD, YYYY, hh:mm a'
                            )}
                        </p>
                      </div>
                      <div className='mt-8'>
                        <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
                          <div>
                            <h6 className='font-medium'>Registration Price</h6>
                            <p className='mt-1 text-gray-400'>
                              $ {event.eventCost?.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <h6 className='font-medium'>Registration Limit</h6>
                            <p className='mt-1 text-gray-400'>
                              {event.registrationLimit} People
                            </p>
                          </div>
                          <div>
                            <h6 className='font-medium'>Event Type</h6>
                            <p className='mt-1 text-gray-400'>
                              {event.eventType?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='mt-8'>
                        <h6 className='font-medium'>
                          Chiropractor / Instructor
                        </h6>
                        <p className='mt-1 text-gray-400'>
                          {event.chiroId?.firstName +
                            ' ' +
                            event.chiroId?.lastName}
                        </p>
                      </div>
                      <div className='mt-8'>
                        <h6 className='font-medium'>About The Event</h6>
                        <p className='mt-1 text-gray-400'>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {new Date(event.toDateTime) < new Date() ? null : (
                  <YellowBtn
                    btnText='Join Event'
                    onClick={e => JoinEventModalOpen(e, event)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <JoinEventModal eventDetail={event} joinDone={joinDone} />
    </>
  )
}
