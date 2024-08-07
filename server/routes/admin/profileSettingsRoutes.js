const express = require("express");
const router = express.Router();
const profileSettingsController = require("../../controller/admin/profileSettingsController");
const {
  authentication,
} = require("../../middleware/auth");

router
  .route("/getNotification/:id")
  .get(
    authentication,
    profileSettingsController.getNotificaion
  )
  .descriptor("admin.profile-notifications.getNotification");
router
  .route("/updateprofileNotification/:id")
  .put(
    authentication,
    profileSettingsController.updateProfileNotification
  )
  .descriptor("admin.profile-notifications.update");

module.exports = router;
