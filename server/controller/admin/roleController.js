const Role = require("../../model/v1/role");
const utils = require("../../utils/messages");
const { MESSAGE } = require("../../config/message");
const { ROLE } = require("../../config/authConstant");
const dbService = require("../../utils/dbService");

const listRoles = async (req, res) => {
  try {
    let roles = [];
    const roleData = await dbService.getDocumentByQuery(
      Role,
      {
        _id: req.user.roleId,
      },
      ["code"]
    );
    if (roleData.code === ROLE.OWNER) {
      roles = [ROLE.ADMIN, ROLE.SUPER_ADMIN];
    }
    if (roleData.code === ROLE.SUB_OWNER) {
      roles = [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.OWNER];
    } else if (
      roleData.code === ROLE.CHIROPRACTOR ||
      roleData.code === ROLE.STAFF
    ) {
      roles = [ROLE.ADMIN, ROLE.SUPER_ADMIN, ROLE.OWNER, ROLE.SUB_OWNER];
    } else {
      roles = [ROLE.SUPER_ADMIN];
    }
    if (Boolean(Number(req.query.isGroup))) {
      roles.push(ROLE.PATIENT);
    }
    let result = await Role.find({
      code: {
        $nin: roles,
      },
    }).select("name code");
    res.message = MESSAGE.ROLE_LIST.message;
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - listRoles", error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  listRoles,
};
