const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        title: { type: String },
        author: [String],
        genre: [String],
        description: String,
        content: String,
        page: Number,
        total: Number
    },
    { timestamps: true },
);

module.exports = mongoose.model('Stores', schema);