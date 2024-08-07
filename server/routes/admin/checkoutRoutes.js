const express = require("express");
const router = express.Router();
const checkOutController = require("../../controller/admin/checkoutController");
const { checkPermission, authentication } = require("../../middleware/auth");

router
  .route("")
  .post(checkOutController.checkout)
  .descriptor("admin.checkout.product");
module.exports = router;
