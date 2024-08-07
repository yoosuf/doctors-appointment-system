/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */
const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  userId: joi.string().required(),
  height: joi.object({
    ft: joi.number().required(),
    in: joi.number().required(),
  }),
  emergencyContact: joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    relationToYou: joi.string().required(),
  }),
  onboardSteps: joi.number().required(),
  totalOnboardSteps: joi.number().required(),
  weight: joi.number(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  userId: joi.string().required(),
  height: joi.object({
    ft: joi.number(),
    in: joi.number(),
  }),
  refferalInformation: joi.object({
    refferalName: joi.string().allow(null, ''),
    aboutUs: joi.array().allow(null, ''),
  }),
  approxDate: joi.string(),
  visitReason: joi.array(),
  painScale: joi.number(),
  chartId: joi.string(),
  chartData: joi.array(),
  discomfort: joi.array(),
  aggravates: joi.array(),
  fingerSign: joi.string(),
  parentName: joi.string().allow('').optional(),
  parentEmail: joi.string().allow('').optional(),
  emergencyContact: joi.object({
    name: joi.string(),
    phone: joi.string(),
    relationToYou: joi.string(),
  }),
  onboardSteps: joi.number(),
  totalOnboardSteps: joi.number(),
  weight: joi.number(),
  selectedLocation: joi.object(),

};
