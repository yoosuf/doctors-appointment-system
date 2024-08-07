const User = require("../model/v1/user");
const Wallet = require("../model/wallet");
const service = require("../utils/dbService");
const Appointment = require("../model/v1/appointment");
const availableSlot = require("../model/availableSlot");
const { MESSAGE } = require("../config/message");
const { WALLET_TYPE, EVENT_STATUS } = require("../constants/common");
// const { NOTIFICATION } = require("../config/constant/notification");
const Master = require("../model/master");
const Order = require("../model//v1/order");
const Service = require("../model/v1/service");
const Transaction = require("../model/transaction");
const dbService = require("../utils/dbService");
const Role = require("../model/v1/role");
const { ORDER_TYPE } = require("../config/authConstant");
const Async = require("async");
const reculry = require("../config/recurly");

const {
  APPOINTMENT_TYPE,
  PAYMENT_STATUS,
  STRING_TYPE,
  ROLE,
  PENALTY_CHARGE,
  APPOINTMENT_TAB,
  STRING_CONSTANT,
} = require("../config/authConstant");
const { APPOINTMENT_STATUS, ORDER_STATUS } = require("../constants/common");
const _ = require("lodash");
// const { createPayment } = require("../services/payment");
const { sendMessage } = require("../config/sms");
const { COUNTRY_CODE, EMAIL_SUBJECT } = require("../config/authConstant");
const { sendEmail } = require("../config/email");
const ejs = require("ejs");
const path = require("path");
const moment = require("moment");
const utils = require("../utils/messages");
const { Promise } = require("mongoose");
const { createJob } = require("../jobs/index");
const { updateServiceQuotas, QUOTA_OPERATION } = require("../utils/handleQuataAcount");

