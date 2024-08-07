var express = require("express");
var router = express.Router();
const ownerController = require("../../controller/admin/ownerController");

const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(ownerController.addUser)
  .descriptor("admin.owner.create");
router.route("/set-password").post(ownerController.resetNewPassword);
router
  .route("/list")
  .post(authentication, ownerController.findAllUser)
  .descriptor("admin.owner.findAll");
router
  .route("/:id")
  .post(authentication, ownerController.getUser)
  .descriptor("admin.ownergetOwner");
router
  .route("/update/:id")
  .put(authentication, ownerController.updateUser)
  .descriptor("admin.owner.update");
router
  .route("/delete/:id")
  .delete(authentication, ownerController.deleteUser)
  .descriptor("admin.owner.delete");
router
  .route("/softDelete/:id")
  .put(authentication, ownerController.softDeleteUser)
  .descriptor("admin.owner.softDelete");

/* router.route("/get-profile").post(authentication, checkPermission, ownerController.getProfile).descriptor('admin.owner.getProfile');
router.route("/update-profile").post(authentication, checkPermission, ownerController.updateProfile).descriptor('admin.owner.updateProfile');

 */
module.exports = router;
