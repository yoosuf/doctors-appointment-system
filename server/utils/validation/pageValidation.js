/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  body: joi.string().required(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  body: joi.string().required(),
  isDeleted: joi.boolean(),
};

exports.partialUpdateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  body: joi.string().required(),
  isDeleted: joi.boolean(),
};
