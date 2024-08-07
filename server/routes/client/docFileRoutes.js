const express = require("express");
const router = express.Router();
const docFileController = require("../../controller/client/docFileController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    docFileController.addDocFile
  )
  .descriptor("client.docFile.create");
router
  .route("/list")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    docFileController.findAllDocFile
  )
  .descriptor("client.docFile.findAll");
router
  .route("/:id")
  .get(
    authentication,
    checkPermission,
    checkPermissionByUser,
    docFileController.getDocFile
  )
  .descriptor("client.docFile.getDocFile");
router
  .route("/update/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    docFileController.updateDocFile
  )
  .descriptor("client.docFile.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    docFileController.softDeleteDocFile
  )
  .descriptor("client.docFile.softDelete");
router
  .route("/partial-update/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    docFileController.partialUpdateDocFile
  )
  .descriptor("client.docFile.update");

module.exports = router;
