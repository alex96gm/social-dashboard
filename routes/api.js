const express = require('express');
const router = express.Router();
const statsController = require('../controllers/api/stats.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/stats/top-artist-genres', authMiddleware.isAuthenticated, statsController.getTopArtistData);
router.get('/stats/top-songs', authMiddleware.isAuthenticated, statsController.getTopSongsData);



module.exports = router;