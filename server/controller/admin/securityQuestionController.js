const SecurityQuestion = require("../../model/securityQuestion");
const utils = require("../../utils/messages");
const securityQuestionSchemaKey = require("../../utils/validation/securityQuestionValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const { MESSAGE } = require("../../config/message");

const addSecurityQuestion = async (req, res) => {
  try {
    /*  let isValid = validation.validateParamsWithJoi(req.body,securityQuestionSchemaKey.schemaKeys);
     if (isValid.error) {
       return utils.inValidParam(isValid.details, res);
     }  */
    const data = new SecurityQuestion({
      ...req.body,
    });
    let result = await dbService.createDocument(SecurityQuestion, data);
    res.message = "Security Questions" + MESSAGE.ITEM_ADDED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if (error.name === "ValidationError") {
    //   return utils.validationError(error.message, res);
    // }
    // if (error.code && error.code == 11000) {
    //   return utils.isDuplicate(error.message, res);
    // }
    return utils.failureResponse(error, res);
  }
};
const findAllSecurityQuestion = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = {
          ...req.body.query,
        };
      }
      result = await dbService.countDocument(SecurityQuestion, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Security Questions have been fetched successfully";
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = {
          ...req.body.options,
        };

        if (req.body.query !== undefined) {
          query = {
            ...req.body.query,
          };
        }
        result = await dbService.getAllDocuments(
          SecurityQuestion,
          query,
          options
        );

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Security Questions have been fetched successfully";
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getSecurityQuestion = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(SecurityQuestion, query);

    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const partialUpdateSecurityQuestion = async (req, res) => {
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
      SecurityQuestion,
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

const updateSecurityQuestion = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   securityQuestionSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.findOneAndUpdateDocument(
      SecurityQuestion,
      {
        _id: req.params.id,
      },
      data,
      {
        new: true,
      }
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    // if (error.name === "ValidationError") {
    //   return utils.isDuplicate(error.message, res);
    // }
    // if (error.code && error.code == 11000) {
    //   return utils.isDuplicate(error.message, res);
    // }
    return utils.failureResponse(error, res);
  }
};

const softDeleteSecurityQuestion = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      SecurityQuestion,
      {
        _id: req.params.id,
      },
      {
        isDeleted: true,
        isActive: false,
      }
    );
    if (!result) {
      return utils.failedSoftDelete(res);
    }
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addSecurityQuestion,
  findAllSecurityQuestion,
  getSecurityQuestion,
  softDeleteSecurityQuestion,
  updateSecurityQuestion,
  partialUpdateSecurityQuestion,
  // getSecurityQuestionByAggregate,
};
