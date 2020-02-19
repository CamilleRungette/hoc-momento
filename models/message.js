const mongoose = require('./db');

let messageSchema = mongoose.Schema({
  date: Date,
  name: String,
  email: String,
  content: String,
  organisation: String,
})

const MessageModel = mongoose.model("persons", messageSchema);
 module.exports = MessageModel;