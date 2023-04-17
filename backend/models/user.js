const mongoose = require('mongoose')
const Schema = mongoose.Schema

// email validation
var validateEmail = function(email) {
    // regular expression for email validation
    var re = /^[a-z0-9]+[.]?[a-z0-9]+@yale\.edu$/;
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

// this will make modelName: 'User'
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;