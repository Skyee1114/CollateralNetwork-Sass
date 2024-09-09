const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    dob: {
        type: String,
    },
    nationality: {
        type: String,
    },    
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    twofa: {
        type: Boolean,
        default: false,
    },
    phoneNumber: {
        type: String,
    },
    address1 : {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    registrationdate: {
        type: Date,
        required: true,
    },
    logindate: {
        type: Date,
        required: true,
    },
    nft: {
        awaiting: {
            type: Number,
            default: 0,
        },
        approved: {
            type: Number,   
            default: 0,
        },
        listed: {
            type: Number, 
            default: 0,
        },
    },
    bid: {
        active: {
            type: Number,
            default: 0,
        },
        accepted: {
            type: Number,
            default: 0,
        },
    },
    roi: {
        type: Number,
        default: 0,
    },
    coltwallet: {
        type: String,
    },
    colttoken: {
        type: Number,
        default: 0,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpires: {
        type: Date,
    },
});

module.exports = User = mongoose.model('user', UserSchema);