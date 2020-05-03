const Review = require('../models/review');

exports.createReview = async function (req, res) {
    const {content} = req.body;
    try {
        const review = await Review.create({
            content: content,
            user: req.user._id,
            TourId: req.TourId,
            username: req.user.name
        })
        return res.status(200).json({ status: "ok", data: review });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", error: err.message });
    }
};

exports.readReview = async function (req, res) {
    const { tourId } = req.body;
    try {

        const tour = await tour.findById(req.body.tourId).populate('reviews', '-user -__v -createdAt -updatedAt');

        // const abc = tour.reviews.map(item => {
        //     Object.defineProperty(item, 'tourId', { configurable: true });
        //     console.log(item);
        //     // delete item.tourId;
        // })
        // console.log(abc);

        return res.status(200).json({ status: "ok", data: tour });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", error: err.message });
    }
}; 