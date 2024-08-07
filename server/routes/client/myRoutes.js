const express = require('express')
const router = express.Router()
const myController = require('../../controller/client/myController')
const {
  authentication,
  checkPermission,
  checkPermissionByUser
} = require('../../middleware/auth')

router.route('/test').post(myController.myTest)

router.route('/me').get(authentication, myController.myProfile)

router.route('/me').put(myController.updateMyProfile)

router.route('/services').get(myController.myServicesByLocation)

router.route('/appointments').get(authentication, myController.myAppointments)

router
  .route('/appointments/filter')
  .get(authentication, myController.filterMyAppointments)


  router
  .route('/add-device')
  .post(authentication, myController.addDevice)

module.exports = router
