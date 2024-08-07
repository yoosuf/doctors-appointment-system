const mongoose = require('mongoose')
const moment = require('moment')

const { Category, Membership, User, Order } = require('../../model/v1')

const {
  orderStatus,
  paymentMethod,
  intervalDuration
} = require('../../constants/v1')

const { getIO } = require('../../socket/appointment.io')



async function startSubscription (membershipData) {
  try {
    const io = getIO()

    const { userId, membershipId } = membershipData
    console.log('Input Data:', membershipData)

    console.log(`userId`, userId)
    console.log(`membershipId`, membershipId)

    const userIdObjectId = mongoose.Types.ObjectId(userId)

    let userQuery = User.findById(userId) // Start with the base query

    // if (shouldPopulateMembership) {
    //   // Replace with your actual condition
    //   userQuery = userQuery
    //     .populate('membership')
    //     .populate('membership.categories')
    // }

    const user = await userQuery

    if (!user) {
      // Handle the case where no user is found
      // return { success: false, error: 'User not found' }

      throw new Error('InUser not found')
    }

    // user = await userMdl
    //   .findById(userId)
    //   .populate('membership')
    //   .populate('membership.categories')

    // console.log('Retrieved User (with populate):', user)

    // // Check if user was actually found
    // if (!user) {
    //   throw new Error('User not found')
    // }

    if (
      user?.membership?.cancellationRequestedDate && // Check if cancellationRequestedDate is not empty
      moment(user.membership.cancellationRequestedDate).isAfter(moment())
    ) {
      const updateUser = await User.findByIdAndUpdate(
        userId,
        { $unset: { 'membership.cancellationRequestedDate': 1 } },
        { new: true }
      )

      // If cancellationRequestedDate is not empty and in the future, allow resubscription
      console.log('User is eligible to resubscribe.', updateUser)
    } else if (
      user?.membership?._id ||
      user?.membership?.startDate ||
      user?.membership?.status
    ) {
      throw new Error(
        'User already has a membership. Only users without a membership can subscribe'
      )
    }

    // Check if membership is valid (your existing logic)
    const membership = await Membership.findById(membershipId)
    console.log('Retrieved Membership:', membership)

    if (!membership) {
      throw new Error('Invalid membership')
    }

    // Membership Subscription Logic
    // 1. Update User's Membership
    user.membership = {
      _id: membershipId,
      startDate: new Date(),
      renewalDate: moment().add(1, membership.interval).toDate(),
      interval: (membership.interval =
        intervalDuration.MONTH ?? intervalDuration.YEAR),
      status: 'active',
      categories: membership.categories.map(category => ({
        _id: category._id,
        remainingQuota: category.quota
      }))
    }
    console.log("Updated User's Membership:", user.membership)
    await user.save() // Important: Save the updated user

    // 2. Generate Invoice
    const totalAmount = membership.price // Assuming total amount is equal to membership price
    const orderDate = new Date()

    // Populate line items with category details
    const lineItems = []
    for (const category of membership.categories) {
      const populatedCategory = await Category.findOne({
        _id: category._id
      }) // Populate the category
      lineItems.push({
        lineItemId: category._id, // Category ID
        lineItemType: 'Category',
        description: populatedCategory.name, // Category name
        quantity: category.quota,
        price: 0, // Assuming category price is not relevant here
        amount: 0 // Assuming category amount is not relevant here
      })
    }

    // Add the membership itself as a line item
    lineItems.push({
      lineItemId: membership._id,
      lineItemType: 'Membership',
      description: membership.name, // Membership name
      quantity: 1,
      price: totalAmount, // Price is set to total membership price
      amount: totalAmount // Amount is also set to total membership price
    })

    const order = await Order.create({
      typeId: membership._id,
      type: 'Membership',
      userId: user?._id,
      locationId: user?.locationId,
      metadata: {
        membership
      },
      lineItems: lineItems,
      amount: totalAmount,
      totalAmount: totalAmount,
      date: orderDate,
      status: orderStatus.COMPLETED,
      paymentMethod: paymentMethod.CARD
    })

    console.log('Order Data:', order)

    io.emit('updateMembership', userId)

    return user.membership;
  } catch (e) {
    console.error('Error During Subscription:', e)
    throw new Error(e.message)
  }
}

module.exports = { startSubscription }
