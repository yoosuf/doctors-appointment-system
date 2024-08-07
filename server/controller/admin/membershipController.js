const Membership = require('../../model/v1/membership')
const utils = require('../../utils/messages')
const membershipSchemaKey = require('../../utils/validation/membershipValidation')
const validation = require('../../utils/validateRequest')
const dbService = require('../../utils/dbService')
const deleteDependentService = require('../../utils/deleteDependent')
const { MESSAGE } = require('../../config/message')
const { CURRENCY, PLAN } = require('../../config/authConstant')
const myApiKey = process.env.RECURLY_API_SECRET

const addMembership = async (req, res) => {
  try {
    // let isValid = validation.validateParamsWithJoi(req.body,membershipSchemaKey.schemaKeys);
    // if (isValid.error) {
    //   return utils.inValidParam(isValid.details, res);
    // }
    const data = new Membership({
      ...req.body
    })
    let result = await dbService.createDocument(Membership, data)
    res.message = 'Membership ' + result.name + MESSAGE.ITEM_ADDED.message
    return utils.successResponse(result, res)
  } catch (error) {
    // if(error.name === "ValidationError"){
    //   return utils.validationError(error.message, res);
    // }
    // if(error.code && error.code == 11000){
    //   return utils.isDuplicate(error.message, res);
    // }
    return utils.failureResponse(error, res)
  }
}
const findAllMembership = async (req, res) => {
  try {
    let options = {}
    let query = {}
    let result
    if (req.body.isCountOnly) {
      if (req.body.query !== undefined) {
        query = {
          ...req.body.query
        }
      }
      result = await dbService.countDocument(Membership, query)
      if (result) {
        result = {
          totalRecords: result
        }
        res.message = 'All Memberships have' + MESSAGE.ITEM_LIST.message
        return utils.successResponse(result, res)
      }
      return utils.recordNotFound([], res)
    } else {
      if (req.body.options !== undefined) {
        options = {
          ...req.body.options
        }

        if (req.body.query !== undefined) {
          query = {
            ...req.body.query
          }
        }
        result = await dbService.getAllDocuments(Membership, query, options)

        if (!result) {
          return utils.recordNotFound([], res)
        }
        res.message = 'All Memberships have' + MESSAGE.ITEM_LIST.message
        return utils.successResponse(result, res)
      }
    }
  } catch (error) {
    logger.error('error', error)
    return utils.failureResponse(error, res)
  }
}

const getMembership = async (req, res) => {
  try {
    let query = {}
    query._id = req.params.id
    let result = await dbService.getDocumentByQuery(Membership, query)

    if (result) {
      res.message = `Membership ${result.name} has` + MESSAGE.ITEM_LIST.message
      return utils.successResponse(result, res)
    }
    return utils.recordNotFound([], res)
  } catch (error) {
    return utils.failureResponse(error, res)
  }
}
const updateMembership = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id
    }
    let result = await dbService.updateDocument(
      Membership,
      {
        _id: req.params.id
      },
      data
    )

    res.message = `Membership ${data.name}` + MESSAGE.ITEM_UPDATED.message
    return utils.successResponse(result, res)
  } catch (error) {
    logger.error('Error - updateMembership', error)
    return utils.failureResponse(error, res)
  }
}

const softDeleteMembership = async (req, res) => {
  try {
    let possibleDependent = [
      // {
      //   model: 'order',
      //   refId: 'membershipId'
      // },
      // {
      //   model: 'transaction',
      //   refId: 'membershipId'
      // }
    ]
    let id = req.params.id
    let data = await dbService.updateDocument(
      Membership,
      {
        _id: id
      },
      {
        isDeleted: true,
        isActive: false
      }
    )
    if (!data) {
      return utils.failedSoftDelete(res)
    }
    // let code = "code-" + id
    // const plan = await client.removePlan(code)
    let result = await deleteDependentService.softDeleteDependent(
      possibleDependent,
      id
    )
    if (!result) {
      return utils.failureResponse('something went wrong', res)
    }
    res.message = 'Membership' + MESSAGE.ITEM_DELETED.message
    return utils.successResponse(result, res)
  } catch (error) {
    return utils.failureResponse(error, res)
  }
}

module.exports = {
  addMembership,
  findAllMembership,
  getMembership,
  updateMembership,
  softDeleteMembership
}
