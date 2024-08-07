const express = require("express");
const router = express.Router();
const pageController = require("../../controller/client/pageController");

const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/:id")
  .post(authentication, pageController.getPage)
  .descriptor("client.page.getPage");

module.exports = router;
