const Movie = require('../models/movie.model');
const Genre = require('../models/genre.model');
const { formatMovie } = require('../helpers/format-params');


exports.getAll = async(req, res) => {
    const page = req.params.page;
    
    if(isNaN(page) || page <= 0)
        return res.status(400).send({ success: false, error: "Page not found" });

    const limit = 10//24;
    const skip = limit * (page - 1);

    try {
        //let movies = await Movie.find().populate('genre', 'name').sort({create_date: -1}).limit(limit).skip(skip);
        let movies = await Movie.find().select("name year imdb_rating cover_link genre").populate('genre', 'name').sort({create_date: -1}).limit(limit).skip(skip);

        if(!movies || movies.length == 0) 
            return res.status(404).send({ success: false, error: "Movie not found" });
        
        res.send({ success: true, movies });
    }
    catch(error) {
        res.status(500).send({ success: false, error: error.message });
    }

}


exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findById(id).populate('genre', 'name').exec();
        if(!movie) 
            return res.status(404).send({ success: false, error: "Movie not found" });
        
        res.send({ success: true, movie });
    }
    catch (error) {
         res.status(500).send({ success: false, error: error.message, test: "bu nede" });
    }
}

exports.deleteById = async (req, res) => { 
    const id = req.params.id;
    try {
        const exist = await Movie.findOneAndDelete({ _id: id });
        
        if(!exist) 
            return res.status(404).send({ success: false, error: "Movie not found" });
        
        res.send({ success: true, message: "Successful delete" });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}

exports.updateById = async (req, res) => {

    try {
        const movie = formatMovie(req.body);

        const exist = await Movie.findOneAndUpdate({ _id: id }, movie);
        
        if(!exist) 
            return res.status(404).send({ success: false, error: "Movie not found" });

        res.send({ success: true, movie: exist });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }

}

exports.addMovie = async (req, res) => {

    try {
        const movie =  formatMovie(req.body);

        const saved = await movie.save()

        res.send({ success: true, movie: saved });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}