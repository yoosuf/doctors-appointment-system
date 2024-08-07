const express = require("express");
const router = express.Router();
const serviceController = require("../../controller/admin/serviceController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    serviceController.addService
  )
  .descriptor("admin.service.create");

router
  .route("/list")
  .post(
    authentication,
    serviceController.findAllService
  )
  .descriptor("admin.service.findAll");

router
  .route("/:id")
  .get(
    authentication,
    serviceController.getService
  )
  .descriptor("admin.service.getService");

router
  .route("/update/:id")
  .put(
    authentication,
    serviceController.updateService
  )
  .descriptor("admin.service.update");

router
  .route("/softDelete/:id")
  .put(
    authentication,
    serviceController.softDeleteService
  )
  .descriptor("admin.service.softDelete");

router
  .route("/partial-update/:id")
  .put(
    authentication,
    serviceController.partialUpdateService
  )
  .descriptor("admin.service.update");

  router
  .route("/flter")
  .post(
    serviceController.getAllServiceByCategoryId
  )
  .descriptor("admin.service.getAllServiceByCategoryId");

module.exports = router;
