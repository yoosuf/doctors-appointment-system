const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
var uniqueValidator = require('mongoose-unique-validator')

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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    device: {
      type: String,
      required: true
    },
    pushToken: {
      type: String,
      required: true
    },
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
    }
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

const userDevice = mongoose.model('userDevice', schema, 'userDevice')
module.exports = userDevice
