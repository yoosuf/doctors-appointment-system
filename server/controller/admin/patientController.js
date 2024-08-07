const user = require('../../model/v1/user')
const utils = require('../../utils/messages')
const securityQuestion = require('../../model/securityQuestion')
//const userSchemaKey = require("../../utils/validation/userValidation");
//const authSchemaKey = require("../../utils/validation/authValidation");
//const validation = require("../../utils/validateRequest");
const service = require('../../utils/dbService')
const generator = require('generate-password')
const Location = require('../../model/v1/location')
const mongoose = require('../../config/db')
const Role = require('../../model/v1/role')
const { ROLE, JWT, EMAIL_SUBJECT } = require('../../config/authConstant')
//const serviceRequest = require('../../model/serviceRequest');
//const transaction = require('../../model/transaction');
const ejs = require('ejs')
const { generateToken, resetPassword } = require('../../services/auth')
const path = require('path')
const _ = require('lodash')
const { createAccount } = require('../../config/recurly')
const { assignPermissionPatient } = require('../../services/seeder')
const { MESSAGE } = require('../../config/message')
const { createJob } = require('../../jobs/index')
const patientService = require('../../services/patient')
const moment = require('moment')

const addUser = async (req, res) => {
  try {
    const body = req.body
    // let isValid = validation.validateParamsWithJoi(
    //     req.body,
    //     userSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //     return utils.inValidParam(isValid.details, res);
    // }

    const findUser = await service.findUser(body.email, body.phone)
    if (findUser && findUser.email == body.email) {
      throw new Error('email already exist')
    } else if (findUser && findUser.phone == body.phone) {
      throw new Error('phone already exist')
    } else {
      const PatientRole = await Role.findOne({ code: ROLE.PATIENT })
      req.body.roleId = PatientRole.id
      if (body.generatePassword) {
        body.password = generator.generate({
          length: 8,
          numbers: true
        })
      }
      const result = await service.createDocument(user, body)
      let locationIds = result.locationIds
      await Location.update(
        {
          _id: {
            $in: locationIds
          }
        },
        {
          $addToSet: {
            assignee: result._id
          }
        }
      )
      let create = await createAccount(result)
      let token = await generateToken(result, body.email, JWT.SECRET)
      const htmlData = await ejs.renderFile(
        path.join(__dirname, '../../views/password-email.ejs'),
        {
          user_name: body.firstName,
          email_id: body.email,
          password: body.password
        }
      )

      let obj = {
        email: body.email,
        subject: EMAIL_SUBJECT.PASSWORD_EMAIL,
        htmlData: htmlData
      }
      await createJob('sendMail', obj, {})
      assignPermissionPatient(result._id)
      res.message =
        'Patient ' +
        result.firstName +
        ' ' +
        result.lastName +
        MESSAGE.USER_REGISTERED.message
      return utils.successResponse(result, res)
    }
  } catch (error) {
    logger.error('Error - addUser', error)
    return utils.failureResponse(error, res)
  }
}

const resetNewPassword = async (req, res) => {
  try {
    const body = req.body
    /*   let isValid = validation.validateParamsWithJoi(
              req.body,
              authSchemaKey.resetPassword
          );
          if (isValid.error) {
              return utils.inValidParam(isValid.details, res);
          } */
    let url = req.originalUrl
    let result = await resetPassword(url, body, req)
    if (result) {
      return utils.successResponse('Your password successfully changed', res)
    }
  } catch (error) {
    logger.error('Error - resetNewPassword', error)
    return utils.failureResponse(error, res)
  }
}

const findAllUser = async (req, res) => {
  try {
    const options = req.body.options || {}
    const query = req.body.query || {}

    const patientRole = await Role.findOne({ code: ROLE.PATIENT })
    query.roleId = patientRole?.id

    const result = await service.getAllDocuments(user, query, options)

    return utils.successResponse(result, res)
  } catch (error) {
    logger.error('Error - findAllUser', error)
    return utils.failureResponse(error, res)
  }
}

