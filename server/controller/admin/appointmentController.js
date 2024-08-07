const Appointment = require('../../model/v1/appointment')
const utils = require('../../utils/messages')
const appointmentSchemaKey = require('../../utils/validation/appointmentValidation')
const validation = require('../../utils/validateRequest')
const dbService = require('../../utils/dbService')
const deleteDependentService = require('../../utils/deleteDependent')
const appointmentService = require('../../services/appointmentService')
const { sendMessage } = require('../../config/sms')
const moment = require('moment')
const { getIO } = require('./../../socket/appointment.io')

const {
  APPOINTMENT_STATUS,
  SCHEDULE_TYPE,
  EVENT_STATUS,
  ORDER_TYPES,
  ORDER_STATUS,
  DATE_FORMAT
} = require('../../constants/common')
const { ITEM } = require('../../config/authConstant')
const { createJob } = require('../../jobs/index')
const { ObjectId } = require('mongodb')
const appointmentServe = require('../../model/appointmentServe')
const Role = require('../../model/v1/role')
const logger = require('../../utils/logger')
const { calculateWaitTimeForService } = require('./../../utils/helper')

const {
  createAppointment
} = require('../../repository/v1/appointmentCreateRepository')

const {
  processRefund
} = require('../../repository/v1/appointmentRefundRepository')

const {
  appointmentStatus,
  quotaUsageMethod,
  paymentMethod,
  orderStatus
} = require('../../constants/v1')

// const appointmentSchema = Joi.object({
//   date: Joi.date().required(),
//   serviceIds: Joi.array().items(Joi.string().hex().length(24)).required(),
//   paymentMethod: Joi.string()
//     .valid(...Object.values(paymentMethod))
//     .required()
// })

const addAppointment = async (req, res) => {
  try {
    const io = getIO()

    await appointmentService.checkOnboardingProgress(req.body.patientId, true)

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@')

    console.log(`RES BODY ############`, req.body)

    const userId = req.body.patientId

    const appointmentData = {
      ...req.body,
      userId,
    }

    const result = await createAppointment(appointmentData)

    io.emit('appointmentAdded', result)

    return utils.successResponse(result, res)
  } catch (error) {
    // Handle validation and duplicate errors if needed
    logger.error('error', error)
    return utils.failureResponse(error, res)
  }
}


