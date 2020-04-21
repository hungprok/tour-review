const mongoose = require('mongoose');
const Genre = require('./genre');
const Author = require('./author')

const bookSchema = mongoose.Schema({
    author: Object,
    genre: Array,
    title: {
        type: String,
        required: [true, "Title is required."],
        trim: true
    }

})

bookSchema.pre('save', async function (next) {
    this.author = await Author.findById(this.author);
    const genreArray = this.genre.map(async el => await Genre.findById(el))
    this.genre = await Promise.all(genreArray);
    next();
});

const Book = mongoose.model('Book', bookSchema);


module.exports = Book;

// const authorId = await Author.findById(author);
// const genreArray = genre.map(async el => await Genre.findById(el))
// const genreResult = await Promise.all(genreArray)
