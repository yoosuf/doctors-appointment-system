import React from 'react'
import routes from '@/utils/routes'
import withSession from '@/utils/session'
import { USER_ROLE_TYPE } from '@/utils/constant'
import UserIndex from '@/components/Admin/Customer/UserIndex'
import AdminLayout from '@/components/Layout/AdminLayout'

const CustomerManagement = () => {
  return (
    <AdminLayout>
      <UserIndex />
    </AdminLayout>
  )
}
export default CustomerManagement

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
