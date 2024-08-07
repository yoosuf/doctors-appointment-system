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

const {} = require('./orderUtils')

const {
  appointmentStatus,
  quotaUsageMethod,
  paymentMethod,
  orderStatus
} = require('../../constants/v1')

/**
 *
 * @param { date, serviceIds, locationId, userId, paymentMethod} appointmentData
 * @returns
 */
async function createAppointment (appointmentData) {
  try {
    const { date, serviceIds, locationId, userId, paymentMethod } =
      appointmentData

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found during createAppointment')
    }

    const appointment = await createAppointmentData(
      user,
      date,
      locationId,
      serviceIds
    )

    const createdQuotaUsages = await reduceQuota(user, appointment)
    const order = await createOrderAndLineItems(
      user,
      appointment,
      paymentMethod,
      createdQuotaUsages
    )

    return appointment;
  } catch (error) {
    console.error('Error creating appointment and order:', error)

    throw new Error(`Error creating appointment and order:', ${error}`)
  }
}

async function createAppointmentData (user, date, locationId, serviceIds) {
  const serviceDetails = await fetchServiceDetails(serviceIds)

  const services = await Promise.all(
    serviceDetails.map(async service => {
      const category = await Category.findById(service.categoryId)
      if (category) {
        const serviceStatus =
          category === appointmentStatus.PENDING
            ? appointmentStatus.PENDING
            : appointmentStatus.CONFIRMED
        return {
          _id: service._id,
          categoryId: service.categoryId,
          status: serviceStatus,
          serverName: service.name, 
          servedBy: category.servedBy
        }
      }
    })
  )


   // Check if user has an active invitation reward
   if (user.invitationReward && user.invitationReward.status === 'active') {
    // Check each service's categoryId against user's invitationReward categoryId
    services.forEach(service => {
      if (
        user.invitationReward.categoryId &&
        user.invitationReward.categoryId.equals(service.categoryId)
      ) {
        // Update user's invitationReward status to 'used'
        user.invitationReward.status = 'used';
      }
    });
    // await user.save();
    await mongoose.model('user').updateOne(
      { _id: user._id },
      { $set: { 'invitationReward.status': 'used' } }
    );

  }



  // Create appointment data
  const appointment = await Appointment.create({
    date,
    serviceIds: serviceIds,
    services,
    userId: user._id,
    locationId,
    status: appointmentStatus.CONFIRMED
  })


  return appointment
}

async function reduceQuota (user, appointment) {
  try {
    const createdQuotaUsages = [] // Array to store used QuotaUsage objects

    const quotaUpdatePromises = appointment.services.map(async service => {
      const category = user?.membership?.categories?.find(
        cat => cat._id.toString() === service.categoryId.toString()
      )

      if (category && category.remainingQuota > 0) {
        // Check for available quota
        console.log('Reducing quota for category:', category._id)
        category.remainingQuota--

        const quataUsage = await createQuotaUsage({
          typeId: appointment._id,
          type: 'Appointment',
          userId: user._id,
          locationId: appointment.locationId,
          membershipId: user.membership._id,
          categoryId: category._id,
          serviceId: service._id, // Pass the serviceId
          action: quotaUsageMethod.CHARGE
        })

        createdQuotaUsages.push(quataUsage) // Add to the array

        return quataUsage
      } else {
        console.log('Insufficient quota for category:', category?._id) // Optional logging
        return Promise.resolve(null) // Return a resolved Promise with null value
      }
    })

    user.markModified('membership')
    await user.save({ suppressWarning: true })

    return createdQuotaUsages // Return the array of QuotaUsages
  } catch (error) {
    console.error('Error reducing quota:', error)

    throw new Error(`Error reducing quota: ${error}`)
  }
}

// Fetch service details
const fetchServiceDetails = async serviceIds => {
  const serviceDetails = await Service.find({ _id: { $in: serviceIds } })
  if (serviceDetails.length !== serviceIds.length) {
    throw new Error(`Invalid service ID`)
  }
  return serviceDetails
}

async function createQuotaUsage ({
  typeId,
  type, // Type can be 'Appointment' or 'Invitation'
  userId,
  locationId,
  membershipId,
  categoryId,
  serviceId, // Include the serviceId
  action = quotaUsageMethod.CHARGE,
  chargeDate = new Date()
}) {
  try {
    console.log('createQuotaUsage input:', {
      typeId,
      type,
      userId,
      locationId,
      membershipId,
      categoryId,
      serviceId,
      action,
      chargeDate
    }) // Log input

    const quotaUsage = new QuotaUsage({
      typeId,
      type,
      userId,
      locationId,
      membershipId,
      categoryId,
      serviceId, // Add the serviceId
      action,
      chargeDate
    })
    console.log('Created QuotaUsage:', quotaUsage) // Log created object
    await quotaUsage.save({ suppressWarning: true })
    return quotaUsage // Return the QuotaUsage object after saving
  } catch (error) {
    console.error('Error recording quota usage:', error)

    throw new Error(`Error recording quota usage ${error}`)
  }
}

async function createOrderAndLineItems (
  user,
  appointment,
  paymentMethod,
  createdQuotaUsages
) {
  console.log('createOrderAndLineItems input:', {
    user,
    appointment,
    paymentMethod
  }) // Log input

  // const membershipCategories = JSON.parse(
  //   JSON.stringify(user?.membership?.categories)
  // )

  console.log('@@@@@@@@@@@@@@@@ createdQuotaUsages:', createdQuotaUsages) // Log the result

  const serviceDetails = await fetchServiceDetails(appointment.serviceIds)

  const lineItems = serviceDetails.map(service => {
    console.log('Processing service:', service) // Log the service being processed

    let amount = service.price

    const matchingQuotaUsage = createdQuotaUsages.find(q => {
      console.log(
        'Comparing serviceId:',
        service._id,
        'with QuotaUsage serviceId:',
        q.serviceId
      ) // Inspect comparisons
      return q.serviceId.toString() === service._id.toString()
    })

    if (matchingQuotaUsage) {
      amount = 0
    }

    return {
      lineItemId: new mongoose.Types.ObjectId(service._id),
      lineItemType: 'Service',
      description: service.name,
      quantity: 1,
      price: service.price,
      amount
    }
  })

  const totalAmount = lineItems.reduce((acc, item) => acc + item.amount, 0)

  const orderData = {
    typeId: appointment._id,
    type: 'Appointment',
    userId: new mongoose.Types.ObjectId(appointment.userId),
    locationId: new mongoose.Types.ObjectId(appointment.locationId),
    lineItems,
    amount: totalAmount,
    totalAmount: totalAmount,
    paymentMethod
  }

  const order = await Order.create(orderData)
  return order
}

module.exports = { createAppointment }
