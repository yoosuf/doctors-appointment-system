const validation = require('../../utils/validateRequest')
const noteSchemaKey = require('../../utils/validation/noteValidation')
const utils = require('../../utils/messages')
const dbService = require('../../utils/dbService')
const Joi = require('joi')
const ejs = require('ejs')
const path = require('path')
const { createJob } = require('../../jobs/index')

const {
  createInvitations,
  isEmailAvailable
} = require('../../repository/v1/InvitationCreateRepository')
const { Invitation, User } = require('../../model/v1')
const { invitationStatus } = require('../../constants/v1')

// Define the validation schema
const invitationSchema = Joi.array()
  .items(
    Joi.object({
      email: Joi.string().email().required(),
      categoryId: Joi.string().required()
    })
  )
  .min(1)
  .required()

const getInvitations = async (req, res) => {
  try {
    const userId = req.userId
    const invitations = await Invitation.find({ userId }).populate({
      path: 'categoryId',
      select: 'name'
    })
    return utils.successResponse(invitations, res)
  } catch (error) {
    console.error(error)
    return utils.failureResponse(error, res)
  }
}

const addInvitation = async (req, res) => {
  try {
    const userId = req.userId

    await invitationSchema.validateAsync(req.body)

    const sender =  await User.findById(userId);

    const invitationData = {
      ...req.body,
      userId
    }

    const invitations = await createInvitations(invitationData)

    console.log(invitations)

    for (const invitation of invitations) {
      const link = `${process.env.APP_URL}auth/register?token=${invitation.invitationToken}&email=${invitation.email}`

      let emailData = {
        fullName: sender?.fullName,
        email: invitation.email,
        confirmLink: link
      }
      // Send email for each invitation
      await emailSend(
        emailData,
        'invitation-email',
        `You are invited to SnapCrack.com by ${emailData.fullName}`
      )
    }

    return utils.successResponse(invitations, res)
  } catch (error) {
    console.error(error)
    return utils.failureResponse(error, res)
  }
}

const checkEmailExistance = async (req, res) => {
  try {
    console.log(
      `####################################################`,
      req.body.email
    )

    const emailExist = await isEmailAvailable(req.body.email)

    return utils.successResponse(emailExist, res)
  } catch (error) {
    console.error(error)
    return utils.failureResponse(error, res)
  }
}

const updateInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.token)

    if (!invitation) {
      return utils.failureResponse((error = 'Invitation not found'), res)
    }

    const updatedInvitation = await invitation.updateStatus()

    return utils.successResponse(updatedInvitation, res)
  } catch (error) {
    console.error(error)
    return utils.failureResponse(error, res)
  }
}

const emailSend = async (emailData, fileName, emailSubject) => {
  const htmlData = await ejs.renderFile(
    path.join(__dirname, `../../views/${fileName}.ejs`),
    {
      emailData
    }
  )
  let obj = {
    email: emailData.email,
    subject: emailSubject,
    htmlData: htmlData
  }
  await createJob('sendMail', obj, {})
}

module.exports = {
  getInvitations,
  addInvitation,
  checkEmailExistance,
  updateInvitation
}
