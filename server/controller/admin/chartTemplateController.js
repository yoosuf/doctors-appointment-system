const ChartTemplate = require("../../model/chartTemplate");
const utils = require("../../utils/messages");
const chartTemplateSchemaKey = require("../../utils/validation/chartTemplateValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const { CHART_TEMPLATE_TYPE } = require("../../constants/common");
const deleteDependentService = require("../../utils/deleteDependent");
const mongoose = require("mongoose");

const addChartTemplate = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      chartTemplateSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let data = new ChartTemplate({ ...req.body });
    data.chartData = await createOrUpdateChartData(data);
    let result = await dbService.createDocument(ChartTemplate, data);

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error(error);
    if (error.name === "ValidationError") {
      return utils.validationError(error.message, res);
    }
    if (error.code && error.code == 11000) {
      return utils.isDuplicate(error.message, res);
    }
    return utils.failureResponse(error.message, res);
  }
};

const createOrUpdateChartData = async (data) => {
  if (data.type === CHART_TEMPLATE_TYPE.SOAP) {
    return await Promise.all(
      _.map(data.chartData, (chartPoint) => {
        if (chartPoint.id) {
          return chartPoint;
        }
        return { ...chartPoint, _id: mongoose.Types.ObjectId() };
      })
    );
  }
  return await Promise.all(
    _.map(data.chartData, async (chartLabel) => {
      if (chartLabel.id) {
        chartLabel.options = await chartOptionCreateOrUpdate(chartLabel);
        return chartLabel;
      }
      chartLabel.options = await chartOptionCreateOrUpdate(chartLabel);
      return { ...chartLabel, _id: mongoose.Types.ObjectId() };
    })
  );
};

const chartOptionCreateOrUpdate = async (chartLabel) => {
  return await Promise.all(
    _.map(chartLabel.options, (option) => {
      if (chartLabel.id) {
        return option;
      }
      return { ...option, _id: mongoose.Types.ObjectId() };
    })
  );
};

const findAllChartTemplate = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      result = await dbService.countDocument(ChartTemplate, query);
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
        result = await dbService.getAllDocuments(ChartTemplate, query, options);

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

const getChartTemplate = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(ChartTemplate, query);

    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const getChartTemplateCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where) {
      where = req.body.where;
    }
    let result = await dbService.countDocument(ChartTemplate, where);
    if (result) {
      result = { totalRecords: result };
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getChartTemplateByAggregate = async (req, res) => {
  try {
    let result = await dbService.getDocumentByAggregation(
      ChartTemplate,
      req.body
    );
    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const updateChartTemplate = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      chartTemplateSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    data.chartData = await createOrUpdateChartData(data);
    let result = await dbService.findOneAndUpdateDocument(
      ChartTemplate,
      { _id: req.params.id },
      data,
      { new: true }
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      return utils.isDuplicate(error.message, res);
    }
    if (error.code && error.code == 11000) {
      return utils.isDuplicate(error.message, res);
    }
    return utils.failureResponse(error.message, res);
  }
};
const partialUpdateChartTemplate = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      chartTemplateSchemaKey.updateSchemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.updateDocument(
      ChartTemplate,
      req.params.id,
      data
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const softDeleteChartTemplate = async (req, res) => {
  try {
    let possibleDependent = [
      {
        model: "appoinmentChart",
        refId: "chartId",
      },
    ];
    let id = req.params.id;
    let data = await dbService.updateDocument(
      ChartTemplate,
      { _id: id },
      {
        isDeleted: true,
        isActive: false,
      }
    );
    if (!data) {
      return utils.failedSoftDelete(res);
    }
    let result = await deleteDependentService.softDeleteDependent(
      possibleDependent,
      id
    );
    if (!result) {
      return utils.failureResponse("something went wrong", res);
    }
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const bulkInsertChartTemplate = async (req, res) => {
  try {
    let data;
    if (req.body.data !== undefined && req.body.data.length) {
      data = req.body.data;
      let result = await dbService.bulkInsert(ChartTemplate, data);
      return utils.successResponse(result, res);
    } else {
      return utils.failureResponse("Invalid Data", res);
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return utils.validationError(error.message, res);
    }
    if (error.code && error.code == 11000) {
      return utils.isDuplicate(error.message, res);
    }
    return utils.failureResponse(error.message, res);
  }
};
const bulkUpdateChartTemplate = async (req, res) => {
  try {
    let filter = {};
    let data;
    if (req.body.filter !== undefined) {
      filter = req.body.filter;
    }
    if (req.body.data !== undefined) {
      data = req.body.data;
      let result = await dbService.bulkUpdate(ChartTemplate, filter, data);
      if (!result) {
        return utils.failureResponse("something is wrong.", res);
      }
      return utils.successResponse(result, res);
    } else {
      return utils.failureResponse("Invalid Data", res);
    }
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

module.exports = {
  addChartTemplate,
  findAllChartTemplate,
  getChartTemplate,
  getChartTemplateCount,
  getChartTemplateByAggregate,
  updateChartTemplate,
  partialUpdateChartTemplate,
  softDeleteChartTemplate,
  bulkInsertChartTemplate,
  bulkUpdateChartTemplate,
};
