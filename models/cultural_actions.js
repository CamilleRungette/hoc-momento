const mongoose = require('./db');

let actionSchema = mongoose.Schema({
  place: String, 
  city: String,
  title: String, 
  period: String, 
  description: String,
  partners: Array, 
  support: Array,
  links: Array,
  photo: String, 
  gallery: [String],
});

const ActionModel = mongoose.model("actions", actionSchema);

module.exports = ActionModel;