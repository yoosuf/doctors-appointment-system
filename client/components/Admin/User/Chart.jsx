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
import ActivityTableList from '@/widget/react-table/activityTableList'
import ManageOwnerChartColumn from '@/widget/react-table/ManageOwnerChartColumn'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const listData = [
  { chartName: 'unknown', type: 'line' },
  { chartName: 'unknown', type: 'line' },
  { chartName: 'unknown', type: 'line' },
]
const ManageOwnerChart = () => {
  return (
    <>
      <div className='py-4'>
        <h3 className='text-lg font-semibold'>Manage Chart</h3>
        <p className='text-sm text-gray-500'>
          Current owner has 6 chart template
        </p>
      </div>
      <div className='overflow-hidden rounded-lg products bg-primary'>
        {/* table */}
        <div>
          <ActivityTableList
            columns={ManageOwnerChartColumn(this)}
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

export default ManageOwnerChart
