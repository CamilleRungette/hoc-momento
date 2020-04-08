const mongoose = require('./db');

let eventSchema = mongoose.Schema({
    photo: String, 
    place: String, 
    title: String, 
    period: String, 
    description: String,
    city: String,
    type: String,
    startDate: Date,
    endDate: Date
});

const eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel;