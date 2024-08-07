const role = require("../../model/v1/role");
const utils = require("../../utils/messages");
const service = require("../../utils/dbService");
const {
  permissionRole,
  createOrUpdatePermission,
  userPermission,
  createOrUpdatePermissionForUser,
} = require("../../lib/index");
const _ = require("lodash");
const getRoles = async (req, res) => {
  try {
    const body = req.body,
      where = {};
    if (body.hasOwnProperty("codes")) {
      where.code = {
        $in: body.codes,
      };
    }
    const result = await role.find(where).select(["name", "code"]);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - getRoles", error);
    return utils.failureResponse(error, res);
  }
};

const permission_role = async (req, res) => {
  try {
    const result = await permissionRole(req.params.id);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - permission_role", error);
    return utils.failureResponse(error, res);
  }
};

const createOrUpdatePermissionofRole = async (req, res) => {
  try {
    const body = req.body;
    if (!body.permissions || _.isEmpty(body.permissions)) {
      throw new Error("Please provide permissions");
    }
    const result = await createOrUpdatePermission(
      req.params.roleId,
      body.permissions
    );
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - createOrUpdatePermissionofRole", error);
    return utils.failureResponse(error, res);
  }
};

const permission_user_role = async (req, res) => {
  try {
    const result = await userPermission(req.params.id);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - permission_role", error);
    return utils.failureResponse(error, res);
  }
};

const createOrUpdatePermissionByUserId = async (req, res) => {
  try {
    const body = req.body;
    if (!body.permissions || _.isEmpty(body.permissions)) {
      throw new Error("Please provide permissions");
    }
    const result = await createOrUpdatePermissionForUser(
      req.params.userId,
      body.permissions
    );
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - createOrUpdatePermissionofUser", error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  getRoles,
  permission_role,
  createOrUpdatePermissionofRole,
  permission_user_role,
  createOrUpdatePermissionByUserId,
};
