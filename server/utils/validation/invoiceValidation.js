/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  userId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  invoiceId: joi.string().required(),
};