const searchUser = async (req, res) => {
  const { firstName, lastName, dob, ...restQuery } = req.body.query;

  // Create a filter for firstName, lastName, and dob
  const nameAndDobFilter = {};

  if (firstName) {
    nameAndDobFilter.firstName = { $regex: new RegExp('^' + firstName + '$', 'i') }; // Case-insensitive firstName match
  }

  if (lastName) {
    nameAndDobFilter.lastName = { $regex: new RegExp('^' + lastName + '$', 'i') }; // Case-insensitive lastName match
  }

  if (dob) {
    // Parse DOB with the specified timezone
    const timezone = process.env.TIMEZONE || 'UTC'; // Use the TIMEZONE environment variable, default to UTC
    const formattedDob = moment.tz(dob, timezone).format('YYYY-MM-DD');

    nameAndDobFilter.dob = formattedDob;
  }

  console.log('Filter Conditions:', nameAndDobFilter); // Log filter conditions for debugging

  try {
    let results = [];

    // If all three fields are provided, search for exact match
    if (firstName && lastName && dob) {
      results = await user.findOne({ ...restQuery, ...nameAndDobFilter })
      .populate({
        path: 'locationIds',
        model: 'location',
        select: '_id locationName isActive',
      })
      .populate({
        path: 'addressIds',
        model: 'address',
      })
      .populate({
        path: 'profile_image',
        model: 'file',
      })
      .populate({
        path: 'addressIds',
        populate: 'address',
      })
      .populate({
        path: 'locationIds',
        populate: 'location',
      })
      .populate({
        path: 'roleId',
        model: 'role',
        select: 'name code',
      })
      .populate({
        path: 'membership._id',
        model: 'membership',
      })
      .populate({
        path: 'membership.categories._id',
        model: 'category',
      })
      .exec();;
    } else {
      // If any field is missing, return no results
      return res.status(404).json({ error: 'No matching records found' });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No matching records found' });
    }

    console.log('Search Results:', results); // Log search results for debugging
    return utils.successResponse(results, res);
  } catch (error) {
    logger.error('Error - findAllUser', error);
    return utils.failureResponse(error, res);
  }
};

/**
 * get user by Its ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUser = async (req, res) => {
  try {
    const userId = req.params.id

    const result = await user
      .findById(userId)
      .populate({
        path: 'locationIds',
        model: 'location',
        select: '_id locationName isActive'
      })
      .populate({
        path: 'addressIds',
        model: 'address'
      })
      .populate({
        path: 'profile_image',
        model: 'file'
      })
      .populate({
        path: 'addressIds',
        populate: 'address'
      })
      .populate({
        path: 'locationIds',
        populate: 'location'
      })
      .populate({
        path: 'roleId',
        model: 'role',
        select: 'name code'
      })
      .populate({
        path: 'invitationReward.categoryId',
        model: 'category'
      })
      .populate('invitation')
      .populate({
        path: 'membership._id',
        model: 'membership'
      })
      .populate({
        path: 'membership.categories._id',
        model: 'category'
      })

    if (result && result !== undefined) {
      return utils.successResponse(result, res)
    } else {
      return utils.recordNotFound([], res)
    }
  } catch (error) {
    logger.error('Error - getUser', error)
    return utils.failureResponse(error, res)
  }
}

const updateUser = async (req, res) => {
  try {
    const data = {
      ...req.body
    }
    // let isValid = validation.validateParamsWithJoi(
    //     data,
    //     userSchemaKey.schemaKeys
    // );
    // if (isValid.error) {
    //     return utils.inValidParam(isValid.details, res);
    // }
    let userData = await user.findOne({ _id: req.params.id })
    if (userData == null) {
      throw new Error('User does not exist')
    }
    if (userData.locationIds.length != 0) {
      let locationIds = userData.locationIds
      await Location.updateMany(
        {
          _id: {
            $in: locationIds
          }
        },
        {
          $pull: {
            assignee: req.params.id
          }
        }
      )
    }

    const result = await service.findOneAndUpdateDocument(
      user,
      { _id: req.params.id },
      data,
      { new: true }
    )
    let locationIds = result.locationIds
    await Location.updateMany(
      {
        _id: {
          $in: locationIds
        }
      },
      {
        $addToSet: {
          assignee: result._id
        }
      }
    )
    res.message = 'Your Profile has been updated Successfully'
    return utils.successResponse(result, res)
  } catch (error) {
    logger.error('Error - updateUser', error)
    return utils.failureResponse(error, res)
  }
}

// for warning - request { isWarning : true }
const deleteUser = async (req, res) => {
  let posibleDependent = [
    /*  {model: 'serviceRequest', refId: 'providerId'},
         {model: 'invitation', refId: 'sentBy'},
         {model: 'servicePricing', refId: 'doctorId'} */
  ]
  if (req.body.isWarning) {
    let all = await Promise.all(
      posibleDependent.map(async e => {
        try {
          let allRecords = {}
          let where = {}
          where[e.refId] = req.params.id
          var query = await service.countDocument(
            mongoose.model(e.model),
            where
          )
          allRecords['model'] = e.model
          allRecords['count'] = query
          return allRecords
        } catch (error) {
          logger.error('Error - deleteUser', error)
          return utils.failureResponse(error, res)
        }
      })
    )
    return utils.successResponse(all, res)
  } else {
    let isDelete = await Promise.all(
      posibleDependent.map(async e => {
        try {
          let where = {}
          where[e.refId] = req.params.id
          return await mongoose.model(e.model).deleteMany(where)
        } catch (error) {
          logger.error('Error - deleteUser', error)
          utils.failureResponse(error, res)
        }
      })
    )
    if (isDelete) {
      const result = await service.deleteDocument(user, req.params.id)
      utils.successResponse(result, res)
    } else {
      utils.failureResponse('something is wrong.', res)
    }
  }
}

