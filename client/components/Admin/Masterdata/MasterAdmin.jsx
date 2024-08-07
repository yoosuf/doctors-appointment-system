import React from 'react'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
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
import MainMaster from './Master/MainMaster'
import SubMaster from './SubMaster/SubMaster'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MasterAdmin = () => {
  return (
    <>
      <div className='p-4 UserManagementDetails sm:p-8'>
        {/* tabs */}
        <Tabs>
          <TabList className='flex w-full overflow-x-auto border-b border-gray-500 whitespace-nowrap'>
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
              <a className='cursor-pointer'>Master</a>
            </Tab>
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
              <a className='cursor-pointer'>Sub Master</a>
            </Tab>
          </TabList>

          <TabPanel>
            <MainMaster />
          </TabPanel>
          <TabPanel>
            <SubMaster />
          </TabPanel>
        </Tabs>
        {/* /tabs */}
      </div>
    </>
  )
}

export default MasterAdmin
