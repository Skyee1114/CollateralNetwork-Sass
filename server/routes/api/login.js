const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const auth = require('../../middleware/auth');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    if (!user.isVerified) {
      return res.status(400).json({ errors: [{ msg: 'User not verified' }] });
    }

    const currentDate = new Date();

    user.logindate = currentDate;
    await user.save();

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

router.post('/verifytwofa', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');   

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Token is invalid or has expired' }] });
    }

    if(user.twofa) {
      try {
        await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({ to: user.phoneNumber, channel: 'sms' });
        res.status(200).json({ success: true, msg: 'Verification code sent to your phone number' });
      } catch (err) {
        console.log("err: ", err);
        return res.status(500).json({ errors: [{ msg: 'Failed to send verification code' }] });
      }
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/verifytwofacode', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');   

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Token is invalid or has expired' }] });
    }

    const { twofaCode } = req.body;

    try {
      const verificationCheck = await client.verify.v2.services(verifyServiceSid)
          .verificationChecks
          .create({ to: user.phoneNumber, code: twofaCode });      

      console.log(verificationCheck);

      if (verificationCheck.status === 'approved') {
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
      } else {
          return res.status(400).json({ errors: [{ msg: 'Invalid verification code' }] });
      }
    } catch (err) {
      console.log('err: ', err);
      return res.status(500).json({ errors: [{ msg: 'Failed to verify code' }] });
  }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;