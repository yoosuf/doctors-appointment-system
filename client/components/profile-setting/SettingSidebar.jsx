// import React, { useState } from "react";
import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import routes from '@/utils/routes'
import { useRouter } from 'next/router'
import ratingAndReview from 'pages/profile-setting/rating-and-review'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import withSession from '@/utils/session'

const activeSidebar =
  'setting-step p-4 border-b border-gray-500 flex-ver gap-3 text-sm text-gray-400 hover:bg-yellowBg hover:text-gray-900 transition active'

const sidebar =
  'setting-step p-4 border-b border-gray-500 flex-ver gap-3 text-sm text-gray-400 hover:bg-yellowBg hover:text-gray-900 transition'

export default function SettingSidebar() {
  const router = useRouter()

  const [code, setCode] = useState()

  useEffect(() => {
    const { roleId = {} } = getUser()
    setCode(roleId.code)
  }, [])

  return (
    <>
      <div className='relative hidden border-r border-gray-500 setting-sidebar common-scrollbar bg-primary xl:block'>
        <div className='px-4 py-6 border-b border-gray-500 chat-sidebar-header'>
          <h3 className='text-lg font-semibold'>Setting</h3>
          {/* <p className='text-gray-400'>Manage system wide settings</p> */}
        </div>
        <div className='relative overflow-y-auto'>
          <div className='p-4 border-b border-gray-500 alphabet'>
            <p className='text-gray-400'>Profile Settings</p>
          </div>
          <Link href={routes.myAccount}>
            <a
              className={
                router.pathname === routes.myAccount ? activeSidebar : sidebar
              }>
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
                  d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>My Profile</span>
            </a>
          </Link>

          
          {/* <Link href='#'>
            <a className='gap-3 p-4 text-sm text-gray-400 transition border-b border-gray-500 setting-step flex-ver hover:bg-yellowBg hover:text-gray-900'>
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
                  d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>Language</span>
            </a>
          </Link>
          <Link href={routes.staffPermission}>
            <a
              id='staffper'
              className={
                router.pathname === routes.staffPermission
                  ? activeSidebar
                  : sidebar
              }>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7.75 0.25C4.8584 0.25 2.5 2.6084 2.5 5.5C2.5 7.30762 3.42285 8.91309 4.82031 9.85938C2.14551 11.0078 0.25 13.6621 0.25 16.75H1.75C1.75 13.4277 4.42773 10.75 7.75 10.75C9.3584 10.75 10.7969 11.4092 11.875 12.4375L8.33594 15.9766L8.28906 16.2109L7.77344 18.8594L7.53906 19.9609L8.64062 19.7266L11.2891 19.2109L11.5234 19.1641L19.0938 11.5938C19.9639 10.7236 19.9639 9.27637 19.0938 8.40625C18.6572 7.96973 18.0771 7.75 17.5 7.75C16.9346 7.75 16.3633 7.96387 15.9297 8.38281L12.9531 11.3594C12.2998 10.7324 11.5264 10.2197 10.6797 9.85938C12.0771 8.91309 13 7.30762 13 5.5C13 2.6084 10.6416 0.25 7.75 0.25ZM7.75 1.75C9.83008 1.75 11.5 3.41992 11.5 5.5C11.5 7.58008 9.83008 9.25 7.75 9.25C5.66992 9.25 4 7.58008 4 5.5C4 3.41992 5.66992 1.75 7.75 1.75ZM18.0391 9.46094C17.8896 9.31152 17.6904 9.25 17.5 9.25C17.3096 9.25 17.1338 9.31152 16.9844 9.46094L9.71875 16.7266L9.4375 18.0625L10.7734 17.7812L18.0391 10.5156C18.3379 10.2168 18.3379 9.75977 18.0391 9.46094Z'
                  fill='#A1A1AA'
                />
              </svg>
              <span>Staff Permissions</span>
            </a>
          </Link>
          <Link href={routes.ratingAndReview}>
            <a
              className={
                router.pathname === routes.ratingAndReview
                  ? activeSidebar
                  : sidebar
              }>
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
                  d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                />
              </svg>
              <span>Rating & Reviews</span>
            </a>
          </Link> */}

          {code === USER_ROLE_TYPE.SUPER_ADMIN && (
            <>
              <div className='p-4 border-b border-gray-500 alphabet'>
                <p className='text-gray-400'>Platform Settings</p>
              </div>

              <Link href={routes.clinicInfo}>
                <a
                  className={
                    router.pathname === routes.clinicInfo
                      ? activeSidebar
                      : sidebar
                  }>
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
                      d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                    />
                  </svg>
                  <span>Clinics</span>
                </a>
              </Link>
            </>
          )}

          {code === USER_ROLE_TYPE.SUPER_ADMIN && (
            <>
              <Link href={routes.profileServices}>
                <a
                  className={
                    router.pathname === routes.profileServices
                      ? activeSidebar
                      : sidebar
                  }>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
                  </svg>
                  <span>Services</span>
                </a>
              </Link>
              <Link href={routes.profileMembership}>
                <a
                  className={
                    router.pathname === routes.profileMembership
                      ? activeSidebar
                      : sidebar
                  }>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'>
                    <path
                      d='M3 1V5V1ZM1 3H5H1ZM4 15V19V15ZM2 17H6H2ZM11 1L13.286 7.857L19 10L13.286 12.143L11 19L8.714 12.143L3 10L8.714 7.857L11 1Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <span>Membership</span>
                </a>
              </Link>

              <Link href={routes.adminPages}>
                <a
                  className={
                    router.pathname === routes.adminPages
                      ? activeSidebar
                      : sidebar
                  }>
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
                      d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
                    />
                  </svg>
                  <span>Pages</span>
                </a>
              </Link>
            </>
          )}
          
        </div>
      </div>
    </>
  )
}
