const express = require("express");
const router = express.Router();
const categoryController = require("../../controller/admin/categoryController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    categoryController.addCategory
  )
  .descriptor("admin.category.create");

  
router
  .route("/list")
  .post(authentication, categoryController.findAllCategory)
  .descriptor("admin.category.findAll");
router
  .route("/:id")
  .get(
    authentication,
    categoryController.getCategory
  )
  .descriptor("admin.category.getCategory");
router
  .route("/update/:id")
  .put(
    authentication,
    categoryController.updateCategory
  )
  .descriptor("admin.category.update");
router
  .route("/partial-update/:id")
  .put(
    authentication,
    categoryController.partialUpdateCategory
  )
  .descriptor("admin.category.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    categoryController.softDeleteCategory
  )
  .descriptor("admin.category.softDelete");

module.exports = router;
