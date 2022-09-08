const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/movie.model');
const Genre = require('./models/genre.model');
require('dotenv').config();

const app = express();

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded());

app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);


mongoose.connect(process.env.CON_STRING, () => {
    console.log("Successful db connection");
});



app.listen(5000, () => {
    console.log("App listening port 5000");
});