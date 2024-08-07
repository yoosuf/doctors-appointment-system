var express = require("express");
var router = express.Router();
const patientController = require("../../controller/admin/patientController");

const {
  authentication,
  checkPermission,
  checkPermissionByUser,
} = require("../../middleware/auth");

router
  .route("/create")
  .post(
    authentication,
    patientController.addUser
  )
  .descriptor("admin.patient.create");
router.route("/set-password").post(patientController.resetNewPassword);
router
  .route("/list")
  .post(patientController.findAllUser)
  .descriptor("admin.patient.findAll");

router
  .route("/search")
  .post(patientController.searchUser)
  .descriptor("admin.patient.searchUser");
router
  .route("/:id")
  .post(authentication, patientController.getUser)
  .descriptor("admin.patient.getPatient");
router
  .route("/update/:id")
  .put(authentication, patientController.updateUser)
  .descriptor("admin.patient.update");
router
  .route("/delete/:id")
  .delete(authentication, patientController.deleteUser)
  .descriptor("admin.patient.delete");
router
  .route("/softDelete/:id")
  .put(authentication, patientController.softDeleteUser)
  .descriptor("admin.patient.softDelete");
router
  .route("/purchased-plan/:id")
  .get(authentication, patientController.getPurchasedPlan)
  .descriptor("admin.patient.getPurchasedPlan");

module.exports = router;
