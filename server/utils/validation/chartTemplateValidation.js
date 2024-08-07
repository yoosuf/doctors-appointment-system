/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */
const { CHART_TEMPLATE_TYPE } = require("../../constants/common");
const joi = require("joi");

const options = joi.object().keys({
  name: joi.string().required(),
  sequence: joi.number().required(),
  desc: joi.string(),
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
});
const chartData = joi.object().keys({
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  point: joi.number().when({
    is: CHART_TEMPLATE_TYPE.SOAP,
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  label: joi.string().when({
    is: CHART_TEMPLATE_TYPE.DAILY_INTAKE,
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  sequence: joi.number().when({
    is: CHART_TEMPLATE_TYPE.DAILY_INTAKE,
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  options: joi.array().items(options).when({
    is: CHART_TEMPLATE_TYPE.DAILY_INTAKE,
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  pos: joi.string().allow(null).allow(""),
  desc: joi.string().allow(null).allow(""),
});
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string().required(),
  desc: joi.string(),
  isActive: joi.boolean(),
  chartData: joi.array().items(chartData).required().label("chartData field"),
  type: joi.string(),
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
  desc: joi.string(),
  isActive: joi.boolean(),
  chartData: joi.array().items(chartData).required().label("chartData field"),
  type: joi.string(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
