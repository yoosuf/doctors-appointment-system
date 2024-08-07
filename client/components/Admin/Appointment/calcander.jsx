// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
import React, { Children } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Link from 'next/link'

const localizer = momentLocalizer(moment)

const myEventsList = [
  {
    start: new Date(),
    end: new Date(),
    title: 'Long Event',
  },
  {
    start: new Date(),
    end: new Date(),
    title: 'DTS STARTS DFGHJHGFDFGHJKJHGFDGHJHGFGHJKJHGF',
  },
]
const MyCalendar = props => (
  <div className='p-6 calender'>
    <div className='grid grid-cols-12 mb-5'>
      <div className='col-span-12 sm:col-span-8'>
        <h3 className='font-medium text-center sm:text-left'>Event</h3>
        <div className='relative inline-block miami-dropdown'>
          <Link href='#'>
            <a className='inline-flex items-center justify-center pb-3 text-sm text-gray-500 sm:justify-start'>
              miami Store
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            </a>
          </Link>
          <div className='absolute left-0 z-10 w-full py-2 mt-3 bg-white rounded-lg shadow miami-down sm:w-40 top-3'>
            <Link href='#'>
              <a className='block px-3 py-1 text-sm font-medium text-gray-900'>
                Store 1
              </a>
            </Link>
            <Link href='#'>
              <a className='block px-3 py-1 text-sm font-medium text-gray-900'>
                Store 2
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex items-center col-span-12 sm:col-span-4'>
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
            placeholder='search name, phone, email'
          />
        </div>
        <div className='ml-3'>
          <Link href='#'>
            <a className='w-10 h-10 rounded-lg bg-yellowBg flex-cen'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#18181B'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
    <div className='p-4 mt-5 rounded-lg bg-primary'>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor='start'
        endAccessor='end'
        // style={{ height: 500 }}
        views={['month', 'week', 'day']}
      />
    </div>
  </div>
)
export default MyCalendar
