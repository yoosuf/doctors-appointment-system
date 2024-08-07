const express = require('express')
const router = express.Router()
const userController = require('../../controller/admin/userController')
const {
  authentication,
  checkPermission,
  checkPermissionByUser
} = require('../../middleware/auth')

router
  .route('/list')
  .post(
    authentication,
    userController.findAllUser
  )
  .descriptor('admin.user.findAll')
router
  .route('/:id')
  .get(
    authentication,
    userController.getUser
  )
  .descriptor('admin.user.getUser')
router
  .route('/update/:id')
  .put(authentication,  userController.updateUser)
  .descriptor('admin.user.updateUser')
router
  .route('/:id')
  .post(
    authentication,
    userController.postUser
  )
  .descriptor('admin.user.getUser')
router
  .route('/softDelete/:id')
  .put(
    authentication,
    userController.softDeleteUser
  )
  .descriptor('admin.user.softDeleteUser')
module.exports = router
