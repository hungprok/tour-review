const mongoose = require('mongoose');

const TourGuideSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tour guide name is required."],
        trim: true
    }
})

const TourGuide = mongoose.model('Tour Guide', TourGuideSchema);


module.exports = TourGuide;
