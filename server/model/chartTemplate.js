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
    // addedBy:{
    //   type:Schema.Types.ObjectId,
    //   ref:"user"
    // },

    chartData: { type: Array },

    createdBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },

    desc: { type: String },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: Boolean,

    name: {
      type: String,
      required: true,
    },

    type: { type: String },

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

schema.pre("deleteMany", async function (next) {
  let allRecordByConditions = await mongoose
    .model("chartTemplate")
    .find(this._conditions);
  let dependent = [
    {
      model: "appoinmentChart",
      refId: "chartId",
    },
  ];
  await Promise.all(
    allRecordByConditions.map(async (e) => {
      return await Promise.all(
        dependent.map(async (i) => {
          let where = {};
          where[i.refId] = e._id;
          return await mongoose
            .model(i.model)
            .deleteMany(where, async function (err, result) {
              if (err) {
                logger.error(`[error] ${err}`);
                next(err);
              } else {
                logger.info("success");
              }
            });
        })
      );
    })
  );
  next();
});

schema.pre("updateMany", async function (next) {
  if (this._conditions._id) {
    let allRecordByConditions = await mongoose
      .model("chartTemplate")
      .find(this._conditions);
    let dependent = [
      {
        model: "appoinmentChart",
        refId: "chartId",
      },
    ];
    await Promise.all(
      allRecordByConditions.map(async (e) => {
        return await Promise.all(
          dependent.map(async (i) => {
            let where = {};
            where[i.refId] = e._id;
            return await mongoose
              .model(i)
              .updateMany(
                where,
                { isDeleted: true },
                async function (err, result) {
                  if (err) {
                    logger.error(`[error] ${err}`);
                    next(err);
                  } else {
                    logger.info("success");
                  }
                }
              );
          })
        );
      })
    );
    next();
  } else {
    next();
  }
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
const chartTemplate = mongoose.model("chartTemplate", schema, "chartTemplate");
module.exports = chartTemplate;
