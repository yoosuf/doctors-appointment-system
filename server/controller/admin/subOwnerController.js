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
const Location = require("../../model/v1/location");
const { generateToken, resetPassword } = require("../../services/auth");
const path = require("path");
const { assignPermissionSubOwner } = require("../../services/seeder");
const {
  ROLE,
  JWT,
  EMAIL_SUBJECT,
  PROFILE_NOTIFICATIONS,
} = require("../../config/authConstant");
const { MESSAGE } = require("../../config/message");

const ejs = require("ejs");
const { createJob } = require("../../jobs/index");


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
const addUser = async (req, res) => {
  try {
    const body = req.body;
    // let isValid = validation.validateParamsWithJoi(
    //     req.body,
    //     userSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //     return utils.inValidParam(isValid.details, res);
    // }
    body.notificationSettings = await notification();
    const findUser = await service.findUser(body.email, body.phone);
    if (findUser && findUser.email == body.email) {
      throw new Error("This Email Address is already registered");
    } else if (findUser && findUser.phone == body.phone) {
      throw new Error("This phone number is already registered.");
    } else {
      const SubOwnerRole = await Role.findOne({
        code: ROLE.SUB_OWNER,
      });
      req.body.roleId = SubOwnerRole.id;
      if (body.generatePassword) {
        body.password = generator.generate({
          length: 8,
          numbers: true,
        });
      }
      // send email of password only not of verification
      const result = await service.createDocument(user, body);
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
      let token = await generateToken(result, body.email, JWT.SECRET);
      const htmlData = await ejs.renderFile(
        path.join(__dirname, "../../views/password-email.ejs"),
        {
          user_name: body.firstName,
          email_id: body.email,
          password: body.password,
        }
      );

      let obj = {
        email: body.email,
        subject: EMAIL_SUBJECT.PASSWORD_EMAIL,
        htmlData: htmlData,
      };
      await createJob("sendMail", obj, {});

      assignPermissionSubOwner(result._id);
      res.message =
        "Sub-Owner " +
        result.firstName +
        " " +
        result.lastName +
        MESSAGE.USER_REGISTERED.message;
      return utils.successResponse(result, res);
    }
  } catch (error) {
    logger.error("Error - addUser", error);
    return utils.failureResponse(error, res);
  }
};

const resetNewPassword = async (req, res) => {
  try {
    const body = req.body;
    /*  let isValid = validation.validateParamsWithJoi(
                     req.body,
                     authSchemaKey.resetPassword
                 );
                 if (isValid.error) {
                     return utils.inValidParam(isValid.details, res);
                 } */
    let url = req.originalUrl;
    let result = await resetPassword(url, body, req);
    if (result) {
      res.message = "Your password has been changed Successfully";
      return utils.successResponse("Your password successfully changed", res);
    }
  } catch (error) {
    logger.error("Error - resetNewPassword", error);
    return utils.failureResponse(error, res);
  }
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

    if (req.body.query !== undefined) {
      query = {
        ...req.body.query,
      };
    }
    const SubOwnerRole = await Role.findOne({
      code: ROLE.SUB_OWNER,
    });
    let roleId = await Role.findOne({ _id: req.user.roleId });
    if (roleId.code == ROLE.SUB_OWNER) {
      query._id = req.user.id;
    } else if (roleId.code == ROLE.OWNER) {
      query.parentId = req.user.id;
    }
    query.roleId = SubOwnerRole.id;
    const result = await service.getAllDocuments(user, query, options);
    res.message = "All Sub-Owners" + MESSAGE.USER_LIST.message;

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - findAllUser", error);
    return utils.failureResponse(error, res);
  }
};

