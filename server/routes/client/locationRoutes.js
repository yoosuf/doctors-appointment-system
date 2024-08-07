const express = require("express");
const router = express.Router();
const locationController = require("../../controller/client/locationController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/list")
  .post(authentication, checkPermission, locationController.findAllLocation)
  .descriptor("client.location.findAll");
router
  .route("/:id")
  .get(authentication, checkPermission, locationController.getLocation)
  .descriptor("client.location.getLocation");
// router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),locationController.addLocation);
// router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),locationController.findAllLocation);
// router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),locationController.getLocation);
// router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),locationController.getLocationCount);
// router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),locationController.getLocationByAggregate);
// router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),locationController.updateLocation);
// router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),locationController.partialUpdateLocation);
// router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),locationController.softDeleteLocation);
// router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),locationController.bulkInsertLocation);
// router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),locationController.bulkUpdateLocation);
module.exports = router;
