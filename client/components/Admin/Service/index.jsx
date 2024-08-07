// import React, { useState } from "react";
import React from 'react'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ToggleButton from '@/widget/ToggleButton'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import ProfileServicesPage from './Service'
import ProfileServiceCategory from './ProfileServiceCategory'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileServices() {
  return (
    <>
      <div className='px-4 py-6 setting-header sm:px-6 bg-primary '>
        <h3 className='text-lg font-semibold'>Services</h3>
      </div>
      <Tabs>
        <div className='border-b border-gray-500 bg-primary'>
          <TabList className='flex w-full px-4 overflow-x-auto border-b border-gray-500 sm:px-6'>
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
              <a className='cursor-pointer'>Services</a>
            </Tab>
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
              <a className='cursor-pointer'>Services Categories</a>
            </Tab>
          </TabList>
        </div>

        <div className='p-4 sm:p-8 services-tabs'>
          <TabPanel>
            {/* <ProfileServicesPage/> */}
            <ProfileServicesPage />
          </TabPanel>
          <TabPanel>
            <ProfileServiceCategory />
          </TabPanel>
        </div>
      </Tabs>
    </>
  )
}
