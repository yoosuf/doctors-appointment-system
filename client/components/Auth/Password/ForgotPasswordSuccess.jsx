import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import routes from '@/utils/routes'
import FollowUs from '@/widget/follow-us'
import AuthLayout from '@/components/Layout/AuthLayout'

export default function ForgotPasswordSuccess() {
  return (
    <div className='h-screen registration-page authentication-bg'>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 xl:col-span-3 md:col-span-5'>
          <div className='flex flex-col h-screen p-5 overflow-y-auto registration-form-main sm:p-9'>
            <div className='nav-brand'>
              <Link href='#'>
                <a className='inline-block'>
                  <Image
                    src='/images/logo.svg'
                    alt='SnapCrack'
                    width={135}
                    height={46}
                  />
                </a>
              </Link>
            </div>
            <div className='mt-12 text-center reg-form 2xl:mt-24 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='103'
                height='102'
                viewBox='0 0 103 102'
                fill='none'
                className='mx-auto'>
                <path
                  d='M2.33887 50.9999C2.33887 23.8187 24.3747 1.83887 51.4999 1.83887'
                  stroke='#16A34A'
                  strokeWidth='3'
                  strokeMiterlimit='10'
                />
                <path
                  d='M100.661 51C100.661 78.1812 78.6253 100.161 51.5 100.161'
                  stroke='#16A34A'
                  strokeWidth='3'
                  strokeMiterlimit='10'
                />
                <path
                  d='M39 52L47.3333 60.3333L64 43.6667M89 52C89 72.7107 72.2107 89.5 51.5 89.5C30.7893 89.5 14 72.7107 14 52C14 31.2893 30.7893 14.5 51.5 14.5C72.2107 14.5 89 31.2893 89 52Z'
                  stroke='#16A34A'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <h3 className='mt-6 mb-4 text-2xl font-semibold text-white'>
                Successfull
              </h3>
              <p className='max-w-xs mx-auto text-sm text-gray-400'>
                your password has been changed you can login now using your new
                passowrd using the button login below
              </p>
              <div className='max-w-xs mx-auto mt-6'>
                <Link href={routes.sesson.new}>
                  <a className='block p-3 mx-10 text-center text-black transition rounded-lg bg-yellowBg hover:bg-yellow-400 2xl:mx-14'>
                    Login
                  </a>
                </Link>
              </div>
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
