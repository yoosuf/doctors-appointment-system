/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */
const { ROOM_TYPES } = require("../../constants/common");

const joi = require("joi");
exports.schemaKeys = {
  name: joi.string(),
  desc: joi.string(),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  type: joi.string().required().valid(ROOM_TYPES.GROUP, ROOM_TYPES.SINGLE),
  userIds: joi.array().required(),
  createdBy: joi.object().required(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string(),
  desc: joi.string(),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  type: joi.string().required().valid(ROOM_TYPES.GROUP, ROOM_TYPES.SINGLE),
  userIds: joi.array().required(),
  createdBy: joi.object().required(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
