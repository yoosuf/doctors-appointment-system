const Transaction = require("../../model/transaction");
const utils = require("../../utils/messages");
const transactionSchemaKey = require("../../utils/validation/transactionValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const { recurlyTransaction } = require("../../config/recurly");
const { MESSAGE } = require("../../config/message");
const addTransaction = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,transactionSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = new Transaction({
      ...req.body,
    });
    let result = await dbService.createDocument(Transaction, data);
    res.message = MESSAGE.TRANSACTION_CREATE.message;
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
const findAllTransaction = async (req, res) => {
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
      result = await dbService.countDocument(Transaction, query);
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = MESSAGE.TRANSACTION_LIST.message;
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
            "createdBy._id": {
              $in: await dbService.getHierachicalId(req.user.id),
            },
          };
        }
        result = await dbService.getAllDocuments(Transaction, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = MESSAGE.TRANSACTION_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getTransaction = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Transaction, query);

    if (result) {
      res.message = MESSAGE.TRANSACTION_FETCH.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const updateTransaction = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   transactionSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return  utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(
      Transaction,
      {
        _id: req.params.id,
      },
      data
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = MESSAGE.TRANSACTION_UPDATE.message;
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
// const partialUpdateTransaction = async (req, res) => {
//   try {
//     const data = {
//       ...req.body,
//       id: req.params.id
//     };
//     let isValid = validation.validateParamsWithJoi(
//       data,
//       transactionSchemaKey.updateSchemaKeys
//     );
//     if (isValid.error) {
//       return utils.inValidParam(isValid.details, res);
//     }
//     let result = await dbService.updateDocument(Transaction, req.params.id, data);
//     if (!result) {
//       return utils.failureResponse("something is wrong", res);
//     }

//     return utils.successResponse(result, res);
//   }
//   catch(error){
//     return utils.failureResponse(error.message, res);
//   }
// };
const softDeleteTransaction = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      Transaction,
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
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getRecurlyTransaction = async (req, res) => {
  try {
    let result = await recurlyTransaction(req.body.transactionId);
    if (result) {
      res.mesage = MESSAGE.TRANSACTION_FETCH.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addTransaction,
  findAllTransaction,
  getTransaction,
  getRecurlyTransaction,
  updateTransaction,
  softDeleteTransaction,

  // partialUpdateTransaction,
};
