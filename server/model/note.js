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

mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels,
};

const Schema = mongoose.Schema;
const schema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },

    type: {
      type: String,
    },
    desc: {
      type: String,
    },
    note: {
      type: String,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    chiroId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isActive: Boolean,
    isDeleted: Boolean,
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

const note = mongoose.model("note", schema, "note");
module.exports = note;
