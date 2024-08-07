const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')

require('../file')

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
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },

    imageId: {
      type: Schema.Types.ObjectId,
      ref: 'file'
    },
    servedBy: {
      type: String,
      enum: ['NURSE', 'CHIROPRACTOR'],
      required: true
    },
    onlineBookingEnabled: {
      type: Boolean,
      default: false
    },
    isActive: Boolean,

    isDeleted: Boolean,

    createdBy: { type: Object },
    updatedBy: { type: Object },
    deletedBy: { type: Object },
    deletedAt: { type: Date }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

schema.pre('save', async function (next) {
  this.isDeleted = false
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
  this.getQuery().isDeleted = false
  next()
})
schema.pre('find', function (next) {
  this.getQuery().isDeleted = false
  next()
})
const category = mongoose.model('category', schema, 'category')
module.exports = category
