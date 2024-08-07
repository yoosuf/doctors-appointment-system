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

    alt: { type: String },

    createdBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },

    file_size: { type: String },

    height: { type: String },

    isActive: Boolean,

    isDeleted: Boolean,

    link: { type: String },

    mime_type: { type: String },

    name: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    slug: { type: String },

    status: { type: String },

    title: { type: String },

    type: {
      type: String,
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: { type: Object },

    uri: { type: String },

    width: { type: String },
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
    .model("file")
    .find(this._conditions);
  let dependent = [
    {
      model: "membership",
      refId: "imageId",
    },
    {
      model: "category",
      refId: "imageId",
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
      .model("file")
      .find(this._conditions);
    let dependent = [
      {
        model: "membership",
        refId: "imageId",
      },
      {
        model: "category",
        refId: "imageId",
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
const file = mongoose.model("file", schema, "file");
module.exports = file;
