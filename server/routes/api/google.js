const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();
const User = require('../../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    callbackURL: 'https://api.collateralnetwork.io/api/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const currentDate = new Date();
    const newUser = {
      email: profile.emails[0].value,
      isVerified: profile.emails[0].verified,
      registrationdate: currentDate,
      logindate: currentDate,
      verificationToken: undefined,
      verificationTokenExpires: undefined
    }

    try {
        let user = await User.findOne({ email: profile.emails[0].value })

        if (user) {
            user.logindate = currentDate;
            await user.save();
            done(null, user)
        } else {
            user = await User.create(newUser)
            done(null, user)
        }
    } catch (err) {
        console.error(err)
    }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});


// Verify user
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

router.get('/callback', passport.authenticate('google', { failureRedirect: `${process.env.BASE_URL}` }), (req, res) => {

  const payload = {
    user: {
      id: req.user.id,
    },
  };

  // Generate JWT token
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) {
        console.error(err);
        res.redirect(`${process.env.BASE_URL}`);
      } else {
        // Redirect to frontend after successful login
        res.redirect(`${process.env.BASE_URL}/google/${token}`);
      }
    }
  );
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Handle error case if logout fails
    }

    // Destroy the session to completely log the user out
    req.session.destroy((err) => {
      if (err) {
        console.error('Failed to destroy session:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }

      // Send a success response instead of a redirect
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});


module.exports = router;