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
  imageId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  createdBy: joi.object(),
  onlineBookingEnabled: joi.boolean().default(false),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  servedBy: joi.string()
    .valid('NURSE', 'CHIROPRACTOR')
    .default('CHIROPRACTOR'),
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
  imageId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  createdBy: joi.object(),
  onlineBookingEnabled: joi.boolean().default(false),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  servedBy: joi.string()
    .valid('NURSE', 'CHIROPRACTOR')
    .default('CHIROPRACTOR'),
};
