const mongoose = require('mongoose');
const Cate = require('./Cate');
const TourGuide = require('./TourGuide');
const Review = require('./review')

const tourSchema = mongoose.Schema({
    tourguide: Object,
    cate: Array,
    title: {
        type: String,
        required: [true, "Title is required."],
        trim: true
    },
    owner: {
        type: Object,
        required: [true, "Book must have an owner"]
      }     
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

tourSchema.virtual ('reviews', {
    ref: 'reviews',
    localField: 'id',
    foreignField: 'TourId'
});

tourSchema.pre('save', async function (next) {
    this.tourguide = await TourGuide.findById(this.tourguide);
    const cateArray = this.cate.map(async el => await Cate.findById(el))
    this.cate = await Promise.all(cateArray);
    next();
});

const Tour = mongoose.model('Tour', tourSchema);


module.exports = Tour;

// const authorId = await Author.findById(author);
// const genreArray = genre.map(async el => await Genre.findById(el))
// const genreResult = await Promise.all(genreArray)
