const express = require("express");
const router = express.Router();
const settingController = require("../../controller/client/settingController");
/* const auth = require("../../middleware/auth");

router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),settingController.addSetting);
router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),settingController.findAllSetting);
router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),settingController.getSetting);
router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),settingController.getSettingCount);
router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),settingController.getSettingByAggregate);
router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),settingController.updateSetting);    
router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),settingController.partialUpdateSetting);
router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),settingController.softDeleteSetting);
router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),settingController.bulkInsertSetting);
router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),settingController.bulkUpdateSetting);
 */ module.exports = router;
