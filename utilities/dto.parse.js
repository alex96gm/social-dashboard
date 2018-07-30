const TopArtist = require('../models/top.artists');
const TopSongs = require('../models/top.songs');
const mongoose = require('mongoose');

module.exports.userParser = (profile, accessToken, refreshToken) => {
    return new User({
        email: profile.emails[0].value,
        password: Math.random().toString(36).substring(7),
        idSpotify: profile.id,
        userName: profile.displayName,
        country: profile.country,
        userUrl: profile.profileUrl,
        followers: profile.followers.toString(),
        images: profile.photos,
        product: profile.product,
        type: profile._json.type,
        uri: profile._json.uri,
        accessToken: accessToken,
        refreshToken: refreshToken
    })
}

module.exports.topArtistParser = (arrayArtists, user) => {
    let artistArrayParse = arrayArtists.reduce((returnArtits , artist) => {
        returnArtits.push({
            artistName: artist.name,
            artistId: artist.id,
            artistFollowers: artist.followers.total.toString(),
            artistUrl: artist.external_urls.spotify,
            artistUri: artist.uri,
            artistPopularity: artist.popularity,
            artistGenres:artist.genres, 
            artistImages: artist.images
        })
        return returnArtits
    },[])

    return new TopArtist({
        userId: user._id,
        topArtists: artistArrayParse
    })
}

module.exports.topSongParser = (arraySongs, user) =>{
    let songsArrayParse = arraySongs.reduce((returnSongs , song) => {
        returnSongs.push(
            {
                songName: song.name,
                songId: song.id,
                songUrl: song.external_urls.spotify,
                songPreviewUrl: song.preview_url,
                songDuration: song.duration_ms,
                songPopularity: song.popularity,
                songArtists: song.artists,
                songAlbum: {
                    songAlbumId: song.album.id,
                    songAlbumName: song.album.name,
                    songAlbumUrl: song.album.external_urls.spotify,
                    songAlbumArtits: song.album.artists,
                    songAlbumImges: song.album.images,
                },
                songImages:song.images

            }
        );
        return returnSongs;
    },[]);

    return new TopSongs({
        userId: user._id,
        topSongs: songsArrayParse
    })
}