const mongoose = require('mongoose');

const CateSchema = mongoose.Schema({
    Cate: {
        type: String,
        required: [true, "Cate name is required."],
        trim: true
    }
})

const Cate = mongoose.model('Cate', CateSchema);


module.exports = Cate;