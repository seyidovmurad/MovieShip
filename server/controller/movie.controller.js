const Movie = require('../models/movie.model');
const Genre = require('../models/genre.model');
const { formatMovie } = require('../helpers/format-params');


exports.getAll = async(req, res) => {
    

    try {
        let movies = await Movie.find().select("name year duration country cover_link genre").populate('genre', 'name').sort({create_date: -1});

        if(!movies || movies.length == 0) 
            return res.status(404).send({ message: "Movie not found" });
        
    
        res.send(movies); 
    }
    catch(error) {
        res.status(500).send({ message: error.message });
    }

}

exports.getAllByPage = async(req, res) => {
    const page = req.params.page;
    
    if(isNaN(page) || page <= 0)
        return res.status(400).send({ message: "Page not found" });

    const limit = 24;
    const skip = limit * (page - 1);

    try {
        //let movies = await Movie.find().populate('genre', 'name').sort({create_date: -1}).limit(limit).skip(skip);
        let movies = await Movie.find().select("name year duration cover_link source_link").sort({create_date: -1}).limit(limit).skip(skip);
        if(!movies || movies.length == 0) 
            return res.status(404).send({ message: "Movie not found" });
        
        let count = await Movie.find().count();

        const totalPage = Math.ceil(count / limit)
        res.send({ movies, totalPage });
    }
    catch(error) {
        res.status(500).send({ message: error.message });
    }

}


exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findById(id).populate('genre', 'name').exec();
        if(!movie) 
            return res.status(404).send({ message: "Movie not found" });
        
        res.send(movie);
    }
    catch (error) {
         res.status(500).send({ message: error.message, test: "bu nede" });
    }
}

exports.deleteById = async (req, res) => { 
    const id = req.params.id;
    console.log(id);
    try {
        const exist = await Movie.findOneAndDelete({ _id: id });
        
        if(!exist) 
            return res.status(404).send({ message: "Movie not found" });
        
        res.send({ message: "Successful delete" });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.updateById = async (req, res) => {

    try {
        const movie = formatMovie(req.body);

        const exist = await Movie.findOneAndUpdate({ _id: id }, movie);
        
        if(!exist) 
            return res.status(404).send({ message: "Movie not found" });

        res.send({ movie: exist });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }

}

exports.addMovie = async (req, res) => {

    try {
        let genres = [];

        for (const g of req.body.genre) {
            const genre = await Genre.findById(g.id)
            genres.push(genre);
        }
        
        const movie =  formatMovie(req.body);
        movie.genre = genres;
        const saved = await movie.save()

        res.send({ movie: saved });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}