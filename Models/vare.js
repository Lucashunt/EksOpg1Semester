const mongoose = require('mongoose');
const Vare = mongoose.Vare;

const userProfile = new Vare({
    name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }

}, {timestamps: true});

const Profile = mongoose.model('Profile', userProfile)

//module.exports = Profile;