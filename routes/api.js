const express = require('express');
const router = express.Router();
const statsController = require('../controllers/api/stats.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/stats/top-artist-genres', authMiddleware.isAuthenticated, statsController.getTopArtistData);
router.get('/stats/top-songs', authMiddleware.isAuthenticated, statsController.getTopSongsData);
router.get('/stats/global-songs-albumes', authMiddleware.isAuthenticated, statsController.getGlobalSongsData);
router.get('/stats/global-songs-artists', authMiddleware.isAuthenticated, statsController.getGlobalSongsDataArtists);
router.get('/stats/global-artists-genres', authMiddleware.isAuthenticated, statsController.getGlobalArtistsDataGenres);

module.exports = router;