const mongoose = require('mongoose');

module.exports = mongoose.model('Stores', new mongoose.Schema({
    name : String,
    password: String,
    position: Array
}));