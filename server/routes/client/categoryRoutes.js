const express = require("express");
const router = express.Router();
const categoryController = require("../../controller/client/categoryController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");


router
  .route("/services")
  .post(authentication, categoryController.findAllServicesByCategory);

router
  .route("/list")
  .post(authentication, checkPermission, categoryController.findAllCategory)
  .descriptor("client.category.findAll");

router
  .route("/:id")
  .get(authentication, checkPermission, categoryController.getCategory)
  .descriptor("client.category.getCategory");


module.exports = router;
