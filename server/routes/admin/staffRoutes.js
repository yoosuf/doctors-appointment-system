var express = require("express");
var router = express.Router();
const staffController = require("../../controller/admin/staffController");

const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");
router
  .route("/create")
  .post(authentication, staffController.addUser)
  .descriptor("admin.staff.create");
router.route("/set-password").post(staffController.resetNewPassword);
router
  .route("/list")
  .post(authentication, staffController.findAllUser)
  .descriptor("admin.staff.findAll");
router
  .route("/:id")
  .post(
    authentication,
    staffController.getUser
  )
  .descriptor("admin.staff.getStaff");
router
  .route("/update/:id")
  .put(authentication, staffController.updateUser)
  .descriptor("admin.staff.update");
router
  .route("/delete/:id")
  .delete(
    authentication,
    staffController.deleteUser
  )
  .descriptor("admin.staff.delete");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    staffController.softDeleteUser
  )
  .descriptor("admin.staff.softDelete");


module.exports = router;
