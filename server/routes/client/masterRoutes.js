const express = require("express");
const router = express.Router();
const masterController = require("../../controller/client/masterController");
/* const auth = require("../../middleware/auth");

router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),masterController.addMaster);
router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),masterController.findAllMaster);
router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),masterController.getMaster);
router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),masterController.getMasterCount);
router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),masterController.getMasterByAggregate);
router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),masterController.updateMaster);    
router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),masterController.partialUpdateMaster);
router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),masterController.softDeleteMaster);
router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),masterController.bulkInsertMaster);
router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),masterController.bulkUpdateMaster);
 */ module.exports = router;
