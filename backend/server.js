require('dotenv').config()
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
require('./src/auth/passport')
const port = process.env.PORT

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
});
app.use(fileUpload());
app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/user', require('./src/routes/user'));
app.use('/admin', require('./src/routes/admin'));
app.use('/', require('./src/routes/other'));

app.listen(port, () => {
    console.log('Server started on port ', port);
});