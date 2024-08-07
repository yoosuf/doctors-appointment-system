const dbService = require("../../utils/dbService");
const Question = require("../../model/question");
const QuestionAnswer = require("../../model/questionAnswer");
const utils = require("../../utils/messages");

const addQuestion = async (req, res) => {
  try {
    const data = req.body;
    let result = await dbService.createDocument(Question, data);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error-addQuestion", error);
    return utils.failureResponse(error.message, res);
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

const findQuestionById= async(req, res) => {
  try {
    const id = req.params.id;
    logger.info(id);

    const result = await dbService.getSingleDocumentById(Question, id);

    logger.info(result);

    if (result && result !== undefined) {
      res.message = MESSAGE.PROFILE_GET.message;
      return utils.successResponse(result, res);
    } else {
      return utils.recordNotFound([], res);
    }
  } catch (error) {
    logger.error("Error - getProfile", error);
    return utils.failureResponse(error, res);
  }
};


const updateQuestionById= async(req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   securityQuestionSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(
      Question,
      req.params.id,
      data
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};


const deleteQuestionByID = async (req, res) => {
  try {

    let result = await dbService.deleteDocument(
      Question,
      req.params.id
    );
    if (!result) {
      return utils.failureResponse("No data found", res);
    }
    return utils.successResponse(result, res);

  } catch(error) {
    return utils.failureResponse(error.message, res);
  }
}


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
  findAllAnswer,
  findAllQuestion,
  findQuestionById,
  updateQuestionById,
  deleteQuestionByID, 
};
