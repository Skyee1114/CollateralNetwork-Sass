const mongoose = require('mongoose');

const MarketplaceSchema = new mongoose.Schema({
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
    metadata: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,   
            required: true,    
        },
        animation_url: {
            type: String,
            required: true,   
        },
        attributes: [{
            trait_type: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            }
        }],
    },
    estimatedassetvalue: {
        type: String,
        required: true,
    },
    loanamount: {
        type: String,
        required: true,
    },
    loantermmonth: {
        type: String,
        required: true,
    },
    loanrate: {
        type: String,
        required: true,
    },
    bids: [{
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        bidamount: {
            type: Number,
            required: true,
        },
        bidrate: {
            type: Number,
            required: true,
        },
        bidtermmonth: {
            type: Number,
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
    }],
    sold: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = Marketplace = mongoose.model('marketplace', MarketplaceSchema);