const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/permissions", require("./permissionRoutes"));
router.use("/patients", require("./patientRoutes"));
router.use("/owners", require("./ownerRoutes"));
router.use("/subowners", require("./subownerRoutes"));
router.use("/chiropractors", require("./chiropractorRoutes"));
router.use("/staffs", require("./staffRoutes"));
router.use("/security-questions", require("./securityQuestionRoutes"));
router.use("/files", require("./fileRoutes"));
router.use("/docfiles", require("./docFileRoutes"));
router.use("/addresses", require("./addressRoutes"));
router.use("/locations", require("./locationRoutes"));
router.use("/reminders", require("./remindersRoutes"));
router.use("/masters", require("./masterRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/services", require("./serviceRoutes"));
router.use("/memberships", require("./membershipRoutes"));
router.use("/profile-settings", require("./profileSettingsRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/appointment", require("./appointmentRoutes"));
router.use("/ip-address", require("./ipAddressRoutes"));
router.use("/charttemplate", require("./chartTemplateRoutes"));
router.use("/appoinmentchart", require("./appoinmentChartRoutes"));
router.use("/useractivity", require("./userActivityRoutes"));
router.use("/dashboard", require("./dashboardRoutes"));
router.use("/invoice", require("./invoiceRoutes"));
router.use("/note", require("./noteRoutes"));
router.use("/order", require("./orderRoutes"));
router.use("/roles", require("./roleRoutes"));
router.use("/question", require("./questionRoutes"));
router.use("/user-details", require("./userDetailsRoutes"));
router.use("/alerts", require("./alertRoutes"));

router.use("/page", require("./pageRoutes"));

router.use("/tenant", require("./tenantRoutes"));
router.use("/test", require("./testRoutes"));


module.exports = router;
