import React from 'react'
import AppointmentConfirmation from '@/components/Customer/Appointment/AppointmentConfirmation'
import withSession from '@/utils/session'
import { USER_ROLE_TYPE } from '@/utils/constant'
import routes from '@/utils/routes'
import BlankLayout from '@/components/Layout/BlankLayout'
import commonApi from '@/api/common'

const AppointmentConfirmPage = ({ user, services }) => {
  return (
    <BlankLayout userData={user}>
      <AppointmentConfirmation user={user} services={services} />
    </BlankLayout>
  )
}

export default AppointmentConfirmPage

export const getServerSideProps = withSession(async context => {
  const { req } = context

  const { data = {} } = req.session.get('user') || {}

  if (!data?.token) {
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

  const serviceData = {
    query: {
      isActive: true,
    },
    options: {
      select: ['price', 'timeDuration', 'name', 'id', 'categoryId'],
      populate: ['categoryId'],
      pagination: false,
    },
  }

  try {
    const [userProfile, servicesArr] = await Promise.all([
      commonApi({
        action: 'getPatientObject',
        config: { tempToken: data?.token },
      }),

      commonApi({
        action: 'findAllServicesOfPatient',
        data: serviceData,
        config: { tempToken: data?.token },
      }),
    ])


    return {
      props: {
        user: userProfile,
        services: servicesArr,
      },
    }
  } catch (error) {
    if (error?.response && error?.response?.status === 401) {
      console.error('Unauthorized access. Please log in.')
      return {
        redirect: {
          destination: routes.sesson.new,
          permanent: false,
        },
      }
    }

    return {
      redirect: {
        destination: routes.sesson.new,
        permanent: false,
      },
    }
  }
})
