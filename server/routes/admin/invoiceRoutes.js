const express = require("express");
const router = express.Router();
const invoiceController = require("../../controller/admin/invoiceController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/create")
  .post(authentication,  invoiceController.addInvoice)
  .descriptor("admin.invoice.create");
router
  .route("/list")
  .post(authentication,  invoiceController.findAllInvoice)
  .descriptor("admin.invoice.list");
router
  .route("/:id")
  .get(authentication,  invoiceController.getInvoice)
  .descriptor("admin.invoice.get");
router
  .route("/count")
  .post(authentication,  invoiceController.getInvoiceCount)
  .descriptor("admin.invoice.count");
router
  .route("/aggregate")
  .post(
    authentication,
    
    invoiceController.getInvoiceByAggregate
  )
  .descriptor("admin.invoice.aggregate");
router
  .route("/update/:id")
  .put(authentication,  invoiceController.updateInvoice)
  .descriptor("admin.invoice.update");
router
  .route("/partial-update/:id")
  .put(authentication,  invoiceController.partialUpdateInvoice);
router
  .route("/softDelete/:id")
  .put(authentication,  invoiceController.softDeleteInvoice)
  .descriptor("admin.invoice.softDelete");
router
  .route("/addBulk")
  .post(authentication,  invoiceController.bulkInsertInvoice)
  .descriptor("admin.invoice.bulkInsert");
router
  .route("/updateBulk")
  .put(authentication,  invoiceController.bulkUpdateInvoice)
  .descriptor("admin.invoice.bulkUpdate");

router
  .route("/getRecurlyInvoicePdf")
  .post(authentication,  invoiceController.getRecurlyInvoicePdf)
  .descriptor("admin.invoice.getInvoicePdf");

module.exports = router;
