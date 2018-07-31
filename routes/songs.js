const express = require('express');
const router = express.Router();
const songsContoller = require('../controllers/songs.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// router.get('/', authMiddleware.isAuthenticated, songsContoller.render);
router.get('/', authMiddleware.isAuthenticated, songsContoller.getTopArtistsAndRender);
router.get('/stats', authMiddleware.isAuthenticated, songsContoller.statsAndRender);
router.get('/global', authMiddleware.isAuthenticated, songsContoller.globalAndRender);

module.exports = router;