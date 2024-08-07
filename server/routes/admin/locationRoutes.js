const express = require("express");
const router = express.Router();
const locationController = require("../../controller/admin/locationController");
const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(locationController.addLocation)
  .descriptor("admin.location.create");
router
  .route("/list")
  .post(
    authentication,
    locationController.findAllLocation
  )
  .descriptor("admin.location.findAll");
router
  .route("/:id")
  .get(
    authentication,
    locationController.getLocation
  )
  .descriptor("admin.location.getLocation");
router
  .route("/update/:id")
  .put(locationController.updateLocation)
  .descriptor("admin.location.update");
router
  .route("/softDelete/:id")
  .put(
    authentication,
    locationController.softDeleteLocation
  )
  .descriptor("admin.location.softDelete");
router.route("/updateStatus/:id").put(locationController.updateLocationStatus);


module.exports = router;
