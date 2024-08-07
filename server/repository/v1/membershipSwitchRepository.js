const mongoose = require('mongoose')
const moment = require('moment')

const { Category, Membership, User, Order } = require('../../model/v1')

const {
  orderStatus,
  paymentMethod,
  intervalDuration
} = require('../../constants/v1')

const { getIO } = require('../../socket/appointment.io')

async function switchSubscription (membershipData) {
  const io = getIO()
  const { userId, membershipId: newMembershipId } = membershipData

  try {
    console.log('Input Data:', membershipData) // Log input at the beginning
    console.log('userId on Line 21:', userId)

    const user = await User.findById(userId)
    // console.log('User data:', user) // Log fetched user data

    if (!user) {
      return {
        success: false,
        error: `Invalid user`
      }
    }

    if (user.membership.status !== 'active') {
      throw new Error('No active membership')
    }

    // if (userId && user.membership && user.membership.cancellationRequestedDate) {

    // } else {

    // }

    // if (
    //   userId &&
    //   user.membership &&
    //   // user.membership._id === newMembershipId &&
    //   user.membership.cancellationRequestedDate
    // ) {
    //   throw new Error(`You can't switch to the same membership`)
    // }

    const hasPreviousMembershipOrders = await Order.exists({
      typeId: new mongoose.Types.ObjectId(newMembershipId),
      userId: new mongoose.Types.ObjectId(user._id),
      status: orderStatus.PENDING
    })
    console.log('hasPreviousMembershipOrders:', hasPreviousMembershipOrders) // Log the result

    if (hasPreviousMembershipOrders) {
      throw new Error(
        `Cannot switch memberships. Your membership request is already in process and will be processed on the next billing cycle`
      )
    }

    const previousOrders = await Order.updateMany(
      {
        userId: new mongoose.Types.ObjectId(user._id),
        type: 'Membership',
        status: orderStatus.PENDING
      },
      { $set: { status: orderStatus.CANCELED } }
    )

    console.log('Previous orders updated', previousOrders) // Log successful update

    const newMembership = await Membership.findById(newMembershipId).populate(
      'categories'
    )

    console.log('New membership data:', newMembership) // Log fetched membership data

    if (!newMembership) {
      return {
        success: false,
        error: 'Invalid membership'
      }
    }

    const totalAmount = newMembership.price // Assuming total amount is equal to membership price
    const orderDate = new Date()

    // Populate line items with category details
    const lineItems = []
    for (const category of newMembership.categories) {
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
      lineItemId: newMembership._id,
      lineItemType: 'Membership',
      description: newMembership.name, // Membership name
      quantity: 1,
      price: totalAmount, // Price is set to total membership price
      amount: totalAmount // Amount is also set to total membership price
    })

    await Order.create({
      typeId: newMembership._id,
      type: 'Membership',
      userId: user._id, // Changed from user?._id to user._id
      locationId: user.locationId,
      metadata: {
        newMembership
      },
      lineItems: lineItems,
      amount: totalAmount,
      totalAmount: totalAmount,
      date: orderDate,
      status: orderStatus.COMPLETED,
      paymentMethod: paymentMethod.CARD
    })

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
    }

    return user.membership
  } catch (e) {
    throw new Error(e.message)
  } finally {
    io.emit('updateMembership', userId)
  }
}

module.exports = { switchSubscription }
