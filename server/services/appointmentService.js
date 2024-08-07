const User = require('../model/v1/user')
const Wallet = require('../model/wallet')
const service = require('../utils/dbService')
const Appointment = require('../model/v1/appointment')
const { MESSAGE } = require('../config/message')
const { WALLET_TYPE, EVENT_STATUS } = require('../constants/common')
// const { NOTIFICATION } = require("../config/constant/notification");
const Order = require('../model/v1/order')
const Service = require('../model/v1/service')
const Transaction = require('../model/transaction')
const dbService = require('../utils/dbService')
const Role = require('../model/v1/role')
const { ORDER_TYPE } = require('../config/authConstant')
const Async = require('async')

const {
  APPOINTMENT_TYPE,
  PAYMENT_STATUS,
  STRING_TYPE,
  ROLE,
  PENALTY_CHARGE,
  APPOINTMENT_TAB,
  STRING_CONSTANT
} = require('../config/authConstant')
const { APPOINTMENT_STATUS, ORDER_STATUS } = require('../constants/common')
const _ = require('lodash')
const { Promise } = require('mongoose')
const { createJob } = require('../jobs/index')
const {
  updateServiceQuotas,
  QUOTA_OPERATION
} = require('../utils/handleQuataAcount')
const { getIO } = require('./../socket/appointment.io')

/**
 *
 * @param {*} userId
 * @param {*} admin
 */
async function checkOnboardingProgress (userId, admin = false) {
  let findUser = await User.findOne({ _id: userId })

  if (findUser && findUser?.onboardProgress !== 100) {
    throw new Error(
      admin
        ? 'Please complete customer onboarding before book appointment.'
        : 'Please complete your onboarding before book appointment.'
    )
  }
}

/**
 *
 * @param {*} param0
 * @returns
 */
async function placeOrder ({ id, dataObj }) {
  const io = getIO()

  try {
    let appointment
    if (!id) {
      const newAppointmentData = {
        serviceIds: dataObj.serviceIds,
        patientId: dataObj.patientId,
        categoryIds: dataObj.categoryIds,
        type: 'APPOINTMENT',
        appointmentDate: dataObj.appointmentDate,
        locationId: dataObj.locationId,
        status: dataObj.status ? dataObj.status : 'WAITING',
        notes: dataObj.notes
      }

      const newAppointment = new Appointment(newAppointmentData)
      appointment = await newAppointment.save()
      io.emit('appointmentAdded', appointment)
    } else {
      appointment = await Appointment.findById(id).populate(['patientId'])

      if (!appointment) {
        console.warn('No appointment found with the given ID.')
        return
      }

      if (appointment.status !== 'PENDING') {
        console.warn("Appointment is not in 'PENDING' status.")
        return
      }

      appointment.status = 'WAITING'
      appointment.services.forEach(service => {
        service.status = 'WAITING'
      })

      appointment = await appointment.save()
      io.emit('appointmentAdded', appointment)
    }

    // Create order
    // await createOrUpdateOrder(appointment, dataObj)

    // Update service quotas
    const serviceUpdates = appointment.services.map(service => ({
      serviceId: service.categoryId,
      amount: 1,
      operation: QUOTA_OPERATION.ADD
    }))
    await updateServiceQuotas(appointment.patientId, serviceUpdates)

    return appointment
  } catch (error) {
    console.error('Error in placeOrder:', error)
    throw new Error('An error occurred while processing the order.')
  }
}

async function createOrUpdateOrder (appointment, dataObj) {
  const orderData = {
    appointmentId: appointment._id,
    locationId: appointment.locationId,
    patientId: appointment.patientId,
    checkoutType: dataObj.checkoutType,
    payType: dataObj.payType,
    orderType: dataObj.orderType,
    serviceIds: appointment.serviceIds,
    categoryIds: appointment.categoryIds,
    status: 'PLACED',
    subTotal: dataObj.subTotal,
    taxAmount: dataObj.taxAmount,
    total: dataObj.total,
    transactionDate: new Date()
  }

  let order
  if (appointment._id) {
    // If appointment already has an associated order, update it
    order = await Order.findByIdAndUpdate(appointment._id, orderData, {
      new: true
    })
  } else {
    // If appointment does not have an associated order, create a new one
    const newOrder = new Order(orderData)
    order = await newOrder.save()
  }

  return order
}

