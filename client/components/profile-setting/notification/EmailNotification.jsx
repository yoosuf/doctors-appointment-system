// import React, { useState } from "react";
import React from 'react'
import 'react-tabs/style/react-tabs.css'
import { YellowBtn } from '@/widget/button/YellowBTN'
import ToggleButton from '@/widget/ToggleButton'

export default function EmailNotification() {
  const AddReminderModal = () => {
    const AddReminder = document.getElementById('AddReminder')
    AddReminder.classList.add('active')
  }
  return (
    <>
      <div className='emailNotification'>
        <div className='flex items-center justify-between col-span-12 gap-3 mt-4'>
          <div>
            <h4 className='text-lg font-semibold'>Email Notifications</h4>
            <p className='text-sm text-gray-400'>
              Enable the email notification system. This is the master switch for the notification selected below. Only staff and patients that have enabled notifications on their profile will receive notifications when this is checked
            </p>
          </div>
          <div>
            <ToggleButton />
          </div>
        </div>

        <div className='px-4 mt-5 border rounded-lg bg-primary border-grayMid'>
          <div className='flex items-center justify-between col-span-12 gap-3 py-4 border-b border-gray-700'>
            <div>
              <h4 className='text-sm font-medium'>
                Send email notification when appointment is booked
              </h4>
              <p className='text-sm text-gray-400'>
                Booking notifications are sent when appointments are booked by
                staff or booked online. They are delivered approx 3 minutes
                after the appointment is booked.
              </p>
            </div>
            <div>
              <ToggleButton />
            </div>
          </div>
          <div className='flex items-center justify-between col-span-12 gap-3 py-4 border-b border-gray-700'>
            <div>
              <h4 className='text-sm font-medium'>
                Send email notification when appointment is canceled
              </h4>
              <p className='text-sm text-gray-400'>
                Cancellation notifications are sent when appointments are
                canceled by staff or in the my account area of online booking.
              </p>
            </div>
            <div>
              <ToggleButton />
            </div>
          </div>
          <div className='flex items-center justify-between col-span-12 gap-3 py-4'>
            <div>
              <h4 className='text-sm font-medium'>
                Send email notification when appointment has changed
              </h4>
              <p className='text-sm text-gray-400'>
                Change notifications are sent if the start time changes.
              </p>
            </div>
            <div>
              <ToggleButton />
            </div>
          </div>
        </div>
        {/* <div className='p-4 mt-5 border rounded-lg bg-primary border-grayMid'>
          <div className='flex gap-2 text-yellowBg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <div>
              <h3 className='mb-1 font-semibold'>Warning</h3>
              <p className='text-sm'>
                you currently have 1 patient profiles set to enabled, and 100
                patient profile set to disabled
              </p>
              <div className='flex gap-3 mt-5'>
                <YellowBtn btnText='Set All To Enabled' />
                <YellowBtn btnText='Set All To Disabled' />
              </div>
            </div>
          </div>
        </div> */}
        <div className='mt-4 text-right'>
          <YellowBtn btnText='Update Notification Settings' />
        </div>
      </div>
    </>
  )
}
