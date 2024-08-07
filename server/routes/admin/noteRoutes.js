const express = require("express");
const router = express.Router();
const noteController = require("../../controller/admin/noteController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/create-or-update")
  .post(authentication, noteController.createOrUpdate)
  .descriptor("admin.note.createOrUpdate");
router
  .route("/list")
  .post(authentication, noteController.getNotes)
  .descriptor("admin.note.get");

module.exports = router;
