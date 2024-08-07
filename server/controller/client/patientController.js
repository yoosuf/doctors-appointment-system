const user = require("../../model/v1/user");
const service = require("../../utils/dbService");
const utils = require("../../utils/messages");
const Role = require("../../model/v1/role");
const _ = require("lodash");
const { JWT, ROLE, EMAIL_SUBJECT } = require("../../config/authConstant");
const ejs = require("ejs");
const { generateToken, resetPassword } = require("../../services/auth");
const path = require("path");
/* const {
	sendEmail
} = require('../../config/email');
 */
const getProfile = async (req, res) => {
  try {
    let options = {};
    let query = {};

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
    query._id = req.user.id;
    const result = await service.getAllDocuments(user, query, options);
    if (result && result !== undefined) {
      return utils.successResponse(result, res);
    } else {
      return utils.recordNotFound([], res);
    }
  } catch (error) {
    logger.error("Error - getProfile", error);
    return utils.failureResponse(error, res);
  }
};
const updateProfile = async (req, res) => {
  try {
    let data = {
      ...req.body,
    };

    const findUser = await service.findUser(data.email, data.phone);
    const result = await service.updateDocument(user, req.user.id, data);
    if (findUser && findUser.email !== data.email) {
      let token = await generateToken(findUser, data.email, JWT.SECRET);
      let link = `${process.env.APP_URL}/set-password?token=${token}`;
      /*   const htmlData = await ejs.renderFile(path.join(__dirname, '../../views/reset_password.ejs'), {
			      user_name: data.firstName,
			      confirm_link: link,
			  });
			  await sendEmail(data.email, EMAIL_SUBJECT.RESET_PASSWORD_LINK, htmlData); */
    }
    return utils.updateProfileResponse({}, res);
  } catch (error) {
    logger.error("Error - updateProfile", error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
