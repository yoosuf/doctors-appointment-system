const Reminders = require("../../model/reminders");
const utils = require("../../utils/messages");
const remindersSchemaKey = require("../../utils/validation/remindersValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");

const addReminders = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      remindersSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const data = new Reminders({ ...req.body });
    let result = await dbService.createDocument(Reminders, data);

    return utils.successResponse(result, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      return utils.validationError(error.message, res);
    }
    if (error.code && error.code == 11000) {
      return utils.isDuplicate(error.message, res);
    }
    return utils.failureResponse(error.message, res);
  }
};
const findAllReminders = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      result = await dbService.countDocument(Reminders, query);
      if (result) {
        result = { totalRecords: result };
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = { ...req.body.options };

        if (req.body.query !== undefined) {
          query = { ...req.body.query };
        }
        result = await dbService.getAllDocuments(Reminders, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getReminders = async (req, res) => {
  try {
    let query = {};
    query.id = req.params.id;
    let result = await dbService.getDocumentByQuery(Reminders, query);

    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const getRemindersCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where) {
      where = req.body.where;
    }
    let result = await dbService.countDocument(Reminders, where);
    if (result) {
      result = { totalRecords: result };
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getRemindersByAggregate = async (req, res) => {
  try {
    let result = await dbService.getDocumentByAggregation(Reminders, req.body);
    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const updateReminders = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      remindersSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.findOneAndUpdateDocument(
      Reminders,
      { _id: req.params.id },
      data,
      { new: true }
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      return utils.isDuplicate(error.message, res);
    }
    if (error.code && error.code == 11000) {
      return utils.isDuplicate(error.message, res);
    }
    return utils.failureResponse(error.message, res);
  }
};
const partialUpdateReminders = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      remindersSchemaKey.updateSchemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.updateDocument(Reminders, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const softDeleteReminders = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      Reminders,
      { _id: req.params.id },
      { isDeleted: true }
    );
    if (!result) {
      return utils.failedSoftDelete(res);
    }
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const bulkInsertReminders = async (req, res) => {
  try {
    let data;
    if (req.body.data !== undefined && req.body.data.length) {
      data = req.body.data;
      let result = await dbService.bulkInsert(Reminders, data);
      return utils.successResponse(result, res);
    } else {
      return utils.failureResponse("Invalid Data", res);
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return utils.validationError(error.message, res);
    }
    if (error.code && error.code == 11000) {
      return utils.isDuplicate(error.message, res);
    }
    return utils.failureResponse(error.message, res);
  }
};
const bulkUpdateReminders = async (req, res) => {
  try {
    let filter = {};
    let data;
    if (req.body.filter !== undefined) {
      filter = req.body.filter;
    }
    if (req.body.data !== undefined) {
      data = req.body.data;
      let result = await dbService.bulkUpdate(Reminders, filter, data);
      if (!result) {
        return utils.failureResponse("something is wrong.", res);
      }
      return utils.successResponse(result, res);
    } else {
      return utils.failureResponse("Invalid Data", res);
    }
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

module.exports = {
  addReminders,
  findAllReminders,
  getReminders,
  getRemindersCount,
  getRemindersByAggregate,
  updateReminders,
  partialUpdateReminders,
  softDeleteReminders,
  bulkInsertReminders,
  bulkUpdateReminders,
};
