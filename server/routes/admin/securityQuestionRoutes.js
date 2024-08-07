const express = require("express");
const router = express.Router();
const securityQuestionController = require("../../controller/admin/securityQuestionController");

const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    securityQuestionController.addSecurityQuestion
  )
  .descriptor("admin.securityQuestions.create");
router
  .route("/list")
  .post(
    authentication,
    securityQuestionController.findAllSecurityQuestion
  )
  .descriptor("admin.securityQuestions.findAll");
router
  .route("/:id")
  .get(
    authentication,
    securityQuestionController.getSecurityQuestion
  )
  .descriptor("admin.securityQuestions.getQuestion");

router
  .route("/update/:id")
  .put(
    authentication,
    securityQuestionController.updateSecurityQuestion
  )
  .descriptor("admin.securityQuestions.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    securityQuestionController.softDeleteSecurityQuestion
  )
  .descriptor("admin.securityQuestions.softDelete");

router
  .route("/partial-update/:id")
  .put(
    authentication,
    securityQuestionController.partialUpdateSecurityQuestion
  )
  .descriptor("admin.securityQuestions.update");

module.exports = router;
