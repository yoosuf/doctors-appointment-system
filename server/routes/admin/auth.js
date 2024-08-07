const express = require("express");
const routes = express.Router();
const authController = require("../../controller/admin/authController");
const { authentication, checkPermission } = require("../../middleware/auth");
routes.post("/login", authController.login);
routes.post("/emailOrMobileLinkLogin", authController.emailOrMobileLinkLogin);
routes.post("/email-verification", authController.verifyEmail);
routes.post(
  "/resend-email-verification",
  authController.resendEmailVerificationLink
);
routes.post("/forgot-password", authController.forgotPassword);
routes.post("/reset-password", authController.resetPassword);
routes.post("/recover-password", authController.resetPassword);

routes.post("/me",authController.getMe);
routes.post("/get-profile", authentication, authController.getProfile);
routes.post("/update-profile", authentication, authController.updateProfile);
routes.post("/logout", authentication, authController.logout);

module.exports = routes;
