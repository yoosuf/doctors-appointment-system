/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
const { NOTE_TYPES } = require("../../constants/common");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  chiroId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  type: joi.string().required().valid(NOTE_TYPES.NOTE, NOTE_TYPES.ALERT),
  desc: joi.string().required(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
