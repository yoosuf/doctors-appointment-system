const mongoose = require("mongoose");

require("./Permission");
require("./v1/role");
require("./v1/user");

const PermissionRoleSchema = mongoose.Schema(
  {
    permissionId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Permission",
      required: true,
    },
    roleId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "role",
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const PermissionRole = mongoose.model(
  "PermissionRole",
  PermissionRoleSchema,
  "permission_roles"
);

module.exports = PermissionRole;
