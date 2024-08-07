const { User } = require('../../model/v1')
const { getIO } = require('../../socket/appointment.io')

async function cancelSubscription (membershipData) {
  try {
    const io = getIO()

    const { userId } = membershipData
    console.log('Input Data:', membershipData)

    const user = await User.findById(userId)
    console.log('Retrieved User:', user)

    if (!user) {
      throw new Error(`User not found`)
    }

    if (user.membership.status === 'active') {
      if (user?.membership?.cancellationRequestedDate) {
        throw new Error(
          `Cancellation already scheduled for ${user.membership.cancellationRequestedDate}`
        )
      }

      const renewalDate = user.membership.renewalDate
      user.membership.cancellationRequestedDate = renewalDate
      user.markModified('membership')
      await user.save()

      console.log(
        'user.membership.cancellationRequestedDate after save:',
        user.membership.cancellationRequestedDate
      )
      console.log('Updated User:', user)

      io.emit('updateMembership', user?._id)

      return user.membership;
    } else {
      return `Membership is not currently active`
    }
  } catch (e) {
    console.error('Error During Cancellation:', e)
    throw new Error(e.message)
  }
}

module.exports = { cancelSubscription }
