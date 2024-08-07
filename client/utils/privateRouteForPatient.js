import withSession from '@/utils/session'
import routes from '@/utils/routes'
import { USER_ROLE_TYPE } from '@/utils/constant'

const privateRouteForPatient = (routePath = '') => {
  return withSession(async ctx => {
    const { req } = ctx
    const { data = {} } = req.session.get('user') || {}
    const onboardProgress = req.session.get('onboardProgress')
    if (!data.token) {
      // if user not found or user's role is not admin then redirecting to login page
      return {
        redirect: {
          destination: routes.sesson.new,
          permanent: false,
        },
      }
    } else if (data.token && data.roleId?.code !== USER_ROLE_TYPE.PATIENT) {
      return {
        redirect: {
          destination: routes.dashboard,
          permanent: false,
        },
      }
    } else if (
      data.roleId?.code === USER_ROLE_TYPE.PATIENT &&
      onboardProgress === 100
    ) {
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
}

export default privateRouteForPatient
