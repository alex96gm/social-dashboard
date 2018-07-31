const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artists.controler');
const authMiddleware = require('../middlewares/auth.middleware');

// router.get('/', authMiddleware.isAuthenticated, artistsController.render);
router.get('/', authMiddleware.isAuthenticated, artistsController.getTopArtistsAndRender);
router.get('/stats', authMiddleware.isAuthenticated, artistsController.statsAndRender);
router.get('/global', authMiddleware.isAuthenticated, artistsController.globalAndRender);

module.exports = router;