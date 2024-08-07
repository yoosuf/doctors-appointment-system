const express = require("express");
const router = express.Router();
const orderController = require("../../controller/admin/orderController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/create")
  .post(authentication, orderController.addOrder)
  .descriptor("admin.order.create");
router
  .route("/list")
  .post(authentication, orderController.findAllOrder)
  .descriptor("admin.order.list");
router
  .route("/:id")
  .get(authentication, orderController.getOrder)
  .descriptor("admin.order.get");
router
  .route("/count")
  .post(authentication, orderController.getOrderCount)
  .descriptor("admin.order.count");
router
  .route("/aggregate")
  .post(authentication, orderController.getOrderByAggregate)
  .descriptor("admin.order.aggregate");
router
  .route("/update/:id")
  .put(authentication, orderController.updateOrder)
  .descriptor("admin.order.update");
router
  .route("/partial-update/:id")
  .put(authentication, orderController.partialUpdateOrder);
router
  .route("/softDelete/:id")
  .put(authentication, orderController.softDeleteOrder)
  .descriptor("admin.order.softDelete");
router
  .route("/addBulk")
  .post(authentication, orderController.bulkInsertOrder)
  .descriptor("admin.order.bulkInsert");
router
  .route("/updateBulk")
  .put(authentication, orderController.bulkUpdateOrder)
  .descriptor("admin.order.bulkUpdate");
module.exports = router;
