const user = require("../model/v1/user");
const role = require("../model/v1/role");
const Setting = require("../model/setting");
const SettingNumberGenerator = require("../model/settingNumberGenerator");
const permission = require("../model/Permission");
const Master = require("../model/master");
const _ = require("lodash");
const {
  createOrUpdatePermission,
  createOrUpdatePermissionForUser,
  createOrUpdatePermissionForSuperAdmin,
} = require("../lib/index");
const { ROLE, SLOT_INTERVAL } = require("../config/authConstant");
const moment = require("moment");
const slotSeederJSON = require("../seeder/slotSeeder.json");
const settingNumberSeederJSON = require("../seeder/settingNumberGenerate.json");
// uncomment the commented code for user wise permission
const seedUsers = async () => {
  try {
    const usersJSON = require("../seeder/users.json");
    await Promise.all(
      _.map(usersJSON, async (data) => {
        let findUser = await user.findOne({
          email: data.email,
        });
        if (!findUser) {
          findUser = await user.create(data);
        }
        await assignPermissionSuperAdmin(findUser._id);
      })
    );

    logger.info("Users seeded successfully!");
    return true;
  } catch (error) {
    logger.error("Error in seedUsers!", error);
  }
};
const seedRoles = async () => {
  try {
    const rolesJSON = require("../seeder/roles.json");
    await Promise.all(
      _.map(rolesJSON, async (data) => {
        let findRole = await role.findOne({
          code: data.code,
        });
        if (!findRole) {
          await role.create(data);
        }
      })
    );
    logger.info("Roles seeded successfully!");
    return true;
  } catch (error) {
    logger.error("Error in seedRoles!", error);
  }
};

const assignNotification = async (req, res) => {
  try {
    const notification = require("../seeder/notification.json");
    Promise.all(
      _.map(notification, async (data) => {
        let master = await Master.find({
          code: data.code,
        });
        if (master.length === 0) {
          await Master.create(data);
        }
      })
    );
    logger.info("Notification Seeded Successfully");
  } catch (error) {
    logger.error("Error in Notification", error);
  }
};
const assignPermissionPatient = async (userId) => {
  try {
    const permssionJSON = require("../seeder/patientPermission");
    let patientRole = await role.findOne({
      code: ROLE.PATIENT,
    });
    const allPermission = await permission.find({
      route_name: permssionJSON,
    });
    // const permissionArr = [];
    // Promise.all(_.map(allPermission, async (data) => {
    //     permissionArr.push((userId !== undefined) ? {
    //         userId: userId,
    //         permissionId: data._id
    //     } : {
    //         roleId: patientRole._id,
    //         permissionId: data._id
    //     })
    // }))
    // if (userId !== undefined) {
    //     await createOrUpdatePermissionForUser(userId, permissionArr)
    // } else {
    //     await createOrUpdatePermission(patientRole._id, permissionArr);
    // }

    const permissionArr = [];
    const permissions = [];
    Promise.all(
      _.map(allPermission, async (data) => {
        if (userId !== undefined) {
          permissionArr.push({
            permissionId: data._id,
            userId: userId,
          });
        }
        permissions.push({
          permissionId: data._id,
          roleId: patientRole._id,
        });
      })
    );
    if (userId !== undefined) {
      await createOrUpdatePermissionForSuperAdmin(userId, permissionArr);
    }
    await createOrUpdatePermission(patientRole._id, permissions);

    logger.info("patient permission assigned successfully!");
    return true;
  } catch (error) {
    logger.error("Error in patient permission!", error);
  }
};
const assignPermissionAdmin = async (userId) => {
  try {
    const permssionJSON = require("../seeder/adminPermission");
    let adminRole = await role.findOne({
      code: ROLE.ADMIN,
    });
    const allPermission = await permission.find({
      route_name: permssionJSON,
    });
    const permissionArr = [];
    const permissions = [];
    Promise.all(
      _.map(allPermission, async (data) => {
        if (userId !== undefined) {
          permissionArr.push({
            permissionId: data._id,
            userId: userId,
          });
        }
        permissions.push({
          permissionId: data._id,
          roleId: adminRole._id,
        });
      })
    );
    if (userId !== undefined) {
      await createOrUpdatePermissionForSuperAdmin(userId, permissionArr);
    }
    await createOrUpdatePermission(adminRole._id, permissions);

    logger.info("admin permission assigned successfully!");
    return true;
  } catch (error) {
    logger.error("Error in admin permission!", error);
  }
};
const assignPermissionSuperAdmin = async (userId) => {
  try {
    const permssionJSON = require("../seeder/adminPermission");
    let superAdminRole = await role.findOne({
      code: ROLE.SUPER_ADMIN,
    });
    const allPermission = await permission.find({
      route_name: permssionJSON,
    });
    const permissionArr = [];
    const permissions = [];
    Promise.all(
      _.map(allPermission, async (data) => {
        if (userId !== undefined) {
          permissionArr.push({
            permissionId: data._id,
            userId: userId,
          });
        }
        permissions.push({
          permissionId: data._id,
          roleId: superAdminRole._id,
        });
      })
    );
    if (userId !== undefined) {
      await createOrUpdatePermissionForSuperAdmin(userId, permissionArr);
    }
    await createOrUpdatePermission(superAdminRole._id, permissions);
    logger.info("admin permission assigned successfully!");
    return true;
  } catch (error) {
    logger.error("Error in admin permission!", error);
  }
};

