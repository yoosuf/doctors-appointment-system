const dbService = require("../../utils/dbService");
const Question = require("../../model/question");
const User = require("../../model/v1/user");
const UserDetails = require("../../model/userDetails");
const QuestionAnswer = require("../../model/questionAnswer");
const utils = require("../../utils/messages");

const addQuestion = async (req, res) => {
  try {
    const data = new question({
      ...req.body,
    });
    let result = await dbService.createDocument(Question, data);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error-addQuestion", error);
    return utils.failureResponse(error, res);
  }
};

const findAllQuestion = async (req, res) => {
  try {
    let options = {};
    let query = {};
    if (req.body.options) {
      options = {
        ...req.body.options,
      };
    }
    if (req.body.query) {
      query = {
        ...req.body.query,
      };
    }
    let result = await dbService.getAllDocuments(Question, query, options);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error-findAllQuestion", error);
    return utils.failureResponse(error, res);
  }
};

const submitAnswer = async (req, res) => {
  try {
    const data = req.body;
    await QuestionAnswer.deleteMany({ userId: data.userId });
    await Promise.all(
      data?.answerData.map(async (item) => {
        item.userId = data.userId;
        await dbService.createDocument(QuestionAnswer, item);
      })
    );
    await dbService.findOneAndUpdateDocument(
      UserDetails,
      { userId: data.userId },
      { onboardSteps: data?.onboardSteps }
    );
    await dbService.findOneAndUpdateDocument(
      User,
      { _id: data.userId },
      { onboardProgress: (data?.onboardSteps / data?.totalOnboardSteps) * 100 }
    );
    return utils.successResponse({}, res);
  } catch (error) {
    logger.error("Error-submitAnswer", error);
    return utils.failureResponse(error, res);
  }
};

const findAllAnswer = async (req, res) => {
  try {
    let options = {};
    let query = {};
    if (req.body.options) {
      options = {
        ...req.body.options,
      };
    }
    if (req.body.query) {
      query = {
        ...req.body.query,
      };
    }
    let result = await dbService.getAllDocuments(
      QuestionAnswer,
      query,
      options
    );
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error-findAllAnswer", error);
    return utils.failureResponse(error, res);
  }
};
module.exports = {
  addQuestion,
  findAllQuestion,
  submitAnswer,
  findAllAnswer,
};
