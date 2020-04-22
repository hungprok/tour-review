const Book = require('../models/book');

exports.createBook = async (req, res) => {
    const { title, genres, author } = req.body;

    // const authorId = await Author.findById(author);
    // const genreArray = genre.map(async el => await Genre.findById(el))
    // const genreResult = await Promise.all(genreArray)


    const book = new Book ({
        author: author,
        genre: genres,
        title: title,
        owner: {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email
        }
    })
    await book.save();
    return res.status(200).json({ status: "ok", data: book })
};



exports.readBook = async (req, res) => {

  try {
    const books = await Book.find({ "owner._id": req.user._id });
    res.json({ status: "success", data: books });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  };
};

exports.updateBook = async (req, res) => {

    try {
      const book = await Book.findById(req.body.id);
      const fields = Object.keys(req.body);

      // eliminate id field, actually, it's okay if u leave it there 'cause it's the same id
      const newFields = fields.filter(el => el !== 'id')
      newFields.map(field => book[field] = req.body[field]);
      await book.save();
      res.status(200).json({ status: "success", data: book });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    };
  };