const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Collection = require('../../models/Collection');
const Notification = require('../../models/Notification');
const auth = require('../../middleware/auth');
require('dotenv').config();

router.post('/uploadcollection', auth, async (req, res) => { 

  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const { collectionName, marketplaceLink, socialLink, assetLink } = req.body;
    const currentDate = new Date();

    const newcollection = new Collection({
      email: user.email,
      name: user.name,
      collectionname: collectionName,
      marketplacelink: marketplaceLink,
      sociallink: socialLink,
      assetlink: assetLink,
      allowed: 0,
      date: currentDate
    })

    await newcollection.save();

    let capitalizedCollectionName = collectionName;

    if (collectionName && /^[a-zA-Z]/.test(collectionName)) {
      capitalizedCollectionName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);
    }

    const newnotification = new Notification({
      email: user.email,
      name: user.name,
      title: 'Asset Request Update',
      message: `${capitalizedCollectionName} successfully submitted for review.`,
      date: currentDate
    })

    await newnotification.save();

    res.status(200).json({ newcollection });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/getcollectionlist', async (req, res) => {
  try {
      
      const collections = await Collection.find();

      res.status(200).json({ collections });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

router.post('/getusercollectionlist', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const collections = await Collection.find({email: user.email});

    res.status(200).json({ collections });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/updatecollectionstatus', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    const { id, allowed } = req.body
    const collection = await Collection.findById(id);
    collection.allowed = allowed;
    await collection.save();

    const currentDate = new Date();

    const newnotification = new Notification({
      email: user.email,
      name: user.name,
      title: 'Asset Request Update',
      message: `${collection.collectionname} has been ${allowed ? 'approved' : 'declined'}.`,
      date: currentDate
    })

    await newnotification.save();

    res.status(200).json({ msg: 'The Collection status successfully updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
