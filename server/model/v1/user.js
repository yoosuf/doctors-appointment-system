const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
const bcrypt = require('bcryptjs')
const { ORDER_TYPES, PASSWORD } = require('../../constants/common')
var uniqueValidator = require('mongoose-unique-validator')
const { intervalDuration } = require('../../constants/v1')

require('../file')
require('../address')
require('./location')
require('./membership')
require('./invitation')
require('./role')
require('../master')
require('../securityQuestion')
require('./category')

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
    firstName: {
      type: String
    },

    lastName: {
      type: String
    },

    password: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: true,
      uniqueCaseInsensitive: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },

    phones: [
      {
        phone: {
          type: String
          // unique: true,
          //required: true
        },
        isApproved: {
          type: Boolean
        },
        countryCode: {
          type: String
        },
        name: {
          type: String
        },
        verificationCode: {
          type: String
        },
        codeExpiresOn: {
          type: Date
        },
        isVerified: {
          type: Boolean,
          default: false
        },
        isDefault: {
          type: Boolean,
          default: false
        }
      }
    ],
    emails: [
      {
        email: {
          type: String,
          // unique: true,
          // required: true,
          uniqueCaseInsensitive: true
        },
        isApproved: {
          type: Boolean,
          default: false
        },
        countryCode: {
          type: String
        },
        name: {
          type: String
        },
        isVerified: {
          type: Boolean,
          default: false
        },
        isDefault: {
          type: Boolean,
          default: false
        }
      }
    ],

    ipAddress: {
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

    genderId: {
      type: String
    },

    isApproved: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    activityStatus: {
      type: String
    },
    licenseNumber: {
      type: String
    },

    securityQuestions: {
      type: Array
    },

    locationIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'location'
      }
    ],
    timeZone: {
      type: String
    },

    twoFactorAuthentication: {
      type: Boolean
    },
    notificationSettings: [
      {
        notificationId: {
          type: Schema.Types.ObjectId,
          ref: 'master'
        },
        value: {
          type: Boolean
        }
      }
    ],

    cardDetails: [
      {
        last4: {
          type: String
        },
        exprMonth: {
          type: String
        },
        exprYear: {
          type: String
        },
        isPrimary: {
          type: String
        }
      }
    ],
    cards: [
      {
        first6: {
          type: String
        },
        last4: {
          type: String
        },
        expMonth: {
          type: Number
        },
        expYear: {
          type: Number
        },
        cardType: {
          type: String
        },
        cardHolderFirstName: {
          type: String
        },
        cardHolderLastName: {
          type: String
        },
        isPrimary: {
          type: Boolean
        },
        id: {
          type: String
        },
        accountId: {
          type: String
        },
        address: {
          type: JSON
        }
      }
    ],
    description: {
      type: String
    },
    profile_image: {
      type: Schema.Types.ObjectId,
      ref: 'file'
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
    parentId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'role'
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    messageNotifications: {
      type: Boolean,
      default: true
    },
    flag: {
      type: Number,
      default: 1
    },
    mobileToken: {
      token: {
        type: String
      },
      isUsed: {
        type: Boolean
      }
    },

    membership: {
      type: Object,
      default: {},
      properties: {
        _id: { type: Schema.Types.ObjectId, ref: 'membership' },
        startDate: { type: Date },
        renewalDate: { type: Date },
        cancellationRequestedDate: { type: Date },
        interval: {
          type: String,
          enum: intervalDuration
        },
        status: {
          type: String,
          enum: ['active', 'expired', 'canceled']
        },
        categories: [
          {
            _id: { type: Schema.Types.ObjectId, ref: 'category' },
            remainingQuota: { type: Number }
          }
        ]
      }
    },
    invitationReward: {
      type: Object,
      default: {},
      properties: {
        _id: { type: Schema.Types.ObjectId, ref: 'invitation' },
        startDate: { type: Date },
        cancellationDate: { type: Date },
        status: {
          type: String,
          enum: ['active', 'expired', , 'used', 'canceled']
        },
        categoryId: {type: Schema.Types.ObjectId, ref: 'category' },
      }
    },
    devices: [
      {
        device: {
          type: String
        },
        pushToken: {
          type: String
        }
      }
    ],
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
  this.isActive = true
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  if (this.dob) {
    this.dob = this.dob.toISOString()
  }

  next()
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

schema.virtual('invitation', {
  ref: 'invitation',
  localField: 'email',
  foreignField: 'email',
  justOne: true
})

schema.virtual('appointments', {
  ref: 'appointment',
  localField: '_id',
  foreignField: 'userId',
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

schema.virtual('userDevices', {
  ref: 'userDevice',
  localField: '_id',
  foreignField: 'user'
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

// Define virtual property for full name
schema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

schema.index({ fullName: 'text' })

const user = mongoose.model('user', schema, 'user')
module.exports = user
