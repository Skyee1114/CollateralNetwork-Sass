const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Nft = require('../../models/Nft');
const Bid = require('../../models/Bid');
const auth = require('../../middleware/auth');
require('dotenv').config();

router.post('/listasset', auth, async (req, res) => { 

  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const { nft, estimatedAssetValue, loanAmount, loanTermMonths, loanRate } = req.body;
    const metadata = JSON.parse(nft.metadata)
    const existingNft = await Nft.findOne({ tokenid: nft.token_id, tokenaddress: nft.token_address });

    if (existingNft) {
      return res.status(400).json({ errors: [{ msg: 'The NFT with the same name already uploaded' }] });
    }

    const currentDate = new Date();
    const newnft = new Nft({
      email: user.email,
      name: user.name,
      tokenid: nft.token_id,
      tokenaddress: nft.token_address,
      collectionname: nft.name,
      metadata: {
        name: metadata.name,
        description: metadata.description,
        animation_url: metadata.animation_url,
        attributes: metadata.attributes,
      },
      estimatedassetvalue: estimatedAssetValue,
      loanamount: loanAmount,
      loantermmonth: loanTermMonths,
      loanrate: loanRate,
      stage: 1,
      date: currentDate,
    })    

    await newnft.save();

    user.nft.awaiting = user.nft.awaiting + 1;
    await user.save();

    res.status(200).json({ msg: 'The NFT successfully uploaded' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/getassetslist', async (req, res) => {
  try {
      
      const nfts = await Nft.find();

      res.status(200).json({ nfts });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

router.get('/getuserassetslist', auth, async (req, res) => {
  try {
      let user = await User.findById(req.user.id).select('-password');  
     
      const nfts = await Nft.find({ email: user.email });

      res.status(200).json({ nfts });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

router.post('/stageasset', auth, async (req, res) => { 

  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const { tokenid, tokenaddress, stage, amend } = req.body;

    const nft = await Nft.findOne({ tokenid, tokenaddress });

    if (!nft) {
      return res.status(400).json({ errors: [{ msg: 'The NFT with the same name does not exist.' }] });
    }

    nft.stage = stage;
    nft.amend = amend;
    await nft.save();

    if(stage == 1){
      user.nft.awaiting = user.nft.awaiting + 1;
    }

    if(stage == 2){
      user.nft.awaiting = user.nft.awaiting - 1;
      user.nft.approved = user.nft.approved + 1;
    }

    if(stage == 4){
      user.nft.approved = user.nft.approved - 1;
      user.nft.listed = user.nft.listed + 1;
    }

    await user.save();

    res.status(200).json({nfts: nft});    
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/updateandlistasset', auth, async (req, res) => { 

  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const { tokenid, tokenaddress, estimatedAssetValue, loanAmount, loanRate, loanTermMonths } = req.body;

    const nft = await Nft.findOne({ tokenid, tokenaddress });

    if (!nft) {
      return res.status(400).json({ errors: [{ msg: 'The NFT with the same name does not exist.' }] });
    }

    nft.stage = 1;
    nft.amend = '';
    nft.estimatedassetvalue = estimatedAssetValue;
    nft.loanamount = loanAmount;
    nft.loanrate = loanRate;
    nft.loantermmonth = loanTermMonths;

    await nft.save();

    user.nft.awaiting = user.nft.awaiting + 1;

    res.status(200).json({nfts: nft});    
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/getdashboardmarketplaceinformation', async (req, res) => {
  try {  

    const marketplace = await Nft.countDocuments({ stage: 4 });
    res.status(200).json({marketplace: marketplace});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/getmarketplaceassets', async (req, res) => {
  try {  

    const marketplaceNfts = await Nft.find({ stage: 4 });
    res.status(200).json({nfts: marketplaceNfts});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/getmarketplacebidasset', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    const { id } = req.body
    const bidNft = await Nft.findById(id);
    res.status(200).json({nfts: bidNft});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/bid', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }

    const { tokenid, tokenaddress, bidamount } = req.body;

    const nft = await Nft.findOne({ tokenid, tokenaddress });

    if (!nft) {
      return res.status(400).json({ errors: [{ msg: 'The NFT with the same name does not exist.' }] });
    }

    const bid = await Bid.findOne({ tokenid, tokenaddress, bidemail: user.email });

    if(bid) {
      return res.status(400).json({ errors: [{ msg: 'You have already placed a bid on the same NFT.' }] });
    }

    const currentDate = new Date();
    const newbid = new Bid({
      email: nft.email,
      name: nft.name,
      tokenid: tokenid,
      tokenaddress: tokenaddress,
      bidemail: user.email,
      bidname: user.name,
      bidamount,
      date: currentDate
    })

    await newbid.save();

    res.status(200).json({ msg: 'The Bid successfully uploaded' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/getbidofasset', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');    

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not exists' }] });
    }
    const { id } = req.body
    const bidNft = await Nft.findById(id);

    const bid = await Bid.find({tokenid: bidNft.tokenid, tokenaddress: bidNft.tokenaddress});
    
    res.status(200).json({bids: bid});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
