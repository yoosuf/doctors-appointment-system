const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");
const uniqueValidator = require("mongoose-unique-validator");

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
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    createdBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },

    description: { type: String },

    imageIds: {
      type: Array,
    },

    includePatientChart: { type: Boolean },

    isActive: Boolean,

    isDeleted: Boolean,

    notVisibleToPatient: { type: Boolean },

    slug: {
      type: Schema.Types.ObjectId,
      ref: "master",
    },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    title: { type: String },

    type: {
      type: String,
    },

    updatedBy: { type: Object },
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
const docFile = mongoose.model("docFile", schema, "docFile");
module.exports = docFile;
