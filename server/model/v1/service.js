const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
const uniqueValidator = require('mongoose-unique-validator')

require('./category')
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

/**
 * Adding subdocyment Schema for easy maintainance
 */
const serviceItem = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  }
})

/**
 * Main Schema
 */
const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category'
    },
    locationIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'location'
      }
    ],

    // using subdocument for items
    items: [serviceItem],
    price: {
      type: Number,
      required: false
    },
    timeDuration: {
      type: Number,
      required: false
    },
    isActive: {
      type: Boolean,
      default: true
    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    createdBy: {
      type: Object
    },

    deletedAt: {
      type: Date
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

schema.virtual('category', {
  ref: 'category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
})

schema.plugin(uniqueValidator, {
  message: 'Error, expected {VALUE} to be unique.'
})

schema.pre('findOne', function (next) {
  this.getQuery().isDeleted = false
  next()
})
schema.pre('find', function (next) {
  this.getQuery().isDeleted = false
  next()
})

const service = mongoose.model('service', schema, 'service')
module.exports = service
