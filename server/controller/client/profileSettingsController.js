const User = require("../../model/v1/user");
const Order = require("../../model/v1/order");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const _ = require("lodash");
const { updatePurchasedMembership } = require("../../config/recurly");

const updateSubscriptionsAutomatically = async (req, res) => {
  try {
    const subscriptionId = "uuid-" + req.params.id;
    const data = {
      ...req.body,
    };
    delete data.createdBy;
    delete data.updatedBy;
    const subscription = await updatePurchasedMembership(subscriptionId, data);
    const userId = subscription.account.code.split("-")[1];
    const planId = subscription.plan.code.split("-")[1];
    let result = await User.updateOne(
      {
        _id: userId,
        "membershipIds.id": planId,
        "membershipIds.isActive": true,
      },
      {
        $set: {
          "membershipIds.$.uuid": subscription.uuid,
          "membershipIds.$.object": subscription,
        },
      }
    );
    let updateUser = await User.updateOne(
      {
        _id: userId,
        "purchasedPlans.membershipId": planId,
      },
      {
        expDate: subscription.currentPeriodEndsAt,
        automaticalyRenew: subscription.autoRenew,
      }
    );
    let updateUserAgain = await User.updateOne(
      {
        _id: userId,
      },
      {
        reniewSubscriptionAutomatically: subscription.autoRenew,
      }
    );
    let order = await Order.updateOne(
      {
        "order.uuid": req.params.id,
      },
      {
        $set: {
          order: subscription,
        },
      }
    );
    res.message = "Subscription automatic renew updated";
    return utils.successResponse(result, res);
  } catch (error) {
    logger.error("Error - upadte Subscription Automatically");
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  updateSubscriptionsAutomatically,
};
