const express = require("express");
const router = express.Router();
const appointmentController = require("../../controller/admin/appointmentController");
const preventDuplicateBooking = require(`./../../middleware/preventDuplicateBooking`)

const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/")
  .post(
    authentication,
    preventDuplicateBooking, 
    appointmentController.addAppointment
  ).descriptor("admin.appointment.create");

router
  .route("/list")
  .post(
    authentication,
    appointmentController.findAllAppointment
  ).descriptor("admin.appointment.list");

router
  .route("/detail/:id")
  .post(
    authentication,
    appointmentController.appointmentDetail
  ).descriptor("admin.appointment.get");

router
  .route("/no-show/:id")
  .post(
    authentication,
    appointmentController.noShowAppointment
  ).descriptor("admin.appointment.noshow");



router
  .route("/serve/:id")
  .post(
    authentication, 
    appointmentController.serveAppointment
  ).descriptor("admin.appointment.serve");

router
  .route("/visit-history/:id")
  .post(
    authentication,
    appointmentController.appointmentVisitHistory
  ).descriptor("admin.appointment.create");

router
  .route("/send-alert/:id")
  .post(
    authentication,
    appointmentController.sendAppointmentAlert
  ).descriptor("admin.appointment.sendAlert");

router
  .route("/update/:id")
  .put(
    authentication, 
    appointmentController.updateAppointment
  ).descriptor("admin.appointment.update");

router
  .route("/partial-update/:id")
  .put(
    authentication,
    appointmentController.partialUpdateAppointment
  );

router
  .route("/softDelete/:id")
  .put(
    authentication,
    appointmentController.softDeleteAppointment
  ).descriptor("admin.appointment.softDelete");

router
  .route("/addBulk")
  .post(
    authentication,
    appointmentController.bulkInsertAppointment
  ).descriptor("admin.appointment.createBulk");

router
  .route("/updateBulk")
  .put(
    authentication,
    appointmentController.bulkUpdateAppointment
  ).descriptor("admin.appointment.updatebulk");

router
  .route("/book-appointment/:id")
  .post(
    authentication, 
    preventDuplicateBooking,
    appointmentController.bookAppointment
  ).descriptor("admin.appointment.bookAppointment");


router
  .route("/patient-history/:patientId")
  .post(appointmentController.getAllAppointmentsByPatientId)
  .descriptor("admin.appointment.getAllAppointmentsByPatientId");

module.exports = router;