const assignPermissionOwner = async (userId) => {
  try {
    const permssionJSON = require("../seeder/ownerPermission");
    let ownerRole = await role.findOne({
      code: ROLE.OWNER,
    });
    const allPermission = await permission.find({
      route_name: permssionJSON,
    });
    // const permissionArr = [];
    // Promise.all(_.map(allPermission, async (data) => {
    //     permissionArr.push((userId !== undefined) ? {
    //         userId: userId,
    //         permissionId: data._id
    //     } : {
    //         roleId: ownerRole._id,
    //         permissionId: data._id
    //     })
    // }))
    // if (userId !== undefined) {
    //     await createOrUpdatePermissionForUser(userId, permissionArr)
    // } else {
    //     await createOrUpdatePermission(ownerRole._id, permissionArr);
    // }

    const permissionArr = [];
    const permissions = [];
    Promise.all(
      _.map(allPermission, async (data) => {
        if (userId !== undefined) {
          permissionArr.push({
            permissionId: data._id,
            userId: userId,
          });
        }
        permissions.push({
          permissionId: data._id,
          roleId: ownerRole._id,
        });
      })
    );
    if (userId !== undefined) {
      await createOrUpdatePermissionForSuperAdmin(userId, permissionArr);
    }
    await createOrUpdatePermission(ownerRole._id, permissions);

    logger.info("Owner permission assigned successfully!");
    return true;
  } catch (error) {
    logger.error("Error in Owner permission!", error);
  }
};
const assignPermissionSubOwner = async (userId) => {
  try {
    const permssionJSON = require("../seeder/subOwnerPermission");
    let subOwnerRole = await role.findOne({
      code: ROLE.SUB_OWNER,
    });
    const allPermission = await permission.find({
      route_name: permssionJSON,
    });
    // const permissionArr = [];
    // Promise.all(_.map(allPermission, async (data) => {
    //     permissionArr.push((userId !== undefined) ? {
    //         userId: userId,
    //         permissionId: data._id
    //     } : {
    //         roleId: subOwnerRole._id,
    //         permissionId: data._id
    //     })

    // }))
    // if (userId !== undefined) {
    //     await createOrUpdatePermissionForUser(userId, permissionArr)
    // } else {
    //     await createOrUpdatePermission(subOwnerRole._id, permissionArr);
    // }
    const permissionArr = [];
    const permissions = [];
    Promise.all(
      _.map(allPermission, async (data) => {
        if (userId !== undefined) {
          permissionArr.push({
            permissionId: data._id,
            userId: userId,
          });
        }
        permissions.push({
          permissionId: data._id,
          roleId: subOwnerRole._id,
        });
      })
    );
    if (userId !== undefined) {
      await createOrUpdatePermissionForSuperAdmin(userId, permissionArr);
    }
    await createOrUpdatePermission(subOwnerRole._id, permissions);

    logger.info("subOwner permission assigned successfully!");
    return true;
  } catch (error) {
    logger.error("Error in subOwner permission!", error);
  }
};

