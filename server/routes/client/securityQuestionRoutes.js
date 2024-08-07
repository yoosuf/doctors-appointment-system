const express = require("express");
const router = express.Router();
const securityQuestionController = require("../../controller/client/securityQuestionController");

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
    securityQuestionController.addSecurityQuestion
  )
  .descriptor("client.securityQuestions.create");
router
  .route("/list")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    securityQuestionController.findAllSecurityQuestion
  )
  .descriptor("client.securityQuestions.findAll");
router
  .route("/:id")
  .get(
    authentication,
    checkPermission,
    checkPermissionByUser,
    securityQuestionController.getSecurityQuestion
  )
  .descriptor("client.securityQuestions.getQuestion");
router
  .route("/count")
  .post(
    authentication,
    checkPermission,
    checkPermissionByUser,
    securityQuestionController.getSecurityQuestionCount
  )
  .descriptor("client.securityQuestions.Count");
//router.route("/aggregate").post(authentication,checkPermission,checkPermissionByUser,securityQuestionController.getSecurityQuestionByAggregate);
router
  .route("/update/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    securityQuestionController.updateSecurityQuestion
  )
  .descriptor("client.securityQuestions.update");
/* router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),securityQuestionController.partialUpdateSecurityQuestion); */
router
  .route("/softDelete/:id")
  .put(
    authentication,
    checkPermission,
    checkPermissionByUser,
    securityQuestionController.softDeleteSecurityQuestion
  )
  .descriptor("client.securityQuestions.softDelete");
/* router.route("/addBulk").post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),securityQuestionController.bulkInsertSecurityQuestion);
router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),securityQuestionController.bulkUpdateSecurityQuestion); */
module.exports = router;
