import React from 'react'
import withSession from '@/utils/session'
import routes from '@/utils/routes'
import ManageOwner from '@/components/Admin/User/ManageOwner'
import { USER_ROLE_TYPE } from '@/utils/constant'
import AdminLayout from '@/components/Layout/AdminLayout'

const StaffManagement = props => {
  return (
    <AdminLayout>
      <ManageOwner />
    </AdminLayout>
  )
}

export default StaffManagement

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
