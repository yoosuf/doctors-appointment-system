const express = require("express");
const router = express.Router();
const appointmentChartController = require("../../controller/client/appoinmentChartController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/list")
  .post(
    authentication,
    checkPermission,
    appointmentChartController.findAllAppoinmentChart
  );
router
  .route("/:id")
  .get(
    authentication,
    checkPermission,
    appointmentChartController.getAppoinmentChart
  );
router
  .route("/count")
  .post(
    authentication,
    checkPermission,
    appointmentChartController.getAppoinmentChartCount
  );
router
  .route("/aggregate")
  .post(
    authentication,
    checkPermission,
    appointmentChartController.getAppoinmentChartByAggregate
  );
router
  .route("/export")
  .post(
    authentication,
    checkPermission,
    appointmentChartController.exportAppointmentChart
  );

module.exports = router;
