const UserDetails = require("../../model/userDetails");
const User = require("../../model/v1/user");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const userDetailsValidation = require("../../utils/validation/userDetailsValidation");
const validation = require("../../utils/validateRequest");

const addUserDetails = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      userDetailsValidation.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const data = req.body;
    const result = await dbService.createDocument(UserDetails, data);
    await dbService.findOneAndUpdateDocument(
      User,
      { _id: data.userId },
      { onboardProgress: (data?.onboardSteps / data?.totalOnboardSteps) * 100 }
    );
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error-addUserDetails", error);
    return utils.failureResponse(error, res);
  }
};
const updateUserDetails = async (req, res) => {

  console.log(`req.body`, req.body)


  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      userDetailsValidation.updateSchemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const data = req.body;
    const result = await dbService.findOneAndUpdateDocument(
      UserDetails,
      { _id: req.params.id },
      data,
      { new: true }
    );
    data?.onboardSteps &&
      data?.totalOnboardSteps &&
      (await dbService.findOneAndUpdateDocument(
        User,
        { _id: data.userId },
        { onboardProgress: (data.onboardSteps / data.totalOnboardSteps) * 100 }
      ));


    data?.selectedLocation &&
      (await dbService.findOneAndUpdateDocument(
        User,
        { _id: data.userId },
        { locationIds: [data?.selectedLocation.id] }
      ));

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error-updateUserDetails", error);
    return utils.failureResponse(error, res);
  }
};

const getUserDetails = async (req, res) => {
  try {
    let result = await UserDetails.findOne({ userId: req.params.id }).populate({
      path: "fingerSign",
      select: "uri",
    });
    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    logger.error("Error-getUserDetails", error);
    return utils.failureResponse(error, res);
  }
};
module.exports = {
  addUserDetails,
  updateUserDetails,
  getUserDetails,
};
