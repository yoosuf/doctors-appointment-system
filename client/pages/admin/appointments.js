import React from 'react'
import EventAppointment from '@/components/Admin/Appointment/Appointment'
import AdminLayout from '@/components/Layout/AdminLayout'
import withSession from '@/utils/session'
import routes from '@/utils/routes'
import { USER_ROLE_TYPE } from '@/utils/constant'

const AppointmentManagement = () => {
  return (
    <AdminLayout>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 overflow-y-auto details-sec'>
          <EventAppointment />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AppointmentManagement

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx
  const { data = {} } = req.session.get('user') || {}

  // Redirect to login if no token is present
  if (!data.token) {
    return {
      redirect: {
        destination: routes.sesson.new,
        permanent: false,
      },
    }
  }

  // Redirect to customer dashboard if user role is PATIENT
  if (data.roleId?.code === USER_ROLE_TYPE.PATIENT) {
    return {
      redirect: {
        destination: routes.customerDashboard,
        permanent: false,
      },
    }
  }

  // Default return passing user data
  return { props: { user: data } }
})
