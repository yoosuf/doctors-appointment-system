const UserDetails = require("../../model/userDetails");
const utils = require("../../utils/messages");

const getUserDetails = async (req, res) => {
  try {
    let result = await UserDetails.findOne({ userId: req.params.id }).populate({
      path: "fingerSign refferalInformation.aboutUs visitReason discomfort aggravates",
      select: "uri name code",
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
  getUserDetails,
};
