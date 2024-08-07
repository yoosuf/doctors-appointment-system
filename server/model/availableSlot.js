const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");

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
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "appointment",
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    duration: {
      type: String,
    },
    createdBy: {
      type: Object,
    },
    updatedBy: {
      type: Object,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
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
  if (this.getQuery().isDeleted != undefined) {
    this.getQuery().isDeleted = false;
  }
  next();
});
const service = mongoose.model("availableSlot", schema, "availableSlot");
module.exports = service;
