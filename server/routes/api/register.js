const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer  = require('nodemailer');
// const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

// Function to send email
const sendVerificationEmail = async (email, name, token) => {
  const verificationLink = `${process.env.BASE_URL}/verify/${token}`;
  const logoUrl = `${process.env.BASE_URL}/img/ColtLogoBlack.png`;
  const mailOptions = {
    from: `"Collateral Network" <${process.env.EMAIL}>`,
    to: email,
    subject: 'Collateral Network - Verify Your Email Address',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .wrapper {
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 20px;
                background-color: #3f15e9;
                color: #ffffff;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .logo {
              width: 40px;
              height: 40px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #3f15e9;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
            .btntext {
              color: #ffffff;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777777;
            }
        </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
              <h1>Email Verification</h1>
          </div>
          <div class="content">
              <img src="${logoUrl}" alt="Logo" class="logo"/>
              <p>Dear ${name},</p>
              <p>Please verify your email by clicking the button below:</p>
              <a href="${verificationLink}" class="button"><span class="btntext">Verify Email</span></a>
              <p>If the button above does not work, copy and paste the following link into your browser:</p>
              <p>${verificationLink}</p>
          </div>
          <div class="footer">
              <p>&copy; 2024 Collateral Network. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

router.post('/', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = await User.findOne({name});

    if(user) {
      return res.status(400).json({errors: [{msg: 'User name already exists'}]});
    }

    const currentDate = new Date();
    user = new User({
      email,
      name,
      password,
      registrationdate: currentDate,
      logindate: currentDate,
      verificationToken: jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      verificationTokenExpires: Date.now() + 3600000, // 1 hour
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    await sendVerificationEmail(user.email, user.name, user.verificationToken);

    res.status(200).json({ msg: 'Verification email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
