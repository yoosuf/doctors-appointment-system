const validation = require("../../utils/validateRequest");
const noteSchemaKey = require("../../utils/validation/noteValidation");
const utils = require("../../utils/messages");
const Note = require("../../model/note");
const dbService = require("../../utils/dbService");

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
  getNotes,
};
