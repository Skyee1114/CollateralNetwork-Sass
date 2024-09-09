const express = require('express');
const router = express.Router();
const Ico = require('../../models/Ico');
const User = require('../../models/User');
const Notification = require('../../models/Notification');
const auth = require('../../middleware/auth');
require('dotenv').config();

router.post('/getico', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    const { walletaddress } = req.body
    console.log('walletaddress: ', walletaddress);

    const ico = await Ico.findOne({ walletaddress:  walletaddress.toLowerCase() });

    res.status(200).json({ico: ico});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/claimico', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    const { from, to, transactionHash } = req.body

    console.log('from: ', from, 'to: ', to, 'transactionHash: ', transactionHash);

    const currentDate = new Date();    

    const ico = await Ico.findOne({ walletaddress: from.toLowerCase() });
    ico.email = user.email;
    ico.name = user.name;
    ico.claimedtx = transactionHash;
    ico.date = currentDate;
    ico.distributiontoken = ico.totaltoken - (ico.bonustx ? ico.totaltoken : ico.purchasedtx1 ? ico.purchasedtoken : 0);
    await ico.save();

    const newnotification = new Notification({
      email: user.email,
      name: user.name,
      title: 'Token Claim Update',
      message: 'Your tokens will be distributed to your wallet within 48 hours.',
      date: currentDate
    })

    await newnotification.save();

    res.status(200).json({ico: ico});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
