const mongoose = require('mongoose');
const Stats = require('./stats.model');

const topSongSchema = new mongoose.Schema({
    topSongs: [
        {
            songName: String,
            songId: String,
            songUrl: String,
            songPreviewUrl: String,
            songDuration: Number,
            songPopularity: String,
            songArtists: Array,
            songAlbum: {
                songAlbumId: String,
                songAlbumName: String,
                songAlbumUrl: String,
                songAlbumArtits: Array,
                songAlbumImges: Array,
            }
        }
    ],
}, { timestamps: true });

const TopSongs = Stats.discriminator('TopSongs', topSongSchema);
module.exports = TopSongs;