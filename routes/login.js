const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controler');

router.get('/', loginController.render);

module.exports = router;
