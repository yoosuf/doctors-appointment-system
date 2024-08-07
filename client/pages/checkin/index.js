import React from 'react'
import CheckIn1 from '@/components/Customer/checkin/CheckIn1'
import withSession from '@/utils/session'
import routes from '@/utils/routes'

const check1 = () => {
  return (
    <>
      <CheckIn1 />
    </>
  )
}
export default check1

export const getServerSideProps = withSession(async ctx => {
  const { req } = ctx

  const { data = {} } = req.session.get('user') || {}
  if (data.token) {
    return {
      redirect: {
        destination: routes.dashboard,
        permanent: false,
      },
    }
  }

  return {
    props: { user: data },
  }
})