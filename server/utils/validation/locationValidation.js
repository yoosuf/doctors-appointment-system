/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationName: joi.string().required(),
  taxCharge: joi.number().integer(),
  description: joi.string(),
  subOwnerId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationAddressId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  billingAddressId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  assignTo: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  isActive: joi.boolean(),
  lat: joi.number().integer(),
  lang: joi.number().integer(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationName: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  taxCharge: joi.number().integer(),
  description: joi.string(),
  subOwnerId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationAddressId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  billingAddressId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  assignTo: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  isActive: joi.boolean(),
  lat: joi.number().integer(),
  lang: joi.number().integer(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
