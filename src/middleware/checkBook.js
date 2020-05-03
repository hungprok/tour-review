const Book = require('../models/book');

exports.checkBook = async function (req, res, next) {
    const { bookId } = req.body;
    console.log(req.body);
    try {
        const book = await Book.findById(bookId);
        if (!book) { return res.status(404).json({ status: "fail", message: 'there is no such book' }); }
        req.bookId = bookId;
        req.bookname = book.title;
        next();
    }
    catch (err) {
        return res.status(404).json({ status: "fail", message: err.message })
    }
};