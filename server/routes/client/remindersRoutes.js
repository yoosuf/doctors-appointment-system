const express = require("express");
const router = express.Router();
const remindersController = require("../../controller/client/remindersController");
/* const auth = require("../../middleware/auth");

router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),remindersController.addReminders);
router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),remindersController.findAllReminders);
router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),remindersController.getReminders);
router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),remindersController.getRemindersCount);
router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),remindersController.getRemindersByAggregate);
router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),remindersController.updateReminders);    
router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),remindersController.partialUpdateReminders);
router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),remindersController.softDeleteReminders);
router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),remindersController.bulkInsertReminders);
router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),remindersController.bulkUpdateReminders);
 */ module.exports = router;
