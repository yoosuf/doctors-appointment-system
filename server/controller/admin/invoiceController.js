const Invoice = require("../../model/invoice");
const utils = require("../../utils/messages");
const invoiceSchemaKey = require("../../utils/validation/invoiceValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const { recurlyInvoicePdf } = require("../../config/recurly");
const addInvoice = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      invoiceSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const data = new Invoice({ ...req.body });
    let result = await dbService.createDocument(Invoice, data);

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
const findAllInvoice = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      result = await dbService.countDocument(Invoice, query);
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
        result = await dbService.getAllDocuments(Invoice, query, options);

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

const getInvoice = async (req, res) => {
  try {
    let query = {};
    query.id = req.params.id;
    let result = await dbService.getDocumentByQuery(Invoice, query);

    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const getInvoiceCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where) {
      where = req.body.where;
    }
    let result = await dbService.countDocument(Invoice, where);
    if (result) {
      result = { totalRecords: result };
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};

const getInvoiceByAggregate = async (req, res) => {
  try {
    let result = await dbService.getDocumentByAggregation(Invoice, req.body);
    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const updateInvoice = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      invoiceSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.findOneAndUpdateDocument(
      Invoice,
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
const partialUpdateInvoice = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      invoiceSchemaKey.updateSchemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let result = await dbService.updateDocument(Invoice, req.params.id, data);
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const softDeleteInvoice = async (req, res) => {
  try {
    let result = await dbService.updateDocument(
      Invoice,
      { _id: req.params.id },
      { isDeleted: true }
    );
    if (!result) {
      return utils.failedSoftDelete(res);
    }
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error.message, res);
  }
};
const bulkInsertInvoice = async (req, res) => {
  try {
    let data;
    if (req.body.data !== undefined && req.body.data.length) {
      data = req.body.data;
      let result = await dbService.bulkInsert(Invoice, data);
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
const bulkUpdateInvoice = async (req, res) => {
  try {
    let filter = {};
    let data;
    if (req.body.filter !== undefined) {
      filter = req.body.filter;
    }
    if (req.body.data !== undefined) {
      data = req.body.data;
      let result = await dbService.bulkUpdate(Invoice, filter, data);
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

const getRecurlyInvoicePdf = async (req, res) => {
  try {
    let result = await recurlyInvoicePdf(req.body.invoiceId);
    if (result) {
      res.message = `Invoice fetched Successfully`;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addInvoice,
  findAllInvoice,
  getInvoice,
  getInvoiceCount,
  getInvoiceByAggregate,
  updateInvoice,
  partialUpdateInvoice,
  softDeleteInvoice,
  bulkInsertInvoice,
  bulkUpdateInvoice,
  getRecurlyInvoicePdf,
};
