const express = require("express");
const router = express.Router();
const noteController = require("../../controller/client/noteController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/list")
  .post(authentication, checkPermission, noteController.getNotes)
  .descriptor("client.note.get");

module.exports = router;
