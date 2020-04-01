const mongoose = require('./db');

let supportSchema = mongoose.Schema({
    name: String,
    link: String,
    photo: String,
});

const SupportModel = mongoose.model("supports", supportSchema);

module.exports = SupportModel;