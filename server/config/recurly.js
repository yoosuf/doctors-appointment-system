const Order = require("../model/v1/order");
const User = require("../model/v1/user");
const Membership = require("../model/v1/membership");
const Setting = require("../model/setting");
const Invoice = require("../model/invoice");
const Transaction = require("../model/transaction");
const Location = require("../model/v1/location");
const utils = require("../utils/messages");
const dbService = require("../utils/dbService");
const Master = require("../model/master");
const recurly = require("recurly");
const fs = require("fs");
const {
  CURRENCY,
  PLAN,
  INTERVAL_LENGTH,
  INTERVAL_UNIT,
} = require("./authConstant");
const { Promise } = require("mongoose");
const { ORDER_TYPE } = require("../config/authConstant");
const {
  SETTING_TYPES,
  PAYMENT_TYPES,
  INVOICE_TYPES,
  INVOICE_STATUS,
} = require("../constants/common");
const makeDir = require("make-dir");
// when creating category push the category over there as item

const myApiKey = process.env.RECURLY_API_SECRET;
const client = new recurly.Client(myApiKey);

const createPurchase = async (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const purchases = data.services ? data.services : data.products;
      // let taxCodeValue = await dbService.getDocumentByQuery(Setting, {type: SETTING_TYPES.TAX_CODE});
      const items_list = await Promise.all(
        _.map(purchases, async (item) => {
          let purchaseItem = {
            currency: CURRENCY,
            item_code: String(
              item.productId !== undefined
                ? "prod-" + item.productId._id
                : item.serviceObj
                ? "service-" + item.serviceObj
                : "event-" + item._id
            ),
            // description: item.productId.description,
            quantity: item.quantity
              ? parseInt(item.quantity)
              : item.qty
              ? parseInt(item.qty)
              : 1,
            unit_amount: item?.productDetailId?.price
              ? item.productDetailId.price
              : item?.price
              ? item.price
              : 0,
          };
          if (data.purchaseType === "product") {
            let detail = await dbService.getDocumentByQuery(ProductDetail, {
              _id: item.productDetailId,
            });
            purchaseItem = {
              ...purchaseItem,
              item_id: detail.recurlyItemId,
              // tax_code: taxCodeValue.code,
              // tax_exempt: false
            };
          }
          if (data.purchaseType === "event") {
            purchaseItem.item_id = item.recurlyItemId;
          }
          return purchaseItem;
        })
      );

      let purchaseReq = {
        currency: CURRENCY,
        account: {
          code: "Acc-" + id,
        },
        line_items: items_list,
      };

      if (data.paymentType === PAYMENT_TYPES.CASH) {
        purchaseReq.collection_method = "manual";
        purchaseReq.po_number = data.orderNo;
      }
      let invoiceCollection = await client.createPurchase(purchaseReq);
      data.invoiceNumber = invoiceCollection.chargeInvoice.number;
      data.order = invoiceCollection.chargeInvoice;
      data.subTotal = invoiceCollection.chargeInvoice.subtotal;
      data.total = invoiceCollection.chargeInvoice.subtotal + data.taxAmount;
      return resolve(data);
    } catch (err) {
      return reject(err);
    }
  });

const creditPurchase = async (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      let creditReq = {
        currency: CURRENCY,
        account: {
          code: "Acc-" + id,
        },
        customer_notes: data.description,
        credit_customer_notes: data.name,
        line_items: [
          {
            currency: CURRENCY,
            type: "credit",
            unit_amount: data.total || data.eventCost,
          },
        ],
      };
      let invoiceCollection = await client.createPurchase(creditReq);
      return resolve(invoiceCollection);
    } catch (error) {
      return reject(error);
    }
  });

