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
    name: {
      type: String,
    },
    activityName: {
      type: String,
    },
    frontend_route: {
      type: String,
    },
    route: {
      type: String,
      required: true,
    },
    device: {
      type: String,
    },
    response: {
      httpStatus: {
        type: String,
        required: true,
      },
      method: {
        type: String,
        // required: true
      },
      message: {
        type: String,
        // required: true
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    deviceId: {
      type: String,
    },
    location: {
      type: String,
    },
    ip: {
      type: String,
    },
    requestData: {
      type: JSON,
    },
    createdBy: {
      type: JSON,
    },
    updatedBy: {
      type: JSON,
    },
    deletedBy: {
      type: JSON,
    },
    deletedAt: {
      type: Date,
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
  }
);

schema.pre("save", async function (next) {
  this.isDelete = false;
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
  this.getQuery().isDelete = false;
  next();
});
schema.pre("find", function (next) {
  this.getQuery().isDelete = false;
  next();
});
const userActivity = mongoose.model("userActivity", schema, "userActivity");
module.exports = userActivity;
