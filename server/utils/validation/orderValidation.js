/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  activity: joi.object({
    note: joi.string(),
    status: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    date: joi.date(),
  }),
  total: joi.number().integer(),
  taxAmount: joi.number().integer(),
  subTotal: joi.number().integer(),
  orderNumber: joi.string(),
  payType: joi.string(),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  membershipId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  products: joi.array().items(),
  services: joi.array().items(),
  apppointmentId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  transactionDate: joi.date(),
  status: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  patientId: joi.object(),
  physicianId: joi.object(),
  sentPaymentLinkToCustomer: joi.boolean(),
  statusHistory: joi.array().items(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  activity: joi.object({
    note: joi.string(),
    status: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    date: joi.date(),
  }),
  total: joi.number().integer(),
  taxAmount: joi.number().integer(),
  subTotal: joi.number().integer(),
  orderNumber: joi.string(),
  payType: joi.string(),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  membershipId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  products: joi.array().items(),
  services: joi.array().items(),
  apppointmentId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  transactionDate: joi.date(),
  status: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  patientId: joi.object(),
  physicianId: joi.object(),
  sentPaymentLinkToCustomer: joi.boolean(),
  statusHistory: joi.array().items(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
