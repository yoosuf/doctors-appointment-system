import React from 'react'
import FrontDeskDashboard from '@/components/Desk/Dashboard/Dashboard'
import routes from '@/utils/routes'
import withSession from '@/utils/session'
import AdminLayout from '@/components/Layout/AdminLayout'
import { USER_ROLE_TYPE } from '@/utils/constant'
import commonApi from '@/api/common'

const DeskDashboardPage = ({user, services}) => {
  return (
    <AdminLayout user={user}>
      <FrontDeskDashboard user={user} services={services} />
    </AdminLayout>
  )
}

export default DeskDashboardPage

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx;
  const { data = {} } = req.session.get('user') || {};

  // Redirect to login if no token is present
  if (!data.token) {
    return {
      redirect: {
        destination: routes.sesson.new,
        permanent: false,
      },
    };
  } else if (data.roleId?.code === USER_ROLE_TYPE.PATIENT) {
    return {
      redirect: {
        destination: routes.customerDashboard,
        permanent: false,
      },
    };
  } else if (data.roleId?.code === USER_ROLE_TYPE.SUPER_ADMIN) {
    return {
      redirect: {
        destination: routes.dashboard,
        permanent: false,
      },
    };
  }


  const [servicesArr] = await Promise.all([
    // commonApi({
    //   action: 'getTenantUserProfile',
    //   config: { tempToken: data?.token },
    // }),
    commonApi({
      action: 'getTenantServices',
      config: { tempToken: data?.token },
    }),
  ])



  // Default return passing user data
  return { props: { user: data, services: servicesArr } };
});
