const express = require('express');
const router = express.Router();
const songsContoller = require('../controllers/songs.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// router.get('/', authMiddleware.isAuthenticated, songsContoller.render);
router.get('/', authMiddleware.isAuthenticated, songsContoller.getTopArtistsAndRender);

module.exports = router;