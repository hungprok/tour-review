const Genre = require('../models/genre');


exports.createGenre = async (req, res) => {
    const { genrename } = req.body;

    try {
        const genre = await Genre.create({ genre: genrename })
        return res.status(201).json({ status: "ok", data: genre });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", error: err.message });
    }
};

exports.readGenre = async (req, res) => {
    const genre = await Genre.find();
    return res.status(200).json({ status: "ok", data: genre})
}