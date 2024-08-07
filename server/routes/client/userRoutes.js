const express = require("express");
const router = express.Router();
const userController = require("../../controller/client/userController");
const auth = require("../../middleware/auth");
const { authentication, checkPermission } = require("../../middleware/auth");

// router.route("/create").post(userController.addUser);
// router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),userController.findAllUser);
router
  .route("/:id")
  .post(authentication, checkPermission, userController.getUser)
  .descriptor("client.user.getProfile");
// router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),userController.getUserCount);
// router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),userController.getUserByAggregate);
router
  .route("/update/:id")
  .put(authentication, checkPermission, userController.updateUser)
  .descriptor("client.user.updateProfile");
// router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),userController.partialUpdateUser);
// router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),userController.softDeleteUser);
// router.route("/addBulk").post(userController.bulkInsertUser);
// router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),userController.bulkUpdateUser);
// router.route("/change-password").put(auth(...[ 'changePasswordByAdminInClientPlatform' ]),userController.changePassword);
module.exports = router;
