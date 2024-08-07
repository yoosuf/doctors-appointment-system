/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  customerId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  chiroId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  fromDateTime: joi.date(),
  ToDateTime: joi.date(),
  eventNote: joi.string(),
  eventCost: joi.number().integer(),
  memberDiscount: joi.number().integer(),
  total: joi.number().integer(),
  customerNote: joi.string(),
  activity: joi.object({
    note: joi.string(),
    status: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    date: joi.date(),
  }),
  registrationLimit: joi.number().integer(),
  treatment: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  treatmentDetails: joi.object(),
  notes: joi.string(),
  name: joi.string(),
  description: joi.string(),
  type: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  payemntMethod: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  notifyOnEmails: joi.boolean(),
  isActive: joi.boolean(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
};
exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  customerId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  locationId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  chiroId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  fromDateTime: joi.date(),
  ToDateTime: joi.date(),
  eventNote: joi.string(),
  eventCost: joi.number().integer(),
  memberDiscount: joi.number().integer(),
  appointmentDate:  joi.date(),
  total: joi.number().integer(),
  customerNote: joi.string(),
  activity: joi.object({
    note: joi.string(),
    status: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    date: joi.date(),
  }),
  registrationLimit: joi.number().integer(),
  treatment: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  treatmentDetails: joi.object(),
  notes: joi.string(),
  name: joi.string(),
  description: joi.string(),
  remarks: joi.string(),
  type: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  payemntMethod: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  notifyOnEmails: joi.boolean(),
  isActive: joi.boolean(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),
  servedMin: joi.number(),
  status: joi.string(),
};

exports.eventCancelSchemaKeys = {
  userId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  locationId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  eventId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  createdBy: joi.any(),
  updatedBy: joi.any(),
};

exports.eventCancelAllUserSchemaKeys = {
  locationId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  eventId: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  createdBy: joi.any(),
  updatedBy: joi.any(),
};
