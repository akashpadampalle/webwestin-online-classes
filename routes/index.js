const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home-controller');

router.all('/', homeController.homepage);

module.exports = router;