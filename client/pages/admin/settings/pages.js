import React from 'react'
import SettingSidebar from '@/components/profile-setting/SettingSidebar'
import withSession from '@/utils/session'
import routes from '@/utils/routes'
import { USER_ROLE_TYPE } from '@/utils/constant'
import Page from '@/components/Admin/Page/Page'
import AdminLayout from '@/components/Layout/AdminLayout'

const PageManagement = () => {
  return (
    <AdminLayout>
      <div className='grid grid-cols-12'>
        <div className='xl:col-span-3 col-span-0'>
          <SettingSidebar />
        </div>
        <div className='col-span-12 xl:col-span-9 details-sec'>
          <Page />
        </div>
      </div>
    </AdminLayout>
  )
}

export default PageManagement

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
