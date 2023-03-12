var mongoose = require('mongoose');
var express = require('express');
// var bodyParser = require('body-parser');
var app = express();
var api = require('./api.js')
var cors = require("cors");
var bodyParser = require('body-parser')
const cookieSession = require("cookie-session")
// create application/json parser
var jsonParser = bodyParser.json();

// cors uses middleware
app.use(cors());
app.use(jsonParser);
app.use(
    cookieSession({
        name: "project-session",
        secret: "eac29fd554401d7d6e82f22caf6e5fddb00e85719b0999d25520b7c14fffc73bf8b9aac43ea8f2cd6f599e696c187657b5dcdf28dbaf45c71d8d90c2719a827f",
        httpOnly: true
    })
);

// use api routes
app.use('/api', api);
// use post routes [not implemented yet]
// app.use('/posts', posts);

const { PORT } = process.env;
// this will go into process.env later
MONGO_URI="mongodb://localhost:27017"

// connect to MongoDB
mongoose.connect(MONGO_URI, { useNewURLParser: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch(e => {
    console.error(e);
});

// Run server on port 4000
const port = PORT || 4000;
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    console.log(`Server listening on port ${port}`);
});

