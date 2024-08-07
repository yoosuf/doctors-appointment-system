/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */
const { ROLE } = require("../../config/authConstant");
const joi = require("joi");
exports.schemaKeys = {
  roles: joi.array().required().allow(_.values(ROLE).toString()),
  createdBy: joi.any(),
  search: joi.string(),
  updatedBy: joi.any(),
};

exports.dashboardCountSchemaKeys = {
  userId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  createdBy: joi.any(),
  updatedBy: joi.any(),
};
