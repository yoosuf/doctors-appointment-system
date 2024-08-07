/*
 * modelValidation.js
 * purpose     : request validation
 * desc : validate each post and put request as per mongoose model
 *
 */

const joi = require("joi");
const { APPOINTMENT_CHART_TYPE } = require("../../constants/common");

const chartData = joi.object().keys({
  pointId: joi
    .string()
    .when({
      is: APPOINTMENT_CHART_TYPE.SOAP,
      then: joi.required(),
      otherwise: joi.optional(),
    })
    .regex(/^[0-9a-fA-F]{24}$/),
  desc: joi
    .when({
      is: APPOINTMENT_CHART_TYPE.SOAP,
      then: joi.required(),
      otherwise: joi.optional(),
    })
    .label("Description field"),
  extra_note: joi.string(),

  labelId: joi
    .string()
    .when({
      is: APPOINTMENT_CHART_TYPE.DAILY_INTAKE,
      then: joi.required(),
      otherwise: joi.optional(),
    })
    .regex(/^[0-9a-fA-F]{24}$/),
  optionIds: joi.array().when({
    is: APPOINTMENT_CHART_TYPE.DAILY_INTAKE,
    then: joi.required(),
    otherwise: joi.optional(),
  }),

  key: joi
    .string()
    .when({
      is: APPOINTMENT_CHART_TYPE.SOAP_NURSE,
      then: joi.required().allow(null, ''),
      otherwise: joi.optional().allow(null, ''),
    }),
  value: joi.string().when({
    is: APPOINTMENT_CHART_TYPE.SOAP_NURSE,
    then: joi.required().allow(null, ''),
    otherwise: joi.optional().allow(null, ''),
  }),


});


exports.schemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  creatorId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  appointmentId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  patientId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  chartId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  desc: joi.string(),
  blood_pressure: joi.string(),
  extra_note: joi.string(),
  isActive: joi.boolean(),

  subjective: joi.string(),
  objective: joi.string(),
  assestment: joi.string(),
  plans: joi.string(),
  viewableBy: joi.string().required(),
  patientVisible: joi.boolean().required(),

  chartData: joi.array(), 

  // chartData: joi.array().items(chartData).required().label("chartData field"),
  type: joi.string(),
  no: joi.number(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),



  previousInjection: joi.string().allow(""),
  previousInjectionDescribe: joi.string().allow(""),
  medicationAllergy: joi.string().allow(""),
  medicationAllergyDescribe: joi.string().allow(""),
  otherAllergy: joi.string().allow(""),
  otherAllergyDescribe: joi.string().allow(""),
  injectionType: joi.string().allow(""),
  height: joi.string().allow(""),
  weight: joi.string().allow(""),
  bmi: joi.string().allow(""),
  sideEffects: joi.string().allow(""),
  nadPlusOption: joi.string().allow(""),
  ivInjection: joi.string().allow(""),
  ivVolume: joi.string().allow(""),
  injectionSide: joi.string().allow(""),
  injectionSideDescription: joi.string().allow(""),
  note: joi.string(),
};


exports.updateSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  creatorId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  appointmentId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  chartId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  desc: joi.string(),
  isActive: joi.boolean(),
  pinned: joi.boolean(),
  subjective: joi.string(),
  objective: joi.string(),
  assestment: joi.string(),
  plans: joi.string(),
  viewableBy: joi.string().required(),
  patientVisible: joi.boolean().required(),
  chartData: joi.array(), 

  // chartData: joi.array().items(chartData).required().label("chartData field"),
  type: joi.string(),
  createdBy: joi.object(),
  updatedBy: joi.object(),
  deletedBy: joi.object(),
  deletedAt: joi.date(),
  isDeleted: joi.boolean(),



  perviousInjection: joi.string().allow(null),
  perviousInjectionDescribe: joi.string().allow(null),
  medicationAllergy: joi.string().allow(null),
  medicationAllergyDescribe: joi.string().when('medicationAllergy', {
    is: joi.exist(),
    then: joi.required().messages({
      'any.required': 'medication_allergy_describe is required when medication_allergy is provided.',
    }),
    otherwise: joi.string().allow(null),
  }),
  otherAllergy: joi.string().allow(null),
  otherAllergyDescribe: joi.string().allow(null),
  injectionType: joi.string().allow(null),
  height: joi.string().allow(null),
  weight: joi.string().allow(null),
  bmi: joi.string().allow(null),
  sideEffects: joi.string().allow(null),
  nadPlusOption: joi.string().allow(null),
  ivInjection: joi.string().allow(null),
  ivVolume: joi.string().allow(null),
  injectionSide: joi.string().allow(null),
  injectionSideDescription: joi.string().allow(null),
};

exports.exportChartSchemaKeys = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  type: joi
    .string()
    .required()
    .valid(
      APPOINTMENT_CHART_TYPE.SOAP,
      APPOINTMENT_CHART_TYPE.SOAP_NURSE,
      APPOINTMENT_CHART_TYPE.DAILY_INTAKE,
      APPOINTMENT_CHART_TYPE.DAILY_INTAKE_NURSE
    ),
  createdBy: joi.object(),
  updatedBy: joi.object(),
};

exports.changeAuthorAppoinmentChart = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  chiroId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  nurseId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  patientId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  createdBy: joi.object(),
  updatedBy: joi.object(),
};

exports.archiveAppoinmentChart = {
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  chiroId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  nurseId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  createdBy: joi.object(),
  updatedBy: joi.object(),
};
