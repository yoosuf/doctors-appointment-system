/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string(),
  deliveryMethod: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  isActive: joi.boolean(),
  note: joi.string(),
  duration: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string(),
  deliveryMethod: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  isActive: joi.boolean(),
  note: joi.string(),
  duration: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
