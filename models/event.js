const mongoose = require('./db');

let eventSchema = mongoose.Schema({
    photo: String, 
    title: String, 
    show: Array,
    description: String,
    type: String,
    page: String,
});

const eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel;