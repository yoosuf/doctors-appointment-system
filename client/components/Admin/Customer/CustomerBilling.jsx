import React from 'react'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ArchiveIcon,
  ArrowCircleRightIcon,
  ChevronDownIcon,
  DuplicateIcon,
  HeartIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
} from '@heroicons/react/24/solid'
import ToggleButton from '@/widget/ToggleButton'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const UserManagementBilling = () => {
  return (
    <>
      <div className='Files'>
        <div className='grid grid-cols-12 gap-4 p-4 '>
          <div className='col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6'>
            <div>
              <h3 className='text-lg font-semibold'>Manage Files</h3>
              <p className='text-sm text-gray-500'>
                Current owner has 6 chart files
              </p>
            </div>
          </div>
          <div className='hidden col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6 lg:block'></div>
          <div className='col-span-12 lg:col-span-4 md:col-span-5 sm:col-span-6'>
            <div className='relative flex items-center w-full'>
              <div className='absolute left-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#9CA3AF '>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                </svg>
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 pl-10 placeholder-gray-500 bg-transparent border border-gray-700 rounded-lg'
                placeholder='Search'
              />
            </div>
          </div>
          <div className='col-span-12 lg:col-span-2 md:col-span-3 sm:col-span-6'>
            <button className='flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-center text-black transition rounded-lg bg-yellowBg sm:px-4 hover:bg-yellow-400 '>
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
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
              <span className='ml-2 text-sm font-medium'>Add New</span>
            </button>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary'>
            <div className='p-3 single-owner-file-text'>
              <div>
                <Link href='#'>
                  <a className='inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellowBg text-primary'>
                    <div className='w-1 h-1 mr-1 bg-black rounded-full round'></div>
                    <div>Note</div>
                  </a>
                </Link>
              </div>
              <h3 className='my-2 font-medium'>Note Title</h3>
              <p className='text-sm text-gray-400'>
                Note Description will behave in the same way as those of other
                chart entries. All settings will respect the privacy and sharing
                settings of the person logged in.
              </p>
              <div className='flex items-center justify-center gap-3 files-icons'>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      />
                    </svg>
                  </a>
                </Link>
                <Link href='#'>
                  <a>
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
                  </a>
                </Link>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
                      />
                    </svg>
                  </a>
                </Link>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </a>
                </Link>
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
              <p className='pl-3 text-sm text-gray-400'>October 24, 2021</p>
            </div>
          </div>
          <div className='relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary'>
            <div className='p-3 single-owner-file-text'>
              <div>
                <Link href='#'>
                  <a className='inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-greenBg text-primary'>
                    <div>jpg</div>
                  </a>
                </Link>
              </div>
              <h3 className='my-2 font-medium'>Xray Scan</h3>
              <p className='text-sm text-gray-400'>
                All this image is will respect the privacy and something else...
              </p>
              <div className='flex mt-3'>
                <img
                  src='https://picsum.photos/200'
                  className='object-cover rounded-lg h-14 w-14'
                  alt=''
                />
                <img
                  src='https://picsum.photos/200'
                  className='object-cover ml-3 rounded-lg h-14 w-14'
                  alt=''
                />
              </div>
              <div className='flex items-center justify-center gap-3 files-icons'>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      />
                    </svg>
                  </a>
                </Link>
                <Link href='#'>
                  <a>
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
                  </a>
                </Link>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
                      />
                    </svg>
                  </a>
                </Link>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </a>
                </Link>
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
              <p className='pl-3 text-sm text-gray-400'>October 24, 2021</p>
            </div>
          </div>
          <div className='relative flex flex-col col-span-12 overflow-hidden rounded-lg single-owner-file lg:col-span-4 sm:col-span-6 bg-primary'>
            <div className='p-3 single-owner-file-text'>
              <div>
                <Link href='#'>
                  <a className='inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-greenBg text-primary'>
                    <div>jpg</div>
                  </a>
                </Link>
              </div>
              <h3 className='my-2 font-medium'>Xray Scan</h3>
              <p className='text-sm text-gray-400'>
                All this image is will respect the privacy and something else...
              </p>
              <div className='flex mt-3'>
                <img
                  src='https://picsum.photos/200'
                  className='object-cover rounded-lg h-14 w-14'
                  alt=''
                />
                <img
                  src='https://picsum.photos/200'
                  className='object-cover ml-3 rounded-lg h-14 w-14'
                  alt=''
                />
              </div>
              <div className='flex items-center justify-center gap-3 files-icons'>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      />
                    </svg>
                  </a>
                </Link>
                <Link href='#'>
                  <a>
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
                  </a>
                </Link>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
                      />
                    </svg>
                  </a>
                </Link>
                <Link href='#'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#18181B'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </a>
                </Link>
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
              <p className='pl-3 text-sm text-gray-400'>October 24, 2021</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserManagementBilling

// import React from "react";
// import Link from "next/link";
// const UserManagementBilling = () => {

//   return (
//     <>
//       <div className="mt-6 billing">
//             <div className="relative p-5 overflow-hidden rounded-lg atm-card">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="#22C55E"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
//                         <h6 className="ml-2 text-sm">ACTIVE (DEFAULT)</h6>
//                     </div>
//                     <div className="visa">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="72" height="23" viewBox="0 0 72 23" fill="none">
//                         <path d="M28.8004 0.366699L25.1895 21.7294H30.9646L34.5784 0.366699H28.8004Z" fill="white"/>
//                         <path d="M20.3454 0.390723L14.6892 14.9594L14.0861 12.7597C12.9706 10.1092 9.80381 6.30267 6.08594 3.90375L11.258 21.7189L17.3688 21.7085L26.4637 0.38623L20.3454 0.390723Z" fill="white"/>
//                         <path d="M11.8939 1.92012C11.5582 0.618832 10.5853 0.230991 9.37766 0.18457H0.423878L0.349609 0.609847C7.31746 2.31395 11.928 6.41997 13.8412 11.3571L11.8939 1.92012Z" fill="white"/>
//                         <path d="M46.2828 4.46265C48.1722 4.43271 49.5417 4.849 50.6052 5.28026L51.1266 5.52734L51.9079 0.897219C50.7642 0.464455 48.9713 0.000244141 46.7344 0.000244141C41.0276 0.000244141 37.0052 2.89782 36.974 7.05025C36.9369 10.1185 39.8393 11.8316 42.0317 12.8544C44.282 13.9026 45.0366 14.569 45.0262 15.5049C45.0084 16.9349 43.2319 17.5908 41.5727 17.5908C39.26 17.5908 38.0316 17.2689 36.1348 16.4722L35.3906 16.1308L34.5781 20.9122C35.9298 21.5097 38.4237 22.0233 41.0127 22.0502C47.0834 22.0502 51.0285 19.1871 51.0701 14.7502C51.0954 12.3228 49.5551 10.4704 46.2174 8.95052C44.1974 7.95921 42.9615 7.30033 42.9734 6.30003C42.9734 5.41204 44.0221 4.46265 46.2828 4.46265Z" fill="white"/>
//                         <path fillRule="evenodd" clipRule="evenodd" d="M62.2628 0.391113H66.7249L71.3978 21.7418H66.0401C66.0401 21.7418 65.5083 19.2875 65.336 18.5417C64.8919 18.5417 63.0323 18.5392 61.2815 18.5369C59.7242 18.5348 58.253 18.5328 57.9404 18.5328C57.7161 19.1093 56.7269 21.7418 56.7269 21.7418H50.6621L59.2371 2.1641C59.8461 0.771466 60.877 0.391113 62.2628 0.391113ZM61.9054 8.1898C61.9054 8.1898 60.0799 12.9337 59.6045 14.1601H64.4023L63.064 7.99214L62.6748 6.15027C62.5287 6.54363 62.334 7.05415 62.1768 7.46626C62.0126 7.89661 61.8894 8.21963 61.9054 8.1898Z" fill="white"/>
//                         </svg>
//                     </div>
//                 </div>
//                 <h3 className="my-6 text-xl font-semibold">2451 •••• ••••  2864</h3>
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-xs text-gray-400">EXPIRES</p>
//                         <p className="text-sm">08/22</p>
//                     </div>
//                     <Link href="#">
//                         <a className="flex items-center justify-center rounded-lg atm-setting h-9 w-9">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" fill="#fff"/>
//                             </svg>
//                         </a>
//                     </Link>
//                 </div>
//             </div>
//       </div>
//     </>
//   );
// };

// export default UserManagementBilling;
