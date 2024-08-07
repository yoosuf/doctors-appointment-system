import useJoinEvent from '@/components/Customer/Appointment/hooks/useJoinEvent'
import CloseIcon from '@/widget/image/CloseIcon'
import moment from 'moment'
import React from 'react'
import { YellowBtn } from '@/widget/button/YellowBTN'

export default function JoinEventModal({ eventDetail = {}, joinDone }) {
  const { onJoinEvent, closeModal } = useJoinEvent(joinDone)
  return (
    <>
      <section
        id='joinEventModal'
        className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal sm:pl-10'>
            <div className='w-screen max-w-lg'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-base font-medium' id='slide-over-title'>
                      Join Event
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
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
                    <div className='p-4 border rounded-lg border-grayLight'>
                      <h4 className='text-base'>{eventDetail.name}</h4>
                      <div className='flex gap-3 mt-3'>
                        <div className='text-gray-400'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                        <p className='text-gray-400'>
                          {moment(eventDetail.fromDateTime).format(
                            'ddd, MMM DD, YYYY, hh:mm a'
                          ) +
                            ' - ' +
                            moment(eventDetail.toDateTime).format(
                              'ddd, MMM DD, YYYY, hh:mm a'
                            )}
                        </p>
                      </div>
                      <div className='flex gap-3 mt-3'>
                        <div className='text-gray-400'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'>
                            <path
                              fillRule='evenodd'
                              d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                        <p className='text-gray-400'>
                          {eventDetail.locationId?.locationName +
                            ' - ' +
                            eventDetail.locationId?.billingAddressId
                              ?.addressLine1 +
                            ', ' +
                            eventDetail.locationId?.billingAddressId
                              ?.addressLine2 +
                            ', ' +
                            eventDetail.locationId?.billingAddressId?.cityId
                              ?.name +
                            ', ' +
                            eventDetail.locationId?.billingAddressId?.provinceId
                              ?.name +
                            ', ' +
                            eventDetail.locationId?.billingAddressId
                              ?.postalCodeId?.postalCode +
                            ', ' +
                            eventDetail.locationId?.billingAddressId?.countryId
                              ?.name}
                        </p>
                      </div>
                    </div>
                    {/* <div className='mt-3'>
                      <input
                        type='text'
                        className='w-full p-3 placeholder-gray-500 bg-transparent border rounded-lg border-grayLight'
                        placeholder='Full name'
                      />
                    </div>
                    <div className='relative flex items-center mt-3'>
                      <div className='absolute left-3'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='12'
                          viewBox='0 0 16 12'
                          fill='none'>
                          <path
                            d='M0.00300002 1.884L8 5.882L15.997 1.884C15.9674 1.37444 15.7441 0.895488 15.3728 0.545227C15.0016 0.194965 14.5104 -9.35847e-05 14 3.36834e-08H2C1.48958 -9.35847e-05 0.998447 0.194965 0.627178 0.545227C0.255908 0.895488 0.0326041 1.37444 0.00300002 1.884Z'
                            fill='#9CA3AF'></path>
                          <path
                            d='M16 4.118L8 8.118L0 4.118V10C0 10.5304 0.210714 11.0391 0.585786 11.4142C0.960859 11.7893 1.46957 12 2 12H14C14.5304 12 15.0391 11.7893 15.4142 11.4142C15.7893 11.0391 16 10.5304 16 10V4.118Z'
                            fill='#9CA3AF'></path>
                        </svg>
                      </div>
                      <input
                        type='text'
                        className='w-full p-3 pl-10 placeholder-gray-500 bg-transparent border rounded-lg border-grayLight'
                        placeholder='Email'
                      />
                    </div> */}
                    <div className='px-4 py-5 mt-3 text-base rounded-lg bg-yellowBg flex-bet text-primary'>
                      <p>Total</p>
                      <p className='font-semibold'>
                        ${eventDetail.eventCost?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                {eventDetail.status === "OPEN" && (!eventDetail.isJoined) && <div className='flex-wrap gap-2 p-5 text-right border-t modal-footer border-grayLight'>
                  <div>
                    <YellowBtn
                      btnText='Join Event'
                      onClick={e => onJoinEvent(e, eventDetail)}
                    />
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
