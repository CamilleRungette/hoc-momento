const mongoose = require('./db');

let showSchema = mongoose.Schema({
    photo: String, 
    place: String, 
    title: String, 
    period: String, 
    partners: [String], 
    gallery: [String],
    description: String,
    city: String,
});

const ShowModel = mongoose.model("shows", showSchema);

module.exports = ShowModel;