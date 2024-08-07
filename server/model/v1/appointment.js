const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
const uniqueValidator = require('mongoose-unique-validator')

require('./user')
require('./location')
require('./service')
require('./category')
require('./quotaUsage')

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
    date: {
      type: Date
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'location'
    },

    customerNote: {
      type: String
    },

    notes: {
      type: String
    },

    canceledAt: {
      type: Date
    },

    status: {
      type: String
    },

    serviceIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'service'
      }
    ],

    services: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'service'
        },
        categoryId: {
          type: Schema.Types.ObjectId,
          ref: 'category'
        },

        timeDuration: {
          type: Number,
          default: 0
        },
        status: { type: String, required: true, default: 'proposed' },
        servedBy: {
          type: String,
          default: ''
        },
        serverId: {
          type: Schema.Types.ObjectId,
          ref: 'user'
        },
        serverName: {
          type: String,
          default: ''
        },
        startedAt: {
          type: Date,
          default: null
        },
        endedAt: {
          type: Date,
          default: null
        },
        servedTime: {
          type: Number,
          default: 0
        },
        waitTime: {
          type: Number,
          default: 0
        }
      }
    ],

    remarks: {
      type: String,
      default: ''
    },

    createdBy: {
      type: Object
    },

    updatedBy: {
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

schema.virtual('dailyIntakeChart', {
  ref: 'appointmentChart',
  localField: 'userId',
  foreignField: 'patientId',
  justOne: true,
  options: { sort: { _id: -1 } }
})

// schema.virtual("eventAppointments", {
//   ref: "order",
//   localField: "_id",
//   foreignField: "appointmentId",
// });

schema.virtual("user", {
  ref: "user",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
  options: { sort: { _id: -1 } },
});

schema.virtual('servings', {
  ref: 'appointmentServe',
  localField: '_id',
  foreignField: 'appointmentId',
  options: { sort: { _id: -1 } }
})

schema.virtual('order', {
  ref: 'order',
  localField: '_id', // Find documents where `_id` matches `localField`
  foreignField: 'typeId', // Find documents where `typeId` matches `foreignField`
  justOne: true,
  options: { type: 'Appointment' } // Filter by type 'Appointment'
})

schema.virtual('quotaUsage', {
  ref: 'quotaUsage',
  localField: '_id', // Find documents where `_id` matches `localField`
  foreignField: 'typeId', // Find documents where `typeId` matches `foreignField`
  justOne: false,
  options: { type: 'Appointment' } // Filter by type 'Appointment'
})

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

schema.plugin(mongoosePaginate)
schema.plugin(idValidator)

schema.plugin(uniqueValidator, {
  message: 'Error, expected {VALUE} to be unique.'
})

const appointment = mongoose.model('appointment', schema, 'appointment')
module.exports = appointment
