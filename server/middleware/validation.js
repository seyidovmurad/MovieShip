const Joi = require("Joi");

function validMovie(req, res, next) {
    
    const schema = new Joi.object({
        name: Joi.string().min(2).required(),
        year: Joi.number().min(1950).max(new Date().getFullYear()).required(),
        duration: Joi.number().min(1),
        country: Joi.array(),
        description: Joi.string().min(10),
        cover_link: Joi.string(),
        source_link: Joi.string().required(),
        imdb_link: Joi.string(),
        trailer_link: Joi.string(),
        genre: Joi.array()
    });

    const {error} = schema.validate(req.body);

    if(error) 
        return res.status(400).send({ success: false, error: error.details[0].message });

    next();

}

function valId(req, res, next) {
    const id = req.params.id;
    if ( !id.match(/^[0-9a-fA-F]{24}$/) ) 
        return res.status(400).send({success: false, error: "Wrong id type"});

    next();
}

function loginValidation(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(8).required()
    });

    const {error} = schema.validate(req.body);

    if(error) 
        return res.status(400).send({ success: false, error: error.details[0].message });

    next();
}

function registerValidation(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        fullname: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });

    const {error} = schema.validate(req.body);

    if(error) 
        return res.status(400).send({ success: false, error: error.details[0].message });

    next();
}

module.exports.validMovie =  validMovie;
module.exports.valId = valId;
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;