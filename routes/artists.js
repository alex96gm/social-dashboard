const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artists.controler');


router.get('/', artistsController.render);
// router.post('/', artistsController.getTopArtists);

module.exports = router;