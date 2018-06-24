require('dotenv').config()
const express = require('express');
const passport = require('passport');
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
require('./src/auth/passport')
const port = 3001;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
});
app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);


app.listen(port, () => {
    console.log('Server started on port ', port);
});