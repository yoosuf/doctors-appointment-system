const express = require("express");
const router = express.Router();
const serviceController = require("../../controller/client/serviceController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
  locationQuery,
} = require("../../middleware/auth");

router
  .route("/list")
  .post(authentication, checkPermission, serviceController.findAllService)
  .descriptor("client.service.findAll");
router
  .route("/:id")
  .get(authentication, checkPermission, serviceController.getService)
  .descriptor("client.service.getService");
// router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),serviceController.addService);
// router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),serviceController.findAllService);
// router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),serviceController.getService);
// router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),serviceController.getServiceCount);
// router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),serviceController.getServiceByAggregate);
// router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),serviceController.updateService);
// router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),serviceController.partialUpdateService);
// router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),serviceController.softDeleteService);
// router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),serviceController.bulkInsertService);
// router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),serviceController.bulkUpdateService);
module.exports = router;
