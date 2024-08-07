const express = require("express");
const router = express.Router();
const membershipController = require("../../controller/admin/membershipController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    membershipController.addMembership
  )
  .descriptor("admin.membership.create");
router
  .route("/list")
  .post(
    authentication,
    membershipController.findAllMembership
  )
  .descriptor("admin.membership.findAll");
router
  .route("/:id")
  .get(
    authentication,
    membershipController.getMembership
  )
  .descriptor("admin.membership.getMembership");
router
  .route("/update/:id")
  .put(
    authentication,
    membershipController.updateMembership
  )
  .descriptor("admin.membership.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    membershipController.softDeleteMembership
  )
  .descriptor("admin.membership.softDelete");


module.exports = router;
