import withSession from 'utils/session'
export default withSession(async (req, res) => {
  try {
    req.session.set('onboardProgress', 100)
    await req.session.save()
    res.end()
  } catch (error) {
    const { response } = error
    res.status(response?.status || 500).json(error.data)
  }
})