const express = require("express");
const router = express.Router();
const fileController = require("../../controller/client/fileController");

const {
  checkPermission,
  authentication,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    fileController.addFile
  );
router
  .route("/list")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    fileController.findAllFile
  );
router
  .route("/:id")
  .get(
    authentication,
    checkPermission,
    checkPermissionByUser,
    fileController.getFile
  );
router
  .route("/count")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    fileController.getFileCount
  );
router
  .route("/update/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    fileController.updateFile
  );
router
  .route("/softDelete/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    fileController.softDeleteFile
  );

router
  .route("/partial-update/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    fileController.partialUpdateFile
  );

module.exports = router;
