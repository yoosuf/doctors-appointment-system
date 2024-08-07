const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
require('./user')
require('../address')

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

mongoosePaginate.paginate.options = { customLabels: myCustomLabels }

const Schema = mongoose.Schema
const schema = new Schema(
  {
    assignTo: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    assignee: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],

    billingAddressId: {
      type: Schema.Types.ObjectId,
      ref: 'address'
    },

    createdBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },

    description: { type: String },

    isActive: {
      type: Boolean,
      default: true
    },

    email: {
      type: String
    },
    phone: {
      type: String
    },

    lang: { type: Number },

    lat: { type: Number },

    locationAddressId: {
      type: Schema.Types.ObjectId,
      ref: 'address'
    },

    locationName: {
      type: String,
      required: true
    },

    subOwnerId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    defaultChiro: {
      chiroId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      name: {
        type: String
      }
    },

    taxCharge: { type: Number, default: 10 },

    updatedBy: { type: Object }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

schema.pre('save', async function (next) {
  this.isDelete = false
  this.isActive = true
  next()
})

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
schema.plugin(mongoosePaginate)
schema.plugin(idValidator)

schema.pre('findOne', function (next) {
  this.getQuery().isDelete = false
  next()
})
schema.pre('find', function (next) {
  this.getQuery().isDelete = false
  next()
})
const location = mongoose.model('location', schema, 'location')
module.exports = location
