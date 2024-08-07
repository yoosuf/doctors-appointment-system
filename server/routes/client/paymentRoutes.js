var express = require("express");
var router = express.Router();
const paymentController = require("../../controller/client/paymentController");
const { authentication, checkPermission } = require("../../middleware/auth");
router
  .route("/create-payment")
  .post(authentication, checkPermission, paymentController.createPayment)
  .descriptor("client.payment.create");
router
  .route("/payment-service")
  .post(authentication, checkPermission, paymentController.createPaymentService)
  .descriptor("client.servicePayment.create");
router
  .route("/membership-list")
  .post(authentication, checkPermission, paymentController.membershipList)
  .descriptor("client.payment.create");
router
  .route("/update-membership")
  .post(authentication, checkPermission, paymentController.updateMembership)
  .descriptor("client.update.membership");
router
  .route("/cancel-subscription")
  .post(authentication, checkPermission, paymentController.cancelMembership)
  .descriptor("client.cancel.membership");

module.exports = router;
