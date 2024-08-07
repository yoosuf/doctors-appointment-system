const utils = require("../../utils/messages");
const service = require("../../utils/dbService");
const checkInRequestModel = require("../../model/checkInRequest");
const appointment = require("../../model/v1/appointment");
const User = require("../../model/v1/user");
const _ = require("lodash");
const moment = require("moment");
const timeDifference = require("../../utils/timeDifference");
const { sendMessage } = require("../../config/sms");
const { COUNTRY_CODE } = require("../../config/authConstant");

module.exports = {
  checkIp: async (req, res) => {
    try {
      res.message = "Authorized IP address";
      return utils.successResponse({ isValid: true }, res);
    } catch (error) {
      logger.error("Error - checkIp", error);
      return utils.failureResponse(error, res);
    }
  },

  checkInRequest: async (req, res) => {
    try {
      let body = req.body;
      const user = await User.findOne({ phone: body.phone }).populate({
        path: "appointments",
        populate: "availableSlotId",
      });
      let message;
      let logInLink = `${process.env.APP_URL}auth/login?message=checkin-appointment`;
      if (!user) {
        message = "User does not exist";
        let signUpLink = `${process.env.APP_URL}auth/register`;
        await sendMessage(
          COUNTRY_CODE + body.phone,
          `Welcome to snapcrack and click on the link to join the platform. ${signUpLink}`
        );
        throw new Error(message);
      } else if (user.appointmentData === null) {
        message = "User does not have any appointment";
        await sendMessage(
          COUNTRY_CODE + body.phone,
          `You doesn't have any appointment. Please click here to book appointment ${logInLink}`
        );
        throw new Error(message);
      }
      let appointmentTime =
        user?.appointmentData?.availableSlotId[0]?.startTime;
      let todayTime = new Date();

      let time = await timeDifference.timeDifference(
        todayTime.getTime(),
        appointmentTime?.getTime()
      );
      if (time.day == 0) {
        if (appointmentTime.getTime() > todayTime.getTime()) {
          let appointmentId = user?.appointmentData?._id;
          let checkInLink = `${process.env.SNAPCRACK_API_URL}/checkIn-user?id=${appointmentId}`;
          await sendMessage(
            COUNTRY_CODE + user.phone,
            `Welcome to snapcrack, You have an appointment today Confirm your check-in by clicking here:${checkInLink}`
          );
        }
        return utils.successResponse(user?.appointmentData, res);
      } else {
        await sendMessage(
          COUNTRY_CODE + body.phone,
          `You doesn't have any appointment. Please click here to book appointment ${logInLink}`
        );
        throw new Error("User does not have any appointment today");
      }
    } catch (error) {
      logger.error("Error - loginUser", error);
      return utils.failureResponse(error, res);
    }
  },

  checkInUser: async (req, res) => {
    try {
      let body = req.query;
      let data = {};
      let findAppointment = await appointment
        .findOne({ _id: body.id })
        .populate("availableSlotId");
      data = {
        patientId: findAppointment.patientId,
        chiroId: findAppointment.chiroId,
        appointmentId: findAppointment._id,
        checkIntime: new Date(),
      };

      let result = await service.createDocument(checkInRequestModel, data);
      res.message = `Your checkIn time start`;
      return utils.successResponse([], res);
    } catch (error) {
      logger.error("Error - checkInRequest", error);
      return utils.failureResponse(error, res);
    }
  },
};
