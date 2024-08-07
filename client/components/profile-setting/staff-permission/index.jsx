// import React, { useState } from "react";
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
import ReactTableList from '@/widget/react-table/ReactTableList'
import StaffPermissionColumn from '@/widget/react-table/StaffPermission'
//   import { YellowBtn } from "@/widget/button/YellowBTN";
//   import { TickName } from "@/widget/TickName";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function StaffPermission() {
  const listData = [
    {
      owner: (
        <a
        className='px-3 py-1 text-xs font-medium rounded-full active-tag text-primary bg-greenBg'
          href='#'>
          Account Owner
        </a>
      ),
    },
    {
      owner: <p className='text-sm text-gray-400'>Transfer Ownership</p>,
    },
  ]
  return (
    <>
      <div className='px-6 py-6 setting-header bg-primary '>
        <h3 className='text-lg font-semibold'>Staff Permission</h3>
        <p className='text-gray-400'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className='border-b border-gray-500 bg-primary'></div>
      <div className='p-8'>
        {/* table */}
        <div>
          <ReactTableList
            columns={StaffPermissionColumn(this)}
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
