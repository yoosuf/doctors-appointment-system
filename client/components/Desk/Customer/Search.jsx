import React, { useEffect, useState } from 'react'
import useCustomerSearch from '@/components/Admin/User/hooks/useCustomerSearch'
import useCustomerActivity from '@/components/Admin/Customer/hooks/useCustomerActivity'
import useCustomerChartList from '@/components/Admin/Customer/hooks/useCustomerChartList'
import useMedicalAlertAndNote from '@/components/Admin/Customer/hooks/useMedicalAlertAndNote'
import useProfileCustomer from '@/components/Admin/User/hooks/useProfileCustomer'
import Loader from '@/widget/loader'
import ActiveIcon from '@/widget/image/ActiveIcon'
import EmailIcon from '@/widget/image/EmailIcon'
import PhoneIcon from '@/widget/image/PhoneIcon'
import moment from 'moment'
import { baseUrl, sidebarLogoUrl } from '@/utils/helper'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import UserManagementActivity from '@/components/Admin/Customer/CustomerActivity'
import UserManagementChart from '@/components/Admin/Customer/CustomerChart'
import UserManagementFiles from '@/components/Admin/Customer/CustomerFiles'
import UserManagementMembership from '@/components/Admin/Customer/CustomerMembership'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { getUser } from '@/utils/localStorage'
import DatePickerField from '@/components/AppUi/Form/DatePickerField'
import { InputField } from '@/components/AppUi/Form/InputField'
import PatientAlertTabPanel from '@/components/Admin/Customer/PatientAlertTabPanel'
import PatientVisitTabPanel from '@/components/Admin/Customer/PatientVisitTabPanel'
import useAppointmentHistory from '@/components/Desk/Appointment/hooks/useAppointmentHistory'
import MimimalProfile from '@/components/Admin/Customer/MimimalProfile'
import UserManagementVisit from '@/components/Admin/Customer/Visit'
import Avatar from '@/components/AppUi/User/Avatar'
import { formattedMembershipObj } from '@/utils/membership'

