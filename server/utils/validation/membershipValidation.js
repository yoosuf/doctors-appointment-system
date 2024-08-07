/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string().required(),
  description: joi.string().required(),
  duration: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  imageId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  categories: joi.array().items(),
  price: joi.number().integer(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  description: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  duration: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  imageId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  categories: joi.array().items(),
  price: joi.number().integer(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
