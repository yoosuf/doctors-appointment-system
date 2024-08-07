const express = require("express");
const router = express.Router();
const roleController = require("../../controller/admin/roleController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/list")
  .get(authentication, roleController.listRoles)
  .descriptor("admin.role.list");

module.exports = router;
