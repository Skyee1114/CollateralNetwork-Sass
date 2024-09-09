const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Ico = require('../../models/Ico');
const Nft = require('../../models/Nft');
const Bid = require('../../models/Bid');
const auth = require('../../middleware/auth');
require('dotenv').config();

router.post('/getusers', auth, async (req, res) => {
    try {
      let user = await User.findById(req.user.id).select('-password');   
  
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Token is invalid or has expired' }] });
      }

      const users = await User.find();
  
      res.status(200).json({ users });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

router.post('/geticos', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    
    const icos = await Ico.find();  

    res.status(200).json({icos});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/getclaimedico', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    
    const icos = await Ico.find({ claimedtx: { $ne: null, $ne: '' } });  

    res.status(200).json({claimedicos: icos});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/distributeico', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    
    const { walletaddress, distributionTransaction } = req.body
    const ico = await Ico.findOne({ walletaddress: walletaddress.toLowerCase() });
    ico.distributiontx = distributionTransaction;   
    await ico.save();

    const currentDate = new Date();  
    const newnotification = new Notification({
      email: ico.email,
      name: ico.name,
      title: 'Token Claim Update',
      message: 'Your tokens have been distributed to your wallet.',
      date: currentDate
    })

    await newnotification.save();

    res.status(200).json({ ico });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/updateico', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    
    const { previouswalletaddress, newwalletaddress, purchasedtoken, bonustoken } = req.body
    const ico = await Ico.findOne({ walletaddress: previouswalletaddress.toLowerCase() });
    ico.walletaddress = newwalletaddress;
    ico.purchasedtoken = purchasedtoken;
    ico.bonustoken = bonustoken;
    ico.totaltoken = purchasedtoken + bonustoken;

    await ico.save();

    res.status(200).json({ msg: 'Successfully saved' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
