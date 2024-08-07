const Category = require("../../model/v1/category");
const Service = require("../../model/v1/service");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");

const findAllServicesByCategory = async (req, res) => {

  return req;
  
  // try {
  //   // Find all categories
  //   const categories = await Category.find({}).lean().exec();

  //   // Populate services for each category
  //   const categoriesWithServices = await Promise.all(
  //     categories.map(async (category) => {
  //       const services = await Service.find({ categoryId: category._id })
  //         .lean()
  //         .exec();
  //       return { ...category, services };
  //     })
  //   );

  //   return categoriesWithServices;
  // } catch (error) {
  //   console.error("Error fetching nested categories and services:", error);
  //   throw error;
  // }
};

const findAllCategory = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      result = await dbService.countDocument(Category, query);
      if (result) {
        result = { totalRecords: result };
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = { ...req.body.options };

        if (req.body.query !== undefined) {
          query = { ...req.body.query };
        }
        if (
          req.user.locationIds.length == 0 ||
          req.user.locationIds == undefined
        ) {
          res.message = "Please add your location in your profile";
          console.log("COMING FROM HERE", res.message);
          return utils.successResponse([{ locationIds: false }], res);
        }
        result = await dbService.getAllDocuments(Category, query, options);

        if (!result) {
          return utils.recordNotFound([], res);
        }
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getCategory = async (req, res) => {
  try {
    let query = {};
    query.id = req.params.id;
    let result = await dbService.getDocumentByQuery(Category, query);

    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getCategoryCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where) {
      where = req.body.where;
    }
    let result = await dbService.countDocument(Category, where);
    if (result) {
      result = { totalRecords: result };
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getCategoryByAggregate = async (req, res) => {
  try {
    let result = await dbService.getDocumentByAggregation(Category, req.body);
    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

module.exports = {
  findAllServicesByCategory,
  findAllCategory,
  getCategory,
  getCategoryCount,
  getCategoryByAggregate,
};
