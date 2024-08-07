import { baseUrl, sidebarLogoUrl } from '@/utils/helper'
import ActiveIcon from '@/widget/image/ActiveIcon'
import Loader from '@/widget/loader'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import UserManagementAccount from './CustomerAccount'
import UserManagementActivity from './CustomerActivity'
import UserManagementChart from './CustomerChart'
import UserManagementFiles from './CustomerFiles'
import UserManagementInvoice from './CustomerInvoice'
import UserManagementMembership from './CustomerMembership'
import IdentiyContainer from './IdentiyContainer'
import UserManagementBilling from './CustomerBilling'
import Profile from './CustomerProfile'
import UserHistory from './CustomerHistory'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import { formattedMembershipObj } from '@/utils/membership'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const UserManagement = ({
  id,
  userData = {},
  setUserData = () => {},
  customerData = [],
  setCustomerData = () => {},
  setID = () => {},
  membershipPlans,
  loading,
}) => {
  const membershipData = formattedMembershipObj(userData?.membership)

  return (
    <>
      {loading ? (
        <div className='p-6 border-b border-gray-500 userManagement-header bg-primary '>
          {' '}
          <Loader customClass='inherit' />{' '}
        </div>
      ) : JSON.stringify(userData) === '{}' ? (
        <div className='flex items-center justify-center details-sec'>
          <div>
            <div className=''>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-28 w-28'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
              </svg>
            </div>
            <div className='flex items-center justify-center'>
              <p className='text-2xl'>No Data Found</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='p-4 border-b border-gray-500 userManagement-header sm:p-6 bg-primary '>
            <div className='flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center'>
              <div className='flex items-center mb-3 profile-main'>
                <img
                  src={
                    userData.profile_image?.uri
                      ? baseUrl + userData.profile_image?.uri
                      : sidebarLogoUrl
                  }
                  className='object-cover w-16 h-16 mr-4 rounded-full sm:mr-6'
                  alt='Snapcrack'
                />
                <div>
                  <div className='flex items-center main-per-name'>
                    <h3 className='mr-3 text-xl font-semibold'>
                      {userData.firstName + ' ' + userData.lastName}
                    </h3>
                    {userData.purchasedPlans?.orderId?.planAccess ? (
                      <ActiveIcon />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className='items-center main-per-detail lg:flex'>
                    <div className='flex flex-col items-center mt-2 call'>
                      <span className='w-full mb-0 text-xs text-gray-500 uppercase'>
                        Phone
                      </span>
                      <span className='w-full text-gray-400'>
                        {userData?.phone}
                      </span>
                    </div>

                    <div className='flex flex-col items-center mt-2 call lg:ml-10'>
                      <span className='w-full mb-0 text-xs text-gray-500 uppercase'>
                        Email
                      </span>
                      <span className='w-full text-gray-400'>
                        {userData?.email}
                      </span>
                    </div>

                    {userData.addressIds?.[0]?.address ? (
                      <div className='flex flex-col items-center mt-2 call lg:ml-10'>
                        <span className='w-full mb-0 text-xs text-gray-500 uppercase'>
                          Address
                        </span>
                        <span className='w-full text-gray-400'>
                          <p className='text-gray-400 '>
                            {(userData.addressIds?.[0]?.address?.provinceNm
                              ? userData.addressIds?.[0]?.address?.provinceNm
                              : '') +
                              (userData.addressIds?.[0]?.address?.countryId
                                ?.name
                                ? ', ' +
                                  userData.addressIds?.[0]?.address?.countryNm
                                : '')}
                          </p>
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-5 mt-5 lg:grid-cols-4 sm:grid-cols-2'>
              {membershipData.categories?.map((plan = {}) => (
                <a
                  key={plan._id}
                  className='noselect px-4 p-2.5 sm:p-4 flex flex-col gap-1 bg-grayMid transition hover:bg-grayLight rounded-lg'>
                  <h4 className='text-2xl font-semibold text-white'>
                    {plan.remainingQuota}
                  </h4>
                  <p className='text-sm text-gray-500'>Remaining {plan.name}</p>
                </a>
              ))}

              {userData.createdAt && (
                <a className='px-4 p-2.5 sm:p-4 flex flex-col gap-1 noselect bg-grayMid transition hover:bg-grayLight rounded-lg'>
                  <h4 className='text-2xl font-semibold text-white'>
                    {moment(userData.createdAt).format('yyyy')}
                  </h4>
                  <p className='text-sm text-gray-500'>Member Since</p>
                </a>
              )}
            </div>
          </div>
          <div className='p-4 UserManagementDetails sm:p-8'>
            {/* tabs */}

            <Tabs>
              <TabList className='flex w-full overflow-x-auto border-b border-gray-500'>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>Profile</span>
                </Tab>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>Account</span>
                </Tab>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>Identity </span>
                </Tab>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>Activity</span>
                </Tab>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>Chart</span>
                </Tab>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>Files</span>
                </Tab>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>Membership</span>
                </Tab>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>Billing</span>
                </Tab>
                <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                  <span className='cursor-pointer'>History</span>
                </Tab>
              </TabList>

              <TabPanel>
                <Profile
                  id={id}
                  setUserData={setUserData}
                  customerData={customerData}
                  setCustomerData={setCustomerData}
                  setID={setID}
                />
              </TabPanel>
              <TabPanel>
                <UserManagementAccount id={id} />
              </TabPanel>
              <TabPanel>
                <IdentiyContainer id={id} />
              </TabPanel>
              <TabPanel>
                <UserManagementActivity id={id} />
              </TabPanel>
              <TabPanel>
                <UserManagementChart id={id} userData={userData} />
              </TabPanel>
              <TabPanel>
                <UserManagementFiles id={id} />
              </TabPanel>
              <TabPanel>
                <UserManagementMembership
                  id={id}
                  userData={userData}
                  userRole={getUser()?.roleId?.code}
                />
              </TabPanel>
              <TabPanel>
                <UserManagementInvoice id={id} />
              </TabPanel>
              <TabPanel>
                <UserHistory id={id} setUserData={setUserData} />
              </TabPanel>
            </Tabs>
            {/* /tabs */}
          </div>
        </>
      )}
    </>
  )
}

export default UserManagement
