import React from 'react'
import SettingSidebar from '@/components/profile-setting/SettingSidebar'
import Header from '@/components/Layout/Header/Header'
import Sidebar from '@/components/Layout/sidebar/Sidebar'
import RatingReview from '@/components/profile-setting/rating-and-review'
import withSession from '@/utils/session'

const RatingAndReviewComponent = () => {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='w-full'>
          <Header />
          <div className='grid grid-cols-12'>
            <div className='xl:col-span-3 col-span-0'>
              <SettingSidebar />
            </div>
            <div className='col-span-12 xl:col-span-9 details-sec '>
              <RatingReview />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default RatingAndReviewComponent

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx

  const { data = {} } = req.session.get('user') || {}

  if (!data.token) {
    // if user not found or user's role is not admin then redirecting to login page
    return {
      redirect: {
        destination: routes.sesson.new,
        permanent: false,
      },
    }
  } else if (data.token && data.roleId?.code === USER_ROLE_TYPE.PATIENT) {
    return {
      redirect: {
        destination: routes.customerDashboard,
        permanent: false,
      },
    }
  }

  return {
    props: { user: data }, // just passing user data to use in components
  }
})