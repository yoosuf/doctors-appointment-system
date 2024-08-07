const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");
require("./v1/appointment");
require("./v1/user");
require("./v1/service");
require("./v1/location");

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
    locationId:
    {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "appointment",
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    serviceIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "service",
      },
    ],
    serverId: {
      type: Schema.Types.ObjectId, // This could be a Nurse or a Chairo or anyone in future
      ref: "user",
    },
    status: {
      type: String,
    },
    remarks: {
      type: String,
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
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
  this.createdAt = new Date();
  next();
});

// schema.pre("update", async function (next) {
//   this.endAt = new Date();
//   next();
// });


schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

schema.plugin(mongoosePaginate);

schema.plugin(idValidator);

const appointmentServe = mongoose.model(
  "appointmentServe",
  schema,
  "appointmentServe"
);

module.exports = appointmentServe;
