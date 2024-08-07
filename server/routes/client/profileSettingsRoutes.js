const express = require("express");
const router = express.Router();
const profileSettingsController = require("../../controller/client/profileSettingsController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/updateSubscription/:id")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    profileSettingsController.updateSubscriptionsAutomatically
  )
  .descriptor("client.profileSettings.updateSubscription");

module.exports = router;
