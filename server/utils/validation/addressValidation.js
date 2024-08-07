/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  addressLine1: joi.string(),
  addressLine2: joi.string(),
  countryId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  provinceId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  cityId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  postalCodeId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  email: joi.string(),
  countryCode: joi.string(),
  phone: joi.string(),
  businessNumber: joi.string(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  addressLine1: joi.string(),
  addressLine2: joi.string(),
  countryId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  provinceId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  cityId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  postalCodeId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  email: joi.string(),
  countryCode: joi.string(),
  phone: joi.string(),
  businessNumber: joi.string(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
