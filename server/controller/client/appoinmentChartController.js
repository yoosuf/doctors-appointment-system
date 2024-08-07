const AppoinmentChart = require("../../model/appointmentChart");
const utils = require("../../utils/messages");
const appoinmentChartSchemaKey = require("../../utils/validation/appoinmentChartValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const moment = require("moment");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const makeDir = require("make-dir");
const pdf = require("html-pdf");
const {
  APPOINTMENT_CHART_TYPE,
  CHART_TEMPLATE_TYPE,
  OPENSSL_CONF,
} = require("../../constants/common");
const ChartTemplate = require("../../model/chartTemplate");

const findAllAppoinmentChart = async (req, res) => {
  try {
    console.log("---- Starting findAllAppoinmentChart function ----");

    const { isCountOnly, query, options } = req.body;
    let result;

    console.log(`${isCountOnly ? "Count" : "Count only"} mode is ${isCountOnly ? "enabled" : "disabled"}.`);
    console.log("Query:", query);
    console.log("Options:", options);

    if (isCountOnly) {
      result = await dbService.countDocument(AppoinmentChart, query || {});
      console.log("Count Result:", result);
      if (result) {
        result = { totalRecords: result };
        console.log("Success Response for Count:", result);
        return utils.successResponse(result, res);
      }
      console.log("Record not found for Count.");
      return utils.recordNotFound([], res);
    } else {
      result = await dbService.getAllDocuments(AppoinmentChart, query || {}, options || {});
      console.log("Result:", result);

      if (!result) {
        console.log("Records not found.");
        return utils.recordNotFound([], res);
      }
      console.log("Success Response:", result);
      return utils.successResponse(result, res);
    }
  } catch (error) {
    console.log("Error caught:", error);
    return utils.failureResponse(error.message, res);
  }
};

const getAppoinmentChart = async (req, res) => {
  try {
    let query = {};
    let options = {};
    if (req.body.options !== undefined) {
      options = { ...req.body.options };
    }
    if (req.body.query !== undefined) {
      query = { ...req.body.query };
    }
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(
      AppoinmentChart,
      query,
      [],
      options
    );

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

const partialUpdateAppointmentChart = async (req, res) => {
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
    return utils.failureResponse(error.message, res);
  }
};

const exportAppointmentChart = async (req, res) => {
  try {
    console.log("---- Starting exportAppointmentChart function ----");

    let isValid = validation.validateParamsWithJoi(
      req.body,
      appoinmentChartSchemaKey.exportChartSchemaKeys
    );
    console.log("Validation result:", isValid);
    const body = req.body;
    if (isValid.error) {
      console.log("Validation error:", isValid.error);
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
    console.log("Options for populating:", options);
    let result = await dbService.getDocumentByQuery(
      AppoinmentChart,
      { _id: body.id },
      [],
      options
    );
    console.log("Query result:", result);

    if (!result) {
      console.log("Query result is null.");
      return utils.failureResponse("something is wrong", res);
    }
    if (
      result.pdfUri &&
      result.updatedAt <= moment(result.pdfGenerateDate).add(1, "minutes")
    ) {
      console.log("PDF URI already exists and is up to date:", result.pdfUri);
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
          console.log("Error rendering EJS template:", err);
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
          console.log("PDF generation options:", options);
          const publicPath = path.join(`${__dirname}`, "../../public/");
          let chartPath = `chartPdf/`;
          let destPath = path.join(`${publicPath}`, chartPath);
          console.log("Destination path:", destPath);
          if (!fs.existsSync(destPath)) {
            makeDir.sync(destPath);
          }
          chartPath = `${chartPath}${result._id}-report.pdf`;
          console.log("Chart path:", chartPath);
          pdf
            .create(data, options)
            .toFile(
              `${destPath}${result._id}-report.pdf`,
              async function (err, data) {
                if (err) {
                  console.log("Error creating PDF:", err);
                  return utils.failureResponse(err, res);
                } else {
                  await dbService.updateDocument(AppoinmentChart, result._id, {
                    pdfUri: `${process.env.SNAPCRACK_API_URL}${chartPath}`,
                    pdfGenerateDate: new Date(),
                  });
                  console.log("PDF generation successful.");
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
    console.log("Error caught:", error);
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

module.exports = {
  findAllAppoinmentChart,
  getAppoinmentChart,
  getAppoinmentChartCount,
  getAppoinmentChartByAggregate,
  partialUpdateAppointmentChart,
  exportAppointmentChart,
};
