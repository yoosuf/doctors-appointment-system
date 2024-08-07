const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");

require("./v1/appointment");
require("./v1/user");
require("./chartTemplate");

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
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "appointment",
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    chartId: {
      type: [Schema.Types.ObjectId, null],
      ref: "chartTemplate",
    },

    subjective: { type: String },
    objective: { type: String },
    assestment: { type: String },
    plans: { type: String },
    pinned: { type: Boolean },
    viewableBy: { type: String },
    patientVisible: { type: Boolean },
    chartData: { type: Array },
    createdBy: { type: Object },
    deletedAt: { type: Date },
    deletedBy: { type: Object },
    desc: { type: String },
    extra_note: { type: String },
    blood_pressure: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    pdfUri: {
      type: String,
    },
    pdfGenerateDate: {
      type: Date,
    },
    type: { type: String },
    no: { type: Number },
    updatedBy: { type: Object },
    note: { type: String },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);


schema.virtual('creator', {
  ref: 'user',
  localField: '_id',
  foreignField: 'creatorId',
  justOne: true
})


schema.pre("save", async function (next) {
  this.isActive = true;
  this.createdAt = new Date();
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
const appointmentChart = mongoose.model(
  "appointmentChart",
  schema,
  "appointmentChart"
);
module.exports = appointmentChart;
