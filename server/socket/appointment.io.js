const { Appointment, User } = require('./../model/v1') // Import the appointment model

let io

const initSocketIO = server => {
  io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      transports: ['websocket']
    }
  })
}

/**
 * Fetch Members
 * @param {*} userId
 * @returns
 */
const fetchMembershipData = async userId => {
  try {
    console.log('Fetching membership data for user ID:', userId)

    const user = await User.findById(userId)
    .populate({
      path: 'invitationReward.categoryId',
      model: 'category',
      select: 'id name description servedBy', 
    })
    .populate({
      path: 'membership._id',
      model: 'membership',
      select: 'id interval name description price categories', 
    })
    .populate({
      path: 'membership.categories._id',
      model: 'category',
      select: 'id name description servedBy remainingQuota', 
    })
    .select('id email invitationReward membership')
    .exec();

    if (user) {
      console.log('Membership data found for user ID:', userId)
      console.log('Membership data:', user)
      return user
    } else {
      console.log('User not found with ID:', userId)
      return null
    }
  } catch (error) {
    console.error('Error fetching membership data:', error)
    return null
  }
}

/**
 * Fetch Appointments
 * @returns array
 */
const fetchAppointments = () => {
  return new Promise((resolve, reject) => {
    const startOfTodayUTC = new Date()
    startOfTodayUTC.setUTCHours(0, 0, 0, 0)

    const endOfTodayUTC = new Date()
    endOfTodayUTC.setUTCHours(23, 59, 59, 999)

    const query = {
      date: {
        $gte: startOfTodayUTC,
        $lte: endOfTodayUTC
      }
    }

    Appointment.find(query)
      .sort({ date: 1 })
      .populate({
        path: 'userId',
        select: 'firstName lastName profile_image',
        populate: [
          {
            path: 'profile_image',
            select: 'uri'
          },
          {
            path: 'alert'
          }
        ]
      })
      .populate([
        {
          path: 'services._id',
          select: 'name description price timeDuration',
          model: 'service',
          options: { retainKey: false }
        },
        {
          path: 'services.categoryId',
          select: 'name description servedBy',
          model: 'category',
          options: { retainKey: false }
        }
      ])
      .sort({ date: 1 })
      .lean()
      .then(resolve)
      .catch(error => {
        console.error('Error fetching appointments:', error)
        reject([])
      })
  })
}

const emitMembershipData = async (socket, userId) => {
  console.log('Emitting membership data for user ID:', userId)

  const membershipData = await fetchMembershipData(userId)

  if (membershipData) {
    console.log('Membership data found for user ID:', userId)
    console.log('Emitting membership data:', membershipData)
    socket.emit('membershipData', membershipData)
  } else {
    console.log('User or membership data not found for user ID:', userId)
  }
}

const emitUpdatedAppointments = () => {
  fetchAppointments()
    .then(appointments => {
      // Sort appointments based on the date or another property
      appointments.sort((a, b) => new Date(a.date) - new Date(b.date))

      // Emit sorted appointments to all clients
      io.emit('appointments', appointments)
    })
    .catch(error => {
      console.error('Error in emitUpdatedAppointments:', error)
    })
}

/**
 *
 */
const setupConnectionListeners = () => {
  io.on('connection', socket => {
    console.log('New client connected')

    socket.on('subscribeToMembership', async userId => {
      socket.join(userId) // Join room corresponding to user ID
      console.log('subscribeToMembership userId', userId)
      await emitMembershipData(socket, userId)
    })

    socket.on('updateMembership', async ({ userId }) => {
      // Handle the membership update, e.g., update the database
      // Then emit the updated membership data to all clients or specific user's room
      await emitMembershipData(socket, userId);
    });

    socket.on('listAppointments', () => {
      fetchAppointments()
        .then(appointments => {
          // console.log('STREAMING APPOINTMENT', appointments);
          io.emit('appointments', appointments)
        })
        .catch(error => {
          console.error('Error in listAppointments:', error)
        })
    })

    socket.on('appointmentAdded', data => {
      emitUpdatedAppointments()
    })

    socket.on('appointmentUpdated', data => {
      emitUpdatedAppointments()
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
}

/**
 *
 * @param {*} server
 */
const init = server => {
  // console.log(`SERVER OBJ`, server)

  if (!io) {
    initSocketIO(server)
    setupConnectionListeners()
  }
}

/**
 *
 * @returns
 */
const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}

module.exports = {
  getIO,
  init
}
