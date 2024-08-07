// import React, { useState } from "react";
import React from 'react'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Reminder from './Reminder'
import EmailNotification from './EmailNotification'

export default function SettingNotification() {
  return (
    <>
      <div className='px-6 py-6 setting-header bg-primary '>
        <h3 className='text-lg font-semibold'>Notifications</h3>
        {/* <p className='text-gray-400'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p> */}
      </div>
      <Tabs>
        <div className='border-b border-gray-500 bg-primary'>
          <TabList className='flex w-full px-6 overflow-x-auto border-b border-gray-500'>
            {/* <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
              <Link href='#'>
                <a>Reminder</a>
              </Link>
            </Tab> */}
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
              <Link href='#'>
                <a>Notification</a>
              </Link>
            </Tab>
          </TabList>
        </div>

        <div className='px-8 py-1.5 services-tabs'>
          {/* <TabPanel>
            <Reminder />
          </TabPanel> */}
          <TabPanel>
            <EmailNotification />
          </TabPanel>
        </div>
      </Tabs>
    </>
  )
}
