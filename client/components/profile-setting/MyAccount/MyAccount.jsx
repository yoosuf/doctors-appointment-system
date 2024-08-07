// import React, { useState } from "react";
import Availability from '@/components/Admin/User/Availability'
import { getUser } from '@/utils/localStorage'
import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Account from './Account'
import MyProfile from './MyProfile'
import { USER_ROLE_TYPE } from '@/utils/constant'
import EmailNotification from '../notification/EmailNotification'

export default function MyAccount() {
  const [id, setID] = useState()
  const [role, setRole] = useState()

  useEffect(() => {
    const { id, roleId = {} } = getUser()
    if (id) {
      setID(id)
      setRole(roleId.code)
    }
  }, [])

  return (
    <>
      <div className='px-6 py-6 setting-header bg-primary '>
        <h3 className='text-lg font-semibold'>My Account</h3>
        <p className='text-gray-400'>
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <Tabs>
        <div className='border-b border-gray-500 bg-primary'>
          <TabList className='flex w-full px-6 overflow-x-auto border-b border-gray-500'>
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent cursor-pointer'>
              <a>Profile</a>
            </Tab>
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent cursor-pointer'>
              <a>Account</a>
            </Tab>
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent cursor-pointer'>
              <a>Notifications</a>
            </Tab>
            {role === USER_ROLE_TYPE.CHIROPRACTOR && (
              <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent cursor-pointer'>
                <a>Availability</a>
              </Tab>
            )}
          </TabList>
        </div>

        <div className='p-5 sm:p-8 services-tabs'>
          <TabPanel>
            <MyProfile id={id} />
          </TabPanel>
          <TabPanel>
            <Account id={id} />
          </TabPanel>
          <TabPanel>
            <EmailNotification />
          </TabPanel>
          {role === USER_ROLE_TYPE.CHIROPRACTOR && (
            <TabPanel>
              <Availability id={id} />
            </TabPanel>
          )}
        </div>
      </Tabs>
    </>
  )
}
