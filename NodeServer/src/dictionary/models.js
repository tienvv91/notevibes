const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        word: { type: String },
        ipa: String,
        sound: String,
        locate: String, // uk, us
    },
    { timestamps: true },
);

module.exports = mongoose.model('DictionaryStore', schema);