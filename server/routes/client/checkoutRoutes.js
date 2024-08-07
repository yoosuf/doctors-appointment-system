const express = require("express");
const router = express.Router();
const checkOutController = require("../../controller/client/checkoutController");
const { checkPermission, authentication } = require("../../middleware/auth");

router
  .route("")
  .post(authentication, checkPermission, checkOutController.checkout)
  .descriptor("client.checkout.product");
router
  .route("/event")
  .post(authentication, checkPermission, checkOutController.eventCheckout)
  .descriptor("client.checkout.event");
module.exports = router;
