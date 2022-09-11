const Genre = require("../models/genre.model");
const Movie = require("../models/movie.model");
const Joi = require('Joi');

module.exports.getMovies = async() => {
    const url = `https://imdb-api.com/en/API/MostPopularMovies/${process.env.IMDB_API}`;
    const res = await fetch(url);
    const json = await res.json();

    jsonToMovieId(json);
}

const jsonToMovieId = async(json) => {
    let movieId = [];
    if(!json) return 0;
    json.items.forEach(movie => {
        movieId.push(movie.id);
        
    });

    movieId.forEach( async(id) => {
        await fetchMovieById(id);
    });
}

const fetchMovieById = async(id) => {
    const url = `https://imdb-api.com/en/API/Title/${process.env.IMDB_API}/${id}/Trailer`;
    const res = await fetch(url);
    const json = await res.json();

    const imdb_link = `https://www.imdb.com/title/${id}/`;
    const source_link = `https://www.2embed.to/embed/imdb/movie?id=${id}`;

    let genres = [];

    if(!json.genreList) return 
    for (const value of json.genreList) {
        const name = value["value"];
        try {
            const exist = await Genre.findOne({name});
            if(!exist){
                const genre = new Genre({name});
                await genre.save()
                genres.push(genre);
            }
            else genres.push(exist);
        }catch (error) {
            console.log(error.message);
        }
    }
    
    const data = {
        name: json.title,
        year: json.year,
        duration: json.runtimeMins,
        imdb_rating: json.imDbRating,
        country: json.countries,
        description: json.plot,
        cover_link: json.image,
        source_link,
        imdb_link,
        trailer_link: json.trailer.linkEmbed,
        genre: genres
    }
    
    if(isValid(data)) {
        const movie = new Movie(data);
        await movie.save();
    }


} 

function isValid(data) {
    const schema = new Joi.object({
        name: Joi.string().min(2).required(),
        year: Joi.number().min(1950).max(new Date().getFullYear()).required(),
        duration: Joi.number().min(1),
        imdb_rating: Joi.number(),
        country: Joi.string(),
        description: Joi.string().min(10),
        cover_link: Joi.string(),
        source_link: Joi.string().required(),
        imdb_link: Joi.string(),
        trailer_link: Joi.string(),
        genre: Joi.array()
    });

    const {error} = schema.validate(data);
    return error == null;
}