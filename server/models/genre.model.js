const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Genre name field required",
        unique: true
    }
});

const Genre = new mongoose.model('Genre', GenreSchema);

module.exports = Genre;