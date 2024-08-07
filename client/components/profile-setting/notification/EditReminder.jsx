import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { OutlineBtn, YellowBtn } from '@/widget/button/YellowBTN'
import ToggleButton from '@/widget/ToggleButton'
import DropdownButton from '@/widget/dropdown/dropdown'

const Time = [{ name: '2 days' }]
export default function EditReminder() {
  const [startDate, setStartDate] = useState(new Date())
  const [time, setTime] = useState(Time[0])

  const closeBtn = () => {
    const EditReminder = document.getElementById('EditReminder')
    EditReminder.classList.remove('active')
  }
  return (
    <>
      <section
        id='EditReminder'
        className='fixed inset-0 z-10 flex h-screen overflow-hidden text-sm activity-modal-main flex-column'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true' onClick={() => closeBtn()}></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal active sm:pl-10'>
            <div className='w-screen max-w-xl'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Edit Reminder
                      </h2>
                    </div>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        onClick={closeBtn}
                        className='focus:outline-none '>
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
                      <h4 className='font-medium'>Delivery Method</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='flex flex-wrap gap-3'>
                        <div className='flex items-center mr-3 form-check'>
                          <input
                            className='w-5 h-4 form-check-input'
                            type='checkbox'
                            id='delivery1'
                            value=''
                          />
                          <label
                            className='ml-2 text-sm text-gray-400 form-check-label'
                            htmlFor='delivery1'>
                            Email
                          </label>
                        </div>
                        <div className='flex items-center mr-3 form-check'>
                          <input
                            className='w-5 h-4 form-check-input'
                            type='checkbox'
                            id='delivery2'
                            value=''
                          />
                          <label
                            className='ml-2 text-sm text-gray-400 form-check-label'
                            htmlFor='delivery2'>
                            Text (Sms)
                          </label>
                        </div>
                        <div className='flex items-center mr-3 form-check'>
                          <input
                            className='w-5 h-4 form-check-input'
                            type='checkbox'
                            id='delivery2'
                            value=''
                          />
                          <label
                            className='ml-2 text-sm text-gray-400 form-check-label'
                            htmlFor='delivery2'>
                            Phone (Not Automated)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='grid gap-2 py-4 md:grid-cols-12'>
                    <div className='col-span-3'>
                      <h4 className='font-medium'>Send Reminder</h4>
                    </div>
                    <div className='col-span-9'>
                      <div className='form-group'>
                        <DropdownButton
                          value={time}
                          MAP={Time}
                          onChange={setTime}
                        />
                      </div>
                      <div className='flex items-center justify-between col-span-12 gap-3 mt-4'>
                        <div>
                          <h4 className='text-sm font-medium'>
                            Subscribe by Default
                          </h4>
                          <p className='text-sm text-gray-400'>
                            New patients will be automatcily subscribed to this
                            reminder
                          </p>
                        </div>
                        <div>
                          <ToggleButton />
                        </div>
                      </div>
                      <div className='flex items-center justify-between col-span-12 gap-3 mt-4'>
                        <div>
                          <h4 className='text-sm font-medium'>Enabled</h4>
                          <p className='text-sm text-gray-400'>
                            Enable deliveries for this reminder. Turn this off
                            to temporary stop deliveries
                          </p>
                        </div>
                        <div>
                          <ToggleButton />
                        </div>
                      </div>
                      <div className='flex items-center justify-between col-span-12 gap-3 mt-4'>
                        <div>
                          <h4 className='text-sm font-medium'>
                            Patient Selectable
                          </h4>
                          <p className='text-sm text-gray-400'>
                            Allow patient to opt in or out of this reminder. If
                            turn off, only staff can changes this reminder for
                            the patient
                          </p>
                        </div>
                        <div>
                          <ToggleButton />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-auto '>
                    <div className='flex items-center justify-end col-span-12 gap-3 pt-4 mt-3 border-t border-gray-700 buttons'>
                      <OutlineBtn btnText='Cancel' onClick={closeBtn} />
                      <YellowBtn btnText='Save' />
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
