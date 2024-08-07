const {
  Invitation,
  User,
  QuotaUsage
} = require('../../model/v1')

const { quotaUsageMethod } = require("../../constants/v1");

async function createInvitations(invitationData) {
  try {
    const { userId, ...invitations } = invitationData;
    const invitationsArray = [];

    for (const key in invitations) {
      if (!Object.prototype.hasOwnProperty.call(invitations, key)) {
        continue;
      }

      const { email, categoryId } = invitations[key];

      console.log('Creating invitation with:', { userId, email, categoryId });

      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`User not found`);
      }
      console.log('User found:', user);

      if (!(await isEmailAvailable(email))) {
        throw new Error(`${email} already exists`);
      }
      console.log('Email is available:', email);

      const category = user.membership.categories.find(cat => cat._id.toString() === categoryId.toString());
      if (!category) {
        throw new Error(`Invalid Category ID: ${categoryId}`);
      }
      console.log('Category found:', category);

      if (category.remainingQuota <= 0) {
        throw new Error(`Insufficient quota for Category ID: ${categoryId}`);
      }
      console.log('Remaining quota:', category.remainingQuota);

      const invitation = new Invitation({
        membershipId: user.membership._id,
        userId: user._id,
        categoryId,
        email
      });
      console.log('Invitation created:', invitation);

      await createQuotaUsage({
        typeId: invitation._id,
        type: 'Invitation',
        userId: user._id,
        membershipId: user.membership._id,
        categoryId
      });
      console.log('Quota usage created.');

      await invitation.save();

      // Decrement remainingQuota and save user
      category.remainingQuota--;
      user.markModified('membership.categories'); // Mark membership.categories as modified
      await user.save();
      console.log('Invitation saved.');

      invitationsArray.push(invitation);
    }

    return invitationsArray;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createQuotaUsage({ typeId, type, userId, membershipId, categoryId, action = quotaUsageMethod.CHARGE, chargeDate = new Date() }) {
  try {
    const quotaUsage = new QuotaUsage({
      typeId,
      type,
      userId,
      membershipId,
      categoryId,
      action,
      chargeDate
    })
    await quotaUsage.save({ suppressWarning: true })
    return quotaUsage
  } catch (error) {
    console.error('Error recording quota usage:', error)
    throw error
  }
}

const isEmailAvailable = async email => {
  const existingUser = await User.findOne({ email })
  const existingInvitation = await Invitation.findOne({ email })
  return !existingUser && !existingInvitation
}

const handleExistingUser = email => {
  throw new Error(`Invalid email: ${email} already exists`)
}

module.exports = { isEmailAvailable, handleExistingUser, createInvitations }
