const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank'
    },
    year: Number,
    duration: Number,
    imdb_rating: Number,
    country: String,
    description: String,
    cover_link: String,
    source_link: String,
    imdb_link: String,
    trailer_link: String,
    create_date: {
        type: Date,
        default: Date.now
    },
    genre: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Genre'
    }],
    actor: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
})



const Movie = new mongoose.model("Movie", MovieSchema);

module.exports = Movie;