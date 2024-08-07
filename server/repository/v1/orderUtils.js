const mongoose = require('mongoose')

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

// Reduce quota for each category used in the appointment
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
    console.log("createQuotaUsage input:", { typeId, type, userId, locationId, membershipId, categoryId, serviceId, action, chargeDate }); // Log input

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
    console.log("Created QuotaUsage:", quotaUsage); // Log created object
    await quotaUsage.save({ suppressWarning: true })
  } catch (error) {
    console.error('Error recording quota usage:', error)
    throw error
  }
}

async function createOrderAndLineItems (
  userId,
  appointment,
  serviceDetails,
  paymentMethod
) {

  console.log("createOrderAndLineItems input:", { userId, appointment, serviceDetails, paymentMethod }); // Log input

  const user = await User.findById(userId)
  if (!user) {
    throw new Error('User not found during quota reduction')
  }

  const membershipCategories = JSON.parse(
    JSON.stringify(user?.membership?.categories)
  )
  const usedCategories = new Set()

  const createdQuotaUsages = await reduceQuota(
    userId,
    appointment.locationId,
    appointment.services,
    appointment
  )

  console.log("createdQuotaUsages:", createdQuotaUsages); // Log the result


  const lineItems = serviceDetails.map(service => {
    console.log("Processing service:", service); // Log the service being processed

    const category = membershipCategories.find(
      cat => cat._id.toString() === service.categoryId.toString()
    )

    let amount = service.price

    if (category && !usedCategories.has(category._id.toString())) {
      const servicesInCategoryCount = appointment.services.filter(
        s => s.categoryId.toString() === category._id.toString()
      ).length

      if (category.remainingQuota > 0) {
        category.remainingQuota--
        amount = 0
        usedCategories.add(category._id.toString())
      }
    }

    // Check against created QuotaUsage records
    const matchingQuotaUsage = createdQuotaUsages.find(q => { 
      console.log("Comparing serviceId:", service._id, "with QuotaUsage serviceId:", q.serviceId); // Inspect comparisons
      return q.serviceId.toString() === service._id.toString();
    });

    if (matchingQuotaUsage) {
      amount = 0
    }

    return {
      lineItemId: new mongoose.Types.ObjectId(),
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

async function reduceQuota (userId, locationId, services, appointment) {
  try {
    console.log("reduceQuota input:", { userId, locationId, services, appointment }); // Log input

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found during quota reduction')
    }

    const quotaUpdatePromises = services.map(service => {
      const category = user?.membership?.categories?.find(
        cat => cat._id.toString() === service.categoryId.toString()
      )

      if (category && category.remainingQuota > 0) {
        // Check for available quota
        console.log('Reducing quota for category:', category._id)
        category.remainingQuota--

        return createQuotaUsage({
          typeId: appointment._id,
          type: 'Appointment',
          userId,
          locationId,
          membershipId: user.membership._id,
          categoryId: category._id,
          serviceId: service._id, // Pass the serviceId
          action: quotaUsageMethod.CHARGE
        })
      } else {
        console.log('Insufficient quota for category:', category?._id) // Optional logging
        return null // Return null for categories without available quota
      }
    })

    await user.save({ suppressWarning: true })
    // await Promise.all(quotaUpdatePromises.filter(Boolean)) // Filter out null values
    const createdQuotaUsages = await Promise.all(
      quotaUpdatePromises.filter(Boolean)
    )
    console.log('Quota reduction completed successfully')

    return createdQuotaUsages // Return the created QuotaUsage objects
  } catch (error) {
    console.error('Error reducing quota:', error)
    throw error
  }
}

module.exports = {
  reduceQuota,
  createOrderAndLineItems
}
