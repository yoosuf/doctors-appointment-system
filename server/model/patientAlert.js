const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");
require("./v1/appointment");
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
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: "appointment",
        },
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },

        chiroId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },

        nurseId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },

        createdBy: { type: Object },

        deletedAt: { type: Date },

        isActive: {
            type: Boolean,
            default: true,
        },

        updatedBy: { type: Object },

        note: { type: String },

    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

schema.pre("save", async function (next) {
    this.isActive = true;
    this.createdAt = new Date();
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
const patientAlert = mongoose.model(
    "patientAlert",
    schema,
    "patientAlert"
);
module.exports = patientAlert;
