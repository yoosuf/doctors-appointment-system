var express = require("express");
var router = express.Router();
const subOwnerController = require("../../controller/admin/subOwnerController");

const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    subOwnerController.addUser
  )
  .descriptor("admin.subOwner.create");
router.route("/set-password").post(subOwnerController.resetNewPassword);
router
  .route("/list")
  .post(authentication, subOwnerController.findAllUser)
  .descriptor("admin.subOwner.findAll");
router
  .route("/:id")
  .post(
    authentication,
    subOwnerController.getUser
  )
  .descriptor("admin.subOwner.getSubOwner");
router
  .route("/update/:id")
  .put(authentication,  subOwnerController.updateUser)
  .descriptor("admin.subOwner.update");
router
  .route("/delete/:id")
  .delete(
    authentication,
    subOwnerController.deleteUser
  )
  .descriptor("admin.subOwner.delete");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    subOwnerController.softDeleteUser
  )
  .descriptor("admin.subOwner.softDelete");

/* router.route("/get-profile").post(authentication, checkPermission, ownerController.getProfile).descriptor('admin.owner.getProfile');
router.route("/update-profile").post(authentication, checkPermission, ownerController.updateProfile).descriptor('admin.owner.updateProfile');

 */
module.exports = router;
