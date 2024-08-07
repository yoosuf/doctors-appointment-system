import Loader from '@/widget/loader'
import React from 'react'
import useCustomerIdentity from '@/components/Admin/Customer/hooks/useCustomerIdentity'
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl } from '@/utils/helper'
import moment from 'moment'

const IdentiyContainer = ({ id }) => {
  const { loading, identityList } = useCustomerIdentity({ id })

  return (
    <>
      <div className='Files'>
        <div className='grid grid-cols-12 gap-4 p-4 '>
          <div className='col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6'>
            <div>
              <h3 className='text-lg font-semibold'>Identity Documents</h3>
              <p className='text-sm text-gray-500'>
                This user has {identityList?.length} Identity Documents
              </p>
            </div>
          </div>
          <div className='hidden col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6 lg:block'></div>
          <div className='col-span-12 lg:col-span-4 md:col-span-5 sm:col-span-6'></div>
          <div className='col-span-12 lg:col-span-2 md:col-span-3 sm:col-span-6'></div>
        </div>

        <div className='relative'>
          {identityList?.length === 0 ? (
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
                  <p className='text-2xl'>No Identity Documents Found</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-12 gap-3'>
                {identityList.map((file = {}) => (
                  <div
                    key={file.id}
                    className='relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary'>
                    <div className='p-3 single-owner-file-text'>
                      <div>
                        <Link href='#'>
                          <a className='inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-greenBg text-primary'>
                            <div>{file.type}</div>
                          </a>
                        </Link>
                      </div>
                      <div className='flex mt-3'>
                        <Image
                          src={baseUrl + file.uri}
                          className='object-cover rounded-lg h-14 w-14'
                          alt='Identity Docs'
                          height={200}
                          width={320}
                        />
                      </div>
                      <div className='flex items-center justify-center gap-3 files-icons'>
                          <button
                            type='button'
                            onClick={e => {
                              e.preventDefault()
                              window.open(baseUrl + file.uri)
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
                      </div>
                    </div>
                    <div className='flex items-center justify-between p-3 mt-auto file-bottom'>
                      <div className='flex items-center'></div>
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
    </>
  )
}

export default IdentiyContainer
