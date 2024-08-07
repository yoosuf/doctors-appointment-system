const cron = require('node-cron')
require('../jobs/process')
const moment = require('moment')
const { LOG_STATUS, LOG_TYPE } = require('../constants/common')
const Log = require('../model/log')
const LogService = require('../services/logService')
const Appointment = require('../model/v1/appointment')
const {
  processRefund
} = require('../repository/v1/appointmentRefundRepository')
const {
  appointmentStatus,
  quotaUsageMethod,
  paymentMethod,
  orderStatus
} = require('../constants/v1')
module.exports = runCron = () => {
  const retryFailedMail = cron.schedule('0 * * * * *', async function () {
    console.log('Retry failed mail cron job started')
    try {
      let logFilter = {
        status: LOG_STATUS.RETRY,
        type: LOG_TYPE.MAIL
      }
      let logs = await Log.find(logFilter, [], { limit: 3 })
      if (logs.length) {
        await LogService.retryMail(logs)
        console.info('Failed mail retry on ', moment().format('hh:mm:ss'))
      } else {
        console.log('No logs found for retrying failed mails')
      }
    } catch (error) {
      console.error('Error retrying failed mails:', error)
    }
    console.log('Retry failed mail cron job finished')
  })

  const updateAppointments = cron.schedule('0 0 * * *', async function () {
    console.log('Update appointments cron job started')
    try {
      const currentDate = new Date()
      const appointmentsToUpdate = await Appointment.find({
        date: { $lte: currentDate },
        status: {
          $in: [
            appointmentStatus.PROPOSED,
            appointmentStatus.PENDING,
            appointmentStatus.CONFIRMED,
            appointmentStatus.IN_PROGRESS
          ]
        }
      })

      await Promise.all(
        appointmentsToUpdate.map(async appointment => {
          // Process refund for appointments in progress
          if (appointment.status === appointmentStatus.IN_PROGRESS) {
            await processRefund(appointment._id, appointment.userId)
          }

          // Update appointment status to 'SUSPENDED'
          appointment.status = appointmentStatus.SUSPENDED
          // Update service status to 'SUSPENDED'
          appointment.services.forEach(
            service => (service.status = appointmentStatus.SUSPENDED)
          )

          // Save the updated appointment
          await appointment.save()
        })
      )

      console.log(`Updated ${appointmentsToUpdate.length} appointments.`)
    } catch (error) {
      console.error('Error updating appointments:', error)
    }
    console.log('Update appointments cron job finished')
  })

  /**
   * Cancells the membership on its cancelatin request date
   */
  const cancelMembership = cron.schedule('0 0 * * *', async function () {
    try {
      // Find users who have requested membership cancellation
      const usersToCancel = await User.find({
        'membership.cancellationRequestedDate': { $lte: new Date() },
        'membership.status': 'active' // Only cancel memberships that are currently active
      });
  
      // Iterate over each user to cancel their membership
      for (const user of usersToCancel) {
        // Update membership status to 'canceled'
        user.membership.status = 'canceled';
        // Clear cancellationRequestedDate
        user.membership.cancellationRequestedDate = null;
        // Save the updated user
        await user.save();
        console.log(`Membership canceled for user: ${user._id}`);
      }
    } catch (error) {
      console.error('Error canceling memberships:', error);
    }
  });

  const reNewMembership = cron.schedule('0 0 * * *', async function () {
    try {
    } catch (error) {}
  })
}
