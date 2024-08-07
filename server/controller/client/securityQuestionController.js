const SecurityQuestion = require("../../model/securityQuestion");
const utils = require("../../utils/messages");
const securityQuestionSchemaKey = require("../../utils/validation/securityQuestionValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");

const addSecurityQuestion = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,securityQuestionSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = new SecurityQuestion({ ...req.body });
    let result = await dbService.createDocument(SecurityQuestion, data);

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
const findAllSecurityQuestion = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      result = await dbService.countDocument(SecurityQuestion, query);
      if (result) {
        result = { totalRecords: result };
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = { ...req.body.options };

        if (req.body.query !== undefined) {
          query = { ...req.body.query };
        }
        result = await dbService.getAllDocuments(
          SecurityQuestion,
          query,
          options
        );

        if (!result) {
          return utils.recordNotFound([], res);
        }
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getSecurityQuestion = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(SecurityQuestion, query);

    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const getSecurityQuestionCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where) {
      where = req.body.where;
    }
    let result = await dbService.countDocument(SecurityQuestion, where);
    if (result) {
      result = { totalRecords: result };
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

// const getSecurityQuestionByAggregate = async (req,res)=>{
//   try{
//     let result=await dbService.getDocumentByAggregation(SecurityQuestion,req.body);
//     if(result){
//       return utils.successResponse(result, res);
//     }
//     return utils.recordNotFound([],res);
//   }catch(error){
//     return utils.failureResponse(error.message,res);
//   }
// };
const updateSecurityQuestion = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   securityQuestionSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return  utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(
      SecurityQuestion,
      { _id: req.params.id },
      data
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

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
// const partialUpdateSecurityQuestion = async (req, res) => {
//   try {
//     const data = {
//       ...req.body,
//       id: req.params.id
//     };
//     let isValid = validation.validateParamsWithJoi(
//       data,
//       securityQuestionSchemaKey.updateSchemaKeys
//     );
//     if (isValid.error) {
//       return utils.inValidParam(isValid.details, res);
//     }
//     let result = await dbService.updateDocument(SecurityQuestion, req.params.id, data);
//     if (!result) {
//       return utils.failureResponse("something is wrong", res);
//     }

//     return utils.successResponse(result, res);
//   }
//   catch(error){
//     return utils.failureResponse(error.message, res);
//   }
// };
const softDeleteSecurityQuestion = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      SecurityQuestion,
      { _id: req.params.id },
      { isDeleted: true, isActive: false }
    );
    if (!result) {
      return utils.failedSoftDelete(res);
    }
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
// const bulkInsertSecurityQuestion = async(req,res)=>{
//   try{
//     let data;
//     if(req.body.data !== undefined && req.body.data.length){
//       data = req.body.data;
//       let result =await dbService.bulkInsert(SecurityQuestion,data);
//       return  utils.successResponse(result, res);
//     }else{
//       return utils.failureResponse('Invalid Data',res);
//     }
//   }catch(error){
//     if(error.name === "ValidationError"){
//       return utils.validationError(error.message, res);
//     }
//     if(error.code && error.code == 11000){
//       return utils.isDuplicate(error.message, res);
//     }
//     return utils.failureResponse(error.message,res);
//   }
// };
// const bulkUpdateSecurityQuestion=async(req,res)=>{
//   try {
//     let filter={};
//     let data;
//     if(req.body.filter !== undefined){
//       filter = req.body.filter;
//     }
//     if(req.body.data !== undefined){
//       data = req.body.data;
//       let result = await dbService.bulkUpdate(SecurityQuestion,filter,data);
//       if(!result){
//         return utils.failureResponse("something is wrong.",res);
//       }
//       return  utils.successResponse(result, res);
//     }
//     else{
//       return utils.failureResponse("Invalid Data", res);
//     }
//   }
//   catch(error){
//     return utils.failureResponse(error.message,res);
//   }
// };

module.exports = {
  addSecurityQuestion,
  findAllSecurityQuestion,
  getSecurityQuestion,
  getSecurityQuestionCount,
  //getSecurityQuestionByAggregate,
  updateSecurityQuestion,
  // partialUpdateSecurityQuestion,
  softDeleteSecurityQuestion,
  //bulkInsertSecurityQuestion,
  //bulkUpdateSecurityQuestion,
};
