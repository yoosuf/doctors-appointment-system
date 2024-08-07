/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  message: joi.string().required(),
  seenAt: joi.date(),
  sentBy: joi.object(),
  receivedBy: joi.object(),
  medium: joi.string(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  message: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  seenAt: joi.date(),
  sentBy: joi.object(),
  receivedBy: joi.object(),
  medium: joi.string(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
