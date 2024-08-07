import React, { useState } from 'react'
import FollowUs from '@/widget/follow-us'
import Image from 'next/image'

export default function AuthLayout({title, subTitle, children }) {

  return (
    <div className='h-screen registration-page authentication-bg'>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 xl:col-span-3 md:col-span-5'>
          {/* {(loading) && <Loader customClass='inherit' />} */}
          <div className='flex flex-col h-screen p-5 overflow-y-auto registration-form-main sm:p-9'>
            <div className='nav-brand'>
              <a className='inline-block'>
                <Image
                  src='/images/logo.svg'
                  alt='SnapCrack'
                  width={135}
                  height={46}
                />
              </a>
            </div>

            <div className='mt-10 reg-form 2xl:mt-10'>
              <h3 className='mb-4 text-2xl font-semibold text-white'>
                {title}
              </h3>
              <p className='max-w-xs text-sm text-gray-400'>
                {subTitle}
              </p>
              {children}

            </div>
            <FollowUs />
          </div>
        </div>
        <div className='hidden xl:col-span-9 md:col-span-7 md:block'>
          <div className='registration-bg'></div>
        </div>
      </div>
    </div>
  )
}
