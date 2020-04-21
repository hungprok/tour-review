const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Author = require('./src/models/author.js');
const {createAuthor, updateAuthor, deleteAuthor, readAuthor} = require('./src/controllers/authorController');
const {createGenre, updateGenre, deleteGenre, readGenre} = require('./src/controllers/genreController');
const {createBook, readBook, updateBook} = require('./src/controllers/bookController')


mongoose.connect(process.env.DB_LOCAL, {
    useCreateIndex: true,
    useNewURLParser: true,
    useFindandModify: false,
    useUnifiedTopology: true
}).then(() => console.log("Connected to database")).catch((err) => console.log(err));

const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(router);


router.get('/', (req, res) => {
    res.status(200).json({ status: "ok", data: [] })
})

router.route('/authors')
.post(createAuthor )
.put(updateAuthor)
.get(readAuthor)
.delete(deleteAuthor);

router.route('/genres')
.post(createGenre )
// .put(updateGenre)
.get(readGenre)
// .delete(deleteGenre)

// router.post('/authors',createAuthor )

router.route('/books')
.post(createBook)
.put(updateBook)
.get(readBook)
// .delete(deleteAuthor);

app.listen(process.env.PORT, () => {
    console.log("running in port", process.env.PORT)
})