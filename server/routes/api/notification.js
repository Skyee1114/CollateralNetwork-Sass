const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Notification = require('../../models/Notification');
const auth = require('../../middleware/auth');

router.post('/getnotifications', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const notifications = await Notification.find({ email: user.email });
      
    res.status(200).json({notifications: notifications});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;