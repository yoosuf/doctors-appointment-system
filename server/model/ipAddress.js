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
    ipAddress: {
      type: String,
    },
    locationIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "location",
      },
    ],
    addressIds: [
      {
        address: {
          type: Schema.Types.ObjectId,
          ref: "address",
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

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
const ipAddress = mongoose.model("ipAddress", schema, "ipAddress");
module.exports = ipAddress;
