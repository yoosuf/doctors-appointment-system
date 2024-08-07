const mongoose = require('../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
const bcrypt = require('bcryptjs')
const { SECRET_ENCRYPTION } = require('../config/authConstant')
const { ORDER_TYPES, PASSWORD } = require('../constants/common')
const { convertObjectToEnum } = require('../utils/common')
// const mongooseFieldEncryption =
//   require("mongoose-field-encryption").fieldEncryption;
var uniqueValidator = require('mongoose-unique-validator')

require('./file')
require('./address')
const location = require('./v1/location')
require('./v1/membership')
require('./v1/role')
require('./master')
require('./securityQuestion')

const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator'
}

mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels
}

const Schema = mongoose.Schema

/**
 * Adding subdocyment Schema for easy maintainance
 */

// const identityDocumentSchema = new Schema({
//   file: {
//     type: Schema.Types.ObjectId,
//     ref: "file"
//   },
// });

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },

    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    specialties: {
      type: JSON
    },
    password: {
      type: String
    },

    bio: {
      type: String
    },
    addressIds: [
      {
        address: {
          type: Schema.Types.ObjectId,
          ref: 'address'
        },
        isDefault: {
          type: Boolean,
          default: false
        }
      }
    ],
    dob: {
      type: Date
    },
    gender: {
      type: Schema.Types.ObjectId,
      ref: 'master'
    },

    securityQuestions: {
      type: Array
    },

    description: {
      type: String
    },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: 'file'
    },
    onboardInfo: {
      currentStep: { type: Number },

      basicInfo: {
        height: {
          ft: { type: Number },
          in: { type: Number }
        },
        weight: { type: Number },
        name: { type: String },
        phone: { type: String },
        relationship: { type: String }
      },
      refferalStep: {
        refferer: { type: String },
        refferalMethod: [{ type: String }]
      },
      signinOffStep: {
        fingerSign: { type: Schema.Types.ObjectId, ref: 'file' },
        parentName: { type: String },
        parentEmail: { type: String }
      }
    },

    identityDocuments: [{ type: Schema.Types.ObjectId, ref: 'file' }],
    createdBy: {
      type: JSON
    },
    updatedBy: {
      type: JSON
    },
    deletedBy: {
      type: JSON
    },
    deletedAt: {
      type: Date
    },
    isDelete: {
      type: Boolean,
      default: false
    },

    flag: {
      type: Number,
      default: 1
    },
    onboardProgress: { type: Number, default: 0 }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

schema.pre('save', async function (next) {
  this.isDelete = false
  // this.isActive = true;
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  if (this.dob) {
    this.dob = this.dob.toISOString()
  }

  next()
})

schema.pre('deleteMany', async function (next) {
  let allRecordByConditions = await mongoose
    .model('user')
    .find(this._conditions)
  let dependent = [
    {
      model: 'reminders',
      refId: 'userId'
    },
    {
      model: 'userActivity',
      refId: 'userId'
    },
    {
      model: 'appointmentChart',
      refId: 'chiroId'
    },
    {
      model: 'appointment',
      refId: 'customerId'
    },
    {
      model: 'location',
      refId: 'subOwnerId'
    }
  ]
  await Promise.all(
    allRecordByConditions.map(async e => {
      return await Promise.all(
        dependent.map(async i => {
          let where = {}
          where[i.refId] = e._id
          return await mongoose
            .model(i.model)
            .deleteMany(where, async function (err, result) {
              if (err) {
                logger.error(`[error] ${err}`)
                next(err)
              } else {
                logger.info('success')
              }
            })
        })
      )
    })
  )
  next()
})

// schema.pre("updateMany", async function (next) {
//   if (this._conditions._id) {
//     let allRecordByConditions = await mongoose
//       .model("user")
//       .find(this._conditions);
//     let dependent = [
//       {
//         model: "reminders",
//         refId: "userId",
//       },
//       {
//         model: "userActivity",
//         refId: "userId",
//       },
//       {
//         model: "appoinmentChart",
//         refId: "chiroId",
//       },
//       {
//         model: "appointment",
//         refId: "customerId",
//       },
//       {
//         model: "location",
//         refId: "subOwnerId",
//       },
//     ];
//     await Promise.all(
//       allRecordByConditions.map(async (e) => {
//         return await Promise.all(
//           dependent.map(async (i) => {
//             let where = {};
//             where[i.refId] = e._id;
//             return await mongoose.model(i).updateMany(
//               where,
//               {
//                 isDeleted: true,
//               },
//               async function (err, result) {
//                 if (err) {
//                   logger.error(`[error] ${err}`);
//                   next(err);
//                 } else {
//                   logger.error("success");
//                 }
//               }
//             );
//           })
//         );
//       })
//     );
//     next();
//   } else {
//     next();
//   }
// });

schema.post('findOneAndUpdate', async function (data) {
  const result = {
    defaultChiro: {
      chiroId: data._id,
      name: `${data.firstName} ${data.lastName}`
    }
  }
  await location.updateMany({ 'defaultChiro.chiroId': data._id }, result)
})

schema.methods.isPasswordMatch = async function (password) {
  const user = this
  return password == PASSWORD || bcrypt.compare(password, user.password)
}

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

schema.virtual('appointmentData', {
  ref: 'appointment',
  localField: '_id',
  foreignField: 'patientId',
  justOne: true
})

schema.virtual('role', {
  ref: 'role',
  localField: '_id',
  foreignField: 'roleId',
  justOne: true
})

schema.virtual('alert', {
  ref: 'alert',
  localField: '_id',
  foreignField: 'patientId'
})

schema.virtual('products', {
  ref: 'order',
  localField: '_id',
  foreignField: 'userId',
  match: { orderType: ORDER_TYPES.PRODUCT }
})
schema.plugin(mongoosePaginate)
schema.plugin(idValidator)

schema.plugin(uniqueValidator, {
  message: '{VALUE} already taken.'
})

schema.pre('findOne', function (next) {
  this.getQuery().isDelete = false
  next()
})
schema.pre('find', function (next) {
  this.getQuery().isDelete = false
  next()
})

schema.index({ fullName: 'text' })

const user = mongoose.model('user', schema, 'user')
module.exports = user