const getUser = async (req, res) => {
  try {
    const result = await service.getSingleDocumentById(
      user,
      req.params.id,
      req.body.populate
    );
    if (result && result !== undefined) {
      res.message =
        "Sub-Owner " +
        result.firstName +
        " " +
        result.lastName +
        MESSAGE.USER_LIST.message;
      return utils.successResponse(
        {
          result,
          assigned_services,
          to_do,
        },
        res
      );
    } else {
      return utils.recordNotFound([], res);
    }
  } catch (error) {
    logger.error("Error - getUser", error);
    return utils.failureResponse(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    // let isValid = validation.validateParamsWithJoi(
    //     data,
    //     userSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //     return utils.inValidParam(isValid.details, res);
    // }
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
    if (data.isActive === false || data.isDelete === true) {
      const hierachicalIds = await service.getHierachicalId(req.params.id);
      let changeInOtheruser = await Promise.all(
        hierachicalIds.map(async (hId) => {
          try {
            let updateChild = await service.findOneAndUpdateDocument(
              user,
              { _id: hId },
              { isActive: false, isDelete: true },
              { new: true }
            );
          } catch (e) {
            logger.error("error", e);
          }
        })
      );
    }
    const result = await service.findOneAndUpdateDocument(
      user,
      { _id: req.params.id },
      data,
      { new: true }
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
    res.message =
      "Sub-Owner " +
      result.firstName +
      " " +
      result.lastName +
      MESSAGE.USER_UPDATED.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - updateUser", error);
    return utils.failureResponse(error, res);
  }
};

// for warning - request { isWarning : true }
const deleteUser = async (req, res) => {
  let posibleDependent = [];
  if (req.body.isWarning) {
    let all = await Promise.all(
      posibleDependent.map(async (e) => {
        try {
          let allRecords = {};
          let where = {};
          where[e.refId] = req.params.id;
          var query = await service.countDocument(
            mongoose.model(e.model),
            where
          );
          allRecords["model"] = e.model;
          allRecords["count"] = query;
          return allRecords;
        } catch (error) {
          logger.error("Error - deleteUser", error);
          return utils.failureResponse(error, res);
        }
      })
    );
    return utils.successResponse(all, res);
  } else {
    let isDelete = await Promise.all(
      posibleDependent.map(async (e) => {
        try {
          let where = {};
          where[e.refId] = req.params.id;
          return await mongoose.model(e.model).deleteMany(where);
        } catch (error) {
          logger.error("Error - deleteUser", error);
          utils.failureResponse(error, res);
        }
      })
    );
    if (isDelete) {
      const result = await service.deleteDocument(user, req.params.id);
      utils.successResponse(result, res);
    } else {
      utils.failureResponse("something is wrong.", res);
    }
  }
};

const softDeleteUser = async (req, res) => {
  let pos = [];
  let data = await service.updateDocument(
    user,
    {
      _id: req.params.id,
    },
    {
      isDelete: true,
    }
  );
  if (!data) {
    return utils.failedSoftDelete(res);
  }
  let result = await Promise.all(
    pos.map(async (e) => {
      try {
        let where = {};
        where[e.refId] = req.params.id;
        var query = await mongoose.model(e.model).findOneAndUpdate(where, {
          isDelete: true,
        });
        return query;
      } catch (error) {
        logger.error("Error - softDeleteUser", error);
        utils.failureResponse(error, res);
      }
    })
  );
  res.message = "Sub-Owner" + MESSAGE.USER_DELETED.message;
  utils.successResponse(result, res);
};

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
const updateProfile = async (req, res) => {
  try {
    let data = {
      ...req.body,
    };

    const findUser = await service.findUser(data.email, data.phone);
    const result = await service.updateDocument(user, req.user.id, data);
    // if (findUser && findUser.email !== data.email) {
    //   let token = await generateToken(findUser, data.email, JWT.SECRET)
    //   /*  let link = `${process.env.ADMIN_FRONTEND_URL}/admin/set-password?token=${token}`;
    //          const htmlData = await ejs.renderFile(path.join(__dirname, '../../views/reset_password.ejs'), {
    //              user_name: data.firstName,
    //              confirm_link: link,
    //          });
    //          await sendEmail(data.email, EMAIL_SUBJECT.RESET_PASSWORD_LINK, htmlData); */
    // }
    return utils.updateProfileResponse({}, res);
  } catch (error) {
    logger.error("Error - updateProfile", error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addUser,
  resetNewPassword,
  findAllUser,
  getUser,
  updateUser,
  deleteUser,
  softDeleteUser,
  getProfile,
  updateProfile,
};
