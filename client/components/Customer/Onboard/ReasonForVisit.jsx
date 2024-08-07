import React, { useState } from 'react'
import SnapCrackButton from '@/widget/common-button'
import ServiceHeader from '@/components/Layout/Header/ServiceHeader'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import routes from '@/utils/routes'
import useReasonForVisit from '@/components/Customer/Onboard/hooks/useReasonForVisit'
import { isEmpty } from 'lodash'

const ReasonForVisit = user => {
  const {
    formik,
    reasonList,
    handleChange,
    approxDate,
    onChangeApproxDate,
    visitReason,
  } = useReasonForVisit({ userData: user })

  return (
    <>
      <div>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <form onSubmit={formik.handleSubmit}>
            <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>
              <div className='pb-5 mb-5 border-b border-gray-600 reg-form'>
                <div className='all-steps'>
                  <div className='flex items-center justify-between gap-3'>
                    <h3 className='text-xl font-medium'>Onboarding</h3>
                    <p className='text-sm text-gray-400'>STEP 3/8</p>
                  </div>
                  <div className='grid w-full h-1 grid-cols-8 mt-2 mb-6 rounded-full bg-grayMid'>
                    <div className='h-full col-span-3 rounded-full bg-yellowBg'></div>
                  </div>
                </div>
                <h3 className='mb-2 text-2xl font-semibold text-white'>
                  Reason for visit
                </h3>
                <p className='max-w-xl mb-4 text-sm text-gray-400'>
                  Tell us about what brings you in.
                </p>
                <div className='pb-5 mt-5 mb-5 border-b border-gray-600'>
                  <div className='grid grid-cols-2 gap-3'>
                    <div>
                      <label
                        className='inline-block mb-2 text-sm text-gray-400'
                        htmlFor=''>
                        Approx date condition began
                      </label>
                      <div className='flex items-center gap-3'>
                        <DatePicker
                          selected={approxDate}
                          showTimeInput
                          //timeFormat='HH:mm'
                          //minDate={new Date()}
                          onChange={onChangeApproxDate}
                          dateFormat='MMMM d, yyyy'
                          placeholder='Approx date'
                          className='!w-full px-3 py-2 bg-transparent border border-gray-500 rounded-lg'
                        />
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div>
                  <div className=''>
                    <p className='inline-block text-sm text-gray-400'>
                      Main reason for this visit?
                    </p>
                    <div className='grid gap-5 mt-6'>
                      {!isEmpty(reasonList) &&
                        reasonList.map(item => (
                          <label
                          htmlFor={item.value}
                            className='flex flex-row-reverse items-center justify-between round-checkbox '>
                            <input
                              id={item.value}
                              type='checkbox'
                              name='aboutUs'
                              value={item.value}
                              onChange={e => handleChange(e)}
                              checked={Array.isArray(visitReason) && visitReason.includes(item.value)}
                            />
                            <span className='checkmark'></span>
                            <div className='inline-block text-sm text-gray-400 label'>
                              {item.label}
                            </div>
                          </label>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Link href={routes.onbardReferralInfo}>
                  <a className='flex items-center justify-center w-full py-2 border border-gray-400 rounded-lg cursor-pointer'>
                    Back
                  </a>
                </Link>
                <SnapCrackButton
                  type='submit'
                  text='Continue'
                  className='w-full py-2 font-semibold text-black rounded-lg cursor-pointer bg-yellowBg'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ReasonForVisit
