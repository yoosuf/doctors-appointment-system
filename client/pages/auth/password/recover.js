import React from 'react'
import ForgotPassword from '@/components/Auth/Password/ForgotPassword'
import withSession from '@/utils/session'
import routes from '@/utils/routes'
import { USER_ROLE_TYPE } from '@/utils/constant'

export default function PasswordRecoverPage() {
  return (
    <>
      <ForgotPassword />
    </>
  )
}

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx

  const { data = {} } = req.session.get('user') || {}

  if (data?.token && data?.roleId?.code === USER_ROLE_TYPE.PATIENT) {
    return {
      redirect: {
        destination: routes.customerDashboard,
        permanent: false,
      },
    }
  } else if (data?.token && data?.roleId?.code !== USER_ROLE_TYPE.PATIENT) {
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
