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


module.exports = spotifyApi;