import commonApi from '@/api/common'
import useDashboard from '@/components/Admin/Dashboard/hooks/useDashboard'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { customStyles } from '@/utils/helper'
import { getUser } from '@/utils/localStorage'
import routes from '@/utils/routes'
import DownArrow from '@/widget/image/DownArrow'
import LeftArrow from '@/widget/image/LeftArrow'
import RightArrow from '@/widget/image/RightArrow'
import Loader from '@/widget/loader'
import RangePicker from '@/widget/range-picker'
import { Menu, Transition } from '@headlessui/react'
import {
  ClipboardIcon,
  CurrencyDollarIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import SettingIcon from 'icons/SettingIcon'
import UserFillIcon from 'icons/UserFillcon'
import moment from 'moment'
import Link from 'next/link'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
// import SelectMembership from '@/components/Customer/SelectService/SelectMembership'
import SingleUser from '../User/SingleUser'
import AppointmentGraph from './Appointment'
import NewCustomerGraph from './NewCustomer'
import RevenueGraph from './Revenue'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SuperAdmin = () => {
  const [statusSelected, setStatusSelected] = useState('New Customer')
  const [showDate, setShowDate] = useState(false)
  const [selectionRange, setselectionRange] = useState({
    startDate: moment().subtract(1, 'M').toDate(),
    endDate: moment().toDate(),
    key: 'selection',
  })
  const [data, setData] = useState()
  const [dateDiff, setDateDiff] = useState()
  const [loading, setLoading] = useState()
  const {
    selectedLocationValue,
    setSelectedLocationValue,
    locationOptionsData,
    loadOptionsLocation,
  } = useDashboard()
  const button = [
    {
      name: 'New Customer',
      icons: <UsersIcon className='w-6 h-6' color='#2DD4BF' />,
      number: data?.newCustomer?.map(x => x?.count).reduce((a, b) => a + b, 0),
    },
    {
      name: 'Appointment',
      icons: <ClipboardIcon className='w-6 h-6' color='#F97316' />,
      number: data?.appointment?.map(x => x?.count).reduce((a, b) => a + b, 0),
    },
    {
      name: 'Revenue',
      icons: <CurrencyDollarIcon className='w-6 h-6' color='#22C55E' />,
      number: data?.revenue?.map(x => x?.count).reduce((a, b) => a + b, 0),
    },
  ]
  const newStateSelected = e => {
    setStatusSelected(e.target.id)
  }

  const handleDatePicker = () => {
    setShowDate(!showDate)
  }

  const handleSelect = ranges => {
    const dateDiff = moment(ranges.selection?.endDate).diff(
      moment(ranges.selection?.startDate),
      'days'
    )
    setDateDiff(dateDiff)
    setselectionRange({
      startDate: moment(ranges.selection?.startDate).toDate(),
      endDate: moment(ranges.selection?.endDate).toDate(),
      key: 'selection',
    })
  }
  useEffect(() => {
    setLoading(true)
    const token = getUser()
    const type = () => {
      if (dateDiff > 6) {
        return 'WEEKLY'
      } else {
        return 'DAILY'
      }
    }
    const payload = {
      fromDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
      toDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),
      chartType: type(),
      locationId:
        selectedLocationValue.value === 'all'
          ? undefined
          : selectedLocationValue.value,
    }
    if (!token) {
      router.push(routes.sesson.new)
    } else {
      commonApi({
        action: 'dashboardCount',
        data: payload,
      }).then(async ({ DATA, MESSAGE }) => {
        setData(DATA)
        setLoading(false)
      })
    }
  }, [selectionRange, selectedLocationValue])

  useEffect(() => {
    let code = getUser()?.roleId?.code
    if (code === USER_ROLE_TYPE.STAFF || code === USER_ROLE_TYPE.CHIROPRACTOR)
      router.push(routes.deskWaitlist)
  }, [])

  return (
    <>
      <div
        className='flex flex-col gap-5 p-6 overflow-auto details-sec'
        // onBlur={handleDatePicker}
      >
        <div className='relative w-full'>
          <div className='flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center'>
            <div className=''>
              <h3 className='font-medium'>Overview</h3>
              <p className='text-sm text-gray-500 capitalize'>
                {selectedLocationValue?.label}
              </p>
            </div>
            <div className='grid flex-wrap items-center grid-cols-1 gap-3 sm:flex'>
              {/* <div className='w-full sm:w-52'>
                <AsyncSelect
                  styles={customStyles}
                  // isMulti
                  isSearchable
                  hideSelectedOptions={true}
                  // cacheOptions
                  className='relative w-full text-sm text-left'
                  placeholder='Select/Search location'
                  id='locationId'
                  value={selectedLocationValue}
                  defaultOptions={locationOptionsData}
                  loadOptions={loadOptionsLocation}
                  // filterOption={() => true}
                  onInputChange={value => {
                    if (value === '' && locationOptionsData.length === 0) {
                      loadOptionsLocation()
                    }
                  }}
                  onChange={async data => {
                    setSelectedLocationValue(data)
                  }}
                />
              </div> */}
              <div className=' sm:w-80'>
                <div className='grid grid-cols-12' onClick={handleDatePicker}>
                  <a className='flex items-center justify-center col-span-2 px-2 py-2 bg-transparent border border-gray-700 rounded-l-lg'>
                    <LeftArrow />
                  </a>
                  <div className='w-full col-span-8'>
                    <input
                      type='text'
                      className='w-full h-full px-2 py-2 text-sm text-center text-gray-500 bg-transparent border border-gray-700 cursor-pointer'
                      value={
                        'Today, ' + moment().format('MMM DD')
                        // ' - ' +  moment(selectionRange.endDate).format('MMM Do YYYY')
                      }
                    />
                  </div>
                  <a className='flex items-center justify-center col-span-2 px-2 py-2 bg-transparent border border-gray-700 rounded-r-lg'>
                    <RightArrow />
                  </a>
                </div>
              </div>
              <div className=''>
                <Menu
                  as='div'
                  className='relative inline-block w-full text-left'>
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className='flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 rounded-lg bg-yellowBg '>
                          <UserFillIcon />
                          view as admin
                          <DownArrow />
                        </Menu.Button>
                      </div>

                      <Transition
                        show={open}
                        // as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items
                          static
                          className='absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
                                  Close
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
              {/* <div className=''>
                <Link href={routes.setting}>
                  <a className='w-10 h-10 transition bg-transparent border border-gray-700 rounded-lg flex-cen hover:border-yellowBg'>
                    <SettingIcon />
                  </a>
                </Link>
              </div> */}
            </div>
          </div>

          <div
            className='absolute col-span-8 cursor-pointer z-999 '
            style={{ right: 0, top: '110%' }}>
            {showDate ? (
              <RangePicker
                selectionRange={selectionRange}
                handleSelect={handleSelect}
                setShowDate={setShowDate}
                showDate={showDate}
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 lg:col-span-9'>
            {loading ? (
              <Loader customClass='inherit' />
            ) : (
              <div className='grid gap-3 lg:grid-cols-4 sm:grid-cols-2'>
                <Link href='#'>
                  <a className='px-4 py-6 text-center transition rounded-lg bg-primary hover:bg-grayMid'>
                    <h4 className='mb-1 text-2xl font-semibold text-white'>
                      {data?.totalAppointment}
                    </h4>
                    <p className='text-sm text-gray-500'>Total Visit</p>
                  </a>
                </Link>
                <Link href='#'>
                  <a className='px-4 py-6 text-center transition rounded-lg bg-primary hover:bg-grayMid'>
                    <h4 className='mb-1 text-2xl font-semibold text-white'>
                      {data?.waitingGuest}
                    </h4>
                    <p className='text-sm text-gray-500'>Waitlisted guest</p>
                  </a>
                </Link>
                <Link href='#'>
                  <a className='px-4 py-6 text-center transition rounded-lg bg-primary hover:bg-grayMid'>
                    <h4 className='mb-1 text-2xl font-semibold text-white'>
                      {data?.bookingThisPeriod}
                    </h4>
                    <p className='text-sm text-gray-500'>Booking this period</p>
                  </a>
                </Link>
                <Link href='#'>
                  <a className='px-4 py-6 text-center transition rounded-lg bg-primary hover:bg-grayMid'>
                    <h4 className='mb-1 text-2xl font-semibold text-white'>
                      {data?.newBooking}
                    </h4>
                    <p className='text-sm text-gray-500'>New booking made</p>
                  </a>
                </Link>
                <Link href='#'>
                  <a className='px-4 py-6 text-center transition rounded-lg bg-primary hover:bg-grayMid'>
                    <h4 className='mb-1 text-2xl font-semibold text-white'>
                      {Number.isInteger(data?.avgWaitMin)
                        ? data?.avgWaitMin
                        : parseFloat(data?.avgWaitMin).toFixed(2)}{' '}
                      <span className='text-sm font-normal'>min</span>
                    </h4>
                    <p className='text-sm text-gray-500'>Average wait time</p>
                  </a>
                </Link>
                <Link href='#'>
                  <a className='px-4 py-6 text-center transition rounded-lg bg-primary hover:bg-grayMid'>
                    <h4 className='mb-1 text-2xl font-semibold text-white'>
                      {data?.servedCustomer}
                    </h4>
                    <p className='text-sm text-gray-500'>Served</p>
                  </a>
                </Link>
                <Link href='#'>
                  <a className='px-4 py-6 text-center transition rounded-lg bg-primary hover:bg-grayMid'>
                    <h4 className='mb-1 text-2xl font-semibold text-white'>
                      {Number.isInteger(data?.avgServedMin)
                        ? data?.avgServedMin
                        : parseFloat(data?.avgServedMin).toFixed(2)}{' '}
                      <span className='text-sm font-normal'>min</span>
                    </h4>
                    <p className='text-sm text-gray-500'>Average serve duration</p>
                  </a>
                </Link>
                <Link href='#'>
                  <a className='px-4 py-6 text-center transition rounded-lg bg-primary hover:bg-grayMid'>
                    <h4 className='mb-1 text-2xl font-semibold text-white'>
                      {data?.noShow}
                    </h4>
                    <p className='text-sm text-gray-500'>No Show</p>
                  </a>
                </Link>
              </div>
            )}
          </div>
          <div className='col-span-12 lg:col-span-3'>
            {loading ? (
              <Loader customClass='inherit' />
            ) : (
              <div className='h-full p-5 bg-primary rounded-xl'>
                <div className='grid grid-cols-1 gap-8'>
                  <h3 className='font-semibold'>Visitor</h3>
                  {/* <Link href='#'>
                  <a class='flex-ver bg-greenBg rounded-full font-medium px-2.5 py-1 text-xs text-gray-900'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-4 h-4'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>{' '}
                    12%
                  </a>
                </Link> */}
                  <div className='relative'>
                    <p className='text-sm text-gray-400'>
                      {data?.visitors} total
                    </p>
                    <div className='w-full h-2 mt-3 rounded-full progress bg-grayMid'>
                      <div
                        className={
                          'h-2 rounded-full ' +
                          (data?.visitors === 0
                            ? ''
                            : data?.visitors > 50
                            ? 'w-full w-80per bg-greenBg'
                            : 'w-full w-50per bg-greenBg')
                        }></div>
                    </div>
                  </div>
                  <div className='relative'>
                    <p className='text-sm text-gray-400'>
                      {data?.newMembership} total
                    </p>
                    <div className='w-full h-2 mt-3 rounded-full progress bg-grayMid'>
                      <div
                        className={
                          'h-2 rounded-full ' +
                          (data?.newMembership === 0
                            ? ''
                            : data?.newMembership > 50
                            ? 'w-full w-80per bg-yellowBg'
                            : 'w-full w-50per bg-yellowBg')
                        }></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <Loader customClass='inherit' />
        ) : (
          <div className='bg-primary rounded-xl'>
            <div className='p-5'>
              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 lg:col-span-12'>
                  <div className='grid gap-3 lg:grid-cols-3 sm:grid-cols-2'>
                    {button.map((person, id) => (
                      <button
                      className={
                          'border-2 p-4 border-grayMid transition hover:bg-grayMid text-left rounded' +
                          (statusSelected === person.name
                            ? ' bg-grayMid'
                            : ' bg-primary')
                        }
                        key={id}
                        newStateSelected={newStateSelected}
                        onClick={e => {
                          e.preventDefault(), setStatusSelected(person.name)
                        }}>
                        <div className='flex items-center'>
                          <span className='w-6 h-6'>{person.icons}</span>
                          <h4 className='ml-3 text-2xl font-semibold text-white color-white'>
                            {person.number}
                          </h4>
                        </div>
                        <p className='mt-1 text-sm text-gray-500'>{person.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='p-5'>
              {statusSelected === 'New Customer' ? (
                <NewCustomerGraph data={data?.newCustomer} />
              ) : null}
              {statusSelected === 'Appointment' ? (
                <AppointmentGraph data={data?.appointment} />
              ) : null}
              {statusSelected === 'Revenue' ? (
                <RevenueGraph data={data?.revenue} />
              ) : null}
            </div>
          </div>
        )}
        {/* <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 lg:col-span-9'>
            <div className='flex items-center h-full transition rounded-lg bg-primary'>
              <div className='mx-4'>
                <TimeDistributionGraph />
              </div>
            </div>
          </div>
          <div className='grid col-span-12 gap-3 lg:col-span-3 sm:col-span-5'>
            <div className='px-4 py-6 transition rounded-lg bg-primary hover:bg-grayMid flex-bet'>
              <div>
                <h4 class='text-white text-2xl font-semibold mb-1'>
                  20<span class='text-sm font-normal'>min</span>
                </h4>
                <p class='text-sm text-gray-500'>Average wait time</p>
              </div>
              <Link href='#'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='#EFB100'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className='px-4 py-6 transition rounded-lg bg-primary hover:bg-grayMid flex-bet'>
              <div>
                <h4 class='text-white text-2xl font-semibold mb-1'>
                  36<span class='text-sm font-normal'>min</span>
                </h4>
                <p class='text-sm text-gray-500'>Longest Wait</p>
              </div>
              <Link href='#'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='27'
                    viewBox='0 0 26 27'
                    fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M10 0.0996094C6.1 0.0996094 3 3.19961 3 7.09961C3 9.49961 4.19961 11.7004 6.09961 12.9004C2.49961 14.3004 0 17.9 0 22H2C2 17.6 5.6 14 10 14C10.6 14 11.0996 14.0992 11.5996 14.1992C11.6249 14.1655 11.6542 14.1342 11.6835 14.103L11.6835 14.1029L11.6835 14.1029L11.6835 14.1029C11.7084 14.0763 11.7334 14.0496 11.7559 14.0215C10.6607 15.3907 10 17.1209 10 19C10 23.4 13.6 27 18 27C22.4 27 26 23.4 26 19C26 14.6 22.4 11 18 11C17.1119 11 16.2589 11.1535 15.459 11.4238C16.4225 10.2325 17 8.66694 17 7.09961C17 3.19961 13.9 0.0996094 10 0.0996094ZM10 2.00016C12.8 2.00016 15 4.20016 15 7.00016C15 9.80016 12.8 12.0002 10 12.0002C7.2 12.0002 5 9.80016 5 7.00016C5 4.20016 7.2 2.00016 10 2.00016ZM24 19.0002C24 15.7002 21.3 13.0002 18 13.0002C14.7 13.0002 12 15.7002 12 19.0002C12 22.3002 14.7 25.0002 18 25.0002C21.3 25.0002 24 22.3002 24 19.0002ZM12.498 13.2148C12.4118 13.2969 12.3279 13.3808 12.2457 13.4665C12.3274 13.381 12.4106 13.297 12.498 13.2148ZM12.1405 13.5781C12.1755 13.5407 12.2104 13.5034 12.2457 13.4665C12.2103 13.5034 12.1753 13.5406 12.1405 13.5781ZM17 19.5998V15.0002H19V20.4006L16.6992 22.6994L15.3008 21.3009L17 19.5998Z'
                      fill='#DC2626'
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className='px-4 py-6 transition rounded-lg bg-primary hover:bg-grayMid flex-bet'>
              <div>
                <h4 class='text-white text-2xl font-semibold mb-1'>
                  1<span class='text-sm font-normal'>min</span>
                </h4>
                <p class='text-sm text-gray-500'>Shortest Wait</p>
              </div>
              <Link href='#'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='22'
                    height='23'
                    viewBox='0 0 22 23'
                    fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M4 1V0H6V1H16V0H18V1H22V23H0V1H4ZM4 3H2V5H20V3H18V4H16V3H6V4H4V3ZM2 7H20V21H2V7ZM10 14.5625L15.2812 9.28125L16.7188 10.7188L10.7188 16.7188L10 17.4062L9.28125 16.7188L6.28125 13.7188L7.71875 12.2812L10 14.5625Z'
                      fill='#16A34A'
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className='px-4 py-6 transition rounded-lg bg-primary hover:bg-grayMid flex-bet'>
              <div>
                <h4 class='text-white text-2xl font-semibold mb-1'>
                  10<span class='text-sm font-normal'>min</span>
                </h4>
                <p class='text-sm text-gray-500'>Average serve time</p>
              </div>
              <Link href='#'>
                <a>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='#9333EA'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
      {/* <SelectMembership /> */}
    </>
  )
}

export default SuperAdmin
