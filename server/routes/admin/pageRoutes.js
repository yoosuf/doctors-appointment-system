const express = require("express");
const router = express.Router();
const pageController = require("../../controller/admin/pageController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router.route("/create").post(authentication, pageController.addPage);
router.route("/list").post(authentication, pageController.findAllPage);
router.route("/:id").post(authentication, pageController.getPage);
router.route("/update/:id").put(authentication, pageController.updatePage);
router.route("/update/:id").put(authentication, pageController.updatePage);

router
  .route("/softDelete/:id")
  .put(authentication, pageController.softDeletePage);
module.exports = router;
