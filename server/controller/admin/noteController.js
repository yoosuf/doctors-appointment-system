const validation = require("../../utils/validateRequest");
const noteSchemaKey = require("../../utils/validation/noteValidation");
const utils = require("../../utils/messages");
const Note = require("../../model/note");
const dbService = require("../../utils/dbService");

const createOrUpdate = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      noteSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const inputs = new Note({
      ...req.body,
    });
    let result = await dbService.getDocumentByQuery(Note, {
      userId: inputs.userId,
      type: inputs.type,
    });
    if (result) {
      result = await dbService.findOneAndUpdateDocument(
        Note,
        { userId: inputs.userId, type: inputs.type },
        {
          desc: inputs.desc,
          chiroId: inputs.chiroId,
        },
        { new: true }
      );
      return utils.successResponse(result, res);
    }
    result = await dbService.createDocument(Note, inputs);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error(error);
    if (error.name === "ValidationError") {
      return utils.validationError(error.message, res);
    }
    if (error.code && error.code === 11000) {
      return utils.isDuplicate(error.message, res);
    }
    return utils.failureResponse(error.message, res);
  }
};

const getNotes = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      result = await dbService.countDocument(Note, query);
      if (result) {
        result = { totalRecords: result };
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = { ...req.body.options };
      }
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      result = await dbService.getAllDocuments(Note, query, options);
      if (!result) {
        return utils.recordNotFound([], res);
      }
      return utils.successResponse(result, res);
    }
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

module.exports = {
  createOrUpdate,
  getNotes,
};
