const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    tokenid: {
        type: String,
        required: true,
    },
    tokenaddress: {
        type: String,
        required: true,
    },
    bidemail: {
        type: String,
        required: true,
    },
    bidname: {
        type: String,
        required: true,
    },
    bidamount: {
        type: String,
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = Bid = mongoose.model('bid', BidSchema);