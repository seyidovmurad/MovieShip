const Genre = require('../models/genre.model');

exports.getAll = async (req, res) => {
    try {
        const genres = await Genre.find().sort("name");

        if(!genres || genres.length == 0) 
            return res.status(404).send({ message: "Genre not found" });
    
        res.send(genres);
    }
    catch(error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const genre = await Genre.findOne({_id: id})

        if(!genre || genre.length == 0) 
            return res.status(404).send({ success: false, error: "Genre not found" });
    
        res.send(genre);
    }
    catch(error) {
        res.status(500).send({ success: false, error: error.message });
    }
}

exports.addGenre = async (req, res) => {
    const name = req.body.name.trim().capitalize();
    try {
        const foundGenre = await Genre.findOne({name});
        if(foundGenre)
            return res.status(400).send({ message: "Genre already exist" });
        const genre = new Genre({ name });
        const saved = await genre.save();

        res.send({ genre: saved });
    }
    catch(error) {
        res.status(500).send({ error: error.message });
    }
}

exports.updateById = async (req, res) => {
    const name = req.body.name.trim().capitalize();
    const id = req.params.id;

    try {
        const exist = await Genre.findOneAndUpdate({ _id: id }, { name });
        
        if(!exist) 
            return res.status(404).send({ success: false, error: "Genre not found" });

        res.send({ success: true, genre: exist });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}

exports.deleteById = async (req, res) => { 
    const id = req.params.id;
    try {
        const exist = await Genre.findOneAndDelete({ _id: id });
        
        if(!exist) 
            return res.status(404).send({ message: "Genre not found" });
        
        res.send({ message: "Successfull delete" });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}