const randomString = async (length, chars) => {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
const generateNumber = async (type) => {
  var rString = await randomString(
    8,
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );
  let data;
  if (type == STRING_TYPE.ORDER) {
    data = await Order.findOne({
      orderNumber: STRING_CONSTANT.ORDER + rString,
    });
  } else if (type == STRING_TYPE.TRANSACTION) {
    data = await Transaction.findOne({
      transactionNumber: STRING_CONSTANT.TRANSACTION + rString,
    });
  } else {
    data = await InviteLink.findOne({
      linkNumber: STRING_CONSTANT.LINK_NUMBER + rString,
    });
  }

  if (!data) {
    return rString;
  } else {
    var rString = await randomString(
      8,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    return rString;
  }
};


const noMembershipServicePayment = async (price, serviceId, patientId) => {
  try {
    let services = [];
    let body = {};
    // await Promise.all(
    //   _.map(serviceArray, async (doc) => {
    //
    //     let service = await Service.findById(doc)

    //     services.push({
    //       serviceObj : service._id,
    //       quantity: 1,
    //       price: service.price,
    //      });
    //      body.services = services
    //     let result = await reculry.createPurchase(body,patientId)
    //     logger.error("resy=",result)
    //   })
    // );

    services.push({
      serviceObj: serviceId,
      quantity: 1,
      price: price,
    });
    body.services = services;
    let buyService = await reculry.createPurchase(body, patientId);
    logger.info("Service Purchase");

  } catch (error) {
    logger.error("Error - noMembershipServicePayment", error);
    throw new Error(error);
  }
};

module.exports = {
  generateNumber: generateNumber,

  bookAppointment: async (id, req) => {
    try {
      let query = {};
      query._id = id;
      let price = 0;
      let result;
      var mCatIds = [];
      var nonCreditId = [];
      var creditedId = [];
      let findOrder;

      let getAppointment = await Appointment.findById(id).populate([
        "patientId",
        "serviceIds",
      ]);



      let updateResult = await Appointment.findByIdAndUpdate(
        id,
        {
          status: 'WAITING',
          'services.$[].status': 'WAITING'
        },

        { new: true }
      );


      // Check if the update was successful
      if (updateResult) {
        console.log('Appointment updated:', updateResult);
      } else {
        console.log('No appointment found with the given ID.');
      }


      let chiro = await User.findById(getAppointment.chiroId);
      let patient = await User.findById(getAppointment.patientId._id);

      let services = [];

      await Promise.all(
        _.map(getAppointment.serviceIds, async (doc) => {
          let servicePrice = 0;
          servicePrice = doc.price;
          price += servicePrice;
          let service = await Service.findById(doc._id);

          services.push({
            serviceId: doc._id,
            name: doc.name,
            timeDuration: doc.timeDuration,
            price: doc.price,
            categoryId: service.categoryId,
          });

        })
      );


      console.log(`@@@@@@@@@@@@ SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE @@@@@@@@@@@@`)
      console.log(services)

      const serviceUpdates = services.map(service => ({
        serviceId: service.categoryId,
        amount: 1,
        operation: QUOTA_OPERATION.ADD
      }));

      // Now call the function with the userId and the mapped serviceUpdates


      console.log(`THE SERVCIE QUOTA`)
      console.log(patient.id)
      console.log(JSON.stringify(serviceUpdates))
      console.log(`THE SERVCIE QUOTA`)

      // updateServiceQuotas(patient.id, serviceUpdates);
      console.log(`@@@@@@@@@@@@ SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE @@@@@@@@@@@@`)

      let orderData = {
        appointmentId: id,
        chiroId: chiro._id,
        subTotal: price,
        patientId: getAppointment.patientId._id,
        services: services,
        orderType: ORDER_TYPE.SERVICE,
      };
      //payment logic
      let toDay = convertToTz({ date: new Date() });
      if (
        patient.purchasedPlans !== undefined &&
        patient.purchasedPlans.expDate > toDay
      ) {
        var orderDetails = await dbService.createDocument(Order, orderData);
        findOrder = await Order.findById(patient.purchasedPlans.orderId).lean();
        let payment = 0;
        let newService;
        let planAccess = findOrder.planAccess;

        let newPlanAccess = [];
        var planCategoryIds = await planAccess.map((cat) =>
          cat.categoryId.toString()
        );

        Async.forEachSeries(
          getAppointment.serviceIds,
          async (service, next_obj) => {
            try {
              let findService = await Service.findById(service);
              if (planCategoryIds.includes(findService.categoryId.toString())) {
                Async.forEachSeries(planAccess, async (doc, next_obj) => {
                  if (
                    doc.categoryId == findService.categoryId.toString() &&
                    doc.quantity > 0
                  ) {
                    doc.quantity -= 1;
                    newPlanAccess.push(doc);
                    payment = 0;
                    mCatIds.push(findService.categoryId);
                    creditedId.push(findService._id);
                  } else if (
                    doc.categoryId == findService.categoryId.toString() &&
                    doc.quantity == 0
                  ) {
                    newPlanAccess.push(doc);
                    nonCreditId.push(findService._id);
                    await noMembershipServicePayment(
                      findService.price,
                      findService._id,
                      patient._id
                    );
                  } else {
                    newPlanAccess.push(doc);
                  }
                  next_obj();
                });
              } else if (
                !planCategoryIds.includes(findService.categoryId.toString())
              ) {
                await noMembershipServicePayment(
                  findService.price,
                  findService._id,
                  patient._id
                );
              }
              next_obj();
            } catch (e) {
              logger.error("error", e);
              next_obj();
            }
          },
          async () => {
            newPlanAccess = [...new Set(newPlanAccess)];
            let updatedOrder = await Order.findOneAndUpdate(
              { _id: patient?.purchasedPlans?.orderId },
              { planAccess: newPlanAccess },
              { new: true }
            );
            await Order.findOneAndUpdate(
              { _id: orderDetails._id },
              { mCatIds: mCatIds },
              { new: true }
            );
          }
        );
      } else {
        if (patient.cards.length == 0) {
          throw new Error(_localize("appointment.card", req));
        }
        let services = [];
        let body = {};
        await Promise.all(
          _.map(getAppointment.serviceIds, async (doc) => {
            services.push({
              serviceObj: doc._id,
              quantity: 1,
              price: doc.price,
            });
          })
        );
        body.services = services;
        await dbService.createDocument(Order, orderData);
        return await reculry.createPurchase(body, patient._id);
      }

      const currentDate = new Date();
      const utcDate = currentDate.toUTCString();

      let appointmentData = {
        orderId: orderDetails._id,
        appointmentDate: new Date(),
        status: APPOINTMENT_STATUS.WAITING,
      };

      console.log(`appointmentData`, appointmentData)

      let updateAppointmentStatus = await Appointment.findOneAndUpdate(
        { _id: id },
        appointmentData,
        { new: true }
      );

      console.log('Updated Document:', updateAppointmentStatus);


      return updateAppointmentStatus;
    } catch (error) {
      logger.error("Error - bookAppointment", error);
      throw new Error(error);
    }
  },

  creditAppointmentAmount: async (result) => {
    try {
      let data = {
        type: WALLET_TYPE.APPOINTMENT,
        user: result.patientId?._id,
        transactionId: result.transaction?._id,
      };
      let walletInserts = [];
      await Promise.all(
        _.map(result.serviceIds, async (service) => {
          if (
            result.orderId &&
            result.orderId.mCatIds &&
            result.orderId.mCatIds.length &&
            _.includes(result.orderId.mCatIds, service.categoryId)
          ) {
            if (result.membership) {
              const memberShipExistsCheck = _.find(
                result.membership.planAccess,
                { categoryId: service.categoryId }
              );
              if (memberShipExistsCheck) {
                await Order.updateOne(
                  { _id: result.membership?._id },
                  {
                    $set: {
                      "planAccess.$[planAccess].quantity":
                        memberShipExistsCheck + 1,
                    },
                  },
                  {
                    upsert: false,
                    arrayFilters: [
                      {
                        "planAccess.categoryId": {
                          $eq: service.categoryId,
                        },
                      },
                    ],
                  }
                );
              }
            }
          } else {
            walletInserts.push({
              ...data,
              categoryId: service.categoryId,
              serviceId: service?._id,
              amt: service.amount,
            });
          }
        })
      );
      await dbService.bulkInsert(Wallet, walletInserts);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  },

  creditAmountCancelledEvent: async (body) => {
    try {
      const result = await dbService.getDocumentByQuery(Appointment, {
        _id: body._id,
      });
      const orderStatus = await Master.findOne({
        parentCode: "ORDER_STATUS",
        code: ORDER_STATUS.CANCEL,
      });
      const orderCompleteStatus = await Master.findOne({
        parentCode: "ORDER_STATUS",
        code: ORDER_STATUS.COMPLETED,
      });
      const orders = await Order.find({
        appointmentId: body._id,
        locationId: body.locationId,
        status: orderCompleteStatus._id,
      });
      Async.forEachSeries(orders, async (order, next) => {
        try {
          await reculry.creditPurchase(result, order.userId);
          await Order.updateOne(
            {
              appointmentId: body.eventId,
              userId: order.userId,
              locationId: body.locationId,
            },
            { status: orderStatus._id }
          );
          next();
        } catch (error) {
          logger.error(error);
          next();
        }
      });
    } catch (error) {
      logger.error(error);
    }
  },
  checkOnboardingProgress: async (userId, admin = false) => {
    let findUser = await User.findOne({ _id: userId });

    if (findUser && findUser?.onboardProgress !== 100) {
      throw new Error(
        admin
          ? "Please complete customer onboarding before book appointment."
          : "Please complete your onboarding before book appointment."
      );
    }
  },
  sendNewEventMail: async (body) => {
    let obj = {};
    await createJob("sendEventMail", obj, {});
  },
};
