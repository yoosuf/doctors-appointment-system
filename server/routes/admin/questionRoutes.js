const express = require("express");
const router = express.Router();
const questionController = require("../../controller/admin/questionController");
const { authentication, checkPermission } = require("../../middleware/auth");

router
  .route("/add")
  .post(authentication, questionController.addQuestion)
  .descriptor("admin.question.add");

router
  .route("/list")
  .post(authentication, questionController.findAllQuestion)
  .descriptor("admin.question.findAll");

router
  .route("/:id")
  .get(authentication, questionController.findQuestionById)
  .descriptor("admin.question.findQuestionById");

router
  .route("/:id")
  .put(authentication, questionController.updateQuestionById)
  .descriptor("admin.question.updateQuestionById");

router
  .route("/:id")
  .delete(authentication, questionController.deleteQuestionByID)
  .descriptor("admin.question.deleteQuestionByID");
  
router
  .route("/answer/list")
  .post(authentication, questionController.findAllAnswer)
  .descriptor("admin.question.findAllAnswer");

module.exports = router;