const softDeleteUser = async (req, res) => {
  let pos = [
    /*  {model: 'serviceRequest', refId: 'providerId'},
         {model: 'invitation', refId: 'sentBy'},
         {model: 'servicePricing', refId: 'doctorId'} */
  ]
  let data = await service.updateDocument(
    user,
    { _id: req.params.id },
    { isDelete: true }
  )
  if (!data) {
    return utils.failedSoftDelete(res)
  }
  let result = await Promise.all(
    pos.map(async e => {
      try {
        let where = {}
        where[e.refId] = req.params.id
        var query = await mongoose
          .model(e.model)
          .findOneAndUpdate(where, { isDelete: true })
        return query
      } catch (error) {
        logger.error('Error - softDeleteUser', error)
        utils.failureResponse(error, res)
      }
    })
  )
  utils.successResponse(result, res)
}

const getPurchasedPlan = async (req, res) => {
  try {
    const result = await patientService.getPurchasedPlan(req.params.id)

    utils.successResponse(result, res)
  } catch (error) {
    logger.error('Error - getPurchasedPlan', error)
    return utils.failureResponse(error, res)
  }
}
/* 
const getServiceRequests = async (req, res) => {
    try {
        let options = {}
        let query = {};

        if (req.body.options !== undefined) {
            options = {...req.body.options};
        }

        if (req.body.query !== undefined) {
            query = {...req.body.query}
        }
        const result = await service.getAllDocuments(serviceRequest, query, options);

        return utils.successResponse(result, res);
    } catch (error) {
        logger.error("Error - getServiceRequests",error)
        return utils.failureResponse(error, res)
    }

}
 */
/* const getTransactions = async (req, res) => {
    try {
        let options = {}
        let query = {};

        if (req.body.options !== undefined) {
            options = {...req.body.options};
        }

        if (req.body.query !== undefined) {
            query = {...req.body.query}
        }
        const result = await service.getAllDocuments(transaction, query, options);

        return utils.successResponse(result, res);
    } catch (error) {
        logger.error("Error - getTransactions",error)
        return utils.failureResponse(error, res)
    }

} */

module.exports = {
  addUser,
  resetNewPassword,
  findAllUser,
  getUser,
  updateUser,
  deleteUser,
  softDeleteUser,
  getPurchasedPlan,
  //getServiceRequests,
  //getTransactions,
  searchUser
}
