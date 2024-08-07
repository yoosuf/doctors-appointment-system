const DocFile = require("../../model/docFile");
const File = require("../../model/file");
const utils = require("../../utils/messages");
const docFileSchemaKey = require("../../utils/validation/docFileValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const _ = require("lodash");
const { MESSAGE } = require("../../config/message");
const addDocFile = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,docFileSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = new DocFile({
      ...req.body,
    });
    const imageIds = [];
    const promises = data.imageIds.map(async (doc) => {
      imageIds.push(await File.findById(doc));
    });
    const contents = await Promise.all(promises);
    data.imageIds = imageIds;
    let result = await dbService.createDocument(DocFile, data);
    res.message = "File " + result.title + MESSAGE.ITEM_ADDED.message;
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
const findAllDocFile = async (req, res) => {
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
      result = await dbService.countDocument(DocFile, query);
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
        result = await dbService.getAllDocuments(DocFile, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Files have" + MESSAGE.ITEM_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getDocFile = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(DocFile, query);

    if (result) {
      res.message = "File " + result.title + MESSAGE.ITEM_LIST.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const updateDocFile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   docFileSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return  utils.inValidParam(isValid.details, res);
    // }
    const imageIds = [];
    const promises = data.imageIds.map(async (doc) => {
      imageIds.push(await File.findById(doc));
    });
    const contents = await Promise.all(promises);
    data.imageIds = imageIds;
    let result = await dbService.findOneAndUpdateDocument(
      DocFile,
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
    res.message = "File " + data.title + MESSAGE.ITEM_UPDATED.message;
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
const partialUpdateDocFile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   docFileSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(DocFile, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = "File " + data.title + MESSAGE.ITEM_UPDATED.message;

    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const softDeleteDocFile = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      DocFile,
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
    res.message = "File" + MESSAGE.ITEM_DELETED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addDocFile,
  findAllDocFile,
  getDocFile,
  updateDocFile,
  softDeleteDocFile,
  partialUpdateDocFile,
};
