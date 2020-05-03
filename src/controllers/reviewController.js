const Review = require('../models/review');
const Book = require('../models/book');

exports.createReview = async function (req, res) {
    const { content } = req.body;
    try {
        const review = await Review.create({
            content: content,
            user: req.user._id,
            bookId: req.bookId,
            bookname: req.bookname,
            username: req.user.name
        })
        return res.status(200).json({ status: "ok", data: review });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", error: err.message });
    }
};

exports.readReview = async function (req, res) {
    const { bookId } = req.body;
    try {

        const book = await Book.findById(req.body.bookId).populate('reviews', '-user -__v -createdAt -updatedAt');

        // const abc = book.reviews.map(item => {
        //     Object.defineProperty(item, 'bookId', { configurable: true });
        //     console.log(item);
        //     // delete item.bookId;
        // })
        // console.log(abc);

        return res.status(200).json({ status: "ok", data: book });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", error: err.message });
    }
}; 