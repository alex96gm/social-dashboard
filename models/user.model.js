
const mongoose = require('mongoose');
const topArtistsSchema = new mongoose.Schema({

    email: {
        type: String,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    country: {
        type: String,
    },
    displayName: {
        type: String,
    },
    userUrl: {
        type: String,
    },
    followers: {
        type: String,
    },
    idSpotify: {
        type: String,
    },
    userName: {
        type: String,
    },
    images: {
        type: Array
    },
    product: {
        type: String
    },
    type: {
        type: String
    },
    uri: {
        type: String
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', topArtistsSchema);

