import React, { useState } from 'react'
import Link from 'next/link'
import useCustomerFile from '@/components/Admin/Customer/hooks/useCustomerFile'
import SearchIcon from '@/widget/image/SearchIcon'
import PlusIcon from '@/widget/image/PlusIcon'
import { baseUrl } from '@/utils/helper'
import moment from 'moment'
import Loader from '@/widget/loader'
import AddCustomerFile from './AddCustomerFile'
import EditIcon from '@/widget/image/EditIcon'
import { useDebouncedCallback } from 'use-debounce'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const UserManagementFiles = ({ id }) => {
  const {
    loading,
    files,
    setFiles,
    paginator,
    setPaginator,
    dataQueryOptions,
    getAllFilesList,
    activeFile,
    setActiveFile,
    openAddFileModal,
    openEdit,
    editData,
    onChangeSearch,
    setEditData,
  } = useCustomerFile({ id })
  const handleDebounced = useDebouncedCallback(e => {
    onChangeSearch(e)
  }, 500)


  return (
    <>
      <div className='Files'>
        <div className='grid grid-cols-12 gap-4 p-4 '>
          <div className='col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6'>
            <div>
              <h3 className='text-lg font-semibold'>Manage Files</h3>
              <p className='text-sm text-gray-500'>
                Current owner has {paginator.itemCount} chart files
              </p>
            </div>
          </div>
          <div className='hidden col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6 lg:block'></div>
          <div className='col-span-12 lg:col-span-4 md:col-span-5 sm:col-span-6'>
            <div className='relative flex items-center w-full'>
              <div className='absolute left-3'>
                <SearchIcon />
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                placeholder='Search'
                onChange={handleDebounced}
              />
            </div>
          </div>
          <div className='col-span-12 lg:col-span-2 md:col-span-3 sm:col-span-6'>
            <button
              type='button'
              onClick={e => {
                e.preventDefault()
                openAddFileModal()
              }}
              className='flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400 '>
              <PlusIcon />
              <span className='ml-2 text-sm font-medium'>Add New</span>
            </button>
          </div>
        </div>

        <div className='relative'>
          {files.length === 0 ? (
            <div className='flex items-center justify-center gap-3 py-20'>
              <div>
                <div className='flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-28 w-28'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
                  </svg>
                </div>

                <div className=''>
                  <p className='text-2xl'>No Data Found</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-12 gap-3'>
                {files.map((file = {}) => (
                  <div
                    key={file.id}
                    className='relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary'>
                    <div className='p-3 single-owner-file-text'>
                      {/* <div>
                      <Link href='#'>
                        <a className='inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-greenBg text-primary'>
                          <div>jpg</div>
                        </a>
                      </Link>
                    </div> */}
                      <h3 className='my-2 font-medium'>{file.title}</h3>
                      <p className='text-sm text-gray-400'>
                        {file.description}
                      </p>
                      <div className='flex mt-3'>
                        {file.imageIds?.length > 0 &&
                          file.imageIds.map((i = {}) => (
                            <img
                              src={baseUrl + i.uri}
                              className='object-cover rounded-lg h-14 w-14'
                              alt='Snapcrack'
                            />
                          ))}
                      </div>
                      <div className='flex items-center justify-center gap-3 files-icons'>
                        <a
                          className='cursor-pointer'
                          onClick={() => openEdit(file)}>
                          <EditIcon color='#18181B' />
                        </a>

                        {file.imageIds?.length > 0 && (
                          <button
                            type='button'
                            onClick={e => {
                              e.preventDefault()
                              window.open(baseUrl + file.imageIds?.[0]?.uri)
                            }}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-6 h-6'
                              viewBox='0 0 20 20'
                              fill='#18181B'>
                              <path
                                fillRule='evenodd'
                                d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center justify-between p-3 mt-auto file-bottom'>
                      <div className='flex items-center'>
                        <Link href='#'>
                          <a>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-5 h-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='#9ca3af'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                              />
                            </svg>
                          </a>
                        </Link>
                        <Link href='#'>
                          <a className='ml-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-5 h-5'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='#9ca3af'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                              />
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                              />
                            </svg>
                          </a>
                        </Link>
                      </div>
                      <p className='pl-3 text-sm text-gray-400'>
                        {moment(file.updatedAt).format('MMMM DD, YYYY')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {loading && <Loader customClass='absolute' />}
        </div>
      </div>

      <AddCustomerFile
        activeFile={activeFile}
        setActiveFile={setActiveFile}
        editData={editData}
        getAllFilesList={getAllFilesList}
        openAddFileModal={openAddFileModal}
        setEditData={setEditData}
        id={id}
      />
    </>
  )
}

export default UserManagementFiles
