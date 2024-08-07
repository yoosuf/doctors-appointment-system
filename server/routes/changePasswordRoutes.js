const express = require("express");
const router = express.Router();
const changePasswordController = require("../controller/common/changePasswordController");
const { authentication } = require("../middleware/auth");
router.post(
  "/change-password",
  authentication,
  changePasswordController.changePassword
);

module.exports = router;