// async function bookAppointment(id, req) {
//   console.log(`#################### req`, req.body);

//   let getAppointment = await Appointment.findById(id).populate(["patientId"]);

//   let updateResult = await Appointment.findByIdAndUpdate(
//     id,
//     {
//       status: "WAITING",
//       "services.$[].status": "WAITING",
//     },

//     { new: true }
//   );

// let customerObj = await User.findById(getAppointment.patientId._id);

// console.log(`#################### getAppointment`, getAppointment);
// console.log(`#################### customerObj`, customerObj);

// const serviceUpdates = getAppointment.services.map((service) => ({
//   serviceId: service.categoryId,
//   amount: 1,
//   operation: QUOTA_OPERATION.DEDUCT,
// }));

// await updateServiceQuotas(getAppointment.patientId._id, serviceUpdates);

// try {
//   let query = {};
//   query._id = id;
//   let price = 0;
//   let result;
//   var mCatIds = [];
//   var nonCreditId = [];
//   var creditedId = [];
//   let findOrder;

//   let getAppointment = await Appointment.findById(id).populate([
//     "patientId",
//     "serviceIds",
//   ]);

//   let updateResult = await Appointment.findByIdAndUpdate(
//     id,
//     {
//       status: "WAITING",
//       "services.$[].status": "WAITING",
//     },

//     { new: true }
//   );

//   // Check if the update was successful
//   if (updateResult) {
//     console.log("Appointment updated:", updateResult);
//   } else {
//     console.log("No appointment found with the given ID.");
//   }

//   let chiro = await User.findById(getAppointment.chiroId);
//   let patient = await User.findById(getAppointment.patientId._id);

//   let services = [];

//   await Promise.all(
//     _.map(getAppointment.serviceIds, async (doc) => {
//       let servicePrice = 0;
//       servicePrice = doc.price;
//       price += servicePrice;
//       let service = await Service.findById(doc._id);

//       services.push({
//         serviceId: doc._id,
//         name: doc.name,
//         timeDuration: doc.timeDuration,
//         price: doc.price,
//         categoryId: service.categoryId,
//       });
//     })
//   );

//   console.log(
//     `@@@@@@@@@@@@ SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE @@@@@@@@@@@@`
//   );
//   console.log(services);

//   const serviceUpdates = services.map((service) => ({
//     serviceId: service.categoryId,
//     amount: 1,
//     operation: QUOTA_OPERATION.ADD,
//   }));

//   // Now call the function with the userId and the mapped serviceUpdates

//   console.log(`THE SERVCIE QUOTA`);
//   console.log(patient.id);
//   console.log(JSON.stringify(serviceUpdates));
//   console.log(`THE SERVCIE QUOTA`);

//   // updateServiceQuotas(patient.id, serviceUpdates);
//   console.log(
//     `@@@@@@@@@@@@ SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE @@@@@@@@@@@@`
//   );

//   let orderData = {
//     appointmentId: id,
//     chiroId: chiro._id,
//     subTotal: price,
//     patientId: getAppointment.patientId._id,
//     services: services,
//     orderType: ORDER_TYPE.SERVICE,
//   };
//   //payment logic
//   let toDay = convertToTz({ date: new Date() });
//   if (
//     patient.purchasedPlans !== undefined &&
//     patient.purchasedPlans.expDate > toDay
//   ) {
//     var orderDetails = await dbService.createDocument(Order, orderData);
//     findOrder = await Order.findById(patient.purchasedPlans.orderId).lean();
//     let payment = 0;
//     let newService;
//     let planAccess = findOrder.planAccess;

//     let newPlanAccess = [];
//     var planCategoryIds = await planAccess.map((cat) =>
//       cat.categoryId.toString()
//     );

