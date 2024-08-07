// import React, { useState } from "react";
import React from 'react'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { OutlineBtn, YellowBtn } from '@/widget/button/YellowBTN'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TimeZone() {
  return (
    <>
      <div className='pb-4 border-b border-gray-700'>
        <h3 className='text-lg font-semibold'>Time Zones</h3>
        <p className='mt-2 text-gray-400'>
          Based on your location of{' '}
          <span className='text-white'>San Francisco, CA, US,</span> your time
          zone should probably be set to{' '}
          <span className='text-white'>(GMT-08:00) America/Los_Angeles.</span>{' '}
          Apps time zone system is aware of Daylight Savings Time, so as long as
          your time zone is set correctly, will take care of the seasonal
          changes for your city.
        </p>
        <p className='mt-2 mb-4 text-gray-400'>
          Click the button below to update your Jane account to use
          America/Los_Angeles
        </p>
        <YellowBtn btnText='Set Time Zone To (GMT-08:00) America / Los Angeles' />
      </div>
      <div className='pb-4 border-b border-gray-700'>
        <div className='pt-4 text-semibold'>
          <label>
            Alternatively, you can manually select a time zone from the list
            below.
          </label>
          <Menu as='div' className='relative inline-block w-full text-left'>
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className='inline-flex items-center justify-between w-full rounded-md border px-3 py-1.5 mt-3 bg-transparent border-gray-700 placeholder-gray-500 relative text-gray-400'>
                    <h4 className='text-sm '>
                      (GMT-08:00) Pacifict Time (Us & Canada)
                    </h4>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      viewBox='0 0 20 20'
                      fill='#9CA3AF'>
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </Menu.Button>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items
                    static
                    className='absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'group flex items-center px-4 py-2 text-sm'
                            )}>
                            abc
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'group flex items-center px-4 py-2 text-sm'
                            )}>
                            abc
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
        <div className='gap-3 mt-5 flex-ver'>
          <OutlineBtn btnText='Cancel' />
          <YellowBtn btnText='Override Time Zone' />
        </div>
      </div>
    </>
  )
}
