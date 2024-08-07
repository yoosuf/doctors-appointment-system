const express = require("express");
const router = express.Router();
const alertController = require("../../controller/admin/alertController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");


/**
 * @todo 
 * need to add permision check in future
 */

router
  .route("/:patientId/getAll")
  .post(authentication, alertController.getAllAlert)
  .descriptor("admin.alerts.findall");

router
  .route("/:patientId/")
  .post(authentication, alertController.addAlert)
  .descriptor("admin.alerts.create");



module.exports = router;
