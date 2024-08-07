/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");



const serviceItem = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().integer().allow(null).optional()
});


exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string().required(),
  categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  description: joi.string(),
  items: joi.array().items(serviceItem).optional(),
  price: joi.number().integer(),
  isActive: joi.boolean(),
  createdBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
  servedBy: joi.string().valid("NURSE", "CHIROPRACTOR").default("CHIROPRACTOR"),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  description: joi.string(),
  items: joi.array().items(serviceItem).optional(),
  price: joi.number().integer(),
  isActive: joi.boolean(),
  createdBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
  servedBy: joi.string().valid("NURSE", "CHIROPRACTOR").default("CHIROPRACTOR"),
};
