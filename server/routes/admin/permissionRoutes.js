var express = require("express");
var router = express.Router();
const permissionController = require("../../controller/admin/permissionController");

const { authentication, checkPermission } = require("../../middleware/auth");
router.route("/get-roles").post(permissionController.getRoles);
router.route("/permission-role/:id").get(permissionController.permission_role);
router
  .route("/create-update-permission/:roleId")
  .post(permissionController.createOrUpdatePermissionofRole);
router
  .route("/get-users-permissions/:id")
  .get(permissionController.permission_user_role);
router
  .route("/create-update-permissions-for-users/:userId")
  .post(permissionController.createOrUpdatePermissionByUserId);
module.exports = router;
