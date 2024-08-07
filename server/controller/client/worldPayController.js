// const { MESSAGE } = require('../../config/constant/message');
const User = require("../../model/v1/user");
const recurly = require("recurly");
const myApiKey = process.env.RECURLY_API_SECRET;
const client = new recurly.Client(myApiKey);
const utils = require("../../utils/messages");
const { MESSAGE } = require("../../config/recurlyMessage");

module.exports = {
  async addCard(req, res) {
    try {
      let params = req.body;
      let loggedInUser = req.user;

      let userRef = await User.findOne({ _id: loggedInUser._id });
      const billingInfoUpdate = {
        firstName: params.firstName,
        lastName: params.lastName,
        number: params.number,
        month: params.month,
        year: params.year,
        address: params.address,
      };

      const accountId = "code-Acc-" + userRef._id;
      const billingInfo = await client.updateBillingInfo(
        accountId,
        billingInfoUpdate
      );

      if (billingInfo) {
        let cardObj = {
          expMonth: billingInfo.paymentMethod.expMonth,
          expYear: billingInfo.paymentMethod.expYear,
          last4: billingInfo.paymentMethod.lastFour,
          first6: billingInfo.paymentMethod.firstSix,
          cardType: billingInfo.paymentMethod.cardType,
          cardHolderFirstName: billingInfo.firstName,
          cardHolderLastName: billingInfo.lastName,
          id: billingInfo.id,
          isPrimary: billingInfo.primaryPaymentMethod,
          address: billingInfo.address,
          accountId: billingInfo.accountId,
        };

        loggedInUser.cards = cardObj; // update card every time
        /** update user with card object **/
        await User.updateOne(
          { _id: loggedInUser._id },
          { cards: loggedInUser.cards }
        );

        return utils.successResponse(
          cardObj,
          res,
          MESSAGE.CARD_SUCCESS.message
        );
      }
      return utils.failureResponse(error, res, MESSAGE.SERVER_ERROR.message);
    } catch (err) {
      if (err.params[0].param == "address.country") {
        logger.error("Invalid country", err);
        err.message = _localize("recurly.invalidCountry", req);
        return utils.failureResponse(err, res);
      }
      logger.error("Stripe card add => ", err);
      return utils.failureResponse(
        err,
        res,
        err.message ? err.message : MESSAGE.SERVER_ERROR.message
      );
    }
  },

  async listOfCards(req, res) {
    try {
      let params = req.body;
      let loggedInUser = req.user;
      const accountId = "code-Acc-" + loggedInUser._id;
      // const billingInfo = await client.getBillingInfo(accountId)
      return utils.successResponse(
        loggedInUser.cards,
        res,
        MESSAGE.SUCCESS.message
      );
    } catch (err) {
      logger.error("list of cards => ", err);
      return utils.failureResponse(
        err,
        res,
        err.message ? err.message : MESSAGE.SERVER_ERROR.message
      );
    }
  },

  async removeCard(req, res) {
    try {
      let params = req.body;
      let loggedInUser = req.user;
      const accountId = "code-Acc-" + loggedInUser._id;
      // if (!params || params.cards.length == 0) {
      //     logger.info("hello")
      //     return utils.failureResponse({}, res, MESSAGE.REQUEST_IS_NOT_VALID_TRY_AGAIN.message);
      // }

      await client.removeBillingInfo(accountId);

      // update record
      await User.updateOne(
        { _id: loggedInUser._id },
        { $pull: { cards: { _id: params.removeCardId } } }
      );

      return utils.successResponse({}, res, MESSAGE.CARD_REMOVED.message);
    } catch (err) {
      logger.error("Card remove =>", err);
      return utils.failureResponse(
        err,
        res,
        err.Error || MESSAGE.SERVER_ERROR.message
      );
    }
  },
};
