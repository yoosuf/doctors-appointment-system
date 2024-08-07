const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");

require("./v1/user");
require("./v1/order");
require("./transaction");

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

mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels,
};

const Schema = mongoose.Schema;
const schema = new Schema(
  {
    // addedBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user"
    // },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },
    billFrom: {
      type: Object,
    },

    billTo: {
      type: Object,
    },
    type: {
      type: String,
    },
    payType: {
      type: String,
    },

    invoiceId: {
      type: String,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    isActive: Boolean,

    isDeleted: Boolean,

    issueDate: {
      type: Date,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "transaction",
    },
    subTotal: {
      type: Number,
    },
    status: {
      type: String,
    },

    taxAmount: {
      type: Number,
    },

    total: {
      type: Number,
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
schema.pre("findOne", function (next) {
  this.getQuery().isDeleted = false;
  next();
});
schema.pre("find", function (next) {
  this.getQuery().isDeleted = false;
  next();
});
const invoice = mongoose.model("invoice", schema, "invoice");
module.exports = invoice;
