const router = require('express').Router();
const Movie = require('../models/movie.model');
const Genre = require('../models/genre.model');
const auth = require('../middleware/auth');
const { admin } = require('../middleware/role');
const { movieValidation } = require('../validation');
const { validMovie, valId } = require('../middleware/validation');

router.get('/page/:page',  async(req, res) => {
    const page = req.params.page;
    
    if(isNaN(page) || page <= 0)
        return res.status(400).send({ success: false, error: "Page not found" });

    const limit = 24;
    const skip = limit * (page - 1);

    try {
        let movies = await Movie.find().populate('genre', 'name').sort({create_date: -1}).limit(limit).skip(skip);

        if(!movies || movies.length == 0) 
            return res.status(404).send({ success: false, error: "Movie not found" });
        
        res.send(movies);
    }
    catch(error) {
        res.status(500).send({ success: false, error: error.message });
    }

});

router.get('/id/:id', valId, async (req, res) => {

    try {
        const movie = await Movie.findById(id).populate('genre', 'name').exec();
        if(!movie) 
            return res.status(404).send({ success: false, error: "Movie not found" });
        
        res.send({ success: true, movie });
    }
    catch (error) {
         res.status(500).send({ success: false, error: error.message });
    }
});

router.delete('/id/:id', [auth, admin, valId, validMovie], async (req, res) => { 

    try {
        const exist = await Movie.findOneAndDelete({ _id: id });
        
        if(!exist) 
            return res.status(404).send({ success: false, error: "Movie not found" });
        
        res.send({ success: true });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

router.put('/id/:id', [auth, admin, valId, validMovie], async (req, res) => {

    try {
        const exist = await Movie.findOneAndUpdate({ _id: id }, { ...req.body });
        
        if(!exist) 
            return res.status(404).send({ success: false, error: "Movie not found" });

        res.send({ success: true });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }

});

router.post('/', [auth, admin], async (req, res) => {

    try {
        const movie = new Movie({ ...req.body });
        const saved = await movie.save()

        res.send({ success: true, movie: saved });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

module.exports = router;