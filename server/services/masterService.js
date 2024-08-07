const Master = require("../model/master");
const mongoose = require("mongoose");
const dbService = require("../utils/dbService");
const mastersJSON = require("../seeder/masters.json");
const seedMasters = async () => {
  try {
    // eslint-disable-next-line global-require
    await Promise.all(
      mastersJSON.map(async (masterData) => {
        let master = await dbService.getDocumentByQuery(Master, {
          code: masterData.code,
        });
        if (!master) {
          master = await dbService.createDocument(Master, masterData);
        }
        await Promise.all(
          _.map(masterData.subMasters, async (subMasterObj) => {
            let subMasterData = {
              ...subMasterObj,
              parentId: master._id,
              parentCode: master.code,
            };
            let subMaster = await dbService.findOneAndUpdateDocument(
              Master,
              { code: subMasterObj.code },
              subMasterData,
              { useFindAndModify: false }
            );
            if (!subMaster) {
              await dbService.createDocument(Master, subMasterData);
            }
          })
        );
      })
    );
    console.info("Masters seeded successfully!");
    return true;
  } catch (error) {
    logger.error("Error in seedMasters!");
    logger.error(error);
  }
};

module.exports = {
  seedMasters,
};
