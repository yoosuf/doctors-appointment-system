const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
const { paymentMethod, orderStatus } = require('../../constants/v1')

require('./user')
require('./location')

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

const lineItemSchema = new Schema({
  lineItemId: { type: Schema.Types.ObjectId, required: true },
  lineItemType: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true }
})

const schema = new Schema(
  {
    typeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'location',
    },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    lineItems: [lineItemSchema],
    amount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      enum: orderStatus,
      default: orderStatus.COMPLETED,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: paymentMethod,
      required: true
    }
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


const order = mongoose.model('order', schema, 'order')
module.exports = order
