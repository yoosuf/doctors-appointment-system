import React from 'react'
import routes from '@/utils/routes'
import withSession from '@/utils/session'
import AdminLayout from '@/components/Layout/AdminLayout'
import SuperAdmin from '@/components/Admin/Dashboard/Index'
import { USER_ROLE_TYPE } from '@/utils/constant'

const AdminDashboard = props => {
  return (
    <AdminLayout>
      <SuperAdmin />
    </AdminLayout>
  )
}

export default AdminDashboard

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx

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
  } else if (data?.token && data?.roleId?.code === USER_ROLE_TYPE.PATIENT) {
    return {
      redirect: {
        destination: routes.customerDashboard,
        permanent: false,
      },
    }
  } else if (data?.token && data?.roleId?.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
    return {
      redirect: {
        destination: routes.dashboard,
        permanent: false,
      },
    }
  }

  return {
    props: { user: data }, // just passing user data to use in components
  }
})
