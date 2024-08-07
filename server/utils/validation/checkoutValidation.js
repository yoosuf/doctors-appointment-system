/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
const { CHECKOUT_TYPES, PAYMENT_TYPES } = require("../../constants/common");
exports.schemaKeys = {
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  patientId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  eventId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  locationId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  checkoutType: joi
    .string()
    .required()
    .valid(CHECKOUT_TYPES.PATIENT, CHECKOUT_TYPES.USER),
  paymentType: joi
    .string()
    .required()
    .valid(PAYMENT_TYPES.CARD, PAYMENT_TYPES.CASH),
  taxAmount: joi.number(),
  createdBy: joi.any(),
  updatedBy: joi.any(),
};

exports.eventSchemaKeys = {
  userId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  locationId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  eventId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  paymentType: joi
    .string()
    .required()
    .valid(PAYMENT_TYPES.CARD, PAYMENT_TYPES.CASH),
  taxAmount: joi.number(),
  createdBy: joi.any(),
  updatedBy: joi.any(),
};
