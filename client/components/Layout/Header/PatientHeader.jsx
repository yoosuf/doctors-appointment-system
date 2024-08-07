import { baseUrl, logout } from '@/utils/helper'
import { getUser } from '@/utils/localStorage'
import routes from '@/utils/routes'
import CloseIcon from '@/widget/image/CloseIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import commonApi from '@/api/common'
import { REDIRECT_ONBOARDING, CUSTOMER_ORDER_TYPE } from '@/utils/constant'
import Router from 'next/router'
import {
  GiftIcon,
  ExclamationCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

export default function PatientHeader ({ userData, container = false }) {
  const router = useRouter()
  const [onBordProg, setOnBordProg] = useState()

  function Menutoggle (e) {
    const element = document.getElementById('patientHeaderResponsive')
    element.classList.toggle('active')
  }

  function closeBtn (e) {
    const element = document.getElementById('patientHeaderResponsive')
    element.classList.remove('active')
  }

  const InvitationModelOpen = () => {
    const InfoRequireModal = document.getElementById('InvitationModel')
    InfoRequireModal.classList.add('active')
  }

  const handleCheckInClick = () => {
    Router.push(routes.customer.appointmentNew)
  }

  const getOnboardingPercentage = async () => {
    const { _id, id } = await getUser()

    const userId = _id || id

    await commonApi({
      parameters: [userId],
      action: 'getPatientUser',
    }).then(({ DATA = {} }) => {
      setOnBordProg(DATA.onboardProgress)
    })
  }

  useEffect(() => {
    getOnboardingPercentage()
  }, [])

  const goToOnboarding = () => {
    if (onBordProg === 0) {
      router.push(routes[REDIRECT_ONBOARDING[0]])
    } else {
      const progress = (onBordProg / 100) * 5
      const redProg = Math.round(progress)
      Router.push(routes[REDIRECT_ONBOARDING[redProg]])
    }
  }

  return (
    <>
      <header className='w-full py-3 border-b border-gray-500 bg-primary'>
        <div className={`${container && 'container'}`}>
          <div
            className={`flex items-center justify-between w-full bg-primary ${
              !container && 'px-5 sm:px-8'
            }`}>
            <Link href={routes.customerDashboard}>
              <a className='navbar-brand'>
                <img src='/images/logo.png' className='h-12' />
              </a>
            </Link>

            <div className='flex items-center justify-center gap-4 sm:justify-start '>
              {/* Gift it button */}

              {userData.membership &&
                JSON.stringify(userData.membership) !== '{}' && (
                  <div className='hidden sm:block' onClick={InvitationModelOpen}>
                    <a
                      href='#'
                      className='flex items-center px-4 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg focus:outline-none hover:bg-yellow-400 whitespace-nowrap'>
                      <GiftIcon className='w-5 h-5 mr-1' />
                      <span>Send a gift</span>
                    </a>
                  </div>
                )}

              {onBordProg < 100 ? (
                <a
                  href='#'
                  onClick={goToOnboarding}
                  className='flex items-center px-4 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg focus:outline-none hover:bg-yellow-400 whitespace-nowrap'>
                  <ExclamationCircleIcon className='w-5 h-5 mr-1' />
                  <span>Complete the profile</span>
                </a>
              ) : (
                <a
                  href='#'
                  onClick={handleCheckInClick}
                  className='flex items-center px-4 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg focus:outline-none hover:bg-yellow-400 whitespace-nowrap'>
                  <MapPinIcon className='w-5 h-5 mr-1' />
                  <span>Check In</span>
                </a>
              )}

              <div className='relative hidden header-profile sm:block'>
                <a>
                  <img
                    src={userData?.profile_image}
                    className='object-cover w-10 h-10 rounded-full'
                    alt='Snapcrack'
                  />
                </a>

                <div className='absolute right-0 transition logout -bottom-9'>
                  <a
                    onClick={() => logout(router)}
                    className='bg-grayMid py-1.5 px-4 w-full rounded-lg flex items-center gap-5 cursor-pointer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                      />
                    </svg>
                    Logout
                  </a>
                </div>
              </div>
              {/* toggle */}
              <Link href='#'>
                <span
                  onClick={Menutoggle}
                  className='flex items-center justify-center w-8 h-8 ml-3 sm:hidden'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25'
                    />
                  </svg>
                </span>
              </Link>
              {/* /toggle */}
            </div>
          </div>
        </div>
      </header>

      <header
        id='patientHeaderResponsive'
        className='fixed inset-0 z-10 block overflow-hidden text-sm activity-modal-main sm:hidden'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute inset-0 transition-opacity bg-black black-layer'
            aria-hidden='true'
            onClick={() => closeBtn()}></div>
          <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal'>
            <div className='w-screen max-w-full pl-24'>
              <div className='flex flex-col h-full shadow-xl bg-primary'>
                <div className='px-4 py-5 shadow-lg sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-medium' id='slide-over-title'>
                      Menu
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button
                        type='button'
                        onClick={e => {
                          e.preventDefault(), closeBtn()
                        }}
                        className='focus:outline-none '>
                        <span className='sr-only'>Close panel</span>
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='relative flex-1 p-4 modal-body'>
                  <div className='grid gap-6 header-menu'>
                    {/* <div className='flex items-center w-full gap-5 rounded-lg cursor-pointer'>
                      <img
                        src={profileImage}
                        className='object-cover w-6 h-6 rounded-full'
                        alt='Snapcrack'
                      />
                      <Link href={routes.customerDashboard}>
                        <a>Profile</a>
                      </Link>
                    </div> */}
                    {/* <div className='flex items-center w-full gap-5 text-gray-400 rounded-lg cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                        />
                      </svg>

                      <Link href='#'>
                        <span className='text-white'>Profile</span>
                      </Link>
                    </div> */}
                    {/* <div className='flex items-center w-full gap-5 text-gray-400 rounded-lg cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184'
                        />
                      </svg>

                      <Link href='#'>
                        <span className='text-white'>Chart</span>
                      </Link>
                    </div> */}

                    {/* <div className='flex items-center w-full gap-5 rounded-lg cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='21'
                        height='21'
                        viewBox='0 0 20 20'
                        fill='none'>
                        <path
                          d='M19 12.2554C16.2207 13.3805 13.1827 14 10 14C6.8173 14 3.7793 13.3805 1 12.2554M14 5V3C14 1.89543 13.1046 1 12 1H8C6.89543 1 6 1.89543 6 3V5M10 11H10.01M3 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19Z'
                          stroke='#9CA3AF'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <Link href='#'>
                        <span className=''>Files</span>
                      </Link>
                    </div> */}

                    {/* <div className='flex items-center w-full gap-5 text-gray-400 rounded-lg cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                        />
                      </svg>

                      <Link href='#'>
                        <span className='text-white'>Notifications</span>
                      </Link>
                    </div> */}
                    {/* <p className='text-base font-medium text-gray-400'>
                      MY ACCOUNT
                    </p>
                    <div className='flex items-center w-full gap-5 text-gray-400 rounded-lg cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                        />
                      </svg>

                      <Link href='#'>
                        <span className='text-white'>Billings</span>
                      </Link>
                    </div> */}

                    {userData.membership &&
                      JSON.stringify(userData.membership) !== '{}' && (
                        <div
                          className='flex items-center w-full gap-5 text-gray-400 rounded-lg cursor-pointer'
                          onClick={InvitationModelOpen}>
                          <GiftIcon className='w-6 h-6' />

                          <Link href='#'>
                            <span className='text-white'>Send a gift</span>
                          </Link>
                        </div>
                      )}

                    <div className='flex items-center w-full gap-5 rounded-lg cursor-pointer'>
                      <a className='flex items-center justify-center w-6 h-6 text-gray-400 rounded-full cursor-pointer'>
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
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                          />
                        </svg>
                      </a>
                      <Link href=''>
                        <span onClick={() => logout(router)}>Logout</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
