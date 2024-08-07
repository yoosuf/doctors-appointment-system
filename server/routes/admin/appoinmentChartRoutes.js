const express = require("express");
const router = express.Router();
const appointmentChartController = require("../../controller/admin/appoinmentChartController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    appointmentChartController.addAppoinmentChart
  )
  .descriptor("admin.appointmentchart.create");

router
  .route("/list")
  .post(
    authentication,
    appointmentChartController.findAllAppoinmentChart)
  .descriptor("admin.appointmentchart.list");

router
  .route("/count")
  .post(
    authentication,
    appointmentChartController.getAppoinmentChartCount)
  .descriptor("admin.appointmentchart.getAppoinmentChartCount");

router
  .route("/aggregate")
  .post(
    authentication,
    appointmentChartController.getAppoinmentChartByAggregate)
  .descriptor("admin.appointmentchart.getAppoinmentChartByAggregate");

router
  .route("/:id")
  .get(
    authentication,
    appointmentChartController.getAppoinmentChart)
  .descriptor("admin.appointmentchart.getAppointmentChart");

router
  .route("/update/:id")
  .put(
    authentication,
    appointmentChartController.updateAppoinmentChart)
  .descriptor("admin.appointmentchart.update");

router
  .route("/softDelete/:id")
  .put(
    authentication,
    appointmentChartController.softDeleteAppoinmentChart)
  .descriptor("admin.appointmentchart.softDelete");

router
  .route("/addBulk")
  .post(
    authentication,
    appointmentChartController.bulkInsertAppoinmentChart)
  .descriptor("admin.appointmentchart.createBulk");

router
  .route("/updateBulk")
  .put(
    authentication,
    appointmentChartController.bulkUpdateAppoinmentChart)
  .descriptor("admin.appointmentchart.updatebulk");

router
  .route("/partial-update/:id")
  .put(
    authentication,
    appointmentChartController.partialUpdateAppointmentChart)
  .descriptor("admin.appointmentchart.partialUpdateAppointmentChart");

router
  .route("/export")
  .post(
    authentication,
    appointmentChartController.exportAppointmentChart)
  .descriptor("admin.appointmentchart.exportAppointmentChart");

router
  .route("/changeAuthor/:id")
  .put(
    authentication,
    appointmentChartController.changeAuthorAppoinmentChart)
  .descriptor("admin.appointmentchart.changeAuthor");

router
  .route("/updateDailyIntake/:id")
  .put(
    authentication,
    appointmentChartController.updateNurseAppoinmentChart)
  .descriptor("admin.appointmentchart.updateDailyIntake");

router
  .route("/copyDailyIntake/:id")
  .post(
    authentication,
    appointmentChartController.copyAppoinmentChart)
  .descriptor("admin.appointmentchart.copyDailyIntake");

router
  .route("/delete/:id")
  .delete(
    authentication,
    appointmentChartController.deleteAppoinmentChart)
  .descriptor("admin.appointmentchart.delete");

router
  .route("/archive/:id")
  .put(
    authentication,
    appointmentChartController.archiveAppoinmentChart)
  .descriptor("admin.appointmentchart.archive");

module.exports = router;
