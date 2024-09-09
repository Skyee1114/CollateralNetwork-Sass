const mongoose = require('mongoose');

const IcoSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    walletaddress: {
        type: String,
        required: true,
    },
    totaltoken: {
        type: Number,
        required: true,
    },
    purchasedtoken: {
        type: Number,
    },
    purchasedtx1: {
        type: String,
    },
    purchasedtx2: {
        type: String,
    },
    bonustoken: {
        type: Number,
    },
    bonustx: {
        type: String,
    },
    distributiontx: {
        type: String,
    },
    distributiontoken: {
        type: Number
    },
    claimedtx: {
        type: String,
    },
    date: {
        type: Date,
    },
});

module.exports = Ico = mongoose.model('ico', IcoSchema);