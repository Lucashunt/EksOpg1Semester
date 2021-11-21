const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Varer = mongoose.model('Varer', blogSchema)

module.exports = Varer;

//module.exports = Profile;