const express = require('express');
require('dotenv').config();
const db = require('./configs/mongoose');
const layout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 8000

const app = express();

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

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.log(`error in starting server ${err}`);
        db.close();
        return;
    }

    console.log(`server is up add runnig at ${PORT}`);
})