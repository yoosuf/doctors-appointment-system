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
  type: joi.string().required(),
  slug: joi.string(),
  uri: joi.string(),
  mime_type: joi.string(),
  file_size: joi.string(),
  title: joi.string(),
  alt: joi.string(),
  link: joi.string(),
  width: joi.string(),
  height: joi.string(),
  status: joi.string(),
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
  type: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  slug: joi.string(),
  uri: joi.string(),
  mime_type: joi.string(),
  file_size: joi.string(),
  title: joi.string(),
  alt: joi.string(),
  link: joi.string(),
  width: joi.string(),
  height: joi.string(),
  status: joi.string(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
