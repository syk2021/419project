const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        type: String
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