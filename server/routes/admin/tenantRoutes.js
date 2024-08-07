const express = require("express");
const router = express.Router();
const tenantController = require("../../controller/admin/tenantController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router.route("/test").get(authentication, tenantController.tenantTest);


router.route("/services").get(tenantController.tenantServices);

router.route("/search").get( tenantController.tenantSearch);


module.exports = router;
