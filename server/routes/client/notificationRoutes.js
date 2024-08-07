const express = require("express");
const router = express.Router();
const notificationController = require("../../controller/client/notificationController");
/* const auth = require("../../middleware/auth");

router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),notificationController.addNotification);
router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),notificationController.findAllNotification);
router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),notificationController.getNotification);
router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),notificationController.getNotificationCount);
router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),notificationController.getNotificationByAggregate);
router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),notificationController.updateNotification);    
router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),notificationController.partialUpdateNotification);
router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),notificationController.softDeleteNotification);
router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),notificationController.bulkInsertNotification);
router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),notificationController.bulkUpdateNotification);
 */ module.exports = router;
