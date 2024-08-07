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
    // addedBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user"
    // },

    createdBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },

    isActive: Boolean,

    isDeleted: Boolean,

    options: { type: Object },
    answer: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
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

schema.pre("findOne", function (next) {
  this.getQuery().isDeleted = false;
  next();
});
schema.pre("find", function (next) {
  this.getQuery().isDeleted = false;
  next();
});

const securityQuestion = mongoose.model(
  "securityQuestion",
  schema,
  "securityQuestion"
);
module.exports = securityQuestion;
