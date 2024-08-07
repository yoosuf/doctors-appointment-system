const AppoinmentChart = require("../../model/appointmentChart");
const ChartTemplate = require("../../model/chartTemplate");
const utils = require("../../utils/messages");
const appoinmentChartSchemaKey = require("../../utils/validation/appoinmentChartValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const {
  APPOINTMENT_CHART_TYPE,
  CHART_TEMPLATE_TYPE,
  OPENSSL_CONF,
} = require("../../constants/common");
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const makeDir = require("make-dir");
const fs = require("fs");
const moment = require("moment");

const addAppoinmentChart = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      appoinmentChartSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const data = new AppoinmentChart({ ...req.body });
    // const chartValidate = await validateAppointmentChart(data);
    // if (!chartValidate) {
    //   return utils.validationError(
    //     "Invalid chart template detail in chartData",
    //     res
    //   );
    // }
    let result = await dbService.createDocument(AppoinmentChart, data);
    return utils.successResponse(result, res);
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

const validateAppointmentChart = async (data) => {
  let template = await dbService.getDocumentByQuery(ChartTemplate, {
    type: data.type,
  });
  if (template) {
    template = _.map(template.chartData, (chart) => {
      return { ...chart, id: `${chart._id}` };
    });
    const error = {};
    const templateIds = _.map(template, "id");
    if (
      data.type === CHART_TEMPLATE_TYPE.DAILY_INTAKE ||
      data.type === CHART_TEMPLATE_TYPE.DAILY_INTAKE_NURSE 
    ) {
      await Promise.all(
        _.map(data.chartData, (chartItem) => {
          const label = _.find(template, { id: chartItem.labelId });
          if (label) {
            let optionIds = _.map(label.options, (option) => `${option._id}`);
            const check = chartItem.optionIds.every((opId) =>
              optionIds.includes(opId)
            );
            if (!check) {
              error["option"] = {
                value: "option",
                message: `Invalid id in chartData optionIds`,
              };
            }
            return true;
          }
          error[chartItem.pointId] = {
            value: chartItem.pointId,
            message: `Invalid labelId in chartData`,
          };
        })
      );

      return _.isEmpty(error);
    }
    await Promise.all(
      _.map(data.chartData, (chartItem) => {
        if (!_.includes(templateIds, chartItem.pointId)) {
          error[chartItem.pointId] = {
            value: chartItem.pointId,
            message: `Invalid pointId in chartData`,
          };
        }
      })
    );
    return _.isEmpty(error);
  }
  return false;
};

