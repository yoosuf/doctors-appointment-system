import useGlobalSearch from '@/components/Admin/hooks/useGlobalSearch'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { baseUrl, sidebarLogoUrl } from '@/utils/helper'
import routes from '@/utils/routes'
import CloseIcon from '@/widget/image/CloseIcon'
import SearchIcon from '@/widget/image/SearchIcon'
import Loader from '@/widget/loader'
import router from 'next/router'
import React from 'react'

export default function SearchModal({ loading, close }) {
  const { data, inputForm, setInputForm } = useGlobalSearch()

  const changeInput = e => {
    setInputForm(e.target.value)
  }
  const blankInput = () => {
    setInputForm('')
  }
  return (
    <>
      <form>
        <section
          id='searchModal'
          className='fixed inset-0 z-10 overflow-hidden text-sm activity-modal-main active'
          aria-labelledby='slide-over-title'
          role='dialog'
          aria-modal='true'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='absolute inset-0 transition-opacity bg-black black-layer'
              aria-hidden='true'
              onClick={() => close()}></div>
            <div className='fixed inset-y-0 right-0 flex max-w-full activity-modal'>
              <div className='w-screen max-w-md'>
                <div className='flex flex-col h-full shadow-xl bg-primary'>
                  <div className='px-4 py-5 shadow-lg sm:px-6 bg-grayMid'>
                    <div className='flex items-center justify-between'>
                      <h2
                        className='text-base font-medium'
                        id='slide-over-title'>
                        Search
                      </h2>
                      <div className='flex items-center ml-3 h-7'>
                        <button
                          type='button'
                          onClick={e => {
                            e.preventDefault(), close()
                          }}
                          className='focus:outline-none '>
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative h-full p-4 modal-body'>
                    <div className='flex items-center gap-3'>
                      <div className='relative flex items-center w-full'>
                        <div className='absolute left-3'>
                          <SearchIcon />
                        </div>
                        <div className='absolute right-3'>
                          <a href='#' onClick={blankInput}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              width='20'
                              height='20'>
                              <path fill='none' d='M0 0h24v24H0z' />
                              <path
                                fill='#9CA3AF'
                                d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z'
                              />
                            </svg>
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
                      {/* <a
                        href='#'
                        className='flex items-center justify-center w-10 h-10 transition border border-gray-700 rounded-lg hover:border-yellowBg'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          viewBox='0 0 20 20'
                          fill='#9CA3AF'>
                          <path d='M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z' />
                        </svg>
                      </a> */}
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
                                            ? user.locationIds?.[0]
                                                ?.locationName
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
                  </div>
                  <div className='flex items-center justify-end col-span-12 p-4 mt-auto border-t border-gray-700 buttons'>
                    <p className='text-gray-400'>
                      use{' '}
                      <a href='#' className='text-white'>
                        Arrow
                      </a>{' '}
                      to navigate,{' '}
                      <a href='#' className='text-white'>
                        Enter
                      </a>{' '}
                      to select or search,{' '}
                      <a href='#' className='text-white'>
                        Backspance
                      </a>{' '}
                      to remove from search
                    </p>
                  </div>
                  {loading && <Loader customClass='absolute' />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}
