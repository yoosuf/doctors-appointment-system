const Appointment = require('../../model/v1/appointment')
const Category = require('../../model/v1/category')
const Service = require('../../model/v1/service')
const utils = require('../../utils/messages')
const User = require('../../model/v1/user')
const UserDevice = require('../../model/v1/userDevice')

const Membership = require('../../model/v1/membership')
const { invitationStatus } = require('../../constants/v1')

const jwt = require('jsonwebtoken')
const { JWT, EMAIL_SUBJECT } = require('../../config/authConstant')

/**
 * A test endpoint
 */
const myTest = (req, res) => {
  // Your logic for handling the POST request
  // console.log(`req`, req);
  res.send('POST request to /me successful')
}

/**
 * Get Profile Object
 */
const myProfile = async (req, res) => {
  const userId = req.user.id

  try {
    const userObj = await User.findById(userId)
      .populate({
        path: 'locationIds',
        model: 'location',
        select: '_id locationName isActive'
      })
      .populate({
        path: 'addressIds',
        model: 'address'
      })
      .populate({
        path: 'profile_image',
        model: 'file'
      })
      .populate({
        path: 'addressIds',
        populate: 'address'
      })
      .populate({
        path: 'locationIds',
        populate: 'location'
      })
      .populate({
        path: 'roleId',
        model: 'role',
        select: 'name code'
      })
      .populate({
        path: 'invitationReward.categoryId',
        model: 'category'
      })
      .populate('invitation')
      .populate({
        path: 'membership._id',
        model: 'membership'
      })
      .populate({
        path: 'membership.categories._id',
        model: 'category'
      })

    // console.log(JSON.stringify(userObj.membership))

    // .select(
    //   'firstName lastName gender profile_image id plan subscription isApproved isActive locationIds emailNotifications onboardProgress email phone roleId membership addressIds notificationSettings dob '
    // )

    if (!userObj) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Access the invitation property of the userObj
    const invitation = userObj.invitation

    // Check if invitation exists and its status is 'PENDING'
    if (invitation && invitation.status === invitationStatus.PENDING) {
      // Update the status of the invitation to 'ACCEPTED'
      invitation.status = invitationStatus.ACCEPTED

      // Update the invitationReward object of the user
      userObj.invitationReward = {
        _id: invitation._id,
        startDate: new Date(), // Example: Set the start date to the current date
        status: 'active', // Example: Set the status to 'active'
        categoryId: invitation.categoryId // Example: Set the categoryId from the invitation
        // You can add more properties as needed
      }

      try {
        // Save the updated invitation status to the database
        await Promise.all([invitation.save(), userObj.save()]);
        console.log('Invitation status and user updated successfully');
      } catch (error) {
        console.error('Error updating invitation status:', error)
      }
    }

    let imagePath = ''
    if (userObj.profile_image) {
      // Assuming 'path' is the field in the 'File' model that contains the image path
      imagePath = `${process.env.SERVER_URL}${userObj.profile_image.uri}`
    }

    const modifiedUserObj = {
      ...userObj.toObject(),
      profile_image: imagePath
    }

    res.status(200).json(modifiedUserObj)
  } catch (error) {
    console.error('Error finding user by ID:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateMyProfile = (async = (req, res) => {
  return req
})

const myServicesByLocation = async (req, res) => {
  try {
    const result = await Service.aggregate([
      {
        $match: {
          isDeleted: { $ne: true }, // Exclude documents with isDeleted true
          isActive: { $ne: false } // Exclude documents with isDeleted true

        }
      },
      {
        $lookup: {
          from: 'category', // Collection name for categories
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $match: {
          'category.isDeleted': { $ne: true },
          'category.isActive': { $ne: false }
        }
      },
      {
        $group: {
          _id: '$categoryId',
          name: { $first: '$category.name' },
          description: { $first: '$category.description' },
          data: {
            $push: {
              _id: '$_id',
              name: '$name',
              description: '$description',
              price: '$price',
              duration: '$timeDuration'
            }
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ])

    res.status(200).json(result)
  } catch (error) {
    console.error('Error retrieving services:', error)
    throw error
  }
}

/**
 * Get appointments , for the time being Pending appointments
 * @param {*} req
 * @param {*} res
 */
const myAppointments = async (req, res) => {
  try {
    const userId = req.user.id
    const appointment = await Appointment.findOne({
      patientId: userId,
      status: 'PENDING'
    })

    res.json(appointment)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const filterMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id
    const { fromDate, toDate, status } = req.query

    let query = {
      patientId: userId
    }

    // if (status) {
    //   query.status = { $in: status.split(',') }
    // } else {
    //   query.status = { $in: ['PENDING', 'WAITING', 'IN_SERVE'] }
    // }

    // Adding optional date filter if both fromDate and toDate are provided
    // if (fromDate && toDate) {
    //   query.appointmentDate = {
    //     $gte: new Date(fromDate), // Greater than or equal to fromDate
    //     $lte: new Date(toDate) // Less than or equal to toDate
    //   }
    // }

    const appointments = await Appointment.find(query)

    // If no appointments are found, you may want to handle it appropriately
    if (!appointments || appointments.length === 0) {
      return res.json({ message: 'No appointments found' })
    }

    res.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const addDevice = async (req, res) => {
  const userId = req.user.id
  const { device, pushToken } = req.body

  console.log(`userId`, userId)
  console.log(`device`, device)
  console.log(`pushToken`, pushToken)

  try {
    // Find the user by ID
    const user = await User.findById(userId)

    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if the device already exists for the user
    let userDevice = await userDevice.findOne({ user: userId, device })

    if (userDevice) {
      // If device exists, update pushToken
      userDevice.pushToken = pushToken
    } else {
      // If device doesn't exist, create a new UserDevice instance
      userDevice = new UserDevice({ user: userId, device, pushToken })
    }

    // Save the UserDevice instance
    await userDevice.save()

    // Populate user's devices after saving UserDevice instance
    await user.populate('userDevices').execPopulate()

    // Return the user object with updated devices as response
    res.status(200).json(user)
  } catch (error) {
    console.error('Error finding user by ID:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  myTest,
  myProfile,
  updateMyProfile,
  myServicesByLocation,
  myAppointments,
  filterMyAppointments,
  addDevice
}
