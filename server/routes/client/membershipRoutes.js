const express = require("express");
const router = express.Router();
const membershipController = require("../../controller/client/membershipController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    membershipController.addMembership
  )
  .descriptor("client.membership.create");
router
  .route("/list")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    membershipController.findAllMembership
  )
  .descriptor("client.membership.findAll");
router
  .route("/:id")
  .get(
    authentication,
    checkPermission,
    checkPermissionByUser,
    membershipController.getMembership
  )
  .descriptor("client.membership.getMembership");
router
  .route("/userList/:id")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    membershipController.findAllUserMembership
  )
  .descriptor("client.membership.findAll");
// router.route("/update/:id").put(authentication, checkPermission, checkPermissionByUser, membershipController.updateMembership).descriptor("client.membership.update");
// router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),membershipController.partialUpdateMembership);
// router.route("/softDelete/:id").put(authentication, checkPermission, checkPermissionByUser, membershipController.softDeleteMembership).descriptor("client.membership.softDelete");
module.exports = router;
