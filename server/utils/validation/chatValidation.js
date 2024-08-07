/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  messageBy: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  roomId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  message: joi.string().when("files", {
    is: joi.exist(),
    then: joi.optional(),
    otherwise: joi.required(),
  }),
  folder: joi.string().when("files", {
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  files: joi.array(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
exports.markReadSchemaKey = {
  currentUserId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  roomId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