//     Async.forEachSeries(
//       getAppointment.serviceIds,
//       async (service, next_obj) => {
//         try {
//           let findService = await Service.findById(service);
//           if (planCategoryIds.includes(findService.categoryId.toString())) {
//             Async.forEachSeries(planAccess, async (doc, next_obj) => {
//               if (
//                 doc.categoryId == findService.categoryId.toString() &&
//                 doc.quantity > 0
//               ) {
//                 doc.quantity -= 1;
//                 newPlanAccess.push(doc);
//                 payment = 0;
//                 mCatIds.push(findService.categoryId);
//                 creditedId.push(findService._id);
//               } else if (
//                 doc.categoryId == findService.categoryId.toString() &&
//                 doc.quantity == 0
//               ) {
//                 newPlanAccess.push(doc);
//                 nonCreditId.push(findService._id);
//                 await noMembershipServicePayment(
//                   findService.price,
//                   findService._id,
//                   patient._id
//                 );
//               } else {
//                 newPlanAccess.push(doc);
//               }
//               next_obj();
//             });
//           } else if (
//             !planCategoryIds.includes(findService.categoryId.toString())
//           ) {
//             await noMembershipServicePayment(
//               findService.price,
//               findService._id,
//               patient._id
//             );
//           }
//           next_obj();
//         } catch (e) {
//           logger.error("error", e);
//           next_obj();
//         }
//       },
//       async () => {
//         newPlanAccess = [...new Set(newPlanAccess)];
//         let updatedOrder = await Order.findOneAndUpdate(
//           { _id: patient?.purchasedPlans?.orderId },
//           { planAccess: newPlanAccess },
//           { new: true }
//         );
//         await Order.findOneAndUpdate(
//           { _id: orderDetails._id },
//           { mCatIds: mCatIds },
//           { new: true }
//         );
//       }
//     );
//   } else {
//     if (patient.cards.length == 0) {
//       throw new Error(_localize("appointment.card", req));
//     }
//     let services = [];
//     let body = {};
//     await Promise.all(
//       _.map(getAppointment.serviceIds, async (doc) => {
//         services.push({
//           serviceObj: doc._id,
//           quantity: 1,
//           price: doc.price,
//         });
//       })
//     );
//     body.services = services;
//     await dbService.createDocument(Order, orderData);
//     return await reculry.createPurchase(body, patient._id);
//   }

//   const currentDate = new Date();
//   const utcDate = currentDate.toUTCString();

//   let appointmentData = {
//     orderId: orderDetails._id,
//     appointmentDate: new Date(),
//     status: APPOINTMENT_STATUS.WAITING,
//   };

//   console.log(`appointmentData`, appointmentData);

//   let updateAppointmentStatus = await Appointment.findOneAndUpdate(
//     { _id: id },
//     appointmentData,
//     { new: true }
//   );

//   console.log("Updated Document:", updateAppointmentStatus);

//   return updateAppointmentStatus;
// } catch (error) {
//   logger.error("Error - bookAppointment", error);
//   throw new Error(error);
// }
// }

async function creditAppointmentAmount (result) {
  try {
    let data = {
      type: WALLET_TYPE.APPOINTMENT,
      user: result.patientId?._id,
      transactionId: result.transaction?._id
    }
    let walletInserts = []
    await Promise.all(
      _.map(result.serviceIds, async service => {
        if (
          result.orderId &&
          result.orderId.mCatIds &&
          result.orderId.mCatIds.length &&
          _.includes(result.orderId.mCatIds, service.categoryId)
        ) {
          if (result.membership) {
            const memberShipExistsCheck = _.find(result.membership.planAccess, {
              categoryId: service.categoryId
            })
            if (memberShipExistsCheck) {
              await Order.updateOne(
                { _id: result.membership?._id },
                {
                  $set: {
                    'planAccess.$[planAccess].quantity':
                      memberShipExistsCheck + 1
                  }
                },
                {
                  upsert: false,
                  arrayFilters: [
                    {
                      'planAccess.categoryId': {
                        $eq: service.categoryId
                      }
                    }
                  ]
                }
              )
            }
          }
        } else {
          walletInserts.push({
            ...data,
            categoryId: service.categoryId,
            serviceId: service?._id,
            amt: service.amount
          })
        }
      })
    )
    await dbService.bulkInsert(Wallet, walletInserts)
  } catch (error) {
    logger.error(error)
    throw error
  }
}

module.exports = {
  placeOrder,
  checkOnboardingProgress
}
