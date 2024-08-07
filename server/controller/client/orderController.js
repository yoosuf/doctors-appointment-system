const Order = require("../../model/v1/order");
const User = require("../../model/v1/user");
const Membership = require("../../model/v1/membership");
const Invoice = require("../../model/invoice");
const Transaction = require("../../model/transaction");
const Location = require("../../model/v1/location");
const utils = require("../../utils/messages");
const orderSchemaKey = require("../../utils/validation/orderValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const deleteDependentService = require("../../utils/deleteDependent");
const moment = require("moment-timezone");
const { createPurchase, purchaseMembership } = require("../../config/recurly");
const { MESSAGE } = require("../../config/message");
const { ObjectId } = require("mongodb");
const { DATE_FORMAT } = require("../../constants/common");

const addOrder = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,orderSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    let data = new Order({
      ...req.body,
    });
    data.createdBy = req.user;
    const locationId = data.locationId;
    const location = await Location.findById(locationId);
    data.taxAmount = location.taxCharge;
    if (data.membershipId === undefined) {
      data = await createPurchase(data, req.user.id);
    } else {
      data = await purchaseMembership(data, req.user.id);
    }

    let result = await dbService.createDocument(Order, data);
    let transactionData = new Transaction({
      ...req.body,
    });
    transactionData.createdBy = req.user;
    transactionData.transaction = result.order.transactions;
    transactionData.orderId = result._id;
    transactionData.total = result.subTotal + location.taxCharge;
    transactionData.subTotal = result.subTotal;
    let transaction = await dbService.createDocument(
      Transaction,
      transactionData
    );
    let invoiceData = new Invoice({
      ...req.body,
    });
    invoiceData.createdBy = req.user;
    invoiceData.orderId = result._id;
    invoiceData.transactionId = transaction._id;
    invoiceData.invoiceId = result.order.number;
    invoiceData.total = result.subTotal + location.taxCharge;
    invoiceData.subTotal = result.subTotal;
    let invoice = await dbService.createDocument(Invoice, invoiceData);

    res.message = MESSAGE.ORDER_CREATE.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const findAllOrder = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    let aggregate = [];
    let nQuery;
    if (
      req.body?.query.fromDate &&
      req.body?.query.toDate &&
      req.body?.query.userId &&
      req.body?.query.orderType
    ) {
      aggregate.push(
        {
          $match: {
            $or: [
              {
                userId: ObjectId(req.body.query.userId),
              },
              {
                patientId: ObjectId(req.body.query.userId),
              },
            ],
            orderType: { $in: req.body.query.orderType },
          },
        },
        {
          $lookup: {
            from: "appointment",
            localField: "appointmentId",
            foreignField: "_id",
            as: "appointmentId",
          },
        },
        {
          $unwind: {
            path: "$appointmentId",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $or: [
              {
                "appointmentId.fromDateTime": {
                  $gte: moment(req.body.query.fromDate)
                    .utc()
                    .startOf("day")
                    .format(DATE_FORMAT)
                    .toString(),
                  $lte: moment(req.body.query.toDate)
                    .utc()
                    .endOf("day")
                    .format(DATE_FORMAT)
                    .toString(),
                },
              },
              {
                "appointmentId.appointmentDate": {
                  $gte: moment(req.body.query.fromDate)
                    .utc()
                    .startOf("day")
                    .toDate(),
                  $lte: moment(req.body.query.toDate)
                    .utc()
                    .endOf("day")
                    .toDate(),
                },
              },
            ],
          },
        },
        { $project: { _id: 1 } }
      );
      let runnerResult = await Order.aggregate(aggregate);
      let orderIds = runnerResult.map((element) => {
        return element._id;
      });
      nQuery = { _id: { $in: orderIds } };
    }
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = {
          ...req.body.query,
        };
      }
      if (nQuery) {
        result = await dbService.countDocument(Order, nQuery);
      } else {
        result = await dbService.countDocument(Order, query);
      }
      if (result) {
        result = {
          totalRecords: result,
        };
        res.message = MESSAGE.FETCH_ORDER_LIST.message;
        return utils.successResponse(result, res);
      }
      return utils.recordNotFound([], res);
    } else {
      if (req.body.options !== undefined) {
        options = {
          ...req.body.options,
        };

        if (req.body.query !== undefined) {
          query = {
            ...req.body.query,
          };
        }
        if (nQuery) {
          result = await dbService.getAllDocuments(Order, nQuery, options);
        } else {
          result = await dbService.getAllDocuments(Order, query, options);
        }
        if (!result) {
          return utils.recordNotFound([], res);
        }
        res.message = MESSAGE.FETCH_ORDER_LIST.message;
        return utils.successResponse(result, res);
      }
    }
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const getOrder = async (req, res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let result = await dbService.getDocumentByQuery(Order, query);

    if (result) {
      res.message = MESSAGE.FETCH_ORDER.message;
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const updateOrder = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id,
    };
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   orderSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return  utils.inValidParam(isValid.details, res);
    // }
    let result = await dbService.updateDocument(
      Order,
      {
        _id: req.params.id,
      },
      data
    );
    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }
    res.message = MESSAGE.UPDATE_ORDER.message;
    return utils.successResponse(result, res);
  } catch (error) {
    // if(error.name === "ValidationError"){
    //   return utils.isDuplicate(error.message, res);
    // }
    // if(error.code && error.code == 11000){
    //   return utils.isDuplicate(error.message, res);
    // }
    return utils.failureResponse(error, res);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    let result = await Order.updateOne(
      {
        _id: req.params.id,
      },
      {
        $push: {
          statusHistory: data,
        },
      }
    );
    res.message = MESSAGE.UPDATE_ORDER_STATUS.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};
const softDeleteOrder = async (req, res) => {
  try {
    let possibleDependent = [
      // {
      //   model: 'invoice',
      //   refId: 'orderId'
      // },
      // {
      //   model: 'transaction',
      //   refId: 'orderId'
      // }
    ];
    let id = req.params.id;
    let data = await dbService.updateDocument(
      Order,
      {
        _id: id,
      },
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
    res.message = MESSAGE.DELETE_OREDR.message;
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

// const partialUpdateOrder = async (req, res) => {
//   try {
//     const data = {
//       ...req.body,
//       id: req.params.id
//     };
//     let isValid = validation.validateParamsWithJoi(
//       data,
//       orderSchemaKey.updateSchemaKeys
//     );
//     if (isValid.error) {
//       return utils.inValidParam(isValid.details, res);
//     }
//     let result = await dbService.updateDocument(Order, req.params.id, data);
//     if (!result) {
//       return utils.failureResponse("something is wrong", res);
//     }

//     return utils.successResponse(result, res);
//   }
//   catch(error){
//     return utils.failureResponse(error.message, res);
//   }
// };
module.exports = {
  addOrder,
  findAllOrder,
  getOrder,
  updateOrder,
  updateOrderStatus,
  softDeleteOrder,

  // partialUpdateOrder,
};
