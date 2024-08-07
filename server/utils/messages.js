const responseStatusCode = require("./responseCode");
const { USER_NOT_FOUND } = require("../constants/responceMessage");
exports.successResponse = (data, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: res.message
      ? res.message
      : "Your request is successfully executed",
    DATA: data,
  });
};

exports.changePasswordResponse = (data, res) => {
  res.MESSAGE = "Your password is successfully changed";
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: "Your password is successfully changed",
    DATA: data,
  });
};
exports.updateProfileResponse = (data, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: "Your profile is updated Successfully",
    DATA: data,
  });
};
exports.failureResponse = (data, res) => {
  let i = 0;
  if (data && data?.name === "ValidationError") {
    Object.keys(data.errors).forEach((key) => {
      if (i !== 1) {
        data.message = data.errors[key].message;
      }
      i++;
    });
  }
  res.MESSAGE = data?.message;
  return res.status(responseStatusCode.internalServerError).json({
    STATUS: responseStatusCode.internalServerError,
    MESSAGE: data?.message,
    DATA: null,
  });
};

exports.badRequest = (data, res) => {
  res.MESSAGE = "The request cannot be fulfilled due to bad syntax";
  return res.status(responseStatusCode.internalServerError).json({
    STATUS: responseStatusCode.internalServerError,
    MESSAGE: "The request cannot be fulfilled due to bad syntax",
    DATA: data,
  });
};
exports.isDuplicate = (data, res) => {
  res.MESSAGE = "already exists";
  return res.status(responseStatusCode.internalServerError).json({
    STATUS: responseStatusCode.internalServerError,
    MESSAGE: "already exists",
    DATA: data,
  });
};
exports.recordNotFound = (data, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: responseStatusCode.success,
    MESSAGE: "Record not found with specified criteria.",
    DATA: data,
  });
};
exports.insufficientParameters = (res) => {
  res.MESSAGE = "Insufficient parameters";
  return res.status(responseStatusCode.badRequest).json({
    STATUS: "FAILURE",
    MESSAGE: "Insufficient parameters",
  });
};

exports.notFound = (err, res) => {
  return res.status(responseStatusCode.notFound).json({
    STATUS: "FAILURE",
    MESSAGE: res.message ? res.message : USER_NOT_FOUND,
    DATA: err,
  });
};

exports.mongoError = (err, res) => {
  res.MESSAGE = "Mongo db related error";
  return res.status(responseStatusCode.internalServerError).json({
    STATUS: "FAILURE",
    MESSAGE: "Mongo db related error",
    DATA: err,
  });
};
exports.inValidParam = (message, res) => {
  message = message[0].message.replace(/\"/g, "");
  res.MESSAGE = message;
  return res.status(responseStatusCode.internalServerError).json({
    STATUS: "FAILURE",
    MESSAGE: message,
    DATA: null,
  });
};

exports.unAuthorizedRequest = (err, res) => {
  res.MESSAGE = "You are not authorized to access the request";
  return res.status(responseStatusCode.unAuthorizedRequest).json({
    STATUS: "FAILURE",
    MESSAGE: "You are not authorized to access the request",
    ERROR: err,
  });
};

exports.loginSuccess = (result, res) => {
  res.MESSAGE = "Login Successfully";
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: "Login Successfully",
    DATA: result,
  });
};
exports.verificationOTP = (result, res) => {
  res.MESSAGE = "OTP verified Successfully";
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: "OTP verified Successfully",
    DATA: result,
  });
};
exports.resendOTP = (result, res) => {
  res.MESSAGE = "OTP Resend Successfully";
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: "OTP Resend Successfully",
    DATA: result,
  });
};
exports.passwordEmailWrong = (res) => {
  return res.status(responseStatusCode.unAuthorizedRequest).json({
    STATUS: "FAILURE",
    MESSAGE: res.message,
    DATA: {},
  });
};
exports.loginFailed = (error, res) => {
  res.MESSAGE = error.message;
  return res.status(responseStatusCode.unAuthorizedRequest).json({
    STATUS: "FAILURE",
    MESSAGE: error.message,
    DATA: {},
  });
};
exports.failedSoftDelete = (res) => {
  res.MESSAGE = "Data can not be soft delete due to internal server error";
  return res.status(responseStatusCode.internalServerError).json({
    STATUS: "FAILURE",
    MESSAGE: "Data can not be deleted due to internal server error",
    DATA: {},
  });
};
exports.userNotFound = (res) => {
  res.MESSAGE = "User not found";
  return res.status(responseStatusCode.internalServerError).json({
    STATUS: "FAILURE",
    MESSAGE: "User not found",
    DATA: {},
  });
};
exports.emailNotVerified = (res) => {
  res.MESSAGE = "Your email is not verified";
  return res.status(responseStatusCode.internalServerError).json({
    STATUS: "FAILURE",
    MESSAGE: "Your email is not verified",
    DATA: {},
  });
};

exports.validationError = (data, res) =>
  res.status(responseStatusCode.validationError).json({
    STATUS: "VALIDATION_ERROR",
    MESSAGE: res.message ? res.message : "Invalid Data, Validation Failed",
    DATA: data,
  });
