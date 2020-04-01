const mongoose = require('./db');

let actionSchema = mongoose.Schema({
    photo: String, 
    place: String, 
    title: String, 
    period: String, 
    partners_id: [String], 
    support_id: [String],
    gallery: [String],
    description: String,
    city: String,
});

const ActionModel = mongoose.model("actions", actionSchema);

module.exports = ActionModel;