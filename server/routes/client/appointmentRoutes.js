const express = require("express");
const router = express.Router();
const appointmentController = require("../../controller/client/appointmentController");
const { authentication, checkPermission } = require("../../middleware/auth");
const preventDuplicateBooking = require(`./../../middleware/preventDuplicateBooking`);

router
  .route("/")
  .post(
    authentication,
    preventDuplicateBooking,
    appointmentController.addAppointment
  )
  .descriptor("client.appointment.create");

router
  .route("/book-appointment/:id")
  .post(authentication, appointmentController.bookAppointment)
  .descriptor("client.appointment.bookAppointment");

router
  .route("/list")
  .post(authentication, appointmentController.findAllAppointment)
  .descriptor("client.appointment.create");

router
  .route("/dashboard-event-list")
  .post(authentication, appointmentController.dashboardEventListing)
  .descriptor("client.appointment.eventList");

router
  .route("/:id")
  .put(authentication, appointmentController.updateAppointment)
  .descriptor("client.appointment.update");

router
  .route("/:id")
  .post(authentication, checkPermission, appointmentController.getAppointment)
  .descriptor("client.appointment.getAppointment");

module.exports = router;
