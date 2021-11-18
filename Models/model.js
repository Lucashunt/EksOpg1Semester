//https://www.youtube.com/watch?v=bxsemcrY4gQ
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Profile = mongoose.model('Profile', userSchema)

module.exports = Profile;