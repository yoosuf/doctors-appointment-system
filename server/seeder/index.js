const service = require("../services/seeder");
const masterService = require("../services/masterService");

async function initSeed() {
  try {
    await service.seedRoles();
    await service.seedUsers();
    await service.assignPermissionAdmin();
    await service.assignPermissionOwner();
    await service.assignPermissionSubOwner();
    await service.assignPermissionChiropractor();
    await service.assignPermissionStaff();
    await service.assignPermissionPatient();
    await service.assignNotification();
    await service.seedSlot();
    await service.seedSettingNumber();
    await service.seedSetting();
    await masterService.seedMasters();
    await service.assignPermissionNurse();
  } catch (e) {
    logger.info("Seed data failed!", e);
  }
}

module.exports = initSeed;
