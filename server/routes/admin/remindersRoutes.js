const express = require("express");
const router = express.Router();
const remindersController = require("../../controller/admin/remindersController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    remindersController.addReminders
  )
  .descriptor("admin.reminder.create");
router
  .route("/list")
  .post(
    authentication,
    remindersController.findAllReminders
  )
  .descriptor("admin.reminder.findAll");
router
  .route("/:id")
  .get(
    authentication,
    remindersController.getReminders
  )
  .descriptor("admin.reminder.getReminder");
router
  .route("/update/:id")
  .put(
    authentication,
    remindersController.updateReminders
  )
  .descriptor("admin.reminder.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    remindersController.softDeleteReminders
  )
  .descriptor("admin.reminder.softDelete");

router
  .route("/partial-update/:id")
  .put(
    authentication,
    remindersController.partialUpdateReminders
  )
  .descriptor("admin.reminder.update");

module.exports = router;
