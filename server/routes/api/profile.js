const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');

router.post('/twofa', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');   

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Token is invalid or has expired' }] });
    }

    const { enabled } = req.body;

    user.twofa = enabled;

    await user.save();

    res.status(200).json({ user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/savepersonname', auth, async (req, res) => {
  try {
    const { name } = req.body

    let user = await User.findOne({name});

    if(user) {
      return res.status(400).json({errors: [{msg: 'User name already exists'}]});
    }

    user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    
    console.log('name: ', name);

    user.name = name;

    await user.save();

    res.status(200).json({ msg: 'User name successfully saved' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/updatepersoninformation', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const { firstname, lastname, dob, nationality } = req.body
    
    user.firstname = firstname;
    user.lastname = lastname;
    user.dob = dob;
    user.nationality = nationality;

    await user.save();

    res.status(200).json({ msg: 'The Collection status successfully updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/updatecontactinformation', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const { email, phoneNumber } = req.body
    
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({ msg: 'The Collection status successfully updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/updateaddressinformation', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const { address1, address2, city, state, zip } = req.body
    
    user.address1 = address1;
    user.address2 = address2;
    user.city = city;
    user.state = state;
    user.zip = zip;

    await user.save();

    res.status(200).json({ msg: 'The Collection status successfully updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;