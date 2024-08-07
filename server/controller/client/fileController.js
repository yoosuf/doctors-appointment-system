const File = require("../../model/file");
const utils = require("../../utils/messages");
const fileSchemaKey = require("../../utils/validation/fileValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const deleteDependentService = require("../../utils/deleteDependent");

const { MESSAGE } = require("../../config/message");
const addFile = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body, fileSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = new File({
      ...req.body,
    });
    let result = await dbService.createDocument(File, data);
    res.message = "File " + result.name + MESSAGE.ITEM_ADDED.message;
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
const findAllFile = async (req, res) => {
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
      result = await dbService.countDocument(File, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Files have" + MESSAGE.ITEM_LIST.message;
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
        result = await dbService.getAllDocuments(File, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Files have" + MESSAGE.ITEM_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getFile = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(File, query);

    if (result) {
      res.message = result.name + " has" + MESSAGE.ITEM_LIST.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const getFileCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where) {
      where = req.body.where;
    }
    let result = await dbService.countDocument(File, where);
    if (result) {
      result = {
        totalRecords: result,
      };
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const updateFile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   fileSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.findOneAndUpdateDocument(
      File,
      {
        _id: req.params.id,
      },
      data,
      { new: true }
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = "File " + data.name + MESSAGE.ITEM_UPDATED.message;
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
const softDeleteFile = async (req, res) => {
  try {
    let possibleDependent = [
      {
        model: "membership",
        refId: "imageId",
      },
      {
        model: "category",
        refId: "imageId",
      },
    ];
    let id = req.params.id;
    let data = await dbService.updateDocument(
      File,
      {
        _id: id,
      },
      {
        isDeleted: true,
        isActive: false,
      }
    );
    if (!data) {
      return utils.failedSoftDelete(res);
    }
    let result = await deleteDependentService.softDeleteDependent(
      possibleDependent,
      id
    );
    if (!result) {
      return utils.failureResponse("something went wrong", res);
    }
    res.message = "File" + MESSAGE.ITEM_DELETED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const partialUpdateFile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   fileSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(File, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = "File " + data.name + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

module.exports = {
  addFile,
  findAllFile,
  getFile,
  getFileCount,
  updateFile,
  softDeleteFile,
  partialUpdateFile,
};
