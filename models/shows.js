const mongoose = require('./db');

let showSchema = mongoose.Schema({
  title: String, 
  place: [String], 
  period: [String], 
  city: [String],
  description: String,
  partners: Array, 
  supports: Array,
  links: Array,
  photo: String, 
  gallery: [String],
});

const ShowModel = mongoose.model("shows", showSchema);

module.exports = ShowModel;