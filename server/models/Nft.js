const mongoose = require('mongoose');

const NftSchema = new mongoose.Schema({
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
    collectionname: {
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
    stage: {
        type: Number,
        required: true,
    },
    amend: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = Nft = mongoose.model('nft', NftSchema);