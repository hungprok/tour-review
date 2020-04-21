const Author = require('../models/author.js');


exports.createAuthor = async (req, res) => {
    const { name } = req.body;

    try {
        const author = await Author.create({ name: name })
        return res.status(201).json({ status: "ok", data: author });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", error: err.message });
    }
}

exports.updateAuthor = async (req, res) => {
    const id = req.body.id;
    try {
        const author = await Author.findByIdAndUpdate(id, {name: req.body.name}, {new: true});
        return res.status(200).json({ status: "ok", data: null });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", error: err.message });
    }
}

exports.deleteAuthor = async (req, res) => {
    const { id } = req.body;
    try {
        await Author.findByIdAndDelete(id)
        return res.status(204).json({ status: "ok", data: null });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", error: err.message });
    }
}

exports.readAuthor = async (req, res) => {
    const author = await Author.find();
    return res.status(200).json({ status: "ok", data: author})
}