const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be empty",
        trim: true
    },
    image_link: {
        type: String,
        default: "Default photo",
        trim: true
    }
});

const Actor = new mongoose.model('Actor', ActorSchema);

module.export = Actor;