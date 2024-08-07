const express = require("express");
const router = express.Router();
const dashboardController = require("../../controller/admin/dashboardController");
const { checkPermission, authentication } = require("../../middleware/auth");

router
  .route("/report")
  .post(authentication, dashboardController.dashboardReport)
  .descriptor("admin.dashboard.report");
router
  .route("/search")
  .post(authentication, dashboardController.globalSearch)
  .descriptor("admin.dashboard.global.search");
router
  .route("/membership")
  .post(authentication, dashboardController.userDashboardCount)
  .descriptor("admin.dashboard.membership");
module.exports = router;
