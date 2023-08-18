const express = require('express');
require('dotenv').config();
const db = require('./configs/mongoose');
const layout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

//session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./configs/passport-local-strategy');
const MongoStore = require('connect-mongo');

const PORT = process.env.PORT || 8000

const app = express();

app.use(express.static('./assets'))

// cookies and encoding
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting up ejs
app.use(layout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store session cookie in db
app.use(session({
    name: 'webwestin',
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100) 
    }, 
   
    // NEW WAY TO CONNECT MONGO-STORE
    store: MongoStore.create({
        client: db.getClient(),
        collectionName: 'sessions',
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.log(`error in starting server ${err}`);
        db.close();
        return;
    }

    console.log(`server is up add runnig at ${PORT}`);
})