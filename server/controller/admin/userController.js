const user = require("../../model/v1/user");
const utils = require("../../utils/messages");
const securityQuestion = require("../../model/securityQuestion");
//const userSchemaKey = require("../../utils/validation/userValidation");
//const authSchemaKey = require("../../utils/validation/authValidation");
//const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");
const generator = require("generate-password");
const mongoose = require("../../config/db");
const Role = require("../../model/v1/role");
const Master = require("../../model/master");
var ObjectId = require("mongodb").ObjectId;
const _ = require("lodash");
const Location = require("../../model/v1/location");
const { generateToken, resetPassword } = require("../../services/auth");
const path = require("path");
//const {sendEmail} = require('../../config/email');
const { assignPermissionSubOwner } = require("../../services/seeder");
const {
  ROLE,
  JWT,
  EMAIL_SUBJECT,
  PROFILE_NOTIFICATIONS,
} = require("../../config/authConstant");
const { MESSAGE } = require("../../config/message");


const notification = async () => {
  let notificationArray = [];
  Object.entries(PROFILE_NOTIFICATIONS).map(async ([key, value]) => {
    let notification = await Master.findOne({
      code: value,
    });
    notificationArray.push({
      _id: notification._id,
      value: notification.value,
    });
  });

  return notificationArray;
};

const findAllUser = async (req, res) => {
  try {
    let options = {};
    let query = {};

    if (req.body.options !== undefined) {
      options = {
        ...req.body.options,
      };
    }

    let userIds = await service.getHierachicalId(req.user.id);
    userIds = userIds.filter((value, index, arr) => {
      return value != req.user.id;
    });
    if (req.body.query !== undefined) {
      if (req.body.query.role.length != 0) {
        let role = req.body.query.role;
        let roleIds = await Role.distinct("_id", { code: { $in: role } });
        req.body.query.roleId = {
          $in: roleIds,
        };
        delete req.body.query.role;
      }
      query = {
        ...req.body.query,
      };
      if (userIds.length && query.locationIds === undefined) {
        query["_id"] = {
          $in: userIds,
        };
      }
      if (query.locationIds && query.locationIds.length) {
        query["_id"] = { $ne: req.user.id };
      }
    }

    if (query.isVerified !== undefined) {
      query["emails.isVerified"] = query.isVerified;
    }
    delete query.isVerified;
    const result = await service.getAllDocuments(user, query, options);
    res.message = "All Users" + MESSAGE.USER_LIST.message;

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - findAllUser", error);
    return utils.failureResponse(error, res);
  }
};

const postUser = async (req, res) => {
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
    query._id = req.params.id;
    const result = await service.getAllDocuments(user, query, options);
    res.message = "All Users" + MESSAGE.USER_LIST.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - findAllUser", error);
    return utils.failureResponse(error, res);
  }
};

const getUser = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await service.getSingleDocumentById(user, id);


    console.info(`###################### result`, result)

    if (result && result !== undefined) {
      res.message = MESSAGE.PROFILE_GET.message;
      return utils.successResponse(result, res);
    } else {
      return utils.recordNotFound([], res);
    }
  } catch (error) {
    logger.error("Error - getProfile", error);
    return utils.failureResponse(error, res);
  }
};
const updateUser = async (req, res) => {
  try {
    let data = {
      ...req.body,
    };
    let userData = await user.findOne({ _id: req.params.id });
    if (userData == null) {
      throw new Error("User does not exist");
    }
    if (userData.locationIds.length != 0) {
      let locationIds = userData.locationIds;
      await Location.updateMany(
        {
          _id: {
            $in: locationIds,
          },
        },
        {
          $pull: {
            assignee: req.params.id,
          },
        }
      );
    }
    let populate = [
      { path: "profile_image" },
      { path: "roleId" },
      { path: "addressIds", populate: ["address"] },
      {
        path: "purchasedPlans",
        populate: ["membershipId", "orderId"],
      },
      { path: "membershipIds" },
    ];
    const result = await service.findOneAndUpdateDocument(
      user,
      { _id: req.params.id },
      data,
      {
        new: true,
        populate: populate,
      }
    );
    let locationIds = result.locationIds;
    await Location.updateMany(
      {
        _id: {
          $in: locationIds,
        },
      },
      {
        $addToSet: {
          assignee: result._id,
        },
      }
    );
    // if (findUser && findUser.email !== data.email) {
    //   let token = await generateToken(findUser, data.email, JWT.SECRET)
    //   /*  let link = `${process.env.ADMIN_FRONTEND_URL}/admin/set-password?token=${token}`;
    //          const htmlData = await ejs.renderFile(path.join(__dirname, '../../views/reset_password.ejs'), {
    //              user_name: data.firstName,
    //              confirm_link: link,
    //          });
    //          await sendEmail(data.email, EMAIL_SUBJECT.RESET_PASSWORD_LINK, htmlData); */
    // }
    res.message = "User has been updated";
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - updateUser", error);
    return utils.failureResponse(error, res);
  }
};
const softDeleteUser = async (req, res) => {
  try {
    let result = await service.updateDocument(
      user,
      {
        _id: req.params.id,
      },
      {
        isDelete: true,
        isActive: false,
      }
    );
    res.message = "User has been deleted Successfully";
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - softDeleteUser", error);
    return utils.failureResponse(error, res);
  }
};
module.exports = {
  findAllUser,
  getUser,
  updateUser,
  postUser,
  softDeleteUser,
};
