const mongoose = require('mongoose');
const Stats = require('./stats.model');

const userSchema = new mongoose.Schema({
    topArtists: [
        {
            artistName: String,
            artistId: String,
            artistFollowers: String,
            artistUrl: String,
            artistUri: String,
            artistPopularity: String,
            artistGenres: [
                { type: String }
            ],
            artistImages: []
        }
    ],
}, { timestamps: true });

module.exports = Stats.discriminator('TopArtist', userSchema);