import React from 'react'
import StaffView from '@/components/Admin/Dashboard/staffView'
import withSession from '@/utils/session'
import AdminLayout from '@/components/Layout/AdminLayout'

const StaffViewComponent = () => {
  return (
    <AdminLayout>
      <StaffView />
    </AdminLayout>
  )
}

export default StaffViewComponent

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
