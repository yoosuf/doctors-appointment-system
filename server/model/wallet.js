const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");

require("./v1/user");

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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "service",
    },
    type: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "transaction",
    },
    amt: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: { type: Object },
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

const chartTemplate = mongoose.model("wallet", schema, "wallet");
module.exports = chartTemplate;
