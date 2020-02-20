const mongoose = require('./db');

let newsSchema = mongoose.Schema({
  email: String,
})

const NewsModel = mongoose.model("newsletter", newsSchema);
 module.exports = NewsModel;