const mongoose = require('../../config/db')
const mongoosePaginate = require('mongoose-paginate-v2')
var idValidator = require('mongoose-id-validator')
const { invitationStatus } = require('../../constants/v1')
const crypto = require('crypto');



// Function to generate a random token
function generateRandomToken(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

require('./user')
require('./membership')
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
    membershipId: {
      type: Schema.Types.ObjectId,
      ref: 'membership',
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true
    },
    email: {
      type: String,
      required: true
    },
    // Optional fields for additional information
    status: {
      type: String,
      enum: invitationStatus,
      default: invitationStatus.PENDING
    },
    invitationToken: {
      type: String,
      unique: true
    },
    expiresAt: {
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


// Middleware to generate invitation token before saving
schema.pre('save', function (next) {
  if (!this.invitationToken) {
    this.invitationToken = generateRandomToken(64); // Generating a token of length 64
  }
  next();
});


schema.methods.updateStatus = async function () {
  try {
    this.status = invitationStatus.ACCEPTED;
    await this.save();
    return this;
  } catch (error) {
    throw new Error('Error updating invitation status');
  }
};

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
schema.plugin(mongoosePaginate)
schema.plugin(idValidator)

const invitation = mongoose.model('invitation', schema, 'invitation')
module.exports = invitation
