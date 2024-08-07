import routes from '@/utils/routes'
import withSession from '@/utils/session'
import React from 'react'
import IdentityDocs from '@/components/Auth/Register/IdentityDocs'
import { USER_ROLE_TYPE } from '@/utils/constant'


export default function RegisterIdentityDocsPage({ user }) {
  return (
    <>
      <IdentityDocs />
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
