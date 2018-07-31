const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// router.get('/', authMiddleware.isAuthenticated, homeController.render);
router.get('/', authMiddleware.isAuthenticated, homeController.postRender);

module.exports = router;