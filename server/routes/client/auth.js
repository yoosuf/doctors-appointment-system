const express = require("express");
const routes = express.Router();
const { authentication, checkPermission } = require("../../middleware/auth");
const authController = require("../../controller/client/authController");
routes.post("/login", authController.login);
routes.post("/emailOrMobileLinkLogin", authController.emailOrMobileLinkLogin);
routes.post("/register", authController.register);
routes.get("/email-verification", authController.verifyEmail);
routes.post(
  "/resend-email-verification",
  authController.resendEmailVerificationLink
);
routes.post("/forgot-password", authController.forgotPassword);
routes.post("/recover-password", authController.resetPassword);
routes.post("/logout", authentication, authController.logout);

/* 
routes.post("/login",authController.login)
routes.post("/register",authController.register)
routes.post("/verification-otp",authController.verificationOtp)
routes.post("/resend-otp",authController.resendOtp)
routes.post("/forgot-password",authController.forgotPassword)
routes.post("/reset-password",authController.resetPassword)
routes.post("/logout",authentication, authController.logout) */
module.exports = routes;
