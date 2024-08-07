import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ClinicLocation from './Location'
import IPAddress from './IPAddress'

export default function ClinicInfoAndLocation() {
  return (
    <>
      <div className='px-6 py-6 setting-header bg-primary '>
        <h3 className='text-lg font-semibold'>Clinic Info & Locations</h3>
      </div>
      <Tabs>
        <div className='border-b border-gray-500 bg-primary'>
          <TabList className='flex w-full px-6 overflow-x-auto border-b border-gray-500'>
            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
              <a className='cursor-pointer'>Location</a>
            </Tab>

            <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
              <a className='cursor-pointer'>IP Devices</a>
            </Tab>
          </TabList>
        </div>

        <div className='p-8 services-tabs'>
          <TabPanel>
            <ClinicLocation />
          </TabPanel>
          <TabPanel>
            <IPAddress />
          </TabPanel>
        </div>
      </Tabs>
    </>
  )
}
