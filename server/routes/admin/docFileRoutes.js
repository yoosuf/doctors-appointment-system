const express = require("express");
const router = express.Router();
const docFileController = require("../../controller/admin/docFileController");
const {
  checkPermission,
  checkPermissionByUser,
  authentication,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    docFileController.addDocFile
  )
  .descriptor("admin.docFile.create");
router
  .route("/list")
  .post(
    authentication,
    docFileController.findAllDocFile
  )
  .descriptor("admin.docFile.findAll");
router
  .route("/:id")
  .get(
    authentication,
    docFileController.getDocFile
  )
  .descriptor("admin.docFile.getDocFile");
router
  .route("/update/:id")
  .put(
    authentication,
    docFileController.updateDocFile
  )
  .descriptor("admin.docFile.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    docFileController.softDeleteDocFile
  )
  .descriptor("admin.docFile.softDelete");
router
  .route("/partial-update/:id")
  .put(
    authentication,
    docFileController.partialUpdateDocFile
  )
  .descriptor("admin.docFile.update");

module.exports = router;
