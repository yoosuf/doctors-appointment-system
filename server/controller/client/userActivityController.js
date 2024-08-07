const UserActivity = require("../../model/userActivity");
const utils = require("../../utils/messages");
const userActivitySchemaKey = require("../../utils/validation/userActivityValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");

const addUserActivity = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      userActivitySchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const data = new UserActivity({ ...req.body });
    let result = await dbService.createDocument(UserActivity, data);

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

const findAllUserActivity = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.query.fromDate && req.body.query.toDate) {
      Object.assign(query, {
        createdAt: {
          $gte: new Date(req.body.query.fromDate),
          $lte: new Date(req.body.query.toDate),
        },
      });
      delete req.body.query.fromDate;
      delete req.body.query.toDate;
    }
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = { ...req.body.query, ...query };
      }
      result = await dbService.countDocument(UserActivity, query);
      if (result) {
        result = { totalRecords: result };
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = { ...req.body.options };
        if (req.body.query !== undefined) {
          query = { ...req.body.query, ...query };
        }
        result = await dbService.getAllDocuments(UserActivity, query, options);

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

const getUserActivity = async (req, res) => {
  try {
    let query = {};
    query.id = req.params.id;
    let result = await dbService.getDocumentByQuery(UserActivity, query);

    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const getUserActivityCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where) {
      where = req.body.where;
    }
    let result = await dbService.countDocument(UserActivity, where);
    if (result) {
      result = { totalRecords: result };
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getUserActivityByAggregate = async (req, res) => {
  try {
    let result = await dbService.getDocumentByAggregation(
      UserActivity,
      req.body
    );
    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const updateUserActivity = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      userActivitySchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.findOneAndUpdateDocument(
      UserActivity,
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
const partialUpdateUserActivity = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      userActivitySchemaKey.updateSchemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.updateDocument(
      UserActivity,
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
const softDeleteUserActivity = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      UserActivity,
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
const bulkInsertUserActivity = async (req, res) => {
  try {
    let data;
    if (req.body.data !== undefined && req.body.data.length) {
      data = req.body.data;
      let result = await dbService.bulkInsert(UserActivity, data);
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
const bulkUpdateUserActivity = async (req, res) => {
  try {
    let filter = {};
    let data;
    if (req.body.filter !== undefined) {
      filter = req.body.filter;
    }
    if (req.body.data !== undefined) {
      data = req.body.data;
      let result = await dbService.bulkUpdate(UserActivity, filter, data);
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
  addUserActivity,
  findAllUserActivity,
  getUserActivity,
  getUserActivityCount,
  getUserActivityByAggregate,
  updateUserActivity,
  partialUpdateUserActivity,
  softDeleteUserActivity,
  bulkInsertUserActivity,
  bulkUpdateUserActivity,
};
