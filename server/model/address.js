const mongoose = require('../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
require('./v1/user')

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
    legalName: {
      type: String
    },

    addressLine1: { type: String },

    addressLine2: { type: String },

    businessNumber: { type: String },

    cityId: { type: String },
    cityNm: { type: String },

    countryCode: { type: String },
    countryNm: { type: String },
    countryId: { type: String },

    createdBy: { type: Object },

    deletedAt: { type: Date },

    deletedBy: { type: Object },

    email: { type: String },

    isActive: Boolean,

    isDeleted: Boolean,

    phone: { type: String },

    postalCodeId: { type: String },
    postalCodeNm: { type: String },
    provinceId: { type: String },
    provinceNm: { type: String },
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
  this.isDeleted = false
  this.isActive = true
  next()
})

schema.pre('deleteMany', async function (next) {
  let allRecordByConditions = await mongoose
    .model('address')
    .find(this._conditions)
  let dependent = [
    {
      model: 'location',
      refId: 'locationAddressId'
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

schema.pre('updateMany', async function (next) {
  if (this._conditions._id) {
    let allRecordByConditions = await mongoose
      .model('address')
      .find(this._conditions)
    let dependent = [
      {
        model: 'location',
        refId: 'locationAddressId'
      }
    ]
    await Promise.all(
      allRecordByConditions.map(async e => {
        return await Promise.all(
          dependent.map(async i => {
            let where = {}
            where[i.refId] = e._id
            return await mongoose
              .model(i)
              .updateMany(
                where,
                { isDeleted: true },
                async function (err, result) {
                  if (err) {
                    logger.error(`[error] ${err}`)
                    next(err)
                  } else {
                    logger.error('success')
                  }
                }
              )
          })
        )
      })
    )
    next()
  } else {
    next()
  }
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
const address = mongoose.model('address', schema, 'address')
module.exports = address
