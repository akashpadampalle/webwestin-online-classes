const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.create = async function (req, res) {
    try {

        const { name, course, email, password, cpassword } = req.body;

        if (password != cpassword) {
            return res.status(400).json({
                message: 'confirm password and passowrd doen\'t match'
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(401).json({
                message: 'User with same email is already exists'
            })
        }

        const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

        const newUser = await User.create({
            name,
            password: hash,
            email,
            course: [course]
        })

        return res.redirect('/login');

    } catch (error) {
        console.log(`error in creating user ${error}`);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }


}

module.exports.login = async function (req, res) {
    res.redirect('/profile');
}