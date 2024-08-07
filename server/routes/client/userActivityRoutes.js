const express = require("express");
const router = express.Router();
const userActivityController = require("../../controller/client/userActivityController");
/* const auth = require("../../middleware/auth");

router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),userActivityController.addUserActivity);
router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),userActivityController.findAllUserActivity);
router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),userActivityController.getUserActivity);
router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),userActivityController.getUserActivityCount);
router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),userActivityController.getUserActivityByAggregate);
router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),userActivityController.updateUserActivity);    
router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),userActivityController.partialUpdateUserActivity);
router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),userActivityController.softDeleteUserActivity);
router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),userActivityController.bulkInsertUserActivity);
router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),userActivityController.bulkUpdateUserActivity);
 */ module.exports = router;
