const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/api/v1/address", require("./addressRoutes"));
router.use("/api/v1/patient", require("./patientRoutes"));
router.use("/api/v1/security-questions", require("./securityQuestionRoutes"));
router.use("/api/v1/files", require("./fileRoutes"));
router.use("/api/v1/docfiles", require("./docFileRoutes"));
router.use("/api/v1/memberships", require("./membershipRoutes"));
router.use("/api/v1/orders", require("./orderRoutes"));
router.use("/api/v1/transactions", require("./transactionRoutes"));
router.use("/api/v1/invoices", require("./invoiceRoutes"));
router.use("/api/v1/profile-settings", require("./profileSettingsRoutes"));
router.use("/api/v1/user", require("./userRoutes"));
router.use("/api/v1/category", require("./categoryRoutes"));
router.use("/api/v1/services", require("./serviceRoutes"));
router.use("/api/v1/appointment", require("./appointmentRoutes"));
router.use("/api/v1/locations", require("./locationRoutes"));
router.use("/api/v1/cards", require("./cardRoutes"));
router.use("/api/v1/payment", require("./paymentRoutes"));
router.use("/api/v1/appointmentchart", require("./appoinmentChartRoutes"));
router.use("/api/v1/note", require("./noteRoutes"));
router.use("/api/v1/user-details", require("./userDetailsRoutes"));
router.use("/api/v1/question", require("./questionAnswerRoutes"));
router.use("/api/v1/page",require("./pageRoutes"));
router.use("/api/v1",require("./myRoutes"));
router.use("/api/v1/invitations",require("./invitationRoutes"));


router.use("/api/v1/test",require("./testRoutes"));



module.exports = router;
