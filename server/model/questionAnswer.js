const mongoosePaginate = require("mongoose-paginate-v2");
let idValidator = require("mongoose-id-validator");
const mongoose = require("../config/db");

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
    quesId: {
      type: Schema.Types.ObjectId,
      ref: "question",
    },
    ansIds: {
      type: Array,
    },
    ans: {
      type: Schema.Types.Mixed,
    },
    ansType: {
      type: Schema.Types.String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isActive: { type: Boolean },
    isDeleted: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { virtuals: true },
  }
);
schema.pre("save", async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const questionAnswer = mongoose.model(
  "questionAnswer",
  schema,
  "questionAnswer"
);
module.exports = questionAnswer;
