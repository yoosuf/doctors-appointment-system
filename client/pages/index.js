import React from 'react'
import routes from '@/utils/routes'
import withSession from '@/utils/session'
import { USER_ROLE_TYPE } from '@/utils/constant'

import commonApi from '@/api/common'
import AppLayout from '@/components/Layout/AppLayout'
import HomeCustomer from '@/components/Customer'
import { APPOINTMENT_CHART_TYPE } from '@/utils/constant'
import 'react-calendar/dist/Calendar.css'
import 'react-tabs/style/react-tabs.css'

const Home = ({
  user,
  location,
  userData,
  templateChartData,
  listChartData,
  patientFileData,
  cardData,
  membershipList, 
}) => {
  return (
    <AppLayout userData={userData}>
      <HomeCustomer
        user={user}
        location={location}
        userData={userData}
        templateChartData={templateChartData}
        cardData={cardData}
        listChartData={listChartData}
        patientFileData={patientFileData}
        membershipList={membershipList}
      />
    </AppLayout>
  )
}

export default Home

export const getServerSideProps = withSession(async ctx => {
  try {
    const { req } = ctx

    const { data = {} } = req.session.get('user') || {}
    const { locationIds = [] } = req.session.get('location') || []

    // session related redirects
    if (!data?.token) {
      // if user not found or user's role is not admin then redirecting to login page
      return {
        redirect: {
          destination: routes.sesson.new,
          permanent: false,
        },
      }
    } else if (
      data?.token &&
      (data?.roleId?.code === USER_ROLE_TYPE.NURSE ||
        data?.roleId?.code === USER_ROLE_TYPE.CHIROPRACTOR)
    ) {
      return {
        redirect: {
          destination: routes.deskWaitlist,
          permanent: false,
        },
      }
    } else if (data?.token && data?.roleId?.code !== USER_ROLE_TYPE.PATIENT) {
      return {
        redirect: {
          destination: routes.dashboard,
          permanent: false,
        },
      }
    }


    const templateData = {
      query: {
        type: APPOINTMENT_CHART_TYPE.SOAP,
      },
      options: {
        sort: {
          createdAt: -1,
        },
        select: [],
      },
      isCountOnly: false,
    }

    const chartData = {
      query: {
        patientId: data?.id,
        patientVisible: true,
      },
      options: {
        select: [],
        collation: '',
        sort: {
          pinned: -1,
          createdAt: -1,
        },
        populate: [
          'created_at',
          {
            path: 'creatorId',
            populate: [
              {
                path: 'profile_image',
              },
            ],
          },
          {
            path: 'patientId',
          },
        ],
        pagination: true,
      },
      isCountOnly: false,
    }

    const fileData = {
      query: {
        isDeleted: false,
        patientId: data.id,
      },
      options: {
        select: [],
        sort: {
          createdAt: -1,
        },
        limit: 20,
        pagination: true,
      },
    }



    /**
     * End of payload
     */

    const userData = await commonApi({
      action: 'getPatientObject',
      config: { tempToken: data?.token },
    })

    // console.log(`userData FROM PAGES`, userData)

    // const userData = await commonApi({
    //   action: 'getPatientObject',
    //   config: { tempToken: data?.token },
    // })

    const templateChartData = await commonApi({
      action: 'findChartTemplate',
      data: { ...templateData },
      config: { tempToken: data?.token },
    })

    const listChartData = await commonApi({
      action: 'findPatientAppointmentChart',
      data: { ...chartData },
      config: { tempToken: data?.token },
    })

    const patientFileData = await commonApi({
      action: 'findPatientFile',
      data: { ...fileData },
      config: { tempToken: data?.token },
    })

    const membershipListdata = {
      query: {
        isDeleted: false,
      },
      options: {
        select: [],
        pagination: false,
        populate: [
          {
            path: 'categories',
            populate: ['_id'],
          },
        ],
      },
    }


    //Shop
    const userLocationIds = userData.locationIds
    const getLocation = () => {
      return {
        locationIds: {
          $in: userLocationIds.map((x = {}) => x._id),
        },
      }
    }

    const getMatchLocation = () => {
      return {
        match: {
          locationId: {
            $in: userLocationIds.map((x = {}) => x._id),
          },
        },
      }
    }
    const value = getLocation()
    const location = getMatchLocation()


    //Billing
    const cardData = await commonApi({
      action: 'cardList',
      config: { tempToken: data?.token },
    })

    const membershipList = await commonApi({
      action: 'patientMembershipList',
      data: {...membershipListdata}, 
      config: { tempToken: data?.token },
    })

    // console.log(`##################################### membershipList`, membershipList.DATA.data)

    //   const getLocationQuery = () => {
    //    // const { roleId = {}, locationIds = [] } = getUser()
    //     if (data?.roleId?.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
    //       return {
    //         locationId: {
    //           $in: userLocationIds.map((l = {}) => l._id),
    //         },
    //       }
    //     }
    //   }

    //   const locationData = {
    //     query: {
    //       // isDeleted: false,
    //     },
    //     options: {
    //       select: [],
    //       sort: {
    //         createdAt: -1,
    //       },
    //     },
    //   }
    //   const locationsData = await commonApi({ action: "findAllLocation", data:{...locationData}, config: { tempToken: data?.token } })

    // const membershipData = await commonApi({
    //   action: 'getPatientUser',
    //   data: { ...sendQuery },
    //   parameters: [data?.id],
    //   config: { tempToken: data?.token },
    // })

    return {
      props: {
        user: data,
        location: locationIds,
        userData: userData,
        listChartData: listChartData,
        templateChartData: templateChartData,
        patientFileData: patientFileData,
        cardData: cardData,
        membershipList: membershipList?.DATA?.data,
        // membershipData: membershipData,
      }, // just passing user data to use in components
    }
  } catch (error) {
    console.error('error:', error)

    return {
      redirect: {
        destination: routes.sesson.new,
        permanent: false,
      },
    }
  }
})
