import React from 'react'
import MasterAdmin from '@/components/Admin/Masterdata/MasterAdmin'
import withSession from '@/utils/session'
import routes from '@/utils/routes'
import { USER_ROLE_TYPE } from '@/utils/constant'
import AdminLayout from '@/components/Layout/AdminLayout'

const SystemdataManagement = () => {
  return (
    <AdminLayout>
      <div className=''>
        <div className='overflow-y-auto details-sec'>
          <MasterAdmin />
        </div>
      </div>
    </AdminLayout>
  )
}

export default SystemdataManagement

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx
  const { data = {} } = req.session.get('user') || {}

  // Redirect based on user token and role
  if (!data.token) {
    return { redirect: { destination: routes.sesson.new, permanent: false } }
  } else if (data.roleId?.code === USER_ROLE_TYPE.PATIENT) {
    return {
      redirect: { destination: routes.customerDashboard, permanent: false },
    }
  } else if (data.roleId?.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
    return { redirect: { destination: routes.dashboard, permanent: false } }
  }

  // Default return passing user data
  return { props: { user: data } }
})
