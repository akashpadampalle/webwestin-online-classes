const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home-controller');

router.all('/', homeController.homepage);
router.get('/login', homeController.loginpage);
router.get('/register', homeController.registerpage);
router.get('/profile', passport.checkAuthentication, homeController.profile);
router.use('/users', require('./users'));


module.exports = router;