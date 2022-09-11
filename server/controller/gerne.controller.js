const Genre = require('../models/genre.model');

exports.getAll = async (req, res) => {
    try {
        const genres = await Genre.find().sort("name");

        if(!genres || genres.length == 0) 
            return res.status(404).send({ success: false, error: "Genre not found" });
    
        res.send({ success: true, genres });
    }
    catch(error) {
        res.status(500).send({ success: false, error: error.message });
    }
}

exports.addGenre = async (req, res) => {
    const name = req.body.name.trim().capitalize();
    try {
        const genre = new Genre({ name });
        const saved = await genre.save();

        res.send({ success: true, genre: saved });
    }
    catch(error) {
        res.send({ success: false, error: error.message });
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
            return res.status(404).send({ success: false, error: "Genre not found" });
        
        res.send({ success: true, message: "Successfull delete" });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}