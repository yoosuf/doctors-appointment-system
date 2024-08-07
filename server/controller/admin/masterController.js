const Master = require("../../model/master");
const utils = require("../../utils/messages");
const masterSchemaKey = require("../../utils/validation/masterValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const deleteDependentService = require("../../utils/deleteDependent");
const { MESSAGE } = require("../../config/message");

const addMaster = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,masterSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = new Master({
      ...req.body,
    });

    if (data.parentId === undefined) {
      let findAllMaster = await Master.findOne({
        parentId: { $exists: false },
        code: data.code,
      });
      if (findAllMaster != null) {
        throw new Error("Please enter unique code");
      }
    } else {
      let findAllSubMaster = await Master.findOne({
        parentId: data.parentId,
        code: data.code,
      });
      if (findAllSubMaster != null) {
        throw new Error("Please enter unique code");
      }
    }
    let result = await dbService.createDocument(Master, data);
    res.message = result.name + MESSAGE.ITEM_ADDED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if(error.name === "ValidationError"){
    //   return utils.validationError(error.message, res);
    // }
    // if(error.code && error.code == 11000){
    //   return utils.isDuplicate(error.message, res);
    // }
    logger.error("error", error);
    return utils.failureResponse(error, res);
  }
};
const findAllMaster = async (req, res) => {
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
      query.isDeleted = false;
      result = await dbService.countDocument(Master, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = "All Masters have" + MESSAGE.ITEM_LIST.message;
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = {
          ...req.body.options,
        };
      }
      if (req.body.query !== undefined) {
        query = {
          ...req.body.query,
        };
      }

      if (query.code !== undefined) {
        result = await Master.aggregate([
          {
            $lookup: {
              from: "master",
              localField: "_id",
              foreignField: "parentId",
              as: "subMasters",
            },
          },
          {
            $match: {
              code: {
                $in: query.code,
              },
              subMasters: {
                $exists: true,
                $not: {
                  $size: 0,
                },
              },
            },
          },
        ]);
      } else {
        query.isDeleted = false;
        result = await dbService.getAllDocuments(Master, query, options);
      }
    }
    if (!result) {
      return utils.recordNotFound([], res);
    }
    res.message = "All Masters have" + MESSAGE.ITEM_LIST.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("findAllMaster", error);
    return utils.failureResponse(error, res);
  }
};

const getMaster = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Master, query);

    if (result) {
      res.message = result.name + " has" + MESSAGE.ITEM_LIST.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const updateMaster = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   masterSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return  utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.findOneAndUpdateDocument(
      Master,
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
    res.message = data.name + MESSAGE.ITEM_UPDATED.message;
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

const softDeleteMaster = async (req, res) => {
  try {
    let id = req.params.id;
    let masterData = await Master.findById(id);
    let data;
    if (masterData.parentId === undefined) {
      data = await dbService.bulkUpdate(
        Master,
        { parentId: id },
        { isActive: false, isDeleted: true }
      );
    }

    data = await dbService.findOneAndUpdateDocument(
      Master,
      { _id: id },
      {
        isDeleted: true,
        isActive: false,
      },
      { new: true }
    );

    if (!data) {
      return utils.recordNotFound([], res);
    }
    // let result = await deleteDependentService.softDeleteMaster({ _id: id });
    // if (!result){
    //   return utils.failureResponse('something went wrong',res);
    // }
    res.message = "Master has been deleted Successfully";
    return utils.successResponse(data, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

// const softDeleteMaster = async (req, res) => {
//   try {
//     let possibleDependent = [
//       // {
//       //   model: 'reminders',
//       //   refId: 'deliveryMethod'
//       // },
//       // {
//       //   model: 'order',
//       //   refId: 'status'
//       // },
//       // {
//       //   model: 'transaction',
//       //   refId: 'status'
//       // },
//       // {
//       //   model: 'appointment',
//       //   refId: 'type'
//       // },
//       // {
//       //   model: 'membership',
//       //   refId: 'duration'
//       // },
//       // {
//       //   model: 'category',
//       //   refId: 'type'
//       // }
//     ];
//     let id = req.params.id;
//     let data = await dbService.updateDocument(Master, {
//       _id: id
//     }, {
//       isDeleted: true,
//       isActive: false
//     });
//     if (!data) {
//       return utils.failedSoftDelete(res);
//     }
//     let result = await deleteDependentService.softDeleteDependent(possibleDependent, id);
//     if (!result) {
//       return utils.failureResponse("something went wrong", res);
//     }
//     res.message = "Master" + MESSAGE.ITEM_DELETED.message
//     return utils.successResponse(result, res);
//   } catch (error) {
//     return utils.failureResponse(error, res);
//   }
// };

const partialUpdateMaster = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   masterSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(Master, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = "Master " + MESSAGE.ITEM_UPDATED.message;

    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const deleteMaster = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   masterSchemaKey.updateSchemaKeys
    // );
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.deleteDocument(Master, req.params.id);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = "Master " + MESSAGE.ITEM_DELETED.message;

    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

module.exports = {
  addMaster,
  findAllMaster,
  getMaster,
  updateMaster,
  softDeleteMaster,
  partialUpdateMaster,
  deleteMaster,
};
