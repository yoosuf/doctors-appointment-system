/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  amount: joi.number().integer(),
  transactionNumber: joi.string(),
  payType: joi.string(),
  orderId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  membershipId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  apppointmentId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  transactionDate: joi.date(),
  status: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  patientId: joi.object(),
  physicianId: joi.object(),
  statusHistory: joi.array().items(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  amount: joi.number().integer(),
  transactionNumber: joi.string(),
  payType: joi.string(),
  orderId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  membershipId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  apppointmentId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  transactionDate: joi.date(),
  status: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  patientId: joi.object(),
  physicianId: joi.object(),
  statusHistory: joi.array().items(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
