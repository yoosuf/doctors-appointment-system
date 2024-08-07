const appointmentStatus = {
    PROPOSED: 'proposed',
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in-progress',
    RESCHEDULED: 'rescheduled',
    CANCELED: 'canceled',
    COMPLETED: 'completed',
    NO_SHOW: 'no-show',
    SUSPENDED: 'suspended'
  }
  
  const invitationStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected'
  }
  
  const paymentMethod = {
    CARD: 'card',
    CASH: 'cash',
    WALLET: 'wallet',
    OTHER: 'other'
  }
  
  const intervalDuration = {
    MONTH: 'month',
    YEAR: 'year',
  }
  
  const orderStatus = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    REVIEWED: 'reviewed',
    CANCELED: 'canceled'
  }
  
  const quotaUsageMethod = {
    CHARGE: 'charge',
    REFUND: 'refund'
  }
  
  module.exports = {
    appointmentStatus,
    invitationStatus, 
    paymentMethod,
    intervalDuration, 
    orderStatus,
    quotaUsageMethod
  }
  