const express = require("express");
const router = express.Router();
const addressController = require("../../controller/client/addressController");
/* const auth = require("../../middleware/auth");

router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),addressController.addAddress);
router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),addressController.findAllAddress);
router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),addressController.getAddress);
router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),addressController.getAddressCount);
router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),addressController.getAddressByAggregate);
router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),addressController.updateAddress);    
router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),addressController.partialUpdateAddress);
router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),addressController.softDeleteAddress);
router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),addressController.bulkInsertAddress);
router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),addressController.bulkUpdateAddress);
module.exports = router;
 */

const { authentication, checkPermission } = require("../../middleware/auth");
router
  .route("/create")
  .post(authentication, checkPermission, addressController.addAddress)
  .descriptor("client.address.create");
router
  .route("/update/:id")
  .put(authentication, checkPermission, addressController.updateAddress)
  .descriptor("client.address.update");
router
  .route("/addBulk")
  .post(authentication, checkPermission, addressController.bulkInsertAddress)
  .descriptor("client.address.createbulk");

router
  .route("/list")
  .post(authentication, checkPermission, addressController.findAllAddress)
  .descriptor("client.address.findAll");
router
  .route("/:id")
  .get(authentication, checkPermission, addressController.getAddress)
  .descriptor("client.address.getAddress");

module.exports = router;
