const TopArtists = require('../models/top.artists');

// module.exports.render = (req, res, next) => {
//     res.render('artists');
// }

module.exports.getTopArtistsAndRender = (req, res, next) => {
    let id = req.user._id;
    TopArtists.find({ userId: id }) //ultimo documento 
        .then((artists) => {
            let lastArtits = artists[(artists.length) - 1]

            //console.log(artists.topArtists[0].artistImages[0].url);

            let objectTopArtits = {
                artists: lastArtits.topArtists
            }

            res.render('artists', objectTopArtits);

        })
        .catch(error => next(error))

}

module.exports.statsAndRender = (req, res, next) => {
    // data object to give to the Frontend
    res.render('artists-stats', {});
}

module.exports.globalAndRender = (req, res, next) => {
    res.render('artists-global');
}