const findAllAppoinmentChart = async (req, res) => {
  try {
    console.log("---- Starting findAllAppoinmentChart function ----");

    const { isCountOnly, query, options } = req.body;
    let result;

    if (isCountOnly) {
      console.log("Count only mode is enabled.");
      const countQuery = query || {};
      console.log("Count Query:", countQuery);
      result = await dbService.countDocument(AppoinmentChart, countQuery);
      console.log("Count Result:", result);
      if (result) {
        result = { totalRecords: result };
        console.log("Success Response for Count:", result);
        return utils.successResponse(result, res);
      }
      console.log("Record not found for Count.");
      return utils.recordNotFound([], res);
    } else {
      console.log("Count only mode is disabled.");
      if (options !== undefined) {
        console.log("Options:", options);
        const queryForDocs = query || {};
        console.log("Query:", queryForDocs);
        result = await dbService.getAllDocuments(AppoinmentChart, queryForDocs, options);
        console.log("Result:", result);

        if (!result) {
          console.log("Records not found.");
          return utils.recordNotFound([], res);
        }
        console.log("Success Response:", result);
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    console.log("Error caught:", error);
    return utils.failureResponse(error.message, res);
  }
};

const getAppoinmentChart = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;

    let result = await dbService.getDocumentByQuery(AppoinmentChart, query);

    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const getAppoinmentChartCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where) {
      where = req.body.where;
    }
    let result = await dbService.countDocument(AppoinmentChart, where);
    if (result) {
      result = { totalRecords: result };
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getAppoinmentChartByAggregate = async (req, res) => {
  try {
    let result = await dbService.getDocumentByAggregation(
      AppoinmentChart,
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
const updateAppoinmentChart = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      appoinmentChartSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    // const chartValidate = await validateAppointmentChart(data);
    // if (!chartValidate) {
    //   return utils.inValidParam("Template Position not found.", res);
    // }
    let result = await dbService.findOneAndUpdateDocument(
      AppoinmentChart,
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
const partialUpdateAppoinmentChart = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      appoinmentChartSchemaKey.updateSchemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.updateDocument(
      AppoinmentChart,
      req.params.id,
      data
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - partialUpdateAppoinmentChart", error);
    return utils.failureResponse(error.message, res);
  }
};
const softDeleteAppoinmentChart = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      AppoinmentChart,
      { _id: req.params.id },
      { isDeleted: true }
    );
    if (!result) {
      return utils.failedSoftDelete(res);
    }
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - softDeleteAppoinmentChart", error);
    return utils.failureResponse(error.message, res);
  }
};
const bulkInsertAppoinmentChart = async (req, res) => {
  try {
    let data;
    if (req.body.data !== undefined && req.body.data.length) {
      data = req.body.data;
      let result = await dbService.bulkInsert(AppoinmentChart, data);
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
const bulkUpdateAppoinmentChart = async (req, res) => {
  try {
    let filter = {};
    let data;
    if (req.body.filter !== undefined) {
      filter = req.body.filter;
    }
    if (req.body.data !== undefined) {
      data = req.body.data;
      let result = await dbService.bulkUpdate(AppoinmentChart, filter, data);
      if (!result) {
        return utils.failureResponse("something is wrong.", res);
      }
      return utils.successResponse(result, res);
    } else {
      return utils.failureResponse("Invalid Data", res);
    }
  } catch (error) {
    logger.error("Error - bulkUpdateAppoinmentChart", error);
    return utils.failureResponse(error.message, res);
  }
};

const partialUpdateAppointmentChart = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };

    let result = await dbService.updateDocument(
      AppoinmentChart,
      req.params.id,
      data
    );
    if (data && Boolean(data.pinned) === false) {
      await AppoinmentChart.updateOne(
        { _id: req.params.id },
        { $unset: { pinned: 1 } }
      );
    }
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - partialUpdateAppointmentChart", error);
    return utils.failureResponse(error.message, res);
  }
};

const exportAppointmentChart = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      appoinmentChartSchemaKey.exportChartSchemaKeys
    );
    const body = req.body;
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }

    let options = {
      populate: [
        {
          path: "patientId",
          populate: [
            {
              path: "addressIds",
              populate: [
                {
                  path: "address",
            
                },
              ],
            },
          ],
        },
        { path: "creatorId" },
      ],
    };
    let result = await dbService.getDocumentByQuery(
      AppoinmentChart,
      { _id: body.id },
      [],
      options
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    if (
      result.pdfUri &&
      result.updatedAt <= moment(result.pdfGenerateDate).add(1, "minutes")
    ) {
      return utils.successResponse({ pdfUri: result.pdfUri }, res);
    }
    const chartData = await manipulateChartData(result);
    let address = _.first(result.patientId.addressIds);
    let signedOn =
      result && result.createdAt
        ? moment(result.createdAt).format("dddd MMMM DD, YYYY [at] hh:mm a")
        : null;
    let dob = result.patientId.dob
      ? moment(result.patientId.dob).format("dddd MMMM DD, YYYY")
      : null;
    let data = {
      ...result._doc,
      chartData: chartData,
      creatorId: result.creatorId,
      user: result.patientId,
      dob: dob,
      signedOn,
      address: address.address,
    };
    ejs.renderFile(
      path.join(__dirname, "../../views/charts/", "chart-template.ejs"),
      {
        data: data,
        serverUrl: process.env.SNAPCRACK_API_URL,
      },
      async (err, data) => {
        if (err) {
          return utils.failureResponse(err, res);
        } else {
          let options = {
            format: "A4",
            phantomArgs: ["--ignore-ssl-errors=yes"],
            timeout: "100000",
            childProcessOptions: {
              env: {
                OPENSSL_CONF: OPENSSL_CONF,
              },
            },
          };
          const publicPath = path.join(`${__dirname}`, "../../public/");
          let chartPath = `chartPdf/`;
          let destPath = path.join(`${publicPath}`, chartPath);
          if (!fs.existsSync(destPath)) {
            makeDir.sync(destPath);
          }
          chartPath = `${chartPath}${result._id}-report.pdf`;
          pdf
            .create(data, options)
            .toFile(
              `${destPath}${result._id}-report.pdf`,
              async function (err, data) {
                if (err) {
                  return utils.failureResponse(err, res);
                } else {
                  await dbService.updateDocument(AppoinmentChart, result._id, {
                    pdfUri: `${process.env.SNAPCRACK_API_URL}${chartPath}`,
                    pdfGenerateDate: new Date(),
                  });
                  return utils.successResponse(
                    { pdfUri: `${process.env.SNAPCRACK_API_URL}${chartPath}` },
                    res
                  );
                }
              }
            );
        }
      }
    );
  } catch (error) {
    logger.error(error);
    return utils.failureResponse(error.message, res);
  }
};

