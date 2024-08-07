const ipAddress = require("../../model/ipAddress");
const utils = require("../../utils/messages");
const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");
const dbService = require("../../utils/dbService");
const user = require("../../model/v1/user");
const { MESSAGE } = require("../../config/message");
const Role = require("../../model/v1/role");
const { ROLE } = require("../../config/authConstant");

const addIpAddress = async (req, res) => {
  try {
    const data = new ipAddress({
      ...req.body,
    });
    const result = await service.createDocument(ipAddress, data);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - addIpAddress", error);
    return utils.failureResponse(error, res);
  }
};

const findAllIpAddress = async (req, res) => {
  try {
    let options = {};
    let query = {};
    if (req.body.options !== undefined) {
      options = { ...req.body.options };
    }
    if (req.body.query !== undefined) {
      query = { ...req.body.query };
    }
    const result = await service.getAllDocuments(ipAddress, query, options);

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - findAllIpAddress", error);
    return utils.failureResponse(error, res);
  }
};

const getIpAddress = async (req, res) => {
  try {
    const result = await ipAddress
      .findOne({ _id: req.params.id })
      .populate("locationIds");
    if (result && result !== undefined) {
      return utils.successResponse(result, res);
    } else {
      return utils.recordNotFound([], res);
    }
  } catch (error) {
    logger.error("Error - getIpAddress", error);
    return utils.failureResponse(error, res);
  }
};

const updateIpAddress = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const result = await service.findOneAndUpdateDocument(
      ipAddress,
      { _id: req.params.id },
      data,
      { new: true }
    );
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - updateIpAddress", error);
    return utils.failureResponse(error, res);
  }
};

const softDeleteIpAddress = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      ipAddress,
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
    res.message = "Delete" + MESSAGE.DELETE_SUCCESSFULLY.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - softDeleteIpAddress", error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addIpAddress,
  findAllIpAddress,
  getIpAddress,
  updateIpAddress,
  softDeleteIpAddress,
};
