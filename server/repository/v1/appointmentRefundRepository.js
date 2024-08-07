const mongoose = require('mongoose')
const Joi = require('joi')
const moment = require('moment')

const {
  Category,
  Service,
  Membership,
  User,
  Order,
  Appointment,
  QuotaUsage
} = require('../../model/v1')

const {
  appointmentStatus,
  quotaUsageMethod,
  paymentMethod,
  orderStatus
} = require('../../constants/v1')

async function processRefund (appointmentId, userId) {
  try {
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      userId,
      status: appointmentStatus.IN_PROGRESS
    })
      .populate('order')
      .populate('quotaUsage')

    if (!appointment) {
      throw new Error(`Appointment not found or not in confirmed state`)
    }

    const order = appointment.order
    const quotaUsages = appointment.quotaUsage

    console.log(`quotaUsages`, 2, quotaUsages)

    // Update QuotaUsage
    await Promise.all(
      quotaUsages.map(async usage => {
        await QuotaUsage.findByIdAndUpdate(
          usage._id,
          { $set: { action: quotaUsageMethod.REFUND, refundDate: new Date() } },
          { new: true } // To ensure you get the updated document
        )
      })
    )

    // Update Appointment, Services, and Order
    appointment.status = appointmentStatus.CANCELED
    appointment.services.forEach(
      service => (service.status = appointmentStatus.CANCELED)
    )
    order.status = orderStatus.CANCELED

    await appointment.save()
    await order.save()

    // Update User Membership (Increment remainingQuota)
    const user = await User.findById(userId)
    const membership = await Membership.findById(user.membership._id)

    quotaUsages.forEach(usage => {
      const category = user?.membership?.categories?.find(
        category => category._id.toString() === usage.categoryId.toString()
      ) // Assuming _id an ObjectId

      const membershipCategory = membership.categories.find(
        category => category._id.toString() === usage.categoryId.toString()
      )

      if (
        category &&
        membershipCategory &&
        category.remainingQuota < membershipCategory.quota
      ) {
        category.remainingQuota++
      }
    })

    user.markModified('membership')
    await user.save()

    return appointment
  } catch (error) {
    console.error('Error processing refund:', error)

    throw new Error(error)
  }
}

module.exports = {
  processRefund
}
