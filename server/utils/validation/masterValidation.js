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
  code: joi.string().required(),
  isActive: joi.boolean(),
  fileId: joi.object(),
  parentId: joi.object(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  code: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  isActive: joi.boolean(),
  fileId: joi.object(),
  parentId: joi.object(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
