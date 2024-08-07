import { USER_ROLE_TYPE } from '@/utils/constant'
import routes from '@/utils/routes'
import withSession from '@/utils/session'
import React from 'react'

const AppointmentEditPageById = () => {
  return (
    <>
      <h1>Switch to edit or create based on checking the localstorage</h1>

      
    </>
  )
}

export default AppointmentEditPageById

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx

  const { data = {} } = req.session.get('user') || {}

  return {
    props: { user: data }, // just passing user data to use in components
  }
})
