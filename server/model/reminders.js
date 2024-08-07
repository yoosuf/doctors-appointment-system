const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");

require("./v1/user");
require("./master");

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
      type: Object,
    },

    deletedAt: {
      type: Date,
    },

    deletedBy: {
      type: Object,
    },

    deliveryMethod: {
      type: Schema.Types.ObjectId,
      ref: "master",
    },

    duration: {
      type: Schema.Types.ObjectId,
      ref: "master",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subscribeByDefault: {
      type: Boolean,
      default: true,
    },
    patientSelectable: {
      type: Boolean,
      default: true,
    },
    isDeleted: Boolean,

    name: {
      type: String,
    },

    note: {
      type: String,
    },

    updatedBy: {
      type: Object,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
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
const reminders = mongoose.model("reminders", schema, "reminders");
module.exports = reminders;
