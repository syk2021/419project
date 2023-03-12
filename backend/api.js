var express = require('express');
var router = express.Router();
const UserModel = require('./models/user.js')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')

// create application/x-www-form-urlencoded parser
// not used yet but keeping for use in the future
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Subroute: localhost:8082/api/
router.get('/', (req, res) => {
    res.send("GET route on things.");
});

router.post('/', (req, res) => {
    res.send("POST route on things.");
});

// await axios.post('http://localhost:4000/api/register')
// this will be moved elsewhere in later code
// need async to execute await UserModel stuff inside
router.post('/register', async (req, res) => {
    console.log("register gets here")
    console.log(req.body);

     // check if username already exists
     const found_user = await UserModel.findOne({ username: req.body.username}).exec();
     if (found_user) {
        // display error message
        console.log("Username already exists.");
        return res.status(500).json(found_user);
     }

    // create user in mongoose model by passing in username, password
    const user = await UserModel.create({
        username: req.body.username,
        password: req.body.password
    });
    
    return res.status(200).json(user);
});

// LOGIN request
// await axios.post("http://localhost:4000/api/login")
router.post('/login', async (req, res) => {
    console.log("login gets here");

    // find the user with the entered username and password
    const found_user = await UserModel.findOne({ username: req.body.username, password: req.body.password}).exec();
    console.log(found_user);
    // username or password does not match
    if (!found_user) {
        console.log("username or password does not match!");
        return res.status(400).json(found_user);
    }
    
    // else, found user with right username + pw => create session for user
    var token = jwt.sign({ username: found_user.username}, "secret", {
        expiresIn: 86400 // 24 hours
    });

    req.session.token = token;
    
    console.log(found_user);

    return res.status(200).json(found_user);

})

// LOGOUT request
router.post('/logout', async (req, res) => {
    console.log("logout gets here");
    
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been logged out!"});
    } catch (err) {
        this.next(err);
    }

})

module.exports = router;