const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    genre: {
        type: String,
        required: [true, "Genre name is required."],
        trim: true
    }
})

const Genre = mongoose.model('Genre', genreSchema);


module.exports = Genre;