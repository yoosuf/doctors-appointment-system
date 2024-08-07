const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
const { quotaUsageMethod,  } = require('../../constants/v1')

require('./user')
require('./location')
require('./membership')
require('./category')
require('./service')


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

const schema = new Schema(
  {
    typeId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    membershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'membership',
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'service',
      required: false
    },
    action: {
      type: String,
      enum: quotaUsageMethod,
      required: true
    },
    chargeDate: {
      type: Date,
      default: null,
      required: false
    },
    refundDate: {
      type: Date,
      default: null,
      required: false
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
schema.plugin(mongoosePaginate)
schema.plugin(idValidator)

const quotaUsage = mongoose.model('quotaUsage', schema, 'quotaUsage')
module.exports = quotaUsage
