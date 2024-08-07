const express = require("express");
const router = express.Router();
const checkInRequestController = require("../controller/common/checkInRequestController");
const {
  authentication,
  checkPermission,
  checkInRequest,
} = require("../middleware/auth");

router.route("/checkip").post(checkInRequest, checkInRequestController.checkIp);

router
  .route("/checkin-request")
  .post(checkInRequest, checkInRequestController.checkInRequest);

router.route("/checkin-user").get(checkInRequestController.checkInUser);

module.exports = router;