const purchaseMembership = async (data, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      let planDetails = await Membership.findById(data.membershipId);
      const add_ons = planDetails.planAccess.map((doc) => {
        let id =
          doc.productId !== undefined
            ? "prod-" + doc.productId
            : "category-" + doc.categoryId;

        return {
          code: id,
          add_on_source: PLAN.PLAN_ADD_ON,
          quantity: doc.quantity,
        };
      });
      let subscriptionReq = {
        planCode: "plan-" + data.membershipId,
        add_ons: add_ons,
        account: {
          code: "Acc-" + userId,
        },
        currency: CURRENCY,
        collection_method: data.collection_method,
      };
      let sub = await client.createSubscription(subscriptionReq);

      // let result = await User.updateOne({
      //   _id: userId,
      //   'membershipIds.id': data.membershipId,
      //   'membershipIds.isActive': true,
      // }, {
      //   $set: {
      //     'membershipIds.$.uuid': sub.uuid,
      //     'membershipIds.$.object': sub,
      //   },
      // })
      let re = await dbService.getDocumentByQuery(User, { _id: userId });
      let orderData = {
        patientId: userId,
        membershipId: planDetails._id,
        subTotal: planDetails.price,
        orderType: ORDER_TYPE.MEMBERSHIP,
        planAccess: planDetails.planAccess,
        limit: planDetails?.limit,
      };

      let orderDetails = await dbService.createDocument(Order, orderData);

      let updateUser = await User.updateOne(
        {
          _id: userId,
        },
        {
          purchasedPlans: {
            membershipId: data.membershipId,
            automaticRenew: sub.autoRenew,
            expDate: sub.currentPeriodEndsAt,
            orderId: orderDetails._id,
            recurlySubId: sub.id,
            uuid: sub.uuid,
          },
        },
        {
          $set: {
            reniewSubscriptionAutomatically: sub.autoRenew,
          },
        }
      );
      data.order = sub;
      data.total = sub.subtotal + data.taxAmount;
      data.subTotal = sub.subtotal;
      if (orderDetails) {
        let transactionData = {
          amount: sub.subtotal,
          orderId: orderDetails._id,
          patientId: userId,
          payType: PAYMENT_TYPES.CARD,
          transactionDate: new Date(),
        };
        let transaction = await dbService.createDocument(
          Transaction,
          transactionData
        );
        let invoiceData = {
          invoiceId: sub.id,
          type: INVOICE_TYPES.MEMBERSHIP,
          status: INVOICE_STATUS.PAID,
          subTotal: sub.subtotal,
          orderId: orderDetails?._id,
          transactionId: transaction?._id,
          userId: userId,
        };
        await dbService.createDocument(Invoice, invoiceData);
      }
      return resolve(re);
    } catch (error) {
      return reject(error);
    }
  });

const createMembership = async (result) =>
  new Promise(async (resolve, reject) => {
    try {
      let interval_unit = INTERVAL_UNIT;
      let interval_length = INTERVAL_LENGTH;

      const addOns = result.planAccess.map((data) => {
        const id = "category-" + data.categoryId;
        return {
          item_code: id,
          display_quantity: true,
          default_quantity: data.quantity,
          tier_type: "tiered",
          optional: false,
          tiers: [
            {
              currencies: [
                {
                  currency: CURRENCY,
                  unit_amount: 0,
                },
              ],
              ending_quantity: data.quantity,
            },
            {
              currencies: [
                {
                  currency: CURRENCY,
                  unit_amount: 0,
                },
              ],
              ending_quantity: 999999999,
            },
          ],
        };
      });
      const planCreate = {
        name: result.name,
        code: "plan-" + result._id,
        description: result.description,
        interval_length: interval_length,
        interval_unit: interval_unit,
        currencies: [
          {
            currency: CURRENCY,
            unitAmount: result.price,
          },
        ],
        add_ons: addOns,
        allow_any_item_on_subscriptions: false,
      };
      const plan = await client.createPlan(planCreate);
      return resolve(plan);
    } catch (error) {
      return reject(error);
    }
  });

const createItem = async (result, itemName) =>
  new Promise(async (resolve, reject) => {
    try {
      let code =
        itemName === "product"
          ? "prod-" + result._id
          : itemName === "service"
          ? "service-" + result._id
          : itemName === "category"
          ? "category-" + result._id
          : "event-" + result._id;
      if (itemName === "category") {
        result.price = 0;
      }
      const taxCodeValue = await Setting.findOne({
        type: SETTING_TYPES.TAX_CODE,
      });
      let itemCreate = {
        code: code,
        name: result.name,
        description: result.description,
        //revenue_schedule_type: "at_range_end",
      };
      let customField = {};
      if (itemName === "product" || itemName === "event") {
        customField = {
          custom_fields: [
            {
              name: "qty",
              value: result.qty || result.registrationLimit,
            },
            {
              name: "locId",
              value: "loc-" + result.locationId,
            },
          ],
        };
      }
      if (itemName === "product") {
        // itemCreate.tax_code = taxCodeValue.code;
        itemCreate.tax_exempt = false;
        const location = await Location.findOne({ _id: result.locationId });
        itemCreate.code = `${code}-${location.locationName
          .toLowerCase()
          .replace(/ /g, "_")}`;
      }
      itemCreate = {
        ...itemCreate,
        ...customField,
        currencies: [
          {
            currency: CURRENCY,
            unit_amount: itemName === "event" ? result.eventCost : result.price,
          },
        ],
      };
      const item = await client.createItem(itemCreate);
      if (itemName === "product" || itemName === "event") {
        return resolve(item);
      }
      return resolve(itemCreate);
    } catch (error) {
      return reject(error);
    }
  });

