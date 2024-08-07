import React from 'react'
import SettingSidebar from '@/components/profile-setting/SettingSidebar'
import ProfileSetting from '@/components/profile-setting'
import routes from '@/utils/routes'
import withSession from '@/utils/session'
import AdminLayout from '@/components/Layout/AdminLayout'

const ProfileIndexPage = () => {
  return (
    <AdminLayout>
      <div className='grid grid-cols-12'>
        <div className='xl:col-span-3 col-span-0'>
          <SettingSidebar />
        </div>
        <div className='col-span-12 xl:col-span-9 details-sec '>
          <ProfileSetting />
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProfileIndexPage

// export const getServerSideProps = withSession(async ctx => {
//   const { req } = ctx

//   const { data = {} } = req.session.get('user') || {};

//     // Redirect to login if no token is present
//     if (!data.token) {
//       return {
//         redirect: {
//           destination: routes.sesson.new,
//           permanent: false,
//         },
//       };
//     }

//     if (data.roleId?.code === USER_ROLE_TYPE.PATIENT) {
//       return {
//         redirect: {
//           destination: routes.customerDashboard,
//           permanent: false,
//         },
//       };
//     }

//   return {
//     props: { user: data },
//   }
// })
