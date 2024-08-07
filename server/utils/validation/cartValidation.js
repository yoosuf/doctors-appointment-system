/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  userId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  patientId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  cartItems: joi
    .array()
    .items(
      joi.object().keys({
        _id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        productId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        productDetailId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        qty: joi.number(),
      })
    )
    .required()
    .label("cartItems field"),
  createdBy: joi.any(),
  updatedBy: joi.any(),
};
