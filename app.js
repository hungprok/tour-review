const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const TourGuide = require('./src/models/TourGuide.js');
const {createTourGuide, updateTourGuide, deleteTourGuide, readTourGuide} = require('./src/controllers/TourGuideController');
const {createCate, updateCate, deleteCate, readCate} = require('./src/controllers/CateController');
const {createTour, readTour, updateTour} = require('./src/controllers/TourController');
const {createUser} = require('./src/controllers/userController');
const {Login, auth} = require('./src/controllers/authenticationController');
const {Logout, LogoutAll} = require('./src/controllers/logoutController');
const {createReview, readReview} = require('./src/controllers/reviewController');
const {checkTour} = require('./src/middleware/checkTour');

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


// router.get('/', (req, res) => {
//     res.status(200).json({ status: "ok", data: [] })
// })

router.route('/TourGuides')
.post(createTourGuide )
.put(updateTourGuide)
.get(readTourGuide)
.delete(deleteTourGuide);

router.route('/Cates')
.post(createCate)
// .put(updateCate)
.get(readCate)
// .delete(deleteCate)

// router.post('/TourGuides',createTourGuide )

router.route('/Tours')
.post(auth, createTour)
.put(auth, updateTour)
.get(auth, readTour)
// .delete(deleteTourGuide);

router.route('/users')
.post(createUser)

router.route('/reviews')
.post(auth, checkTour, createReview)
.get(auth, checkTour, readReview)

router.route('/login')
.post(Login)

router.route('/logout')
.get(auth, Logout)

router.route('/logoutAll')
.get(auth, LogoutAll)

app.listen(process.env.PORT, () => {
    console.log("running in port", process.env.PORT)
})