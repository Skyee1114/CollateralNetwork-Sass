const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);   

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Token is invalid or has expired' }] });
    }

    res.status(200).json({ user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;