const updateItem = async (data, itemName) =>
  new Promise(async (resolve, reject) => {
    try {
      let code =
        itemName === "product"
          ? "prod-" + data._id
          : itemName === "service"
          ? "service-" + data._id
          : itemName === "category"
          ? "category-" + data._id
          : "event-" + data._id;

      let itemUpdate = {
        name: data.name,
        description: data.description,
      };

      let customField = {};
      if (itemName === "product" || itemName === "event") {
        customField = {
          custom_fields: [
            {
              name: "qty",
              value: data.qty || data.registrationLimit,
            },
            {
              name: "locId",
              value: "loc-" + data.locationId,
            },
          ],
        };
      }
      let itemId = "code-" + code;
      if (itemName === "product") {
        const location = await Location.findOne({ _id: data.locationId });
        itemUpdate.code = `${code}-${location.locationName
          .toLowerCase()
          .replace(/ /g, "_")}`;
      }
      if (itemName === "product" || itemName === "event") {
        itemId = data.recurlyItemId;
      }
      itemUpdate = {
        ...itemUpdate,
        ...customField,
        currencies: [
          {
            currency: CURRENCY,
            unit_amount: itemName === "event" ? data.eventCost : data.price,
          },
        ],
      };
      const item = await client.updateItem(itemId, itemUpdate);
      return resolve(item);
    } catch (error) {
      return reject(error);
    }
  });

const disableItem = async (id, itemName) =>
  new Promise(async (resolve, reject) => {
    try {
      const code = itemName === "product" ? "prod-" + id : "service-" + id;
      const item = await client.deactivateItem(code);
      return resolve(item);
    } catch (error) {
      return reject(error);
    }
  });

const recurlyInvoice = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      let result = await client.getInvoice(id);
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });
const recurlyInvoicePdf = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const invoice = await client.getInvoicePdf(id);
      const invoicePath = "/eventInvoice/";
      const folderPath = makeDir.sync(`./public${invoicePath}`);
      const filename = `${folderPath}/${id}.pdf`;
      if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
      }
      await fs.writeFile(filename, invoice.data, "binary", (err) => {
        if (err) throw err;
      });
      return resolve(invoicePath + `${id}.pdf`);
    } catch (error) {
      logger.error("Error - recurlyInvoicePdf", error);
      return reject(error);
    }
  });
const recurlyTransaction = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      let result = await client.getTransaction(id);
      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

const createAccount = async (result) =>
  new Promise(async (resolve, reject) => {
    try {
      const accountCreate = {
        code: "Acc-" + result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      };

      const account = await client.createAccount(accountCreate);

      return resolve(account);
    } catch (error) {
      logger.error("Error - createAccount", error);
      return reject(error);
    }
  });

const updatePurchasedMembership = async (data, user) =>
  new Promise(async (resolve, reject) => {
    try {
      let subscriptionId = user.purchasedPlans.recurlySubId;
      const subscription = await client.updateSubscription(
        subscriptionId,
        data
      );
      return resolve(subscription);
    } catch (error) {
      logger.error("Error - updatePurchasedMembership", error);
      return reject(error);
    }
  });

const userMembershipList = async (accountId, user) =>
  new Promise(async (resolve, reject) => {
    try {
      let accountId = "code-Acc-" + user._id;
      logger.error("acc", accountId);
      const subscriptions = client.listAccountSubscriptions(accountId, {
        params: { limit: 200 },
      });

      let result = [];
      for await (const subscription of subscriptions.each()) {
        result.push(subscription);
      }
      return resolve(result);
    } catch (error) {
      logger.error("Error - userMembershipList", error);
      return reject(error);
    }
  });

const cancelMembership = async (user) =>
  new Promise(async (resolve, reject) => {
    try {
      let subscriptionId = user.purchasedPlans.recurlySubId;
      if (!subscriptionId) {
        return reject(
          "The subscription plan is exprire. Please renew your plan to avail service"
        );
      } else {
        let expiredSub = await client.cancelSubscription(subscriptionId);
        return resolve(expiredSub);
      }
    } catch (error) {
      logger.error("Error - cancelMembership", error);
      return reject(error);
    }
  });

module.exports = {
  createPurchase,
  purchaseMembership,
  createMembership,
  createItem,
  updateItem,
  disableItem,
  recurlyInvoice,
  recurlyTransaction,
  createAccount,
  updatePurchasedMembership,
  userMembershipList,
  cancelMembership,
  recurlyInvoicePdf,
  creditPurchase,
};
