const express = require("express");
const router = express.Router();
const fileController = require("../../controller/admin/fileController");
const {
  checkPermission,
  authentication,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    fileController.addFile
  )
  .descriptor("admin.file.create");
router
  .route("/list")
  .post(
    authentication,
    fileController.findAllFile
  )
  .descriptor("admin.file.findAll");
router
  .route("/:id")
  .get(
    authentication,
    fileController.getFile
  )
  .descriptor("admin.file.getFile");
router
  .route("/update/:id")
  .put(
    authentication,
    fileController.updateFile
  )
  .descriptor("admin.file.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    fileController.softDeleteFile
  )
  .descriptor("admin.file.softDelete");


module.exports = router;
