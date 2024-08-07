const express = require("express");
const router = express.Router();
const userDetailsController = require("../../controller/admin/userDetailsController");
const { authentication } = require("../../middleware/auth");

router
  .route("/:id")
  .get(authentication, userDetailsController.getUserDetails)
  .descriptor("admin.userDetails.getUserDetails");

module.exports = router;