const assignPermissionChiropractor = async (userId) => {
  try {
    const permssionJSON = require("../seeder/chiropractorPermission");
    let chiropractorRole = await role.findOne({
      code: ROLE.CHIROPRACTOR,
    });
    const allPermission = await permission.find({
      route_name: permssionJSON,
    });
    // const permissionArr = [];
    // Promise.all(_.map(allPermission, async (data) => {
    //     permissionArr.push((userId !== undefined) ? {
    //         userId: userId,
    //         permissionId: data._id
    //     } : {
    //         roleId: chiropractorRole._id,
    //         permissionId: data._id
    //     })
    // }))
    // if (userId !== undefined) {
    //     await createOrUpdatePermissionForUser(userId, permissionArr)
    // } else {
    //     await createOrUpdatePermission(chiropractorRole._id, permissionArr);
    // }
    const permissionArr = [];
    const permissions = [];
    Promise.all(
      _.map(allPermission, async (data) => {
        if (userId !== undefined) {
          permissionArr.push({
            permissionId: data._id,
            userId: userId,
          });
        }
        permissions.push({
          permissionId: data._id,
          roleId: chiropractorRole._id,
        });
      })
    );
    if (userId !== undefined) {
      await createOrUpdatePermissionForSuperAdmin(userId, permissionArr);
    }
    await createOrUpdatePermission(chiropractorRole._id, permissions);

    logger.info("chiropractor permission assigned successfully!");
    return true;
  } catch (error) {
    logger.error("Error in chiropractor permission!", error);
  }
};
const assignPermissionStaff = async (userId) => {
  try {
    const permssionJSON = require("../seeder/staffPermission");
    let staffRole = await role.findOne({
      code: ROLE.STAFF,
    });
    const allPermission = await permission.find({
      route_name: permssionJSON,
    });
    // const permissionArr = [];
    // Promise.all(_.map(allPermission, async (data) => {
    //      permissionArr.push((userId !== undefined) ? {
    //         userId: userId,
    //         permissionId: data._id
    //     } : {
    //         roleId: staffRole._id,
    //         permissionId: data._id
    //     })
    // }))
    // if (userId !== undefined) {
    //     await createOrUpdatePermissionForUser(userId, permissionArr)
    // } else {
    //     await createOrUpdatePermission(staffRole._id, permissionArr);
    // }
    const permissionArr = [];
    const permissions = [];
    Promise.all(
      _.map(allPermission, async (data) => {
        if (userId !== undefined) {
          permissionArr.push({
            permissionId: data._id,
            userId: userId,
          });
        }
        permissions.push({
          permissionId: data._id,
          roleId: staffRole._id,
        });
      })
    );
    if (userId !== undefined) {
      await createOrUpdatePermissionForSuperAdmin(userId, permissionArr);
    }
    await createOrUpdatePermission(staffRole._id, permissions);

    logger.info("staff permission assigned successfully!");
    return true;
  } catch (error) {
    logger.error("Error in staff permission!", error);
  }
};
const seedSlot = async () => {
  try {
    const slotSeederJSON = require("../seeder/slotSeeder.json");
    await Slot.deleteMany();
    await Promise.all(
      _.map(slotSeederJSON, async (slotSeeder) => {
        let startTime = moment(slotSeeder.startTime, "HH:mm");
        let endTime = moment(slotSeeder.endTime, "HH:mm");
        let interval = SLOT_INTERVAL;
        let startDateTime = moment(startTime).add(interval, "minutes");
        let dayOfWeek = slotSeeder.dayOfWeek;
        let i = 1;

        while (startDateTime <= endTime) {
          let startDate = moment(startTime).format("HH:mm");
          startTime.add(interval, "minutes");
          startDateTime.add(interval, "minutes");
          let endDate = moment(startTime).format("HH:mm");
          let data = new Slot({
            startTime: startDate,
            endTime: endDate,
            dayOfWeek: dayOfWeek,
            slotId: i,
          });

          await Slot.create(data);
          i++;
        }
      })
    );
    logger.info("Slots seeded successfully!");
    return true;
  } catch (error) {
    logger.error("Error in seedSlots!", error);
  }
};

const seedSettingNumber = async () => {
  try {
    const settingNumberSeederJSON = require("../seeder/settingNumberGenerate.json");
    await SettingNumberGenerator.deleteMany();
    await SettingNumberGenerator.insertMany(settingNumberSeederJSON);
    logger.info("settingNumberGenerate seeded successfully!");
    return true;
  } catch (error) {
    logger.error("Error in settingNumberGenerate!", error);
  }
};

const seedSetting = async () => {
  try {
    const settingSeederJSON = require("../seeder/setting.json");
    await Setting.deleteMany();
    await Setting.insertMany(settingSeederJSON);
    logger.info("Setting seeded successfully!");
    return true;
  } catch (error) {
    logger.error("Error in Setting seed!", error);
  }
};

const assignPermissionNurse = async (userId) => {
  try {
    const permssionJSON = require("../seeder/nursePermission");
    let nurseRole = await role.findOne({
      code: ROLE.NURSE,
    });
    const allPermission = await permission.find({
      route_name: permssionJSON,
    });
    const permissionArr = [];
    const permissions = [];
    Promise.all(
      _.map(allPermission, async (data) => {
        if (userId !== undefined) {
          permissionArr.push({
            permissionId: data._id,
            userId: userId,
          });
        }
        permissions.push({
          permissionId: data._id,
          roleId: nurseRole._id,
        });
      })
    );
    if (userId !== undefined) {
      await createOrUpdatePermissionForSuperAdmin(userId, permissionArr);
    }
    await createOrUpdatePermission(nurseRole._id, permissions);

    logger.info("nurse permission assigned successfully!");
    return true;
  } catch (error) {
    logger.error("Error in nurse permission!", error);
  }
};
module.exports = {
  seedUsers: seedUsers,
  seedRoles: seedRoles,
  assignPermissionPatient: assignPermissionPatient,
  assignPermissionAdmin: assignPermissionAdmin,
  assignPermissionStaff: assignPermissionStaff,
  assignPermissionOwner: assignPermissionOwner,
  assignPermissionChiropractor: assignPermissionChiropractor,
  assignPermissionSubOwner: assignPermissionSubOwner,
  assignPermissionNurse: assignPermissionNurse,
  assignNotification: assignNotification,
  seedSlot: seedSlot,
  seedSettingNumber,
  seedSetting,
};
