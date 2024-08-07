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
import ReactTableList from '@/widget/react-table/ReactTableList'
import LicenseColumn from '@/widget/react-table/LicenseColumn'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ManageOwnerLicense = () => {
  const listData = [
    {
      location: 'The Village',
      start: '01 March 2020',
      licenseType: 'Monthly,End 02 June 2020',
      licenseStatus: (
        <Link href='#'>
          <a className='px-3 py-1 text-xs font-medium text-gray-900 rounded-full bg-greenBg'>
            Active
          </a>
        </Link>
      ),
    },
    {
      location: 'The Village',
      start: '01 March 2020',
      licenseType: 'Monthly,End 02 June 2020',
      licenseStatus: (
        <Link href='#'>
          <a className='px-3 py-1 text-xs font-medium text-gray-900 rounded-full bg-greenBg'>
            Active
          </a>
        </Link>
      ),
    },
    {
      location: 'The Village',
      start: '01 March 2020',
      licenseType: 'Monthly,End 02 June 2020',
      licenseStatus: (
        <Link href='#'>
          <a className='px-3 py-1 text-xs font-medium text-gray-900 rounded-full bg-greenBg'>
            Active
          </a>
        </Link>
      ),
    },
  ]
  return (
    <>
      <div className='grid grid-cols-12 gap-4 p-4'>
        <div className='col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6'>
          <div>
            <h3 className='text-lg font-semibold'>Manage License</h3>
            <p className='text-sm text-gray-500'>
              Current owner has 6 chart Locations
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
      <div className='overflow-hidden rounded-lg products bg-primary'>
        {/* table */}
        <div>
          <ReactTableList
            columns={LicenseColumn(this)}
            page={1}
            data={listData}
            recordsFiltered={15}
            //loading={isLoading}
          />
        </div>
        {/* /table */}
      </div>
    </>
  )
}

export default ManageOwnerLicense
