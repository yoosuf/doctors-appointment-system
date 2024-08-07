import React, { useState, useEffect } from 'react'
import CalenderIcon from '@/widget/image/CalenderIcon'
import SnapCrackDateComponent from '@/widget/date'

import useCustomerSearch from '@/components/Admin/User/hooks/useCustomerSearch'
import { clearPreviewData } from 'next/dist/server/api-utils';

function CustomerSearch(props) {

  const { searchResultData } = props


  const {
    formik,
    dob,
    setDob,
  } = useCustomerSearch({})

  return (
    
    <>
      <div className='relative hidden border-b border-r border-gray-500 chat-sidebar bg-primary xl:block'>
        <div className='p-8 chat-sidebar-header'>
            <h3 className='text-lg font-semibold'>Search a customer</h3>
            <p className='text-gray-400'>Search a customer by Full Name / Mobile Number</p>
          </div>
          <div className='p-8'>
            <form onSubmit={formik.handleSubmit}>
              <div className='grid gap-4 mt-4 sm:grid-cols-2'>
                <div>
                  <div className='form-group'>
                    <label className='inline-block mb-1 text-sm text-gray-400'>
                      First Name
                    </label>
                    <input
                      type='text'
                      className='w-full px-2 py-1.5 bg-transparent border border-gray-500 rounded-md placeholder-gray-500'
                      placeholder='John'
                      id='firstName'
                      name="firstName"
                      {...formik.getFieldProps('firstName')}
                    />
                  </div>
                  {formik.touched.firstName &&
                    formik.errors.firstName ? (
                    <div className='pt-1 pl-1 text-xs text-redAlert'>
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div>

                  <div className='form-group'>
                    <label className='inline-block mb-1 text-sm text-gray-400'>
                      Last Name
                    </label>
                    <div className=''>
                      <input
                        type='text'
                        className='w-full px-2 py-1.5 bg-transparent border border-gray-500 rounded-md placeholder-gray-500'
                        placeholder='Doe'
                        id='lastName'
                        name="lastName"
                        {...formik.getFieldProps('lastName')}
                      />
                    </div>
                    {formik.touched.lastName &&
                      formik.errors.lastName ? (
                      <div className='pt-1 pl-1 text-xs text-redAlert'>
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='grid gap-2 mt-4 sm:grid-cols-1'>
                <div className='form-group'>
                  <label className='inline-block mb-1 text-sm text-gray-400'>
                    Mobile Number
                  </label>
                  <input
                    type='text'
                    className='w-full px-2 py-1.5 bg-transparent border border-gray-500 rounded-md placeholder-gray-500'
                    placeholder='Customers Mobile Number'
                    id='phoneNo'
                    name="Phone Number"

                  />
                  {formik.touched.phoneNo &&
                    formik.errors.phoneNo ? (
                    <div className='pt-1 pl-1 text-xs text-redAlert'>
                      {formik.errors.phoneNo}
                    </div>
                  ) : null}
                </div>

              </div>

              <div className='col-span-12 mt-4 form-group'>
                <div className='w-full'>
                  <div className='mb-3 form-group'>
                    <label className='inline-block mb-1 text-sm text-gray-400'>
                      Date of Birth
                    </label>
                    <div className='relative flex items-center'>
                      <div className='absolute left-3'>
                        <CalenderIcon fill='#9ca3af' />
                      </div>
                      <SnapCrackDateComponent
                        date={dob}
                        setDate={setDob}
                        formik={formik}
                      />
                    </div>
                  </div>
                  {formik.touched.dob && formik.errors.dob ? (
                    <div className='pt-1 pl-1 text-xs text-redAlert'>
                      {formik.errors.dob}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='w-full col-span-12 my-2 mt-4 border-b border-gray-500 line'></div>
              <div className='flex items-center justify-center w-full col-span-12 mt-3 buttons'>
                <button
                  type='submit'
                  className="block w-full px-4 py-2 text-sm font-medium text-center text-black transition rounded-md bg-yellowBg hover:bg-yellow-400">Search</button>
              </div>
            </form>
          </div>
        </div>
    </>
  )
}


export default React.memo(CustomerSearch);