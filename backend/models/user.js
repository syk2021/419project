const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const passportLocalMongoose = require('passport-local-mongoose')
var UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

// User.plugin(passportLocalMongoose);

// this will make modelName: 'User'
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;