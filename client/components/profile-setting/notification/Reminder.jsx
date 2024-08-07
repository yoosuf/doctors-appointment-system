// import React, { useState } from "react";
import React from 'react'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { YellowBtn } from '@/widget/button/YellowBTN'
import AddReminder from './AddReminder'
import EditReminder from './EditReminder'

export default function Reminder() {
  const AddReminderModal = () => {
    const AddReminder = document.getElementById('AddReminder')
    AddReminder.classList.add('active')
  }
  const EditReminderModal = () => {
    const EditReminder = document.getElementById('EditReminder')
    EditReminder.classList.add('active')
  }
  return (
    <>
      <div className='reminder'>
        <div className='pb-5 border-b border-gray-700 flex-bet'>
          <h3 className='text-lg font-semibold'>Reminders</h3>
          <YellowBtn btnText='Add Reminder' onClick={AddReminderModal} />
        </div>
        <div className='all-reminder'>
          <div className='flex-wrap py-6 border-b border-gray-700 single-reminder flex-bet'>
            <div className='flex gap-3'>
              <div className='w-12 h-12 rounded-full bg-grayLight flex-cen'>
                <h6 className='font-semibold'>
                  48<span className='ml-1 text-xs font-normal'>hr</span>
                </h6>
              </div>
              <div>
                <h6 className='font-medium'>Email</h6>
                <p className='text-sm text-gray-400'>
                  Email 2 day before appointment (before late cancellation
                  period)
                </p>
                <p className='text-sm text-gray-400'>
                  114 of 116 patients subscribed
                </p>
                <a
                  className='inline-block px-3 py-1 mt-1 text-xs text-sm font-medium rounded-full text-primary bg-greenBg'
                  href='#'>
                  enabled
                </a>
              </div>
            </div>
            <div className='flex gap-5 text-gray-400'>
              <Link href='#'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                </a>
              </Link>
              <Link href='#'>
                <a onClick={EditReminderModal}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
          <div className='flex-wrap py-6 border-b border-gray-700 single-reminder flex-bet'>
            <div className='flex gap-3'>
              <div className='w-12 h-12 rounded-full bg-grayLight flex-cen'>
                <h6 className='font-semibold'>
                  2<span className='ml-1 text-xs font-normal'>hr</span>
                </h6>
              </div>
              <div>
                <h6 className='font-medium'>Email</h6>
                <p className='text-sm text-gray-400'>
                  Email 2 day before appointment (before late cancellation
                  period)
                </p>
                <p className='text-sm text-gray-400'>
                  114 of 116 patients subscribed
                </p>
                <a
                  className='inline-block px-3 py-1 mt-1 text-xs text-sm font-medium bg-gray-400 rounded-full text-primary'
                  href='#'>
                  disabled
                </a>
              </div>
            </div>
            <div className='flex gap-5 text-gray-400'>
              <Link href='#'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                </a>
              </Link>
              <Link href='#'>
                <a onClick={EditReminderModal}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AddReminder />
      <EditReminder />
    </>
  )
}
