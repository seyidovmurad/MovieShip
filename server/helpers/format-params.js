const Movie = require("../models/movie.model");
const User = require("../models/user.model");



exports.formatMovie = (data) => {
    const movie = new Movie({
        name: data.name.trim().capitalize(),
        year: data.year,
        duration: data.duration,
        country: data.country.trim().capitalize(),
        description: data.description.trim(),
        cover_link: data.cover_link.trim(),
        source_link: data.source_link.trim(),
        imdb_link: data.imdb_link.trim(),
        trailer_link: data.trailer_link.trim(),
        genre: data.genre
    });

    return movie;
}

exports.formatUser = (data) => {
    const user = new User({
        fullname: data.fullname.trim(),
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password
    })
}