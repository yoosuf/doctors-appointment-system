import { logout } from '@/utils/helper'
import { getUser } from '@/utils/localStorage'
import routes from '@/utils/routes'
import CloseIcon from '@/widget/image/CloseIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { baseUrl, sidebarLogoUrl } from '@/utils/helper'
import React, { useEffect, useState } from 'react'
import Notification from '../../notification/Notification'
import QuickAction from '../../Admin/GlobalAdd'
import SearchModal from './SearchModal'
import useGlobalSearch from '@/components/Admin/hooks/useGlobalSearch'
import SearchIcon from '@/widget/image/SearchIcon'
import SnapcrackLogo from 'icons/SnapcrackLogo'
import NotificationIcon from 'icons/NotificationIcon'
import PlusIcon from '@/widget/image/PlusIcon'
import SettingIcon from 'icons/SettingIcon'
import LogoutIcon from 'icons/LogoutIcon'
import MenuIcon from 'icons/MenuIcon'
import CrossIcon from 'icons/CrossIcon'

export default function Header({ close }) {
  const getUserImage = () => {
    let str = getUser()?.profile_image?.uri
    let str2 = str
      ? `${process.env.NEXT_PUBLIC_API_END_POINT}${str}`
      : '/images/sidebar/sidebar-logo.svg'
    return str2
  }
  const [openSearchModal, setOpenSerchModal] = useState(false)
  const [userImage, setUserImage] = useState(getUserImage())
  const { data, inputForm, setInputForm } = useGlobalSearch()

  function Menutoggle(e) {
    const element = document.getElementById('HeaderResponsive')
    element.classList.toggle('active')
  }
  function closeBtn(e) {
    const element = document.getElementById('HeaderResponsive')
    element.classList.remove('active')
  }
  function notificationModalOpen(e) {
    const notificationModal = document.getElementById('notificationModal')
    notificationModal.classList.add('active')
  }

  const changeInput = e => {
    setInputForm(e.target.value)
  }
  const blankInput = () => {
    setInputForm('')
  }

  useEffect(() => {
    checkUserImage()
    return () => {
      window.removeEventListener('storage', checkUserImage())
    }
  }, [])

  const checkUserImage = () => {
    window.addEventListener('storage', () => {
      setUserImage(getUserImage())
    })
  }

  const openModal = () => {
    const quickActionModal = document.getElementById('quickAction')
    quickActionModal.classList.add('active')
    const modalBody = document.getElementById('top-div')
    modalBody.scrollTop = 0
  }
  const searchModalOpen = () => {
    setOpenSerchModal(!openSearchModal)
    // const searchModal = document.getElementById('searchModal')
    // searchModal.classList.add('active')
  }

  const res = getUser()

  const router = useRouter()

  return (
    <>
      <header className='w-full py-5 border-b border-gray-500 bg-primary'>
        <div className='flex items-center justify-between w-full px-5 sm:px-8 bg-primary'>
          <Link href={routes.dashboard}>
            <a className='navbar-brand' href='#'>
              <SnapcrackLogo />
            </a>
          </Link>
          {/* toggle */}

          <Link href='#'>
            <a
              onClick={Menutoggle}
              className='flex items-center justify-center w-8 h-8 sm:hidden'>
              <MenuIcon />
            </a>
          </Link>
          {/* /toggle */}
          <div className='items-center justify-start hidden sm:flex header-menu'>
            <a
              onClick={() => searchModalOpen()}
              className='flex items-center justify-center ml-5 rounded-full cursor-pointer'>
              <SearchIcon />
            </a>
            <a
              onClick={() => notificationModalOpen()}
              className='flex items-center justify-center ml-5 rounded-full cursor-pointer'>
              <NotificationIcon />
            </a>
            <a
              onClick={openModal}
              className='flex items-center justify-center w-8 h-8 ml-5 rounded-full cursor-pointer bg-yellowBg'>
              <PlusIcon />
            </a>

            <div className='relative ml-5 header-profile'>
              <Link href={routes.myAccount}>
                <a onClick={e => e.preventDefault()}>
                  <img
                    src={userImage}
                    className='object-cover w-10 h-10 rounded-full'
                    alt=''
                  />
                </a>
              </Link>

              <div className='absolute gap-2 transition rounded-lg logout -right-3 top-10 bg-grayMid w-60'>
                <div className='flex items-center w-full gap-4 p-4 border-b border-gray-500'>
                  <img
                    src={userImage}
                    className='object-cover w-8 h-8 rounded-full'
                    alt=''
                  />
                  <div className='flex flex-col'>
                    <div className='font-bold'>
                      {res?.firstName} {res?.lastName}
                    </div>
                    <div className='relative block text-sm truncate w-36'>
                      {res?.email}
                    </div>
                  </div>
                </div>
                <div className='grid items-center grid-cols-1 gap-4 p-4'>
                  <a
                    href={routes.myAccount}
                    className='flex items-center gap-2 text-left hover:text-yellowBg'>
                    <SettingIcon />
                    Profile Setting
                  </a>
                  <button
                    onClick={e => {
                      e.preventDefault(), logout(router)
                    }}
                    className='flex items-center gap-2 text-left hover:text-yellowBg'>
                    <LogoutIcon />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section
        id='HeaderResponsive'
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
                  <a className='flex items-center justify-center ml-5 rounded-full cursor-pointer'>
                    <CrossIcon />
                  </a>

                  <div className='relative flex items-center w-full'>
                    <div className='absolute left-3'>
                      <SearchIcon />
                    </div>
                    <div className='absolute right-3'>
                      <a href='#' onClick={blankInput}>
                        <PlusIcon />
                      </a>
                    </div>
                    <input
                      type='text'
                      className='w-full py-2.5 px-10 bg-transparent border border-gray-700 rounded-lg placeholder-gray-500'
                      placeholder='Search'
                      onChange={e => changeInput(e)}
                      value={inputForm}
                    />
                  </div>
                  {data && data.length ? (
                    data.map(a => {
                      return (
                        <div className='mt-8'>
                          <p className='mb-4 text-sm text-gray-400'>
                            {a.role.replace(/[^a-zA-Z ]/g, ' ')}
                          </p>
                          <div>
                            {a.users ? (
                              a.users.map(user => {
                                return (
                                  <a
                                    // href={routes.manageOwner + "?userId=" + user._id}
                                    onClick={() => {
                                      localStorage.setItem(
                                        'searchUser',
                                        user.email
                                      )
                                      close()
                                      if (a.role === USER_ROLE_TYPE.PATIENT) {
                                        router.push(
                                          routes.manageCustomer +
                                            '?userId=' +
                                            user._id,
                                          null,
                                          { shallow: true }
                                        )
                                      } else {
                                        router.push(
                                          routes.manageOwner +
                                            '?userId=' +
                                            user._id,
                                          null,
                                          { shallow: true }
                                        )
                                      }
                                    }}
                                    className='flex items-center gap-3 pb-3 mb-3 border-b border-gray-700'>
                                    <div>
                                      <img
                                        src={
                                          user?.profile_image?.[0]?.uri
                                            ? baseUrl +
                                              user?.profile_image?.[0]?.uri
                                            : sidebarLogoUrl
                                        }
                                        className='object-cover w-12 h-12 rounded-full'
                                        alt=''
                                      />
                                    </div>
                                    <div>
                                      <p>
                                        {user.firstName + ' ' + user.lastName}
                                      </p>
                                      <p className='text-gray-400'>
                                        {user.locationIds?.[0]?.locationName
                                          ? user.locationIds?.[0]?.locationName
                                          : ''}
                                      </p>
                                    </div>
                                  </a>
                                )
                              })
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <></>
                  )}
                  <div className='flex items-center w-full gap-2 mt-5 rounded-lg cursor-pointer'>
                    <a className='flex items-center justify-center w-6 h-6 rounded-full cursor-pointer bg-yellowBg'>
                      <SettingIcon />
                    </a>
                    <Link href=''>
                      <a onClick={openModal}>Quick Actions</a>
                    </Link>
                  </div>
                  <div className='flex items-center w-full gap-2 mt-5 rounded-lg cursor-pointer'>
                    <SettingIcon />
                    <Link href={routes.myAccount}>
                      <a>Profile Setting</a>
                    </Link>
                  </div>
                  <div className='flex items-center w-full gap-2 mt-5 rounded-lg cursor-pointer'>
                    <LogoutIcon />
                    <Link href=''>
                      <a
                        onClick={e => {
                          e.preventDefault(), logout(router)
                        }}>
                        Logout
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuickAction />
      <Notification />
      {openSearchModal && <SearchModal close={searchModalOpen} />}
    </>
  )
}
