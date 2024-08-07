var express = require('express')
var router = express.Router()
const invitationController = require('../../controller/client/invitationController')
const { authentication, checkPermission } = require('../../middleware/auth')

router
  .route('/')
  .get(authentication, invitationController.getInvitations)
  .descriptor('client.invitations.getInvitations')

router
  .route('/')
  .post(authentication, invitationController.addInvitation)
  .descriptor('client.invitations.addInvitation')

router
  .route('/email-availability')
  .post(authentication, invitationController.checkEmailExistance)
  .descriptor('client.invitations.checkAvailabality')

module.exports = router
