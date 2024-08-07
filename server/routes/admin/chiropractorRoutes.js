var express = require("express");
var router = express.Router();
const chiropractorController = require("../../controller/admin/chiropractorController");

const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");
router
  .route("/create")
  .post(
    authentication,
    chiropractorController.addUser
  )
  .descriptor("admin.chiropractor.create");
router.route("/set-password").post(chiropractorController.resetNewPassword);
router
  .route("/list")
  .post(authentication, chiropractorController.findAllUser)
  .descriptor("admin.chiropractor.findAll");
router
  .route("/:id")
  .post(
    authentication,
    chiropractorController.getUser
  )
  .descriptor("admin.chiropractor.getChiropractor");
router
  .route("/update/:id")
  .put(authentication, chiropractorController.updateUser)
  .descriptor("admin.chiropractor.update");
router
  .route("/delete/:id")
  .delete(
    authentication,
    chiropractorController.deleteUser
  )
  .descriptor("admin.chiropractor.delete");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    chiropractorController.softDeleteUser
  )
  .descriptor("admin.chiropractor.softDelete");

module.exports = router;
