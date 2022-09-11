const mongoose = require('mongoose');

const CommnetSchema = new mongoose.Schema({
    text: String,
    like: Number,
    dislike: Number,
    movie: String,
    user: String,
    reply: String
});

const Commnet = new mongoose.model('Commnet', CommnetSchema);

module.exports = Commnet