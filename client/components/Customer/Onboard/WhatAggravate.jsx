import React from 'react'
import SnapCrackButton from '@/widget/common-button'
import ServiceHeader from '../../Layout/Header/ServiceHeader'
import Link from 'next/link'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-tabs/style/react-tabs.css'
import routes from '@/utils/routes'
import useAggravate from '@/components/Customer/Onboard/hooks/useAggravate'
import { isEmpty } from 'lodash'
import Loader from '@/widget/loader'

const WhatAggravate = user => {
  const { aggravateList, handleChange, submitAggravate, aggravates, loading } =
    useAggravate({ userData: user })

  return (
    <>
      <div>
        <div className='flex flex-col h-screen overflow-y-auto registration-form-main'>
          <ServiceHeader />
          <div className='w-full max-w-3xl p-5 mx-auto sm:p-9 sm:pb-10'>
            <div className='pb-5 mt-5 mb-5 border-b border-gray-600 reg-form'>
              <div className='all-steps'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-xl font-medium'>Onboarding</h3>
                  <p className='text-sm text-gray-400'>STEP 7/8</p>
                </div>
                <div className='grid w-full h-1 grid-cols-8 mt-2 mb-6 rounded-full bg-grayMid'>
                  <div className='h-full col-span-7 rounded-full bg-yellowBg'></div>
                </div>
              </div>
              <h3 className='mb-2 text-2xl font-semibold text-white'>
                What aggravates this?
              </h3>
              <p className='max-w-xl mb-4 text-sm text-gray-400'>
                What aggravates this condition? Choose all that apply.
              </p>
              <div className='grid gap-5 mt-6'>
                {!isEmpty(aggravateList) &&
                  aggravateList.map(item => (
                    <label
                    htmlFor={item.value}
                      className='flex flex-row-reverse items-center justify-between round-checkbox '>
                      <input
                        id={item.value}
                        type='checkbox'
                        name='aboutUs'
                        value={item.value}
                        onChange={handleChange}
                        checked={aggravates.includes(item.value)}
                      />
                      <span className='checkmark'></span>
                      <div className='inline-block text-sm text-gray-400 label'>
                        {item.label}
                      </div>
                    </label>
                  ))}
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Link href={routes.discomfort}>
                <span className='flex items-center justify-center w-full py-2 border border-gray-400 rounded-lg cursor-pointer'>
                  Back
                </span>
              </Link>
              <SnapCrackButton
                onClick={submitAggravate}
                type='button'
                text='Continue'
                className='w-full py-2 font-semibold text-black rounded-lg cursor-pointer bg-yellowBg'
              />
            </div>
          </div>
        </div>
        {loading && <Loader customClass='absolute' />}
      </div>
    </>
  )
}

export default WhatAggravate
