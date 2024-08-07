const Address = require("../../model/address");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const deleteDependentService = require("../../utils/deleteDependent");
const { MESSAGE } = require("../../config/message");
const { checkRequest } = require("../../services/address");

const addAddress = async (req, res) => {
  try {

    console.log(req.body)
    const data = new Address({
      ...req.body
    });
    const result = await dbService.createDocument(Address, data);
    res.message = MESSAGE.ADDRESS_ADDED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - addAddress", error);
    return utils.failureResponse(error, res);
  }
};
const findAllAddress = async (req, res) => {
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
      result = await dbService.countDocument(Address, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = MESSAGE.ADDRESS_LIST.message;
        return utils.successResponse(result, res);
      }
      res.message = MESSAGE.NO_RECORD_FOUND.message;
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        if (req.body.options.populate) {
          delete req.body.options.populate;
        }
        options = {
          ...req.body.options,
        };

        if (req.body.query !== undefined) {
          query = {
            ...req.body.query,
          };
        }
        result = await dbService.getAllDocuments(Address, query, options);

        if (!result) {
          res.message = MESSAGE.NO_RECORD_FOUND.message;
          return utils.recordNotFound([], res);
        }
        res.message = MESSAGE.ADDRESS_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    logger.error("Error - findAllAddress", error);
    return utils.failureResponse(error, res);
  }
};

const getAddress = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Address, query);

    if (result) {
      res.message = MESSAGE.ADDRESS_GET.message;
      return utils.successResponse(result, res);
    }
    res.message = MESSAGE.NO_RECORD_FOUND.message;
    return utils.recordNotFound([], res);
  } catch (error) {
    logger.error("Error - getAddress", error);
    return utils.failureResponse(error, res);
  }
};
const updateAddress = async (req, res) => {
  try {
    const body = await checkRequest(req.body);
    const data = {
      ...body,
    };
    const result = await dbService.findOneAndUpdateDocument(
      Address,
      req.params.id,
      data
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = MESSAGE.ADDRESS_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - updateAddress", error);
    return utils.failureResponse(error, res);
  }
};
const softDeleteAddress = async (req, res) => {
  try {
    let possibleDependent = [
      {
        model: "location",
        refId: "locationAddressId",
      },
    ];
    let id = req.params.id;
    let data = await dbService.updateDocument(
      Address,
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
    res.message = MESSAGE.ADDRESS_DELETED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - softDeleteAddress", error);
    return utils.failureResponse(error, res);
  }
};

const partialUpdateAddress = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   addressSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(Address, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = MESSAGE.ADDRESS_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error -partialUpdate", error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addAddress,
  findAllAddress,
  getAddress,
  updateAddress,
  softDeleteAddress,
  partialUpdateAddress,
};
