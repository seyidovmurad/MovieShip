require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');

require('./helpers/capitalize')

const app = express();

const genreRoutes = require('./routes/genre');
const authRoutes = require('./routes/auth');
const refreshRoutes = require('./routes/refresh');
const movieRoutes = require('./routes/movie');

app.use(credentials);
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/refresh', refreshRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/movie', movieRoutes);


mongoose.connect(process.env.CON_STRING, () => {
    console.log("Successful db connection");
});


app.listen(5000, () => {
    console.log("App listening port 5000");
});