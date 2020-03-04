const mongoose = require('./db');

let personSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  title: String,
  description: String,
  email: String,
  telephone: String,
  photo: String,
})

const PersonModel = mongoose.model("persons", personSchema);
 module.exports = PersonModel;