const express = require('express');
const router = express.Router();
const statsController = require('../controllers/api/stats.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/stats/top-artist-genres', authMiddleware.isAuthenticated, statsController.getTopArtistData);


module.exports = router;