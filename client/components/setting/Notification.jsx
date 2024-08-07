import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import 'react-datepicker/dist/react-datepicker.css'
import ToggleButton from '@/widget/ToggleButton'

const NotificationSetting = () => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <>
      <div className='p-5 my-5 account-changes bg-primary rounded-xl'>
        <div className='pb-4 border-b border-gray-700 '>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='text-sm font-medium'>
                Send Notification To Email
              </h4>
              <p className='text-sm text-gray-400'>
                send notification to my email
              </p>
            </div>
            <ToggleButton />
          </div>

          <form action='' className='mt-4'>
            <div className='mt-3 form-group'>
              <label className='inline-block mb-2 text-sm text-gray-400'>
                Email Address
              </label>
              <div className='relative flex items-center'>
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
                  className='w-full p-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                  placeholder='you@example.com'
                />
              </div>
            </div>
          </form>
        </div>
        <div className='py-4 border-b border-gray-700 '>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='text-sm font-medium'>
                Send Notification To My Phone
              </h4>
              <p className='text-sm text-gray-400'>
                send notification to my phone
              </p>
            </div>
            <ToggleButton />
          </div>

          <form action='' className='mt-4'>
            <div className='relative flex items-center col-span-12 lg:col-span-4 sm:col-span-6'>
              <div className='absolute left-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'>
                  <path
                    d='M2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H5.153C5.38971 2.00011 5.6187 2.08418 5.79924 2.23726C5.97979 2.39034 6.10018 2.6025 6.139 2.836L6.879 7.271C6.91436 7.48222 6.88097 7.69921 6.78376 7.89003C6.68655 8.08085 6.53065 8.23543 6.339 8.331L4.791 9.104C5.34611 10.4797 6.17283 11.7293 7.22178 12.7782C8.27072 13.8272 9.52035 14.6539 10.896 15.209L11.67 13.661C11.7655 13.4695 11.9199 13.3138 12.1106 13.2166C12.3012 13.1194 12.5179 13.0859 12.729 13.121L17.164 13.861C17.3975 13.8998 17.6097 14.0202 17.7627 14.2008C17.9158 14.3813 17.9999 14.6103 18 14.847V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H15C7.82 18 2 12.18 2 5V3Z'
                    fill='#9CA3AF'></path>
                </svg>
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                placeholder='Phone Number'
              />
            </div>
          </form>
        </div>
        <div className='mt-5 buttons'>
          <div className='flex justify-end'>
            <Link href='#'>
              <a className='block px-2 py-2 text-sm font-medium text-center text-gray-500 transition border border-gray-700 rounded-lg bg-transprent sm:px-4 hover:border-yellowBg'>
                Cancel
              </a>
            </Link>
            <Link href='#'>
              <a className='block px-2 py-2 ml-3 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400'>
                Save Changes
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationSetting
