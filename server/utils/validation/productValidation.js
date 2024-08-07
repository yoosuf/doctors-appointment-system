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
  price: joi.number().integer(),
  categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
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
  description: joi.string().when({
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  price: joi.number().integer(),
  categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
};
exports.partialUpdateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  productDetail: joi
    .array()
    .items(
      joi.object().keys({
        id: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        locationId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        qty: joi.number().required(),
        price: joi.number(),
      })
    )
    .required()
    .label("productDetail field"),
  createdBy: joi.object(),
  updatedBy: joi.object(),
};
