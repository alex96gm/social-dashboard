const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_AUTH_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_AUTH_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_AUTH_CB || '/login/spotify/cb'
});

spotifyApi.getData = (accessToken, refreshToken) => {
    spotifyApi.setAccessToken(accessToken);
    return Promise.all([
        spotifyApi.getMyTopArtists({ time_range: 'short_term',limit: 50}),
        spotifyApi.getMyTopTracks()
    ])
        .then(results => {
            const artist = results[0].body.items;
            const songs = results[1].body.items;
            return [artist, songs]
        });
}


module.exports = spotifyApi;