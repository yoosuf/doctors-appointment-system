const Membership = require("../../model/v1/membership");
const User = require("../../model/v1/user");
const Order = require("../../model/v1/order");
const utils = require("../../utils/messages");
const membershipSchemaKey = require("../../utils/validation/membershipValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const deleteDependentService = require("../../utils/deleteDependent");
const { MESSAGE } = require("../../config/message");

const addMembership = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,membershipSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = {
      ...req.body,
    };
    let result = await User.updateOne(
      {
        _id: req.user.id,
      },
      {
        $push: {
          membershipIds: data.membershipIds,
        },
      }
    );
    res.message = `Membership ${result.name}` + MESSAGE.ITEM_ADDED.message;
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
const findAllMembership = async (req, res) => {
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
      result = await dbService.countDocument(Membership, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Memberships have been fetched Successfully";
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
        result = await dbService.getAllDocuments(Membership, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Memberships have been fetched Successfully";
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getMembership = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Membership, query);

    if (result) {
      res.message = `Memberships ${result.name} has been fetched Successfully`;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const findAllUserMembership = async (req, res) => {
  try {
    let result = await User.findById(req.params.id).populate("membershipIds");
    res.message = "All Memberships have been fetched Successfully";
    return utils.successResponse(result.membershipIds, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};


module.exports = {
  addMembership,
  findAllMembership,
  getMembership,
  findAllUserMembership,

  // updateMembership,
  // partialUpdateMembership,
  // softDeleteMembership
};
