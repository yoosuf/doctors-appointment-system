const Appointment = require("../../model/v1/appointment");
const User = require("../../model/v1/user");
const Order = require("../../model/v1/order");
const utils = require("../../utils/messages");
const appointmentSchemaKey = require("../../utils/validation/appointmentValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const appointmentService = require("../../services/appointmentService");
const { ORDER_TYPE, SCHEDULE_TYPE } = require("../../constants/common");
const { ObjectId } = require("mongodb");
const Joi = require("joi");


const {
  createAppointment
} = require('../../repository/v1/appointmentCreateRepository');

const {
  appointmentStatus,
  quotaUsageMethod,
  paymentMethod,
  orderStatus
} = require('../../constants/v1')

const appointmentSchema = Joi.object({
  date: Joi.date().required(),
  serviceIds: Joi.array().items(Joi.string().hex().length(24)).required(),
  paymentMethod: Joi.string()
    .valid(...Object.values(paymentMethod))
    .required()
})


const addAppointment = async (req, res) => {

  try {
    
    await appointmentService.checkOnboardingProgress(req.body.patientId);


    // console.log(req.body)
    
    const userId = req.userId
    // const locationId = req.locationId

    // await appointmentSchema.validateAsync(req.body)

    const appointmentData = {
      ...req.body,
      userId,
      // locationId
    }

    const result = await createAppointment(appointmentData)

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("error", error);
    return utils.failureResponse(error, res);
  }
};

const bookAppointment = async (req, res) => {
  try {
    const result = await appointmentService.placeOrder({
      id: req.params.id,
      dataObj: req,
    });

    console.log(`Place the invoice creation CLASS`, result)
    // res.message = _localize("appointment.booked", req);
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error in bookAppointment", error);
    return utils.failureResponse(error, res);
  }
};

const findAllAppointment = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      result = await dbService.countDocument(Appointment, query);
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
        result = await dbService.getAllDocuments(Appointment, query, options);

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

const getAppointment = async (req, res) => {
  try {
    let query = {};
    let options = {};
    query._id = req.params.id;
    // let result = await dbService.getAllDocuments(Appointment,query,options);
    let result = await Appointment.find(query).populate([
      { path: "serviceIds", populate: { path: "categoryId" } },
      { path: "patientId", populate: { path: "locationIds" } },
      { path: "chiroId", populate: { path: "locationIds" } },
      { path: "availableSlotId" },
    ]);
    if (result) {
      return utils.successResponse(result, res);
    }
    return utils.recordNotFound([], res);
  } catch (error) {
    logger.error("error", error);
    return utils.failureResponse(error.message, res);
  }
};

const updateAppointment = async (req, res) => {
  try {
    await appointmentService.checkOnboardingProgress(req.body.patientId);

    // Fetching existing appointments, excluding the current one
    const existingAppointments = await dbService.getAllDocuments(Appointment, {
      patientId: req.body.patientId,
      _id: { $ne: req.params.id },
    });

    // Debugging: Check what existingAppointments contains
    // console.log("Existing Appointments:", existingAppointments);

    // Ensure existingAppointments is an array before filtering
    const matchedAppointments = Array.isArray(existingAppointments)
      ? existingAppointments.filter(
          (appointment) =>
            appointment.patientId._id === req.body.patientId &&
            Array.isArray(appointment.services) &&
            appointment.services.some(
              (service) =>
                servicesArr.includes(service.categoryId) &&
                ["PENDING", "WAITING", "IN_SERVE"].includes(service.status)
            )
        )
      : [];

    // Check for conflicting appointments
    if (matchedAppointments.length > 0) {
      return utils.failureResponse("Conflicting appointments exist.", res);
    }

    // Updating the appointment
    const data = { ...req.body, id: req.params.id };
    let result = await dbService.findOneAndUpdateDocument(
      Appointment,
      { _id: req.params.id },
      data,
      { new: true }
    );

    if (!result) {
      return utils.failureResponse("something is wrong", res);
    }

    return utils.successResponse(result, res);
  } catch (error) {
    // Error handling
    return utils.failureResponse(error, res);
  }
};

const dashboardEventListing = async (req, res) => {
  try {
    let orderData = await Order.find({
      userId: req.user._id,
      orderType: [ORDER_TYPE.APPOINTMENT],
    }).select("appointmentId");
    let eventData = await dbService.getAllDocuments(
      Appointment,
      {
        isDeleted: false,
        locationId: ObjectId(req.user.locationIds?.[0]),
        type: SCHEDULE_TYPE.EVENT,
      },
      req.body.options
    );
    eventData?.docs?.forEach((obj) => {
      orderData.forEach((data) => {
        if (data.appointmentId.toString() === obj._id.toString()) {
          obj.isJoined = true;
        } else if (!obj.hasOwnProperty("isJoined")) {
          obj.isJoined = false;
        }
      });
    });
    eventData?.docs?.forEach((obj) => {
      if (!obj.hasOwnProperty("isJoined")) {
        obj.isJoined = false;
      }
    });
    return utils.successResponse(eventData, res);
  } catch (error) {
    logger.error("Error - dashboardEventListing", error);
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  addAppointment,
  bookAppointment,
  findAllAppointment,
  getAppointment,
  updateAppointment,
  dashboardEventListing,
};
