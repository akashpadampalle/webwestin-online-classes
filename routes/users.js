const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user-controller');


router.post('/register', userController.create)
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), userController.login);

module.exports = router;