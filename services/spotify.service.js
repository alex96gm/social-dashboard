const SpotifyWebApi = require("spotify-web-api-node");
const OPTIONS_TOP_ARTISTS_SONGS ={
    time_range: 'short_term',
    limit: 50
}


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_AUTH_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_AUTH_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_AUTH_CB || '/login/spotify/cb'
});

spotifyApi.getData = (accessToken, refreshToken) => {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
    return Promise.all([
        spotifyApi.getMyTopArtists(OPTIONS_TOP_ARTISTS_SONGS),
        spotifyApi.getMyTopTracks(OPTIONS_TOP_ARTISTS_SONGS)
    ])
        .then(results => {
            const artist = results[0].body.items;
            const songs = results[1].body.items;
            return [artist, songs]
        });
}


spotifyApi.getRecomendationsAndReleases = (accessToken, refreshToken, arrayOfArtistsSeed) => {
    setAccesRefreshToken(accessToken,refreshToken);
    return spotifyApi.getNewReleases({limit:10})
    .then((releases)=>{
        return spotifyApi.getRecommendations({limit:10, seed_artists: arrayOfArtistsSeed})
            .then((recomendations)=>{
                return {recomendations: recomendations.body.tracks, releases: releases.body.albums.items};
            }).catch((err)=>{
                return {recomendations: null, releases:releases.body.albums.items};
            })
    }).catch(err =>console.log(err));
}

function setAccesRefreshToken(accessToken, refreshToken){
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
}

module.exports = spotifyApi;