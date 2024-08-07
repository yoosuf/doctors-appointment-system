var express = require("express");
var router = express.Router();
const patientController = require("../../controller/client/patientController");

const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");
router
  .route("/get-profile")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    patientController.getProfile
  )
  .descriptor("client.patient.getProfile");
router
  .route("/update-profile")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    patientController.updateProfile
  )
  .descriptor("client.patient.updateProfile");

module.exports = router;
