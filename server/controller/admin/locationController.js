const Location = require("../../model/v1/location");
const utils = require("../../utils/messages");
const locationSchemaKey = require("../../utils/validation/locationValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const deleteDependentService = require("../../utils/deleteDependent");
const user = require("../../model/v1/user");
const { MESSAGE } = require("../../config/message");
const Role = require("../../model/v1/role");
const { ROLE } = require("../../config/authConstant");
const { User } = require("recurly");
const addLocation = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,locationSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let data = new Location({
      ...req.body,
    });

    //data.addedBy = req.user._id;
    if (data.subOwnerId) {
      let ownerId = await user.findOne({ _id: data.subOwnerId });
      if (ownerId) {
        data.assignTo = ownerId.parentId;
        data.assignee = [ownerId.parentId, ownerId._id];
      }
    }
    let result = await dbService.createDocument(Location, data);
    if (result.assignTo) {
      await user.updateMany(
        {
          _id: { $in: [result.subOwnerId, result.assignTo] },
        },
        {
          $addToSet: {
            locationIds: result._id,
          },
        }
      );
    }

    res.message =
      "Location " + result.locationName + MESSAGE.ITEM_ADDED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if (error.name === "ValidationError") {
    //     return utils.validationError(error.message, res);
    // }
    // if (error.code && error.code == 11000) {
    //     return utils.isDuplicate(error.message, res);
    // }
    logger.error("Error - addLocation", error);
    return utils.failureResponse(error, res);
  }
};
const findAllLocation = async (req, res) => {
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
      result = await dbService.countDocument(Location, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Locations have" + MESSAGE.ITEM_LIST;
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
        result = await dbService.getAllDocuments(Location, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = "All Locations have" + MESSAGE.ITEM_LIST;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    logger.error("Error - findAllLocation", error);
    return utils.failureResponse(error, res);
  }
};

const getLocation = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Location, query);

    if (result) {
      res.message =
        `Location ${result.locationName} has` + MESSAGE.ITEM_LIST.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    logger.error("Error - getLocation", error);
    return utils.failureResponse(error, res);
  }
};
const updateLocation = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //     data,
    //     locationSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //     return utils.inValidParam(isValid.details, res);
    // }
    const location = await Location.findById(data.id);
    if (location === null) {
      throw new Error("Location is not defined");
    }
    if (location.subOwnerId !== null) {
      let locationIds = [location.subOwnerId, location.assignTo];
      await user.updateMany(
        {
          _id: {
            $in: locationIds,
          },
        },
        {
          $pull: {
            locationIds: data.id,
          },
        }
      );
      await Location.updateMany(
        {
          _id: data.id,
        },
        {
          $pull: {
            assignee: { $in: [location.subOwnerId, location.assignTo] },
          },
        }
      );
      if (data.subOwnerId) {
        let ownerId = await user.findOne({ _id: data.subOwnerId });
        let locationData = await Location.findById(data.id);
        if (ownerId) {
          data.assignTo = ownerId.parentId;
          data.assignee = locationData.assignee.concat([
            ownerId.parentId,
            ownerId._id,
          ]);
        }
      }
    }

    let result = await dbService.findOneAndUpdateDocument(
      Location,
      {
        _id: req.params.id,
      },
      data,
      {
        new: true,
      }
    );
    if (result.assignTo) {
      await user.updateMany(
        {
          _id: { $in: [result.subOwnerId, result.assignTo] },
        },
        {
          $addToSet: {
            locationIds: result._id,
          },
        }
      );
    }

    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message =
      `Location ${data.locationName}` + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if (error.name === "ValidationError") {
    //     return utils.isDuplicate(error.message, res);
    // }
    // if (error.code && error.code == 11000) {
    //     return utils.isDuplicate(error.message, res);
    // }
    logger.error("Error - updateLocation", error);
    return utils.failureResponse(error, res);
  }
};
const softDeleteLocation = async (req, res) => {
  try {
    // let possibleDependent = [
    //   //{
    //   //     model: 'order',
    //   //     refId: 'locationId'
    //   // },
    //   // {
    //   //     model: 'transaction',
    //   //     refId: 'locationId'
    //   // },
    //   // {
    //   //     model: 'appointment',
    //   //     refId: 'locationId'
    //   // },
    //   // {
    //   //     model: 'product',
    //   //     refId: 'locationId'
    //   // }
    // ];
    let id = req.params.id;
    let body = { ...req.body };
    let result;
    let userRole = await Role.findOne({ _id: req.user.roleId }).select("code");
    let userData = await user.findOne({ _id: body.userId });
    let bodyUserRole = await Role.findOne({ _id: userData.roleId }).select(
      "code"
    );
    if (
      [ROLE.ADMIN, ROLE.OWNER, ROLE.SUPER_ADMIN].includes(userRole.code) &&
      [ROLE.ADMIN, ROLE.OWNER, ROLE.SUPER_ADMIN].includes(bodyUserRole.code)
    ) {
      result = await dbService.updateDocument(
        Location,
        {
          _id: id,
        },
        {
          isDelete: true,
          isActive: false,
        }
      );
    } else {
      let userIds = [];
      let updateObj = {};
      if (bodyUserRole.code == ROLE.SUB_OWNER) {
        userIds = await dbService.getHierachicalId(body.userId);
        updateObj = {
          $pull: {
            assignee: { $in: userIds },
          },
          $unset: {
            subOwnerId: "",
          },
        };
      } else {
        updateObj = {
          $pull: {
            assignee: body.userId,
          },
        };
        userIds = [userData._id];
      }
      await user.updateMany(
        {
          _id: { $in: userIds },
        },
        {
          $pull: {
            locationIds: id,
          },
        }
      );

      result = await Location.updateMany(
        {
          _id: id,
        },
        updateObj,
        {
          multi: true,
        }
      );
    }
    res.message = "Location" + MESSAGE.ITEM_DELETED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - softDeleteLocation", error);
    return utils.failureResponse(error, res);
  }
};

const partialUpdateLocation = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //     data,
    //     locationSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //     return utils.inValidParam(isValid.details, res);
    // }
    const location = await Location.findById(data.id);
    // const user = await user.find()
    let subOwnerId = await user.updateOne(
      {
        _id: location.subOwnerId,
      },
      {
        $pull: {
          locationIds: data.id,
        },
      }
    );
    let assignToId = await user.updateOne(
      {
        _id: location.assignTo,
      },
      {
        $pull: {
          locationIds: data.id,
          clinicLocations: data.id,
        },
      }
    );
    let result = await dbService.updateDocument(
      Location,
      {
        _id: req.params.id,
      },
      data
    );
    let ownerData = await user.updateOne(
      {
        _id: data.assignTo,
      },
      {
        $push: {
          locationIds: data.id,
          clinicLocations: data.id,
        },
      }
    );
    let subOwnerData = await user.updateOne(
      {
        _id: data.subOwnerId,
      },
      {
        $push: {
          locationIds: data.id,
        },
      }
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message =
      `Location ${data.locationName}` + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - partialUpdate", error);
    return utils.failureResponse(error, res);
  }
};

const updateLocationStatus = async (req, res) => {
  try {
    let body = {
      ...req.body,
    };
    let result = await dbService.updateDocument(Location, req.params.id, body);
    res.message =
      `Location ${result.locationName}` + MESSAGE.ITEM_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - partialUpdate", error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addLocation,
  findAllLocation,
  getLocation,
  updateLocation,
  softDeleteLocation,
  partialUpdateLocation,
  updateLocationStatus,
};
