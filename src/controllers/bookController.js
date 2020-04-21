const Book = require('../models/book');


exports.createBook = async (req, res) => {
    const { title, genre, author } = req.body;

    // const authorId = await Author.findById(author);
    // const genreArray = genre.map(async el => await Genre.findById(el))
    // const genreResult = await Promise.all(genreArray)


    const book = new Book ({
        author: author,
        genre: genre,
        title: title
    })
    await book.save();
    return res.status(200).json({ status: "ok", data: book })
};



exports.readBook = async (req, res) => {
    const book = await Book.find();
    return res.status(200).json({ status: "ok", data: book })
}