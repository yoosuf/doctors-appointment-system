const express = require("express");
const router = express.Router();
const addressController = require("../../controller/admin/addressController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(authentication,  addressController.addAddress)
  .descriptor("admin.address.create");
router
  .route("/list")
  .post(authentication,  addressController.findAllAddress)
  .descriptor("admin.address.findall");
router
  .route("/:id")
  .get(authentication,  addressController.getAddress)
  .descriptor("admin.address.getaddress");
router
  .route("/update/:id")
  .put(authentication,  addressController.updateAddress)
  .descriptor("admin.address.update");
router
  .route("/softDelete/:id")
  .put(authentication,  addressController.softDeleteAddress)
  .descriptor("admin.address.softDelete");


module.exports = router;
