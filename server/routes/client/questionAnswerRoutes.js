const express = require("express");
const router = express.Router();
const questionAnswerController = require("../../controller/client/questionAnswerController");
const { authentication } = require("../../middleware/auth");

router
  .route("/list")
  .post(authentication, questionAnswerController.findAllQuestion)
  .descriptor("client.question.findAll");
router
  .route("/answer/submit")
  .post(authentication, questionAnswerController.submitAnswer)
  .descriptor("client.question.submitAnswer");
router
  .route("/answer/list")
  .post(authentication, questionAnswerController.findAllAnswer)
  .descriptor("client.question.findAllAnswer");

module.exports = router;
