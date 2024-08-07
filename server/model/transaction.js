const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");
const uniqueValidator = require("mongoose-unique-validator");

require("./v1/user");
require("./v1/appointment");
require("./v1/location");
require("./v1/membership");
require("./v1/order");
require("./master");

const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "data",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};

mongoosePaginate.paginate.options = { customLabels: myCustomLabels };

const Schema = mongoose.Schema;
const schema = new Schema(
  {
    // addedBy:{
    //   type:Schema.Types.ObjectId,
    //   ref:"user"
    // },
    createdBy: { type: Object },
    updatedBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },
    amount: { type: Number },

    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "appointment",
    },

    isActive: Boolean,

    isDeleted: Boolean,

    locationId: {
      type: Schema.Types.ObjectId,
      ref: "location",
    },

    membershipId: {
      type: Schema.Types.ObjectId,
      ref: "membership",
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    type: {
      type: String,
    },

    patientId: { type: Object },

    payType: { type: String },

    chiroId: { type: Object },

    productIds: {
      type: Array,
    },

    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        productDetailId: {
          type: Schema.Types.ObjectId,
          ref: "productDetail",
        },
        qty: {
          type: Number,
        },
      },
    ],
    serviceIds: {
      type: Array,
    },

    status: {
      type: Schema.Types.ObjectId,
      ref: "master",
    },

    statusHistory: [
      {
        date: { type: Date },
        reason: { type: String },
        status: { type: String },
      },
    ],

    transactionDate: { type: Date },

    transactionNumber: { type: String },
    transaction: {
      type: Object,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

schema.pre("save", async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

schema.plugin(uniqueValidator, {
  message: "Error, expected {VALUE} to be unique.",
});

schema.pre("findOne", function (next) {
  this.getQuery().isDeleted = false;
  next();
});
schema.pre("find", function (next) {
  this.getQuery().isDeleted = false;
  next();
});
const transaction = mongoose.model("transaction", schema, "transaction");
module.exports = transaction;
