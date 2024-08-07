import { USER_ROLE_TYPE } from '@/utils/constant'
import routes from '@/utils/routes'
import withSession from '@/utils/session'
import React from 'react'
import commonApi from '@/api/common'
import AppointmentForm from '@/components/Customer/Appointment/AppointmentForm'
import BlankLayout from '@/components/Layout/BlankLayout'

const AppointmentNewPage = ({ user, appointment, services }) => {
  return (
    <>
      <BlankLayout userData={user}>
        <AppointmentForm
          user={user}
          appointment={appointment}
          services={services}
        />
      </BlankLayout>
    </>
  )
}

export default AppointmentNewPage

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

  try {
    const [userProfile, appointmentObj, servicesArr] = await Promise.all([
      commonApi({
        action: 'getPatientObject',
        config: { tempToken: data?.token },
      }),
      commonApi({
        action: 'customerAppointment',
        config: { tempToken: data?.token },
      }),
      commonApi({
        action: 'findAllServicesOfPatient',
        config: { tempToken: data?.token },
      }),
    ])

    // console.log('User profile:', userProfile)
    // console.log('Appointment object:', appointmentObj)
    // console.log('Services array:', servicesArr)

    return {
      props: {
        user: userProfile,
        appointment: appointmentObj,
        services: servicesArr,
      },
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Please log in.')
      return {
        redirect: {
          destination: routes.sesson.new,
          permanent: false,
        },
      }
    } else {
      console.error('An error occurred:', error.message)
    }
  }
})
