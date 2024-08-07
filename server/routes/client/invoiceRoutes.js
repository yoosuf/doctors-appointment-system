const express = require("express");
const router = express.Router();
const invoiceController = require("../../controller/client/invoiceController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");


router
  .route("/list")
  .post(authentication, checkPermission, invoiceController.findAllInvoice)
  .descriptor("client.invoice.findAll");
router
  .route("/:id")
  .get(authentication, checkPermission, invoiceController.getInvoice)
  .descriptor("client.invoice.getInvoice");
router
  .route("/getRecurlyInvoice")
  .post(authentication, checkPermission, invoiceController.getRecurlyInvoice)
  .descriptor("client.invoice.getInvoice");
router
  .route("/getRecurlyInvoicePdf")
  .post(authentication, checkPermission, invoiceController.getRecurlyInvoicePdf)
  .descriptor("client.invoice.getInvoicePdf");

module.exports = router;
