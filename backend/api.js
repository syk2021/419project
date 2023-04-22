var express = require('express');
var router = express.Router();
const UserModel = require('./models/user.js')
const PostModel = require('./models/post.js')
const CommentModel = require('./models/comment.js')
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
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        affiliation: req.body.affiliation
    });
    
    return res.status(200).json(user);
});

// LOGIN request
// await axios.post("http://localhost:4000/api/login")
router.post('/login', async (req, res) => {
    console.log("login gets here");
    const check_username_exists = await UserModel.findOne({ username: req.body.username }).exec();
    if (!check_username_exists) {
        return res.status(501).json(check_username_exists);
    }
    
    // find the user with the entered username and password
    const found_user = await UserModel.findOne({ username: req.body.username, password: req.body.password}).exec();
    console.log(found_user);
    // username or password does not match
    if (!found_user) {
        console.log("username or password does not match!");
        return res.status(500).json(found_user);
    }
    
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

// used in SettingsScreen
// await axios.post('http://localhost:4000/api/finduser')
router.post('/finduser', async (req, res) => {
    const found_user = await UserModel.findOne({ username: req.body.username }).exec();
    return res.status(200).json(found_user);
})

// used in PostScreen
// await axios.post('http://localhost:4000/api/newpost')
router.post('/newpost', async (req, res) => {
    console.log("new post page!");
    console.log(req.body);
    
    const post = await PostModel.create({
        title: req.body.title,
        content: req.body.content,
        username: req.body.username,
        rentRange: req.body.rentRange,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    return res.status(200).json(post);
    
})

// fetch all posts in the Posts model
// await axios.post('http://localhost:4000/api/allposts')
router.post('/allposts', async (req, res) => {
    console.log("fetch all posts");
    // fetch all the posts
    const posts = await PostModel.find({}).sort({ rentRange: -1}).exec();
    return res.status(200).json(posts);
})

// fetch posts with filtered results
router.post('/filteredposts', async (req, res) => {
    console.log("filtered posts");
    const posts = await PostModel.find({
        startDate: {
            $lte: req.body.searchStartDate
        },
        endDate: {
            $gte: req.body.searchEndDate
        },
        rentRange: {
            $lte: req.body.searchRentRange
        }
    }).sort({ rentRange: -1}).exec();
    return res.status(200).json(posts);
})


// post comments
// await axios.post('https://localhost:4000/api/postcomment')
router.post('/postcomment', async (req, res) => {
    console.log("post a comment");
    const comment = await CommentModel.create({
        username: req.body.username,
        text: req.body.text,
        postId: req.body.postId
    });
    return res.status(200).json(comment);
})

// get all comments for that post
router.post('/allcomments', async (req, res) => {
    console.log("get all comments");
    const comments = await CommentModel.find({ postId: req.body.postId }).exec();
    return res.status(200).json(comments);
});

// delete a post
router.post('/deletepost', async (req, res) => {
    console.log("deleting posts");
    const result = await PostModel.findByIdAndDelete(req.body._id).exec();
    return res.status(200).json(result);
})

// delete a comment
router.post('/deletecomment', async (req, res) => {
    console.log("deleting a comment");
    const result = await CommentModel.findByIdAndDelete(req.body._id).exec();
    return res.status(200).json(result);
})

// delete account
router.post('/deleteaccount', async (req, res) => {
    const result = await UserModel.findOneAndDelete({username: req.body.username}).exec();
    return res.status(200).json(result);
})


module.exports = router;