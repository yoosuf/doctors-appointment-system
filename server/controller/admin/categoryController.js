const Category = require("../../model/v1/category");
const utils = require("../../utils/messages");
const categorySchemaKey = require("../../utils/validation/categoryValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const deleteDependentService = require("../../utils/deleteDependent");
const { MESSAGE } = require("../../config/message");
const { createItem, updateItem, disableItem } = require("../../config/recurly");
const { ITEM } = require("../../config/authConstant");

const addCategory = async (req, res) => {

  console.log(res)

  try {
    // let isValid = validation.validateParamsWithJoi(req.body,categorySchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = new Category({
      ...req.body,
    });
    let result = await dbService.createDocument(Category, data);
    let item = await createItem(result, ITEM.CATEGORY);
    res.message = result.name + MESSAGE.ITEM_ADDED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const findAllCategory = async (req, res) => {
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
      result = await dbService.countDocument(Category, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Categories have" + MESSAGE.ITEM_LIST.message;
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
        result = await dbService.getAllDocuments(Category, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Categories have" + MESSAGE.ITEM_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getCategory = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Category, query);

    if (result) {
      res.message =
        "Category " + result.name + " has" + MESSAGE.ITEM_GET.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const updateCategory = async (req, res) => {

  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };

    let result = await dbService.findOneAndUpdateDocument(
      Category,
      {
        _id: req.params.id,
      },
      data,
      { new: true }
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = "Category " + data.name + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const softDeleteCategory = async (req, res) => {
  try {
    let possibleDependent = [
      // {
      //   model: 'service',
      //   refId: 'categoryId'
      // },
      // {
      //   model: 'product',
      //   refId: 'categoryId'
      // }
    ];
    let id = req.params.id;
    let data = await dbService.updateDocument(
      Category,
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
    res.message = "Category" + MESSAGE.ITEM_DELETED;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const partialUpdateCategory = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   categorySchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(Category, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = "Category " + data.name + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addCategory,
  findAllCategory,
  getCategory,
  updateCategory,
  softDeleteCategory,
  partialUpdateCategory,
};
