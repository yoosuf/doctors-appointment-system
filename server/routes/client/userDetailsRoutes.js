const express = require("express");
const router = express.Router();
const userDetailsController = require("../../controller/client/userDetailsController");
const { authentication } = require("../../middleware/auth");

router
  .route("/add")
  .post(authentication, userDetailsController.addUserDetails)
  .descriptor("client.userDetails.addUserDetails");
router
  .route("/update/:id")
  .put(authentication, userDetailsController.updateUserDetails)
  .descriptor("client.userDetails.updateUserDetails");
router
  .route("/:id")
  .get(authentication, userDetailsController.getUserDetails)
  .descriptor("client.userDetails.getUserDetails");

module.exports = router;
