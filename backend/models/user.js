const mongoose = require('mongoose')
const Schema = mongoose.Schema

// email validation
var validateEmail = function(email) {
    // regular expression for email validation
    var re = /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

var UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    // emailAddress
    emailAddress: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    // undergrad + grad
    affiliation: {
        type: String
    },
})

// User.plugin(passportLocalMongoose);

// this will make modelName: 'User'
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;