require('dotenv').config()
const express = require('express');
const passport = require('passport');
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);


app.listen(port, () => {
    console.log('Server started on port ', port);
});