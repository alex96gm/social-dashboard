const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controler');
const passport = require('passport');
const authMiddleware = require('../middlewares/auth.middleware');


router.get('/', authMiddleware.userNotAuthenticated, loginController.render);
router.get('/logout', loginController.delete);

router.post('/spotify', authMiddleware.userNotAuthenticated, passport.authenticate('spotify-auth', {scope: [
    'user-read-email', 
    'user-read-private',
    'user-read-recently-played',
    'user-top-read'
] }),);
router.get('/:provider/cb', authMiddleware.userNotAuthenticated, loginController.createWithIDPCallback);


module.exports = router;
