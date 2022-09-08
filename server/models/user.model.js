const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: "Name cannot be empty",
        trim: true
    },
    username: {
        type: String,
        required: "Username cannot be empty",
        unique: true
    },
    email: {
        type: String,
        required: "Email cannot be empty",
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: "Password cannot be empty"
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    create_date: {
        type: Date,
        default: Date.now()
    }
});

const User = new mongoose.model('User', UserSchema);

module.exports = User;
