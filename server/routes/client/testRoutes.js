const express = require('express');
const router = express.Router();
const { initializeApp, cert } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const User = require('./../../model/v1/user');

const serviceAccount = require('./../../config/firebase.json');

console.log('Initializing Firebase App...');
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});
console.log('Firebase App initialized successfully.');

const messaging = getMessaging(firebaseApp);

router.get('/', async (req, res) => {
  try {
    console.log('Fetching all users from the database...');
    const users = await User.find({});
    console.log('Users fetched successfully.');

    for (const user of users) {
      console.log(`Processing user ${user._id}...`);
      for (const device of user.devices) {
        console.log(`Processing device ${device._id}...`);
        if (device.pushToken) {
          console.log('Push token found for device. Sending notification...');
          const message = {
            notification: {
              title: 'Hello from Firebase!',
              body: 'This is a Firebase Cloud Messaging Push Notification!',
            },
            token: device.pushToken, // Use `token` instead of `registrationToken`
          };
          await messaging.send(message);
          console.log('Notification sent successfully.');
        } else {
          console.log('No push token found for device.');
        }
      }
    }

    console.log('All notifications sent successfully.');
    // res.status(200).send('Notifications sent successfully to all users.');
    res.status(200).json({
      message: `Notifications sent successfully to all users.` 
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({
      error: error
    });
    
  }
});

module.exports = router;
