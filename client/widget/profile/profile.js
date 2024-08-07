import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownButton from '../dropdown/dropdown'

const gender = [{ name: 'Male' }, { name: 'Female' }, { name: 'Other' }]

const Profile = ({
  startDate,
  setStartDate,
  prefix,
  state,
  city,
  selectedPrefix,
  setSelectedPrefix,
  selectedCity,
  setSelectedCity,
  selectedState,
  setSelectedState,
}) => {
  const [selected, setSelected] = useState(gender[0])
  return (
    <>
      <div className='image-profile bg-primary p-5 rounded-xl mt-5'>
        <div className='grid md:grid-cols-12 border-b border-gray-500 pb-4 gap-2'>
          <div className='col-span-3'>
            <h4 className='font-medium'>Image Profile121212</h4>
          </div>
          <div className='col-span-9'>
            <div className=' '>
              <div className='image-profile flex items-center'>
                <Image src='/images/sidebar/sidebar-logo.svg' height={56} width={56} alt='' />
                <div className='ml-3'>
                  <div className='cursor-pointer rounded-lg bg-transprent border border-gray-700 inline-block px-4 py-2 text-white text-sm text-center transition font-medium hover:border-yellowBg'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer py-3'>
                      <span>Upload a file</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                      />
                    </label>
                  </div>
                  <p className='text-sm text-gray-400 mt-2'>
                    Acceptable format, jpg. png only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid md:grid-cols-12 mt-4 gap-2'>
          <div className='col-span-3'>
            <h4 className='font-medium'>Personal Information</h4>
          </div>
          <div className='col-span-9 '>
            <form action='' className='grid grid-cols-12 gap-4 text-sm'>
              <div className='w-full flex relative items-center  text-sm sm:col-span-6 col-span-12'>
                <DropdownButton
                  value={selectedPrefix}
                  MAP={prefix}
                  onChange={setSelectedPrefix}
                />
              </div>

              <input
                type='text'
                className='w-full p-2 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 sm:col-span-6 col-span-12'
                placeholder='Full Name'></input>

              <div className='w-full flex relative items-center  text-sm sm:col-span-6 col-span-12'>
                <DropdownButton
                  value={selected}
                  MAP={gender}
                  onChange={setSelected}
                />
              </div>

              <div className='relative flex items-center sm:col-span-6 col-span-12'>
                <div className='absolute left-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='17'
                    height='16'
                    viewBox='0 0 17 16'
                    fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M4.5 0C4.23478 0 3.98043 0.105357 3.79289 0.292893C3.60536 0.48043 3.5 0.734784 3.5 1V2H2.5C1.96957 2 1.46086 2.21071 1.08579 2.58579C0.710714 2.96086 0.5 3.46957 0.5 4V14C0.5 14.5304 0.710714 15.0391 1.08579 15.4142C1.46086 15.7893 1.96957 16 2.5 16H14.5C15.0304 16 15.5391 15.7893 15.9142 15.4142C16.2893 15.0391 16.5 14.5304 16.5 14V4C16.5 3.46957 16.2893 2.96086 15.9142 2.58579C15.5391 2.21071 15.0304 2 14.5 2H13.5V1C13.5 0.734784 13.3946 0.48043 13.2071 0.292893C13.0196 0.105357 12.7652 0 12.5 0C12.2348 0 11.9804 0.105357 11.7929 0.292893C11.6054 0.48043 11.5 0.734784 11.5 1V2H5.5V1C5.5 0.734784 5.39464 0.48043 5.20711 0.292893C5.01957 0.105357 4.76522 0 4.5 0ZM4.5 5C4.23478 5 3.98043 5.10536 3.79289 5.29289C3.60536 5.48043 3.5 5.73478 3.5 6C3.5 6.26522 3.60536 6.51957 3.79289 6.70711C3.98043 6.89464 4.23478 7 4.5 7H12.5C12.7652 7 13.0196 6.89464 13.2071 6.70711C13.3946 6.51957 13.5 6.26522 13.5 6C13.5 5.73478 13.3946 5.48043 13.2071 5.29289C13.0196 5.10536 12.7652 5 12.5 5H4.5Z'
                      fill='#9CA3AF'
                    />
                  </svg>
                </div>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  placeholder='Date of birth'
                  className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg'
                />
              </div>

              <div className='line col-span-12 w-full border-b my-2 border-gray-500'></div>

              <div className='relative flex items-center  lg:col-span-4 sm:col-span-6 col-span-12'>
                <div className='absolute left-3  min-w-[20px]'>
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
                  className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500'
                  placeholder='Email'
                />
              </div>
              <div className='relative flex items-center  lg:col-span-4 sm:col-span-6 col-span-12'>
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
                  className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500'
                  placeholder='Phone Number'
                />
              </div>
              <div className='relative flex items-center  lg:col-span-4 sm:col-span-6 col-span-12'>
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
                  className='w-full px-3 py-2 pl-10 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500'
                  placeholder='Alternative Phone Number'
                />
              </div>
              <div className='line col-span-12 w-full border-b my-2 border-gray-500'></div>
              <div className='form-group col-span-12'>
                <input
                  type='text'
                  className='w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 '
                  placeholder='Address'
                />
              </div>
              <div className='form-group col-span-12'>
                <input
                  type='text'
                  className='w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 '
                  placeholder='Suite Number (I.e Suite#100)'
                />
              </div>
              <div className='form-group lg:col-span-4 sm:col-span-6 col-span-12'>
                <DropdownButton
                  value={selectedState}
                  MAP={state}
                  onChange={setSelectedState}
                />
              </div>
              <div className='form-group lg:col-span-4 sm:col-span-6 col-span-12'>
                <DropdownButton
                  value={selectedCity}
                  MAP={city}
                  onChange={setSelectedCity}
                />
              </div>
              <div className='form-group lg:col-span-4 sm:col-span-6 col-span-12'>
                <input
                  type='text'
                  className='w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 text-sm'
                  placeholder='Address'
                />
              </div>
              <div className='line col-span-12 w-full border-b my-2 border-gray-500'></div>
              <div className='form-group col-span-12'>
                <textarea
                  className='w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500 text-sm'
                  cols='30'
                  rows='5'></textarea>
                <p className='text-sm text-gray-500'>
                  Write a few sentences about yourself.
                </p>
              </div>
              <div className='line col-span-12 w-full border-b my-2 border-gray-500'></div>

              <div className='buttons flex items-center justify-end mt-3 col-span-12'>
                <Link href='#'>
                  <a className='rounded-lg bg-transprent border border-gray-700 block px-4 py-2 text-gray-500 text-sm text-center transition font-medium transition hover:border-yellowBg'>
                    Cancel
                  </a>
                </Link>
                <Link href='#'>
                  <a className='rounded-lg bg-yellowBg text-black block px-4 py-2 text-center hover:bg-yellow-400 transition ml-3 text-sm font-medium'>
                    Save Changes
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
