const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artists.controler');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.isAuthenticated, artistsController.render);
router.post('/', artistsController.getTopArtistsAndRender);

module.exports = router;