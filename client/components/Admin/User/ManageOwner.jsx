import Sidebar from '@/components/Admin/User/Sidebar'
import useUserManagement from '@/components/Admin/User/hooks/useUserManagement'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { baseUrl, sidebarLogoUrl } from '@/utils/helper'
import ActiveIcon from '@/widget/image/ActiveIcon'
import EmailIcon from '@/widget/image/EmailIcon'
import PhoneIcon from '@/widget/image/PhoneIcon'
import ButtonIcon from 'icons/ButtonIcon'
import NoData from 'icons/NoData'
import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Availability from './Availability'
import Location from './Location'
import ManageAccount from './ManageAccount'
import Profile from './Profile'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ManageOwner = () => {
  const {
    loading,
    sidebarLoader,
    data,
    id,
    setData,
    setID,
    userData = {},
    setUserData,
    getInitialSideBarData,
    filterData,
    onChangeFilter,
    allChecked,
    setAllChecked,
    filterRemove,
    onClickApplyFilter,
    onChangeSearch,
    sendFilterData,
    paginator = {},
    changePaginator,
    showOnlyActive,
    setShowOnlyActive,
    setAllCheckedVerify,
    verifyData,
    onChangeVerifyFilter,
    allCheckedVerify,
  } = useUserManagement()
  const { roleId = {} } = userData

  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='xl:col-span-3 col-span-0 '>
          <Sidebar
            name='Manage Staff'
            loading={sidebarLoader}
            data={data}
            id={id}
            setID={setID}
            userData={userData}
            setUserData={setUserData}
            filterData={filterData}
            onChangeFilter={onChangeFilter}
            allChecked={allChecked}
            setAllChecked={setAllChecked}
            filterRemove={filterRemove}
            onClickApplyFilter={onClickApplyFilter}
            onChangeSearch={onChangeSearch}
            sendFilterData={sendFilterData}
            paginator={paginator}
            changePaginator={changePaginator}
            showOnlyActive={showOnlyActive}
            setShowOnlyActive={setShowOnlyActive}
            verifyData={verifyData}
            onChangeVerifyFilter={onChangeVerifyFilter}
            allCheckedVerify={allCheckedVerify}
            setAllCheckedVerify={setAllCheckedVerify}
          />
        </div>
        {JSON.stringify(data) === '{}' ? (
          <div className='flex items-center justify-center col-span-12 overflow-y-auto xl:col-span-9 details-sec'>
            <div className='text-2xl'>
              <div className='flex items-center justify-center'>
                <NoData />
              </div>
              <div>No Data Found</div>
            </div>
          </div>
        ) : (
          <div className='col-span-12 overflow-y-auto xl:col-span-9 details-sec'>
            <div className='p-4 border-b border-gray-500 manageowner-header sm:p-6 bg-primary '>
              <div className='grid flex-wrap items-center justify-between grid-cols-1 sm:flex'>
                <div className='flex items-center profile-main'>
                  <img
                    src={
                      userData?.profile_image?.uri
                        ? baseUrl + userData?.profile_image?.uri
                        : sidebarLogoUrl
                    }
                    className='object-cover w-16 h-16 mr-6 rounded-full'
                    alt='Snapcrack'
                  />

                  <div>
                    <div className='flex items-center main-per-name'>
                      <div className='flex items-center mr-3 text-xl font-semibold text-center'>
                        {userData?.firstName + ' ' + userData?.lastName}{' '}
                        {userData?.roleId?.name && (
                          <p className='ml-1 text-sm font-normal'>
                            (
                            {userData?.roleId?.name?.replace(
                              /[^a-zA-Z ]/g,
                              ' '
                            )}
                            )
                          </p>
                        )}
                      </div>
                      {userData?.isActive === true && <ActiveIcon />}
                    </div>
                    <div className='items-center main-per-detail lg:flex'>
                   


                      <div className='flex flex-col items-center mt-2 call'>
                      <span className='w-full mb-0 text-xs text-gray-500 uppercase'>Phone</span>
                      <span className='w-full text-gray-400'>
                        {userData?.phone}
                      </span>
                    </div>
                    
                    
                    <div className='flex flex-col items-center mt-2 call lg:ml-10'>
                      <span className='w-full mb-0 text-xs text-gray-500 uppercase'>Email</span>
                      <span className='w-full text-gray-400'>
                        {userData?.email}
                      </span>
                    </div>
                      
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className='p-4 UserManagementDetails sm:p-8'>
              {/* tabs */}
              <Tabs>
                <TabList className='flex w-full overflow-x-auto border-b border-gray-500'>
                  <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                    <a className='cursor-pointer'>Profile</a>
                  </Tab>
                  <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                    <a className='cursor-pointer'>Account</a>
                  </Tab>

                  {/* <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                    <Link href='#'>
                      <a>Files</a>
                    </Link>
                  </Tab>
                  <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                    <Link href='#'>
                      <a>Chart</a>
                    </Link>
                  </Tab> */}

                  <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                    <a className='cursor-pointer'>Location</a>
                  </Tab>

                  {roleId?.code === USER_ROLE_TYPE.CHIROPRACTOR && (
                    <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                      <a className='cursor-pointer'>Availability</a>
                    </Tab>
                  )}

                  {/* <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                    <Link href='#'>
                      <a>License</a>
                    </Link>
                  </Tab>
                  <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                    <Link href='#'>
                      <a>Billing</a>
                    </Link>
                  </Tab> */}
                </TabList>

                <TabPanel>
                  <Profile
                    id={id}
                    setID={setID}
                    setUserData={setUserData}
                    setData={setData}
                  />
                </TabPanel>
                <TabPanel>
                  <ManageAccount
                    id={id}
                    setID={setID}
                    setUserData={setUserData}
                    setData={setData}
                  />
                </TabPanel>

                {/* <TabPanel>
                  <ManageOwnerFiles />
                </TabPanel>
                <TabPanel>
                  <ManageOwnerChart />
                </TabPanel> */}

                <TabPanel>
                  <Location
                    locationIds={userData?.locationIds}
                    id={userData?.id}
                    userData={userData}
                    getInitialSideBarData={getInitialSideBarData}
                  />
                </TabPanel>

                {roleId?.code === USER_ROLE_TYPE.CHIROPRACTOR && (
                  <TabPanel>
                    <Availability id={id} disabled={true} />
                  </TabPanel>
                )}

                {/* <TabPanel>
                  <ManageOwnerLicense />
                </TabPanel>
                <TabPanel>
                  <ManageOwnerBilling />
                </TabPanel> */}
              </Tabs>
              {/* /tabs */}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ManageOwner
