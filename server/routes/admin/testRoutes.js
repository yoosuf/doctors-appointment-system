const express = require('express')
const appointment = require('../../model/v1/appointment')
const router = express.Router()



router.get('/', async (req, res) => {
  const startOfTodayUTC = new Date()
  startOfTodayUTC.setUTCHours(0, 0, 0, 0)

  const endOfTodayUTC = new Date()
  endOfTodayUTC.setUTCHours(23, 59, 59, 999)

  try {
    const appointments = await appointment
      .find({
        date: {
          $gte: startOfTodayUTC,
          $lte: endOfTodayUTC
        }
      })
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
      .sort({ date: 1 }).lean();


 
  
      res.json(appointments); // Return appointments with renamed keys

    // res.json(appointments) // Return appointments as JSON
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' }) // Handle error if any
  }
})

module.exports = router
