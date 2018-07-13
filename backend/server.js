require('dotenv').config()
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
require('./src/auth/passport')
const path = require('path')
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT

const swaggerDefinition = {
    info: {
        title: "GAME ARENA"
    },
    host: "",
    basePath: "/",
}

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./src/routes/*.js", "routes.js"],// pass all in array
}

const swaggerSpec = swaggerJSDoc(options)
app.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, "public")))
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

module.exports = app