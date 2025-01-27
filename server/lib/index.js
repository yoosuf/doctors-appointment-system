const Permission = require("../model/Permission");
const PermissionRole = require("../model/PermissionRole");
const Role = require("../model/v1/role");
const lodash = require("lodash");
const mongoose = require("mongoose");
const user = require("../model/v1/user");
const { ROLE } = require("../config/authConstant");

const storeModules = (route, roles) =>
  lodash.map(
    route.descriptor,
    (descriptor, key) =>
      new Promise(async (resolve, reject) => {
        try {
          if (descriptor) {
            let permission = await Permission.findOne({
              route_name: descriptor,
            });
            let data = {
              route_name: descriptor,
              module: descriptor.substring(0, descriptor.indexOf(".")),
              uri: route.path,
            };
            if (!permission) {
              permission = await Permission.create(data);
            }
            for (let [roleKey, role] of Object.entries(roles)) {
              data = {
                permissionId: permission.id,
                roleId: role.id,
              };

              const permissionRole = await PermissionRole.findOne(data);

              if (!permissionRole) {
                await PermissionRole.create(data);
              }
            }
            resolve();
          } else {
            resolve();
          }
        } catch (e) {
          return reject(e);
        }
      })
  );

const store = async (routeList) => {
  if (routeList && routeList.length) {
    try {
      const roles = await Role.find({
        code: ROLE.SUPER_ADMIN,
      });
      const permissions = lodash.map(
        routeList,
        (route, key) =>
          new Promise(async (resolve, reject) => {
            try {
              if (
                route.hasOwnProperty("descriptor") &&
                route.descriptor.length &&
                !lodash.isUndefined(lodash.first(route.descriptor)) &&
                !lodash.isNull(lodash.first(route.descriptor))
              ) {
                const modules = storeModules(route, roles);
                Promise.all(modules).then((result) => {
                  resolve();
                });
              } else {
                resolve();
              }
            } catch (e) {
              return reject(e);
            }
          })
      );
      Promise.all(permissions)
        .then((result) => {
          // logger.info("Store routes completed!");
        })
        .catch((error) => {
          logger.error("Store routes failed!", error);
        });
    } catch (e) {
      logger.error("Store routes failed!", e);
    }
  } else {
    // logger.error('Something went wrong, please try again later.!');
    // process.exit();
  }
};

const permit = async (req) => {
  if (req.route.hasOwnProperty("o")) {
    const permission = await Permission.findOne({
      route_name: req.route["o"],
    });
    if (!permission) {
      return true;
    }
    let permissionExist = null;
    if (!req.roleIds) {
      throw new Error("Please provide role ids in request object");
    }
    permissionExist = await PermissionRole.countDocuments({
      permissionId: permission.id,
      roleId: req.roleIds,
    });

    if (!permissionExist) {
      return false;
    }
    return true;
  } else {
    return true;
  }
};

const permitForUser = async (req) => {
  if (req.route.hasOwnProperty("o")) {
    const permission = await Permission.findOne({
      route_name: req.route["o"],
    });
    if (!permission) {
      return true;
    }
    let permissionExist = null;
    if (!req.userId) {
      throw new Error("Please provide user id in request object");
    }
    permissionExist = await PermissionRole.countDocuments({
      permissionId: permission.id,
      userId: req.userId,
    });
    if (!permissionExist) {
      return false;
    }
    return true;
  } else {
    return true;
  }
};

const permission = async (id) => {
  let permissionRole = await PermissionRole.find({
    roleId: id,
  });
  const permissionRoleIds = lodash.map(permissionRole, "permissionId");
  let permissions = await Permission.find({
    _id: permissionRoleIds,
  }).select(["route_name", "module", "uri"]);
  permissions = lodash.groupBy(permissions, "module");
  const rolePermissions = {};
  Object.keys(permissions).map((objectKey) => {
    rolePermissions[objectKey] = lodash.map(
      permissions[objectKey],
      "route_name"
    );
  });
  return rolePermissions;
};

const createOrUpdatePermission = async (id, permissions) => {
  try {
    let result = null;

    // "permissions": [
    //     {
    //         "roleId": 3,
    //         "permissionId": 1
    //     },
    //     {
    //         "roleId": 3,
    //         "permissionId": 2
    //     },
    // ]
    await PermissionRole.deleteMany({
      roleId: id,
    });
    result = await PermissionRole.insertMany(permissions);

    return result;
  } catch (err) {
    throw Error(err);
  }
};
const createOrUpdatePermissionForUser = async (id, permissions) => {
  try {
    let result = null;
    const role = await user.findById(id);
    const roleName = await Role.findById(role.roleId);

    /*    const userRole = await user.aggregate([{
            $match: {
                _id: id
            }
        }, {
            $lookup: {
                from: 'Role',
                localField: 'roleId',
                foreignField: '_id',
                as: 'Roles'
            }
        }, {
            $match: {
                $or: [{
                    "Roles.code": ROLE.SUPER_ADMIN
                }, {
                    "Roles.code": ROLE.ADMIN
                }]
            }
        }])
 */
    if (roleName.code !== ROLE.SUPER_ADMIN && roleName.code !== ROLE.ADMIN) {
      await PermissionRole.deleteMany({
        userId: id,
      });
      result = await PermissionRole.insertMany(permissions);
      return result;
    } else {
      throw new Error("Cannot Modify Admin Permissions");
    }
  } catch (err) {
    throw Error(err);
  }
};

