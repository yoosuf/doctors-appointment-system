var express = require("express");
var router = express.Router();
const worldPayController = require("../../controller/client/worldPayController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/add-card")
  .post(authentication, checkPermission, worldPayController.addCard)
  .descriptor("client.worldPay.addCard");
router
  .route("/cards-list")
  .get(authentication, checkPermission, worldPayController.listOfCards)
  .descriptor("client.worldPay.cardsList");
router
  .route("/remove-card")
  .post(authentication, checkPermission, worldPayController.removeCard)
  .descriptor("client.worldPay.removeCard");
module.exports = router;
