const express = require("express");
const router = express.Router();
const chartTemplateController = require("../../controller/client/chartTemplateController");
/* const auth = require("../../middleware/auth");

router.route("/create").post(auth(...[ 'createByAdminInClientPlatform' ]),chartTemplateController.addChartTemplate);
router.route("/list").post(auth(...[ 'getAllByAdminInClientPlatform' ]),chartTemplateController.findAllChartTemplate);
router.route("/:id").get(auth(...[ 'getByAdminInClientPlatform' ]),chartTemplateController.getChartTemplate);
router.route("/count").post(auth(...[ 'getCountByAdminInClientPlatform' ]),chartTemplateController.getChartTemplateCount);
router.route("/aggregate").post(auth(...[ 'aggregateByAdminInClientPlatform' ]),chartTemplateController.getChartTemplateByAggregate);
router.route("/update/:id").put(auth(...[ 'updateByAdminInClientPlatform' ]),chartTemplateController.updateChartTemplate);    
router.route("/partial-update/:id").put(auth(...[ 'partialUpdateByAdminInClientPlatform' ]),chartTemplateController.partialUpdateChartTemplate);
router.route("/softDelete/:id").put(auth(...[ 'softDeleteByAdminInClientPlatform' ]),chartTemplateController.softDeleteChartTemplate);
router.route("/addBulk").post(auth(...[ 'addBulkByAdminInClientPlatform' ]),chartTemplateController.bulkInsertChartTemplate);
router.route("/updateBulk").put(auth(...[ 'updateBulkByAdminInClientPlatform' ]),chartTemplateController.bulkUpdateChartTemplate);
module.exports = router;
 */