const createOrUpdatePermissionForSuperAdmin = async (id, permissions) => {
  try {
    let result = null;
    await PermissionRole.deleteMany({
      userId: id,
    });
    result = await PermissionRole.insertMany(permissions);
    return result;
  } catch (err) {
    throw Error(err);
  }
};
const Permissions = async (permissionRoles) => {
  let permission_id = lodash.map(permissionRoles, "permissionId");
  let permissions = await Permission.find().select(["route_name", "module"]);
  let permissionArr = [];
  lodash.map(permissions, (data) => {
    lodash.map(permission_id, (permissionId) => {
      if (data.id == permissionId) {
        data = {
          _id: data.id,
          route_name: data.route_name,
          module: data.module,
          selected: true,
        };
      }
    });
    permissionArr.push(data);
  });
  permissions = lodash.groupBy(permissionArr, "module");
  return permissions;
};
const permissionRole = async (id) => {
  try {
    let permissionRoles = null;

    const role = await Role.findOne({
      _id: id,
    });
    if (!role) {
      throw Error("Role not found");
    }
    permissionRoles = await PermissionRole.find({
      roleId: id,
    });

    let permissions = await Permissions(permissionRoles);
    return permissions;
  } catch (err) {
    throw Error(err);
  }
};

const userPermission = async (id) => {
  try {
    let permissionRoles = null;

    const User = await user.findOne({
      _id: id,
    });
    if (!User) {
      throw Error("User not found");
    }
    permissionRoles = await PermissionRole.find({
      userId: id,
    });

    let permissions = await Permissions(permissionRoles);
    return permissions;
  } catch (err) {
    throw Error(err);
  }
};
const getRole = async (code) => {
  try {
    let where = {};
    if (code) {
      where.code = code;
    }
    const role = await Role.find(where);
    return role;
  } catch (err) {
    throw Error(err);
  }
};
const createRole = async (data) => {
  try {
    // name: {
    //     type: String,
    //     required: true,
    //   },
    //   code: {
    //     type: String,
    //     required: true,
    //   },
    //   weight: {
    //     type: Number,
    //     required: true,
    //   },
    let role;
    const result = await Role.findOne({
      code: data.code,
    });
    if (!result) {
      role = await Role.create(data);
    } else {
      throw Error("code is already exist.");
    }
    return role;
  } catch (err) {
    throw Error(err);
  }
};
const editRole = async (data) => {
  try {
    let role = null;
    const result = await Role.findOne({
      _id: data.id,
    });
    if (result && result.code === ROLE.SUPER_ADMIN) {
      throw Error(`You can not edit super admin role.`);
    } else if (result) {
      result.id = mongoose.Types.ObjectId();
      const checkCode = await Role.findOne({
        _id: {
          $ne: result.id,
        },
        code: data.code,
      });
      if (!checkCode) {
        role = await Role.updateOne(
          {
            _id: result.id,
          },
          {
            name: data.name,
            code: data.code,
            weight: data.weight,
          }
        );
      } else {
        throw Error("This code already occupied by other role.");
      }
    } else {
      throw Error("Role not found.");
    }
    return role;
  } catch (err) {
    throw Error(err);
  }
};
const deleteRole = async (id) => {
  try {
    let role = null;
    const result = await Role.findOne({
      _id: id,
    });
    if (result && result.code === ROLE.SUPER_ADMIN) {
      throw Error(`You can not delete super admin role.`);
    } else if (result) {
      role = await Role.deleteOne({
        _id: result.id,
      });
    } else {
      throw Error("Role not found.");
    }
    return role;
  } catch (err) {
    throw Error(err);
  }
};
const rolePermissions = async (codes) => {
  try {
    const roles = await Role.find({
      code: codes,
    });

    const permissionRoles = await PermissionRole.find({
      roleId: lodash.pluck(roles, "_id"),
    }).select("permissionId");

    const permissionRoleIds = lodash.pluck(permissionRoles, "permissionId");

    let permissions = await Permission.find({
      _id: permissionRoleIds,
    }).select(["route_name", "module"]);

    permissions = lodash.groupBy(permissions, "module");

    const rolePermissions = {};

    Object.keys(permissions).map((objectKey) => {
      rolePermissions[objectKey] = lodash.pluck(
        permissions[objectKey],
        "route_name"
      );
    });
    return rolePermissions;
  } catch (err) {
    throw Error(err);
  }
};
module.exports = {
  permissionRole: permissionRole,
  rolePermissions: rolePermissions,
  createOrUpdatePermission: createOrUpdatePermission,
  store: store,
  permit: permit,
  permission: permission,
  getRole: getRole,
  createRole: createRole,
  editRole: editRole,
  deleteRole: deleteRole,
  createOrUpdatePermissionForUser: createOrUpdatePermissionForUser,
  permitForUser: permitForUser,
  userPermission: userPermission,
  createOrUpdatePermissionForSuperAdmin: createOrUpdatePermissionForSuperAdmin,
};
