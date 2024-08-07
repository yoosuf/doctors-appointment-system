const Reminders = require("../../model/reminders");
const utils = require("../../utils/messages");
// const remindersSchemaKey = require("../../utils/validation/remindersValidation");
// const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const { MESSAGE } = require("../../config/message");

const addReminders = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,remindersSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = new Reminders({
      ...req.body,
    });
    data.addedBy = req.user.id;
    let result = await dbService.createDocument(Reminders, data);
    res.message = "Reminder " + result.name + MESSAGE.ITEM_ADDED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if (error.name === "ValidationError") {
    //   return utils.validationError(error.message, res);
    // }
    // if (error.code && error.code == 11000) {
    //   return utils.isDuplicate(error.message, res);
    // }
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
        query = {
          ...req.body.query,
        };
      }
      result = await dbService.countDocument(Reminders, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Reminders have" + MESSAGE.ITEM_LIST.message;
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
        result = await dbService.getAllDocuments(Reminders, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Reminders have" + MESSAGE.ITEM_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getReminders = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Reminders, query);

    if (result) {
      res.message = `Reminder ${result.name}has` + MESSAGE.ITEM_LIST.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const updateReminders = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   remindersSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return  utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.findOneAndUpdateDocument(
      Reminders,
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
    res.message = `Reminder ${data.name}` + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if (error.name === "ValidationError") {
    //   return utils.isDuplicate(error.message, res);
    // }
    // if (error.code && error.code == 11000) {
    //   return utils.isDuplicate(error.message, res);
    // }
    return utils.failureResponse(error.message, res);
  }
};

const softDeleteReminders = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      Reminders,
      {
        _id: req.params.id,
      },
      {
        isDeleted: true,
      }
    );
    if (!result) {
      return utils.failedSoftDelete(res);
    }
    res.message = "Reminder" + MESSAGE.ITEM_DELETED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const partialUpdateReminders = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   remindersSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(Reminders, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = `Reminder ${data.name}` + MESSAGE.ITEM_UPDATED.message;

    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addReminders,
  findAllReminders,
  getReminders,
  updateReminders,
  softDeleteReminders,
  partialUpdateReminders,
};
