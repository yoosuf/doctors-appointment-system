const Page = require("../../model/page");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");

const getPage = async (req, res) => {
  try {
    // let query = req.body.query;

    // query = {
    //   ...req.body.query,
    // };

    // console.log(`@@@@@@@@@@@@ req.body`, req.body)

    // query.locationIds = req.params.id;
    // let result = await dbService.getDocumentByQuery(Page, query);



    console.log(`################ req`, req.params.id)

    const searchId = req.params.id; // The ID you're searching for

    // Ensure that searchId is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(searchId)) {
    //   return utils.failureResponse("Invalid ID format", res);
    // }

    // Convert searchId to a mongoose ObjectId
    // const searchObjectId = mongoose.Types.ObjectId(searchId);

    let result = await Page.findOne({ locationIds: { $in: [searchId] }, isDeleted: { $ne: true } });


    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};


const getPageByAggregate = async (req, res) => {
  try {
    let result = await dbService.getDocumentByAggregation(Page, req.body);
    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

module.exports = {
  getPage,
  getPageByAggregate,
};
