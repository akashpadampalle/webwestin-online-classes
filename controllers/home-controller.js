

module.exports.homepage = function (req, res){
    res.render('home', {title: 'webwesting.in'});
}

module.exports.loginpage = function (req, res){
    res.render('login', {title: 'Login | Webwesting.in'})
}

module.exports.registerpage = function (req, res){
    res.render('register', {title: 'Register | Webwesting.in'})
}

module.exports.profile = function (req, res){
    res.render('profile');
}