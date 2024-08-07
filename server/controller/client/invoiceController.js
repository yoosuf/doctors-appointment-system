const Invoice = require('../../model/invoice')
const utils = require('../../utils/messages')
const dbService = require('../../utils/dbService')
const { recurlyInvoice, recurlyInvoicePdf } = require('../../config/recurly')
const Order = require('../../model/v1/order')

const findAllInvoice = async (req, res) => {
  try {

    // const result = await Order.find({userId: req.user._id})
    // console.log(result)
    // res.message = 'All Invoices have been fetched Successfully';

    // return utils.successResponse(result, res);

    console.log("Starting findAllInvoice function...");
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      console.log("isCountOnly condition triggered...");
      if (req.body.query !== undefined) {
        query = {
          ...req.body.query
        };
      }
      console.log("Query:", query);
      res.message = 'All Invoices have been fetched Successfully';
      result = await dbService.countDocument(Order, query);
      console.log("Result after counting documents:", result);
      if (result) {
        result = {
          totalRecords: result
        };
        console.log("Result after formatting:", result);
        return utils.successResponse(result, res);
      }
      console.log("No result found...");
      return utils.recordNotFound([], res);
    } else {
      console.log("isCountOnly condition not triggered...");
      if (req.body.options !== undefined) {
        options = {
          ...req.body.options
        };
        console.log("Options:", options);
        if (req.body.query !== undefined) {
          query = {
            ...req.body.query
          };
          console.log("Query:", query);
        }
        if (query?.fromDate && query?.toDate) {
          Object.assign(query, {
            createdAt: {
              $gt: new Date(query?.fromDate),
              $lt: new Date(query?.toDate)
            }
          });
          console.log("Query with date range:", query);
        }
        query.userId = req.user._id;
        console.log("Query with userId:", query);
        result = await dbService.getAllDocuments(Order, query, options);

        if (!result) {
          console.log("No result found...");
          return utils.recordNotFound([], res);
        }
        console.log("Result after fetching documents:", result);
        res.message = 'All Invoices have been fetched Successfully';
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    console.log("Error occurred:", error);
    return utils.failureResponse(error, res);
  }
};
const getInvoice = async (req, res) => {
  try {
    let query = {}
    query._id = req.params.id
    let result = await dbService.getDocumentByQuery(Order, query)

    if (result) {
      res.message = `Invoice ${reusult.invoiceId} has been fetched Successfully`
      return utils.successResponse(result, res)
    }
    return utils.recordNotFound([], res)
  } catch (error) {
    return utils.failureResponse(error, res)
  }
}

const getRecurlyInvoice = async (req, res) => {
  try {
    let result = await recurlyInvoice(req.body.invoiceId)
    if (result) {
      res.message = `Invoice ${reusult.invoiceId} has been fetched Successfully`
      return utils.successResponse(result, res)
    }
    return utils.recordNotFound([], res)
  } catch (error) {
    return utils.failureResponse(error, res)
  }
}
const getRecurlyInvoicePdf = async (req, res) => {
  try {
    let result = await recurlyInvoicePdf(req.body.invoiceId)
    if (result) {
      res.message = `Invoice fetched Successfully`
      return utils.successResponse(result, res)
    }
    return utils.recordNotFound([], res)
  } catch (error) {
    return utils.failureResponse(error, res)
  }
}

module.exports = {
  findAllInvoice,
  getInvoice,
  getRecurlyInvoice,
  getRecurlyInvoicePdf
}
