const mongoose = require('mongoose');

module.exports = mongoose.model('Stores', new mongoose.Schema({
    id: String,
    name : String,
    list: Array
}));