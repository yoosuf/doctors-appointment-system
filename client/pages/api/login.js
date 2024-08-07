import withSession from 'utils/session'
export default withSession(async (req, res) => {
  try {
    const data = {
      id: req?.body?.id || req?.body?._id,
      permission: req.body.permission,
      token: req.body.token,
      roleId: req.body.roleId,
    }

    // calling api login (make sure it donsen't use browser side global variable cuz it will fun on server side)
    const user = { data, isLoggedIn: true }

    req.session.set('user', user)
    req.session.set('onboardProgress', req.body?.onboardProgress)
    await req.session.save()
    res.json(user)
  } catch (error) {
    const { response } = error
    res.status(response?.status || 500).json(error.data)
  }
})