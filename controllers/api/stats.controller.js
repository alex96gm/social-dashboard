const TopArtists = require('../../models/top.artists');
const TopSongs = require('../../models/top.songs');
const countItems =  require('../../utilities/count.items.array').countIntemArray;

module.exports.getTopArtistData = (req, res, next) => {
    TopArtists.find({ userId: req.user._id },{topArtists:1, _id:0}).sort({createdAt:-1}).limit(1)
        .then((artists) => {
            res.json(artists);
        })
        .catch(error => next(error));  
}

module.exports.getTopSongsData = (req, res, next) => {
    TopSongs.find({ userId: req.user._id },{topSongs:1, _id:0}).sort({createdAt:-1}).limit(1)
        .then((songs) => {
            res.json(songs);
        })
        .catch(error => next(error));  
}

module.exports.getGlobalSongsData = (req, res, next) => {
    var myDate = new Date();
    myDate.setHours(myDate.getHours() + 2);
    myDate.setMonth(myDate.getMonth() - 1);

    TopSongs.find({ userId: req.user._id , createdAt: {$gte: myDate}},{topSongs:1, _id:0}).sort({createdAt:-1})
        .then((songs) => {
            let arraySongsAlbums = [];
            songs.forEach(song => {
                song.topSongs.reduce((acc, item) => {
                    arraySongsAlbums = arraySongsAlbums.concat(item.songAlbum.songAlbumName); 
                }, []);
            });
        
            let albumListGlobal = countItems(arraySongsAlbums).sort((item1, item2) => {
                return item2.count - item1.count;
            }).slice(0,25)
            res.json(albumListGlobal);
        })
        .catch(error => next(error));  
}

module.exports.getGlobalSongsDataArtists = (req, res, next) => {
    var myDate = new Date();
    myDate.setHours(myDate.getHours() + 2);
    myDate.setMonth(myDate.getMonth() - 1);
    
    TopSongs.find({ userId: req.user._id , createdAt: {$gte: myDate}},{topSongs:1, _id:0}).sort({createdAt:-1})
        .then((songs) => {
 
            let arraySongsArtitsts = []; 
            songs.forEach(song => {
                song.topSongs.reduce((acc, item) => {
                    arraySongsArtitsts = arraySongsArtitsts.concat(item.songName); 
                }, []);
            });
            
            let songsList = countItems(arraySongsArtitsts).sort((item1, item2) => {
                return item2.count - item1.count;
            }).slice(0, 25);

            res.json(songsList);
        })
        .catch(error => next(error));  
}

module.exports.getGlobalArtistsDataGenres = (req, res, next) => {
    var myDate = new Date();
    myDate.setHours(myDate.getHours() + 2);
    myDate.setMonth(myDate.getMonth() - 1);
    
    TopArtists.find({ userId: req.user._id , createdAt: {$gte: myDate}},{topArtists:1, _id:0}).sort({createdAt:-1})
        .then((artists) => {
 
            let arrayArtitstsGenres = []; 
            artists.forEach(artist => {
                artist.topArtists.reduce((acc, item) => {
                    arrayArtitstsGenres = arrayArtitstsGenres.concat(item.artistGenres); 
                }, []);
            });
            
            let arrayArtitstsList= countItems(arrayArtitstsGenres).sort((item1, item2) => {
                return item2.count - item1.count;
            }).slice(0, 25);
            
             res.json(arrayArtitstsList);
        })
        .catch(error => next(error));  
}