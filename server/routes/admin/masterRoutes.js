const express = require("express");
const router = express.Router();
const masterController = require("../../controller/admin/masterController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    masterController.addMaster
  )
  .descriptor("admin.master.create");
router
  .route("/list")
  .post(authentication, masterController.findAllMaster)
  .descriptor("admin.master.findAll");
router
  .route("/:id")
  .get(
    authentication,
    masterController.getMaster
  )
  .descriptor("admin.master.getMaster");
router
  .route("/update/:id")
  .put(
    authentication,
    masterController.updateMaster
  )
  .descriptor("admin.master.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    masterController.softDeleteMaster
  )
  .descriptor("admin.master.softDelete");
router
  .route("/partial-update/:id")
  .put(
    authentication,
    masterController.partialUpdateMaster
  )
  .descriptor("admin.master.update");
router
  .route("/delete/:id")
  .delete(
    authentication,
    masterController.deleteMaster
  )
  .descriptor("admin.master.delete");


module.exports = router;
