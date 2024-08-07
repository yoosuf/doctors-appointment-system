const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");
const bcrypt = require("bcryptjs");
var uniqueValidator = require("mongoose-unique-validator");

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
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    height: {
      ft: { type: Number },
      in: { type: Number },
    },
    onboardSteps: { type: Number },
    totalOnboardSteps: { type: Number },
    weight: { type: Number },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
      relationToYou: { type: String },
    },
    refferalInformation: {
      refferalName: { type: String },
      aboutUs: [{ type: Schema.Types.ObjectId, ref: "master" }],
    },
    approxDate: { type: Date },
    visitReason: [{ type: Schema.Types.ObjectId, ref: "master" }],
    painScale: { type: Number },
    discomfort: [{ type: Schema.Types.ObjectId, ref: "master" }],
    aggravates: [{ type: Schema.Types.ObjectId, ref: "master" }],
    fingerSign: { type: Schema.Types.ObjectId, ref: "file" },
    parentName: { type: String },
    parentEmail: { type: String },
    chartData: { type: Array },
    chartId: {
      type: Schema.Types.ObjectId,
      ref: "chartTemplate",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.pre("save", async function (next) {
  this.isDelete = false;
  this.isActive = true;
  if (this.password != undefined) {
    this.password = await bcrypt.hash(this.password, 8);
  }
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
  message: "{VALUE} already taken.",
});

schema.pre("findOne", function (next) {
  this.getQuery().isDelete = false;
  next();
});
schema.pre("find", function (next) {
  this.getQuery().isDelete = false;
  next();
});
const userDetails = mongoose.model("userDetails", schema, "userDetails");
module.exports = userDetails;
