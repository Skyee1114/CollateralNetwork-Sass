const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt =require('jsonwebtoken')
require('dotenv').config();

// Verify user
router.post('/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Token is invalid or has expired' }] });
    }

    const currentDate = new Date();

    user.isVerified = true;
    user.logindate = currentDate;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    // Create a JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;