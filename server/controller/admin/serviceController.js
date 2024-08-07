const Service = require("../../model/v1/service");
const Category = require("../../model/v1/category"); // replace with your actual path

const Location = require("../../model/v1/location");
const utils = require("../../utils/messages");
const serviceSchemaKey = require("../../utils/validation/serviceValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const deleteDependentService = require("../../utils/deleteDependent");
const { ITEM } = require("../../config/authConstant");
const { createItem, updateItem, disableItem } = require("../../config/recurly");
const { MESSAGE } = require("../../config/message");

const addService = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,serviceSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let options = {};
    var data = new Service({
      ...req.body,
    });
    if (req.body.allLocation) {
      options.projection = "_id";
      const findAllLocation = await dbService.getAllDocuments(
        Location,
        {},
        options
      );
      data.locationIds = findAllLocation.data.map((doc) => doc._id);
    }

    let result = await dbService.createDocument(Service, data);
    const item = await createItem(result, ITEM.SERVICE);
    res.message = `Service ${result.name}` + MESSAGE.ITEM_ADDED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if(error.name === "ValidationError"){
    //   return utils.validationError(error.message, res);
    // }
    // if(error.code && error.code == 11000){
    //   return utils.isDuplicate(error.message, res);
    // }
    return utils.failureResponse(error, res);
  }
};

const findAllService = async (req, res) => {
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
      result = await dbService.countDocument(Service, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Services have" + MESSAGE.ITEM_LIST.message;
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
        result = await dbService.getAllDocuments(Service, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Services have" + MESSAGE.ITEM_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    logger.error("error", error);
    return utils.failureResponse(error, res);
  }
};

const getService = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Service, query);

    if (result) {
      res.message = `Service ${result.name} has` + MESSAGE.ITEM_LIST.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const updateService = async (req, res) => {
  try {
    let options = {};
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   serviceSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return  utils.inValidParam(isValid.details, res);
    // }

    if (req.body.allLocation) {
      options.projection = "_id";
      const findAllLocation = await dbService.getAllDocuments(
        Location,
        {},
        options
      );
      data.locationIds = findAllLocation.data.map((doc) => doc._id);
    }

    let result = await dbService.findOneAndUpdateDocument(
      Service,
      {
        _id: req.params.id,
      },
      data,
      {
        new: true,
      }
    );
    const item = await updateItem(result, ITEM.SERVICE);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = `Service ${result.name} has` + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if(error.name === "ValidationError"){
    //   return utils.isDuplicate(error.message, res);
    // }
    // if(error.code && error.code == 11000){
    //   return utils.isDuplicate(error.message, res);
    // }
    return utils.failureResponse(error, res);
  }
};
const softDeleteService = async (req, res) => {
  try {
    let possibleDependent = [
      // {
      //   model: 'appointment',
      //   refId: 'treatment'
      // }
    ];
    let id = req.params.id;
    let data = await dbService.updateDocument(
      Service,
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
    const item = await disableItem(id, ITEM.SERVICE);
    let result = await deleteDependentService.softDeleteDependent(
      possibleDependent,
      id
    );
    if (!result) {
      return utils.failureResponse("something went wrong", res);
    }
    res.message = `Service` + MESSAGE.ITEM_DELETED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const partialUpdateService = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   serviceSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(Service, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = `Service ${data.name} has` + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getAllServiceByCategoryId = async (req, res) => {
  try {
    let query = {};

    // Check if categoryId is provided in the request
    if (req.query.categoryId) {
      const categoryIds = Array.isArray(req.query.categoryId)
        ? req.query.categoryId
        : [req.query.categoryId];

      query._id = { $in: categoryIds };
    }

    if (req.query.servedBy) {
      query.servedBy = req.query.servedBy;
    }

    const categories = await Category.find(query)
      .select("_id, name servedBy")
      .lean();

    for (let category of categories) {
      category.services = await Service.find({
        categoryId: category._id,
      }).select("locationIds _id name items");
    }

    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addService,
  findAllService,
  getService,
  updateService,
  softDeleteService,
  partialUpdateService,
  getAllServiceByCategoryId,
};