/**
 * List all Appointments
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const findAllAppointment = async (req, res) => {
  try {
    console.log("---- Starting findAllAppointment function ----");

    const loggedInUserRole = await Role.findOne({ _id: req.user.roleId });
    console.log("Logged In User Role:", loggedInUserRole);

    const { search, query: { locationId, fromDate, toDate, fromDateTime, toDateTime } = {}, isCountOnly, options } = req.body;
    let result;
    let aggregate = [];
    let nQuery;

    if (search) {
      console.log("Search Query:", search);
      aggregate.push({
        $match: {
          $or: [
            { 'patient.name': { $regex: search, $options: 'i' } },
            { 'patient.email': { $regex: search, $options: 'i' } },
            { 'patient.phone': { $regex: search, $options: 'i' } }
          ]
        }
      });
    }

    if (locationId) {
      console.log("Location ID:", locationId);
      aggregate.push({
        $match: {
          locationId: ObjectId(locationId)
        }
      });
    }

    if (fromDate && toDate) {
      console.log("From Date:", fromDate);
      console.log("To Date:", toDate);
      aggregate.push({
        $match: {
          date: {
            $gte: moment(fromDate).startOf('day').toDate(),
            $lte: moment(toDate).endOf('day').toDate()
          }
        }
      });
    }

    if (fromDateTime && toDateTime) {
      console.log("From DateTime:", fromDateTime);
      console.log("To DateTime:", toDateTime);
      aggregate.push({
        $match: {
          fromDateTime: {
            $gte: moment(fromDateTime).format(DATE_FORMAT).toString(),
            $lte: moment(toDateTime).add(1, 'days').format(DATE_FORMAT).toString()
          }
        }
      });
    }

    if (aggregate.length) {
      console.log("Aggregate:", aggregate);
      const runnerResult = await Appointment.aggregate(aggregate);
      const appointmentids = runnerResult.map(element => element._id);
      console.log("Appointment IDs:", appointmentids);
      nQuery = { _id: { $in: appointmentids } };
    }

    if (isCountOnly) {
      const countQuery = nQuery || {};
      console.log("Query for Count:", countQuery);
      result = await dbService.countDocument(Appointment, countQuery);
      console.log("Count Result:", result);
      if (result) {
        result = { totalRecords: result };
        console.log("Success Response for Count:", result);
        return utils.successResponse(result, res);
      }
      console.log("Record not found for Count.");
      return utils.recordNotFound([], res);
    } else {
      const queryForDocs = nQuery || {};
      console.log("Query for Docs:", queryForDocs);
      console.log("Options:", options || {});
      result = await dbService.getAllDocuments(Appointment, queryForDocs, options || {});
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
    logger.error('Error - findAllAppointment', error);
    return utils.failureResponse(error.message, res);
  }
}

const getAppointment = async (req, res) => {
  try {
    let query = {}
    query.id = req.params.id
    let result = await dbService.getDocumentByQuery(Appointment, query)

    if (result) {
      return utils.successResponse(result, res)
    }
    return utils.recordNotFound([], res)
  } catch (error) {
    return utils.failureResponse(error.message, res)
  }
}

const appointmentDetail = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const result = await Appointment.findOne(query)
      .populate({
        path: 'userId',
        populate: [
          { path: 'profile_image' },
          {
            path: 'membership._id',
            model: 'membership',
            populate: {
              path: 'categories._id',
              model: 'category'
            }
          }
        ]
      })
      .populate([
        { path: 'dailyIntakeChart' },
        {
          path: 'serviceIds',
          populate: [
            { path: 'categoryId' },
            { path: 'imageIds' }
          ]
        }
      ]);

    if (!result) {
      return utils.recordNotFound([], res);
    }

    const lastVisitFilter = {
      ...query,
      _id: { $ne: query._id },
      date: { $lt: result.date },
      locationId: result.locationId,
      userId: result.userId
    };
    const lastVisit = await Appointment.findOne(lastVisitFilter, null, { sort: { _id: -1 } });
    result.lastVisit = lastVisit ? lastVisit.date : null;

    return utils.successResponse(result, res);
  } catch (error) {
    logger.error(error);
    return utils.failureResponse(error.message, res);
  }
};

const appointmentVisitHistory = async (req, res) => {
  try {
    let query = {}
    query._id = req.params.id
    const body = req.body

    let options = {}
    if (req.body.options !== undefined) {
      options = { ...req.body.options }
    }

    let nextAppointmentLimit = body.nextAppointmentLimit
      ? body.nextAppointmentLimit
      : 0

    let lastAppointmentLimit = body.lastAppointmentLimit
      ? body.lastAppointmentLimit
      : 0

    let result = await dbService.getDocumentByQuery(Appointment, query)

    if (!result) {
      return utils.recordNotFound([], res)
    }
    const nextAppointments = await getAppointmentVisitDataByFilter(
      result,
      '$gt',
      query,
      nextAppointmentLimit,
      options
    )

    const lastAppointments = await getAppointmentVisitDataByFilter(
      result,
      '$lt',
      query,
      lastAppointmentLimit,
      options
    )

    const response = { nextAppointments, lastAppointments }
    return utils.successResponse(response, res)
  } catch (error) {
    logger.error(error)
    return utils.failureResponse(error.message, res)
  }
}

const getAppointmentVisitDataByFilter = async (
  result,
  symbol,
  query,
  limit,
  options
) => {
  const currentDate = new Date()
  const visitHistoryFilter = {
    ...query,
    _id: {
      $ne: query._id
    },
    date: { [symbol]: currentDate },
    locationId: result.locationId,
    userId: result.patientId
  }
  options = {
    ...options,
    sort: { _id: -1 },
    limit: limit
  }
  return Appointment.find(visitHistoryFilter, null, options)
}

const getAppointmentCount = async (req, res) => {
  try {
    let where = {}
    if (req.body.where) {
      where = req.body.where
    }
    let result = await dbService.countDocument(Appointment, where)
    if (result) {
      result = { totalRecords: result }
      return utils.successResponse(result, res)
    }
    return utils.recordNotFound([], res)
  } catch (error) {
    return utils.failureResponse(error.message, res)
  }
}

const getAppointmentByAggregate = async (req, res) => {
  try {
    let result = await dbService.getDocumentByAggregation(Appointment, req.body)
    if (result) {
      return utils.successResponse(result, res)
    }
    return utils.recordNotFound([], res)
  } catch (error) {
    return utils.failureResponse(error.message, res)
  }
}

const updateAppointment = async (req, res) => {
  try {
    await appointmentBooking.checkOnboardingProgress(req.body.customerId, true)
    const data = {
      ...req.body,
      id: req.params.id
    }
    // let isValid = validation.validateParamsWithJoi(
    //   data,
    //   appointmentSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //   return  utils.inValidParam(isValid.details, res);
    // }
    if (!data.status) {
      data.status =
        data.type === SCHEDULE_TYPE.APPOINTMENT
          ? appointmentStatus.PENDING
          : EVENT_STATUS.OPEN
    }
    let result = await dbService.findOneAndUpdateDocument(
      Appointment,
      { _id: req.params.id },
      data,
      { new: true }
    )

    if (!result) {
      return utils.failureResponse('something is wrong', res)
    }

    if (data.type === SCHEDULE_TYPE.EVENT) {
      let item = await updateItem(result, ITEM.EVENT)
      await dbService.updateDocument(Appointment, result._id, {
        recurlyItemId: item.id
      })
    }
    return utils.successResponse(result, res)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return utils.isDuplicate(error.message, res)
    }
    if (error.code && error.code == 11000) {
      return utils.isDuplicate(error.message, res)
    }
    return utils.failureResponse(error, res)
  }
}

const partialUpdateAppointment = async (req, res) => {
  const io = getIO()


  console.log(req.user)
  try {
    const appointmentId = req.params.id
    const updateData = req.body
    const userId = req.userId

    // console.log(
    //   "Received data for appointment ID " + appointmentId + ":",
    //   JSON.stringify(updateData)
    // );
    // console.log("Received data for user ID " + userId);

    // Validate incoming data
    let isValid = validation.validateParamsWithJoi(
      { ...updateData, id: appointmentId },
      appointmentSchemaKey.updateSchemaKeys
    )

    if (isValid.error) {
      console.log('Validation error:', isValid.error)
      return utils.inValidParam(isValid.details, res)
    }

    // Find the appointment
    const appointment = await Appointment.findOne({ _id: appointmentId })
    if (!appointment) {
      console.log('No appointment found for the given ID')
      return utils.failureResponse('Appointment not found', res)
    }
    // console.log("Appointment found:", appointment);

    // Check logged-in user's role
    const loggedInUserRole = await Role.findOne({ _id: req.user.roleId })
    if (!loggedInUserRole) {
      console.log('User role not found')
      return utils.failureResponse('User role not found', res)
    }
    // console.log("Logged in user role:", loggedInUserRole);

    // Update services based on the role and cancellation status
    if (updateData.status === appointmentStatus.CANCELED) {
      console.log('appointment BODY :', appointment)

      const result = await processRefund(appointment._id, appointment.userId)

      // const currentTime = new Date()

      // Update only those services served by the logged-in user's role to CANCELED
      // const updateResult = await Appointment.updateOne(
      //   { _id: appointmentId }, // { _id: appointmentId, "services.servedBy": loggedInUserRole.code },
      //   {
      //     $set: {
      //       'services.$[elem].status': appointmentStatus.CANCELED,
      //       'services.$[elem].endedAt': currentTime,
      //       remarks: req.body.remarks
      //     }
      //   },
      //   { arrayFilters: [{ 'elem.servedBy': loggedInUserRole.code }] }
      // )
      // console.log("Update result:", updateResult);

      // console.log(JSON.stringify(appointment.services))
      // Deduct quotas for each service
      // const serviceUpdates = appointment.services
      //   .filter(service => service.servedBy === loggedInUserRole.code)
      //   .map(service => ({
      //     serviceId: service.categoryId,
      //     amount: 1,
      //     operation: QUOTA_OPERATION.DEDUCT
      //   }))
      // await updateServiceQuotas(appointment.userId, serviceUpdates)

      io.emit('appointmentUpdated', result) // Notify all clients
    } else if (updateData.status === appointmentStatus.COMPLETED) {
      const currentAppointment = await Appointment.findOne({
        _id: appointmentId,
        'services.servedBy': loggedInUserRole.code
      })

      const currentService = currentAppointment.services.find(
        s => s.servedBy === loggedInUserRole.code
      )

      // if (!currentService || !currentService.startedAt) {
      //   throw new Error('Service not found or startedAt is not set.')
      // }

      const currentTime = new Date()
      const startedAt = new Date(currentService.startedAt)
      const timeDifference = (currentTime - startedAt) / 1000

      await Appointment.updateOne(
        { _id: appointmentId, 'services.servedBy': loggedInUserRole.code },
        {
          $set: {
            'services.$[elem].status': appointmentStatus.COMPLETED,
            'services.$[elem].serverId': userId,
            'services.$[elem].endedAt': currentTime,
            'services.$[elem].servedTime': timeDifference
          }
        },
        { arrayFilters: [{ 'elem.servedBy': loggedInUserRole.code }] }
      )

      const updatedAppointment = await Appointment.findOne({
        _id: appointmentId
      })

      io.emit('appointmentUpdated', updatedAppointment) // Notify all clients
      // console.log("Update result:", updatedAppointment);
    } else {
      // Update services as per the provided status

      await Appointment.updateOne(
        { _id: appointmentId, 'services.servedBy': loggedInUserRole.code },
        {
          $set: {
            'services.$[elem].status': updateData.status,
            'services.$[elem].serverId': userId
          }
        },
        { arrayFilters: [{ 'elem.servedBy': loggedInUserRole.code }] }
      )

      const updatedAppointment = await Appointment.findOne({
        _id: appointmentId
      })

      io.emit('appointmentUpdated', updatedAppointment) // Notify all clients
      // console.log("Update result:", updatedAppointment);
    }

    // Determine the new status for the appointment
    let newStatus = updateData.status

    // Update the overall appointment status
    const updatedApp = await Appointment.updateOne(
      { _id: appointmentId },
      { status: newStatus }
    )

    // emitUpdatedAppointments();
    io.emit('appointmentUpdated', updatedApp) // Notify all clients

    // console.log("Appointment updated successfully");
    // console.log(`APPOINTMENT OBJ ${updatedApp}`);
    return utils.successResponse('Appointment updated successfully', res)
  } catch (error) {
    console.error('Error in partialUpdateAppointment:', error)
    return utils.failureResponse(error, res)
  }
}

const softDeleteAppointment = async (req, res) => {
  try {
    let possibleDependent = [
      {
        model: 'order',
        refId: 'appointmentId'
      },
      {
        model: 'appointmentChart',
        refId: 'appointmentId'
      }
    ]
    let id = req.params.id
    let data = await dbService.updateDocument(
      Appointment,
      { _id: id },
      {
        isDeleted: true,
        isActive: false
      }
    )
    if (!data) {
      return utils.failedSoftDelete(res)
    }
    let result = await deleteDependentService.softDeleteDependent(
      possibleDependent,
      id
    )
    if (!result) {
      return utils.failureResponse('something went wrong', res)
    }
    return utils.successResponse(result, res)
  } catch (error) {
    return utils.failureResponse(error.message, res)
  }
}

const bulkInsertAppointment = async (req, res) => {
  try {
    let data
    if (req.body.data !== undefined && req.body.data.length) {
      data = req.body.data
      let result = await dbService.bulkInsert(Appointment, data)
      return utils.successResponse(result, res)
    } else {
      return utils.failureResponse('Invalid Data', res)
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return utils.validationError(error.message, res)
    }
    if (error.code && error.code == 11000) {
      return utils.isDuplicate(error.message, res)
    }
    return utils.failureResponse(error.message, res)
  }
}

const bulkUpdateAppointment = async (req, res) => {
  try {
    let filter = {}
    let data
    if (req.body.filter !== undefined) {
      filter = req.body.filter
    }
    if (req.body.data !== undefined) {
      data = req.body.data
      let result = await dbService.bulkUpdate(Appointment, filter, data)
      if (!result) {
        return utils.failureResponse('something is wrong.', res)
      }
      return utils.successResponse(result, res)
    } else {
      return utils.failureResponse('Invalid Data', res)
    }
  } catch (error) {
    return utils.failureResponse(error.message, res)
  }
}

const bookAppointment = async (req, res) => {
  const io = getIO()

  try {
    // let data = {
    //   ...req.body
    // }
    // let result = await appointmentBooking.bookAppointment(req.params.id)
    // res.message = MESSAGE.APPOINTMENT_BOOKED.message;

    const userId = req.body.customerId

    const appointmentData = {
      ...req.body,
      userId
    }

    const result = await createAppointment(appointmentData)

    // emitUpdatedAppointments();
    io.emit('appointmentAdded', result) // Notify all clients

    return utils.successResponse(result, res)
  } catch (error) {
    logger.error('Error - bookSlot', error)
    return utils.failureResponse(error, res)
  }
}

const sendAppointmentAlert = async (req, res) => {
  try {
    let query = {}
    query._id = req.params.id
    let options = {
      populate: [
        { path: 'userId' },
        { path: 'serviceIds' },
        { path: 'locationId' },
      ]
    }
    let result = await Appointment.findOne({ _id: query._id }, null, options)
    if (result) {
      const user = result.userId
      const service = result.serviceIds.length ? result.serviceIds[0] : ''
      const appointmentSlot = result.availableSlotId.length
        ? result.availableSlotId[0]
        : ''
      const message = `Hi ${user.firstName}, You have a ${
        service?.name
      } scheduled on ${moment(appointmentSlot?.startTime).format(
        'dddd MMM Do YYYY hh:mm:ss'
      )} at ${result.locationId.locationName} with ${
        result.chiroId.firstName
      }. Please go to your secure dashboard to see the details. ${FRONT_URL}`
      await sendMessage(user.phone, message)
      await dbService.updateDocument(Appointment, query._id, {
        alertTime: moment().toISOString()
      })
      return utils.successResponse('Alert send successfully', res)
    }
    return utils.recordNotFound([], res)
  } catch (error) {
    logger.error('Error - sendAppointmentAlert', error)
    return utils.failureResponse(error.message, res)
  }
}

const noShowAppointment = async (req, res) => {
  try {
    let query = {}
    query._id = req.params.id
    let membershipMatch = {
      orderType: ORDER_TYPES.MEMBERSHIP,
      isActive: true
    }
    let options = {
      populate: [
        { path: 'serviceIds' },
        {
          path: 'userId',
          populate: [
            { path: 'purchasedPlans.membershipId', match: membershipMatch }
          ]
        },
        { path: 'orderId' },
        { path: 'membership', match: membershipMatch }
      ]
    }
    const result = await Appointment.findOne(query, null, options)
    if (!result) {
      return utils.recordNotFound([], res)
    }
    await appointmentBooking.creditAppointmentAmount(result)
    return utils.successResponse([], res)
  } catch (error) {
    logger.error(error)
    return utils.failureResponse(error, res)
  }
}

const serveAppointment = async (req, res) => {
  const io = getIO();

  const firstName = req?.user?.firstName ?? '';
  const lastName = req?.user?.lastName ?? '';

  const fullName = `${firstName} ${lastName}`;

  try {
    console.log('Starting serveAppointment function');

    let query = {};
    query._id = req.params.id;
    console.log('Query:', query);

    const result = await Appointment.findOne(query);
    console.log('Result:', result);

    if (!result) {
      console.log('Appointment not found');
      return utils.recordNotFound([], res);
    }

    let data = {
      ...req.body
    };

    const loggedInUserRole = await Role.findOne({ _id: req.user.roleId });
    console.log('Logged in user role:', loggedInUserRole);

    const servicesToUpdate = result.services.filter(
      service => service.servedBy === loggedInUserRole.code
    );
    console.log('Services to update:', servicesToUpdate);

    let serviceIds = [];

    for (const selectedService of servicesToUpdate) {
      serviceIds.push(selectedService._id);

      const waitTimeCalculation = calculateWaitTimeForService(
        result,
        selectedService._id
      );

      console.log('Updating service:', selectedService._id);
      
      await Appointment.updateOne(
        { _id: req.params.id, 'services._id': selectedService._id },
        {
          $set: {
            'services.$.status': appointmentStatus.IN_PROGRESS,
            'services.$.serverId': req.userId,
            'services.$.serverName': fullName,
            'services.$.startedAt': new Date(), 
            'services.$.waitTime': waitTimeCalculation
          }
        }
      );

      await appointmentServe.updateOne(
        {
          appointmentId: req.params.id,
          serviceIds: { $in: selectedService._id }
        },
        {
          $set: {
            serverId: req.userId,
            status: appointmentStatus.IN_PROGRESS
          }
        }
      );
    }

    // using this to manage graying out on the on bet, till coming up with a better solution
    let updatedApp = await Appointment.updateOne(
      { _id: req.params.id },
      {
        waitMin: data.waitMin,
        status: appointmentStatus.IN_PROGRESS
      }
    );
    console.log('Updated appointment:', updatedApp);

    // emitUpdatedAppointments();

    io.emit('appointmentUpdated', updatedApp); // Notify all clients
    console.log('Appointment updated event emitted');

    return utils.successResponse([], res);
  } catch (error) {
    console.error('Error serving appointment:', error);
    logger.error(error);
    return utils.failureResponse(error, res);
  }
};

const getAllAppointmentsByPatientId = async (req, res) => {
  try {
    const userId = req.params.patientId

    let query = { userId }

    // Check if startDate and endDate parameters are provided
    if (req.query.startDate && req.query.endDate) {
      const startDate = new Date(req.query.startDate)
      const endDate = new Date(req.query.endDate)

      // Add date filter to the query
      query.date = { $gte: startDate, $lte: endDate }
    }

    // const appointments = await Appointment.find({ patientId });
    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 })
      .populate({
        path: 'userId',
        select: 'firstName lastName'
      })
      .populate('services._id')
      .populate('services.categoryId')
      .populate({
        path: 'locationId',
        select: 'locationName'
      })

    console.log(`getAllAppointmentsByPatientId`, appointments)

    if (appointments && appointments.length > 0) {
      return utils.successResponse(appointments, res)
    } else {
      return utils.recordNotFound([], res)
    }
  } catch (error) {
    return utils.failureResponse(error.message, res)
  }
}

module.exports = {
  addAppointment,
  findAllAppointment,
  getAppointment,
  getAppointmentCount,
  getAppointmentByAggregate,
  updateAppointment,
  partialUpdateAppointment,
  softDeleteAppointment,
  bulkInsertAppointment,
  bulkUpdateAppointment,
  bookAppointment,
  appointmentDetail,
  appointmentVisitHistory,
  sendAppointmentAlert,
  noShowAppointment,
  serveAppointment,
  getAllAppointmentsByPatientId
}
