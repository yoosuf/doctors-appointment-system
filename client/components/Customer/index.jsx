import {
  baseUrl,
  appointmentDateTime,
  eventTime,
  appointmentTime,
  formatDate,
  timeDisplay,
} from '@/utils/helper'
import routes from '@/utils/routes'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import InfoRequire from '@/components/Customer/InfoRequireModal'
import BillingHome from '@/components/Customer/Billing/Billing'
import ChartHome from '@/components/Customer/Profile/Chart'
import PatientHome from '@/components/Customer/Profile/ProfileIndex'
import MembershipHome from '@/components/Customer/Membership/Membership'
import Notification from '@/components/Customer/Notification/Notification'
import PatientAccount from '@/components/Customer/Profile/PatientAccount'
import PatientFiles from '@/components/Customer/Profile/PatientFiles'
import { REDIRECT_ONBOARDING, CUSTOMER_ORDER_TYPE } from '@/utils/constant'
import AppointmentList from '@/components/Customer/Appointment/AppointmentList'
import UserProfileCard from '@/components/Customer/Profile/UserProfileCard'
import MedicalHistoryAlert from '@/components/Customer/MedicalHistoryAlert'
import AppointmentCalendar from '@/components/Customer/Appointment/AppointmentCalendar'
import useAppointmentList from '@/components/Customer/Appointment/hooks/useAppointmentList'
import InvitationModel from './Membership/InvitationModel'


const HomeCustomer = ({
  location,
  userData,
  templateChartData,
  listChartData,
  patientFileData,
  cardData,
  membershipList,
}) => {

  
  const router = useRouter()

  const {
    listsData = [],
    value,
    onChange,
    selectedList,
    calendarDate,
    setCalendarDate,
  } = useAppointmentList(userData)

  const [user, setUser] = useState(userData || {})
  const [calendarData, setCalendarData] = useState([])
  const [onBordProg, setOnBordProg] = useState(userData?.onboardProgress)

  useEffect(() => {
    let tempListData = listsData?.map(templist =>
      templist?.appointmentId?.fromDateTime
        ? {
            date: templist?.appointmentId?.fromDateTime,
            type: templist?.orderType,
          }
        : {
            date: templist?.appointmentId?.appointmentDate,
            type: templist?.orderType,
          }
    )
    setCalendarData(tempListData)
  }, [listsData])

  const infoRequireModalOpen = () => {
    const InfoRequireModal = document.getElementById('InfoRequireModal')
    InfoRequireModal.dataset.onBordProg = onBordProg
    InfoRequireModal.classList.add('active')
  }


  
  const goToOnboarding = () => {
    if (onBordProg === 0) {
      Router.push(routes[REDIRECT_ONBOARDING[0]])
    } else {
      const progress = (onBordProg / 100) * 5
      const redProg = Math.round(progress)
      Router.push(routes[REDIRECT_ONBOARDING[redProg]])
    }
  }
  useEffect(() => {
    if (router.isReady) {
      if (router.query.isError) {
        router.replace(routes.customerDashboard)
      } else if (onBordProg < 100) {
        infoRequireModalOpen()
      }
    }
  }, [onBordProg, router.isReady])

  const tabConfig = [
    {
      title: 'Profile',
      component: PatientHome,
      props: { userData, setUser, user, location },
    },
    { title: 'Account', component: PatientAccount, props: { userData } },
    { title: 'Visits', component: AppointmentList, props: { userData } },
    { title: 'Notifications', component: Notification, props: { userData } },
    {
      title: 'Chart',
      component: ChartHome,
      props: { userData, templateChartData, listChartData },
    },
    {
      title: 'Files',
      component: PatientFiles,
      props: { userData, patientFileData },
    },
    {
      title: 'Membership',
      component: MembershipHome,
      props: {
        userData,
        membershipList,
        cardDetails: cardData,
      },
    },
    { title: 'Billing', component: BillingHome, props: { user, cardData } },
  ]

  return (
    <>
      <div className='my-8 home-customer'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-12 lg:col-span-8'>
              <MedicalHistoryAlert
                onBordProg={onBordProg}
                goToOnboarding={goToOnboarding}
              />

              <UserProfileCard userObj={userData} />

              <Tabs>
                <TabList className='flex w-full mb-6 overflow-x-auto border-b border-gray-500 horizontal-scrollbar'>
                  {tabConfig.map(({ title }) => (
                    <Tab
                      key={title}
                      className='inline-block px-4 py-2 text-gray-500 bg-transparent'>
                      <span className='cursor-pointer'>{title}</span>
                    </Tab>
                  ))}
                </TabList>

                {tabConfig.map(({ component: Component, props }, index) => (
                  <TabPanel key={index}>
                    <Component {...props} />
                  </TabPanel>
                ))}
              </Tabs>
            </div>
            <div className='col-span-12 lg:col-span-4'>
              <AppointmentCalendar
                listsData={listsData}
                selectedList={selectedList}
                timeDisplay={timeDisplay}
                onChangeDate={onChange}
              />
            </div>
          </div>
        </div>
      </div>

      <InfoRequire />

      <InvitationModel userData={userData}  />
    </>
  )
}

export default HomeCustomer
