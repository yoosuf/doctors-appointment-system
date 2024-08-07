// index.js
const Category = require('./category')
const Service = require('./service')
const User = require('./user')
const Membership = require('./membership')
const Appointment = require('./appointment')
const Order = require('./order')
const QuotaUsage = require('./quotaUsage')
const Invitation = require('./invitation')
const Location = require('./location')

module.exports = {
  Location,
  Category,
  Service,
  User,
  Membership,
  Appointment,
  Order,
  QuotaUsage,
  Invitation
}
