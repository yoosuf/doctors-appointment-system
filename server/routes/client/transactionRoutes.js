const express = require("express");
const router = express.Router();
const transactionController = require("../../controller/client/transactionController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    transactionController.addTransaction
  )
  .descriptor("client.transaction.create");
router
  .route("/list")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    transactionController.findAllTransaction
  )
  .descriptor("client.transaction.findAll");
router
  .route("/:id")
  .get(
    authentication,
    checkPermission,
    checkPermissionByUser,
    transactionController.getTransaction
  )
  .descriptor("client.transaction.getTransaction");
router
  .route("/update/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    transactionController.updateTransaction
  )
  .descriptor("client.transaction.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    transactionController.softDeleteTransaction
  )
  .descriptor("client.transaction.softDelete");
router
  .route("/getRecurlyTransaction")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    transactionController.getRecurlyTransaction
  )
  .descriptor("client.transaction.getTransaction");

// router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),transactionController.partialUpdateTransaction);

module.exports = router;
