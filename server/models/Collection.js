const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    collectionname: {
        type: String,
    },
    marketplacelink: {
        type: String,
    },
    sociallink: {
        type: String,
    },
    assetlink: {
        type: String,
    },
    allowed: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = Collection = mongoose.model('collection', CollectionSchema);