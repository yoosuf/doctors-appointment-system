const express = require("express");
const router = express.Router();
const ipAddressController = require("../../controller/admin/ipAddressController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(authentication, ipAddressController.addIpAddress)
  .descriptor("admin.ipAddress.create");
router
  .route("/list")
  .post(authentication, ipAddressController.findAllIpAddress)
  .descriptor("admin.ipAddress.findAll");
router
  .route("/:id")
  .get(authentication, ipAddressController.getIpAddress)
  .descriptor("admin.ipAddress.getLocation");
router
  .route("/update/:id")
  .put(authentication, ipAddressController.updateIpAddress)
  .descriptor("admin.ipAddress.update");
router
  .route("/softDelete/:id")
  .put(authentication, ipAddressController.softDeleteIpAddress)
  .descriptor("admin.ipAddress.softDelete");

module.exports = router;
