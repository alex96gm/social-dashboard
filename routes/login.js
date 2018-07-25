const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controler');
const passport = require('passport');


router.get('/', loginController.render);

router.post('/spotify', passport.authenticate('spotify-auth', {scope: ['user-read-email', 'user-read-private'] }),);
router.get('/:provider/cb', loginController.createWithIDPCallback);


module.exports = router;
