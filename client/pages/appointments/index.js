import { USER_ROLE_TYPE } from '@/utils/constant'
import routes from '@/utils/routes'
import withSession from '@/utils/session'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const AppointmentPage = () => {

  const router = useRouter()

  useEffect(() => {

    router.push(routes.customer.appointmentNew) 

  }, [router])

  return (
    <>
      <h1>Redirecting...</h1>
    </>
  )
}

export default AppointmentPage

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx

  const { data = {} } = req.session.get('user') || {}

  return {
    props: { user: data }, // just passing user data to use in components
  }
})