const SearchUser = () => {
  const {
    formik,
    setDob,
    dob,
    id,
    setId,
    loading,
    searchResultData = {},
    setSearchResultData = () => {},
    onClickSubmit,
    membershipPlans,
  } = useCustomerSearch()

  const { onBoardingDetail, onBoardingAnswer } = useProfileCustomer({
    id,
  })

  const { loading: loader, activityList } = useCustomerActivity({ id })

  const { loading: chartLoader, chartList } = useCustomerChartList({ id })

  const { notes = [] } = useMedicalAlertAndNote({ id })

  const {
    weight,
    height = {},
    emergencyContact,
    refferalInformation = {},
    aggravates,
    painScale,
    visitReason,
    discomfort,
  } = onBoardingDetail

  const membershipData = formattedMembershipObj(searchResultData?.membership)

  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='xl:col-span-3 col-span-0'>
          <>
            <div className='relative hidden border-r border-gray-500 chat-sidebar bg-primary xl:block'>
              <div className='px-4 py-6 border-b border-gray-500 chat-sidebar-header'>
                <h3 className='text-lg font-semibold'>Search a customer</h3>
                {/* <p className='text-gray-400'>Search a customer by Full Name and Date of Birth</p> */}
              </div>

              <div className='px-4 py-6'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='grid gap-4 mt-4 sm:grid-cols-2'>
                    <div>
                      <InputField
                        id='firstName'
                        label='First name'
                        placeholder={`First name`}
                        required={true}
                        formik={formik}
                        customClass={`sm:col-span-12 col-span-12`}
                        type='text'
                      />
                    </div>

                    <div>
                      <InputField
                        id='lastName'
                        label='Last name'
                        placeholder={`Last name`}
                        required={true}
                        formik={formik}
                        customClass={`sm:col-span-12 col-span-12`}
                        type='text'
                      />
                    </div>
                  </div>

                  <DatePickerField
                    id='dob'
                    dateFormat='MM-dd-yyyy'
                    label={`Date of Birth`}
                    required={true}
                    date={dob}
                    setDate={setDob}
                    formik={formik}
                    placeholder={`Date of birth mm-dd-yyyy`}
                    customClass={` col-span-12 mt-4 sm:col-span-12`}
                  />

                  <div className='w-full col-span-12 my-2 mt-4 border-b border-gray-500 line'></div>
                  <div className='flex items-center justify-center w-full col-span-12 mt-3 buttons'>
                    <button
                      type='submit'
                      className='block w-full px-4 py-2 text-sm font-medium text-center text-black transition rounded-md bg-yellowBg hover:bg-yellow-400'>
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        </div>
        <div className='col-span-12 overflow-y-auto xl:col-span-9 details-sec'>
          <>
            {/* RESULT */}

            {/* {JSON.stringify(searchResultData)} */}

            <>
              {loading ? (
                <div className='p-6 border-b border-gray-500 userManagement-header bg-primary '>
                  {' '}
                  <Loader customClass='inherit' />{' '}
                </div>
              ) : JSON.stringify(searchResultData) === '{}' ? (
                <div className='flex items-center justify-center details-sec'>
                  <div>
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-28 w-28'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
                      </svg>
                    </>
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
                        <Avatar
                          imageUrl={searchResultData?.profile_image?.uri}
                          size={`h-16 w-16 mr-4 sm:mr-6 object-cover`}
                          userType={`Patient`}
                        />

                        <div>
                          <div className='flex items-center main-per-name'>
                            <h3 className='mr-3 text-xl font-semibold'>
                              {searchResultData?.fullName }
                            </h3>

                            {searchResultData?.subscription?.isSubscribed && (
                              <ActiveIcon />
                            )}
                          </div>

                          {(getUser()?.roleId?.code === USER_ROLE_TYPE.ADMIN ||
                            getUser()?.roleId?.code ===
                              USER_ROLE_TYPE.SUPER_ADMIN ||
                            getUser()?.roleId?.code ===
                              USER_ROLE_TYPE.SUPER_ADMIN) && (
                            <>
                              <div className='items-center main-per-detail lg:flex'>
                                <div className='flex items-center mt-2 call'>
                                  <PhoneIcon />
                                  <a className='ml-2 text-gray-400'>
                                    {searchResultData?.phone}
                                  </a>
                                </div>
                                <div className='flex items-center mt-2 mail lg:ml-5'>
                                  <EmailIcon />
                                  <a className='ml-2 text-gray-400'>
                                    {searchResultData?.email}
                                  </a>
                                </div>
                                {searchResultData?.addressIds?.[0]?.address ? (
                                  <div className='flex items-center mt-2 mail lg:ml-5'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      className='w-5 h-5'
                                      viewBox='0 0 20 20'
                                      fill='#9CA3AF'>
                                      <path
                                        fillRule='evenodd'
                                        d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                    <p className='ml-2 text-gray-400'>
                                      {(searchResultData?.addressIds?.[0]
                                        ?.address?.provinceNm
                                        ? searchResultData?.addressIds?.[0]
                                            ?.address?.provinceNm
                                        : '') +
                                        (searchResultData?.addressIds?.[0]
                                          ?.address?.countryId?.name
                                          ? ', ' +
                                            searchResultData?.addressIds?.[0]
                                              ?.address?.countryNm
                                          : '')}
                                    </p>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 gap-5 mt-5 lg:grid-cols-4 sm:grid-cols-2'>
                      {membershipData?.categories?.map((plan = {}) => (
                        <a
                          key={plan.name}
                          className='noselect px-4 p-2.5 sm:p-4 flex flex-col gap-1 bg-grayMid transition hover:bg-grayLight rounded-lg'>
                          <h4 className='text-2xl font-semibold text-white'>
                            {plan.remainingQuota}
                          </h4>
                          <p className='text-sm text-gray-500'>
                            Remaining {plan.name}
                          </p>
                        </a>
                      ))}

                      {searchResultData?.createdAt && (
                        <a className='px-4 p-2.5 sm:p-4 flex flex-col gap-1 noselect bg-grayMid transition hover:bg-grayLight rounded-lg'>
                          <h4 className='text-2xl font-semibold text-white'>
                            {moment(searchResultData?.createdAt).format('yyyy')}
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
                          <span className='cursor-pointer'>Activity</span>
                        </Tab>

                        <Tab className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                          <span className='cursor-pointer'>Visits</span>
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
                      </TabList>

                      <TabPanel>
                        <MimimalProfile
                          searchResultData={searchResultData}
                          activityList={activityList}
                          height={height}
                          weight={weight}
                          notes={notes}
                          chartList={chartList}
                          emergencyContact={emergencyContact}
                          visitReason={visitReason}
                          discomfort={discomfort}
                          refferalInformation={refferalInformation}
                          aggravates={aggravates}
                          painScale={painScale}
                          onBoardingAnswer={onBoardingAnswer}
                          loader={loader}
                          chartLoader={chartLoader}
                        />
                      </TabPanel>

                      <TabPanel>
                        <UserManagementActivity id={id} />
                      </TabPanel>

                      <TabPanel>
                        <UserManagementVisit id={id} />
                      </TabPanel>
                      <TabPanel>
                        <UserManagementChart
                          id={id}
                          userData={searchResultData}
                        />
                      </TabPanel>
                      <TabPanel>
                        <UserManagementFiles id={id} />
                      </TabPanel>
                      <TabPanel>
                        <UserManagementMembership
                          id={id}
                          userRole={getUser()?.roleId?.code}
                          userData={searchResultData}
                        />
                      </TabPanel>
                    </Tabs>
                    {/* /tabs */}
                  </div>
                </>
              )}
            </>

            {/* END RESULT */}
          </>
        </div>
      </div>
    </>
  )
}

export default SearchUser
