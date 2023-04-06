const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const passportLocalMongoose = require('passport-local-mongoose')
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
    // undergrad + grad
    affiliation: {
        type: String
    },
    // phone number: string with dashes
    phoneNumber: {
        type: String
    }
})

// User.plugin(passportLocalMongoose);

// this will make modelName: 'User'
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;