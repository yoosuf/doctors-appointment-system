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
    patient: {
      type: JSON,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    chiroId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "appointment",
    },
    message: {
      type: String,
    },
    checkIntime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const checkInRequest = mongoose.model(
  "checkInRequest",
  schema,
  "checkInRequest"
);
module.exports = checkInRequest;
