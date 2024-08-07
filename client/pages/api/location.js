import withSession from 'utils/session'

export default withSession(async (req, res) => {
  try {
    const data = req.body

    // calling api login (make sure it donsen't use browser side global variable cuz it will fun on server side)
    const location = data

    req.session.set('location', location)
    await req.session.save()
    res.json(location)
  } catch (error) {
    const { response } = error
    res.status(response?.status || 500).json(error.data)
  }
})