const manipulateChartData = async (result) => {
  if (result.type === APPOINTMENT_CHART_TYPE.SOAP) {
    const chartTemplate = await dbService.getDocumentByQuery(ChartTemplate, {
      type: CHART_TEMPLATE_TYPE.SOAP,
    });
    if (result.chartData.length > 0) {
      return await Promise.all(
        _.map(result.chartData, async (item) => {
          const template = _.find(chartTemplate.chartData, (chartItem) => {
            return chartItem._id.toString() === item.pointId;
          });
          return { name: template.point, desc: item.desc };
        })
      );
    }
    return [];
  }
  return result.desc;
};

const changeAuthorAppoinmentChart = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      appoinmentChartSchemaKey.changeAuthorAppoinmentChart
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.updateDocument(
      AppoinmentChart,
      req.params.id,
      data
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - changeAuthorDailyIntake", error);
    return utils.failureResponse(error.message, res);
  }
};

const updateNurseAppoinmentChart = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      appoinmentChartSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const chartValidate = await validateAppointmentChart(data);
    if (!chartValidate) {
      return utils.inValidParam("Template Position not found.", res);
    }
    const nurse = await AppoinmentChart.findOne({ _id: req.params.id });
    if (nurse.nurseId == data?.nurseId || nurse.chiroId == data?.chiroId) {
      let result = await dbService.findOneAndUpdateDocument(
        AppoinmentChart,
        { _id: req.params.id },
        data,
        { new: true }
      );
      if (!result) {
        return utils.failureResponse("No data found", res);
      }
      return utils.successResponse(result, res);
    } else {
      return utils.inValidParam(
        "You don't have access to edit DAILY_INTAKE.",
        res
      );
    }
  } catch (error) {
    logger.error("Error - updateNurseDailyIntake", error);
    return utils.failureResponse(error.message, res);
  }
};

const copyAppoinmentChart = async (req, res) => {
  try {
    const data = await dbService.getSingleDocumentById(
      AppoinmentChart,
      req.params.id
    );

    if (!data) {
      return utils.failureResponse("No data found", res);
    }
    let object = data.toObject();
    delete object._id;
    const updateData = new AppoinmentChart(object);
    const newChart = await dbService.createDocument(
      AppoinmentChart,
      updateData
    );
    const body = {
      ...req.body,
    };
    let result = await dbService.findOneAndUpdateDocument(
      AppoinmentChart,
      { _id: newChart._id },
      body,
      { new: true }
    );
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - duplicateDailyIntake", error);
    return utils.failureResponse(error.message, res);
  }
};

const deleteAppoinmentChart = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    const nurse = await dbService.getSingleDocumentById(
      AppoinmentChart,
      req.params.id
    );
    if (nurse.nurseId == data.nurseId || nurse.chiroId == data.chiroId) {
      let result = await dbService.deleteDocument(
        AppoinmentChart,
        req.params.id
      );
      if (!result) {
        return utils.failureResponse("No data found", res);
      }
      return utils.successResponse(result, res);
    } else {
      return utils.inValidParam(
        "You don't have access to delete Daily Intake.",
        res
      );
    }
  } catch (error) {
    logger.error("Error - deleteAppoinmentChart", error);
    return utils.failureResponse(error.message, res);
  }
};

const archiveAppoinmentChart = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      appoinmentChartSchemaKey.archiveAppoinmentChart
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const nurse = await dbService.getSingleDocumentById(
      AppoinmentChart,
      req.params.id
    );
    if (
      (nurse?.nurseId == data.nurseId && nurse?.isDeleted == false) ||
      (nurse?.chiroId == data.chiroId && nurse?.isDeleted == false)
    ) {
      const result = await dbService.updateDocument(
        AppoinmentChart,
        req.params.id,
        { isDeleted: true }
      );
      if (!result) {
        return utils.failedSoftDelete(res);
      }
      return utils.successResponse(result, res);
    } else {
      const result = await dbService.updateDocument(
        AppoinmentChart,
        req.params.id,
        { isDeleted: false }
      );
      if (!result) {
        return utils.inValidParam("No data found", res);
      }
      return utils.successResponse(result, res);
    }
  } catch (error) {
    logger.error("Error - archiveAppoinmentChart", error);
    return utils.failureResponse(error.message, res);
  }
};
module.exports = {
  addAppoinmentChart,
  findAllAppoinmentChart,
  getAppoinmentChart,
  getAppoinmentChartCount,
  getAppoinmentChartByAggregate,
  updateAppoinmentChart,
  partialUpdateAppoinmentChart,
  softDeleteAppoinmentChart,
  bulkInsertAppoinmentChart,
  bulkUpdateAppoinmentChart,
  partialUpdateAppointmentChart,
  exportAppointmentChart,
  changeAuthorAppoinmentChart,
  updateNurseAppoinmentChart,
  copyAppoinmentChart,
  deleteAppoinmentChart,
  archiveAppoinmentChart,
};
