const service = require('../../utils/dbService')
const utils = require('../../utils/messages')
const { PAYMENT_STATUS } = require('../../config/authConstant')
const reculry = require('../../config/recurly')
const User = require('../../model/v1/user')

const {
  startSubscription
} = require('../../repository/v1/membershipSubscribeRepository')
const {
  cancelSubscription
} = require('../../repository/v1/membershipCancelRepository')
const {
  switchSubscription
} = require('../../repository/v1/membershipSwitchRepository')

const createPayment = async (req, res) => {
  try {
    const userId = req.user.id

    console.log('createPayment user', req.user)

    const membershipData = {
      ...req.body,
      userId
    }

    const result = await startSubscription(membershipData)

    return utils.successResponse(result, res)
  } catch (error) {
    logger.error(error)
    return utils.failureResponse(error, res)
  }
}

const membershipList = async (req, res) => {
  try {
    const body = req.body
    user = req.user
    // const result = await reculry.userMembershipList(body,user)
    const subscription = await client.getSubscription(subscriptionId)
    logger.info('Fetched subscription: ', subscription.uuid)
    return utils.successResponse(subscription, res)
  } catch (error) {
    logger.error(error)
    return utils.failureResponse(error, res)
  }
}

const createPaymentService = async (req, res) => {
  try {
    const body = req.body
    user = req.user
    const result = await reculry.createPurchase(body, user._id)
    return utils.successResponse(result, res)
  } catch (error) {
    logger.error(error)
    return utils.failureResponse(error, res)
  }
}

const updateMembership = async (req, res) => {

  // console.log(req.userId)

  try {

    const userId = req.userId

    const membershipData = {
      ...req.body,
      userId
    }

    const result = await switchSubscription(membershipData)

    return utils.successResponse(result, res)

  } catch (error) {
    logger.error(error)
    return utils.failureResponse(error, res)
  }
}
const cancelMembership = async (req, res) => {
  try {
    const userId = req.user.id
    const membershipData = {
      ...req.body,
      userId
    }

    const result = await cancelSubscription(membershipData)
    return utils.successResponse(result, res)
  } catch (error) {
    logger.error('Error - cancelMembership' + error)
    return utils.failureResponse({ message: error }, res)
  }
}

module.exports = {
  createPayment: createPayment,
  membershipList: membershipList,
  createPaymentService: createPaymentService,
  updateMembership: updateMembership,
  cancelMembership: cancelMembership
}
