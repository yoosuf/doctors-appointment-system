const express = require("express");
const router = express.Router();
const orderController = require("../../controller/client/orderController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/create")
  .post(authentication, checkPermission, orderController.addOrder)
  .descriptor("client.order.create");
router
  .route("/list")
  .post(authentication, checkPermission, orderController.findAllOrder)
  .descriptor("client.order.findAll");
router
  .route("/:id")
  .get(authentication, checkPermission, orderController.getOrder)
  .descriptor("client.order.getOrder");
router
  .route("/update/:id")
  .put(authentication, checkPermission, orderController.updateOrder)
  .descriptor("client.order.update");
router
  .route("/updateOrderStatus/:id")
  .put(authentication, checkPermission, orderController.updateOrderStatus)
  .descriptor("client.order.update");
router
  .route("/softDelete/:id")
  .put(authentication, checkPermission, orderController.softDeleteOrder)
  .descriptor("client.order.softDelete");

//router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),orderController.partialUpdateOrder);

module.exports = router;
