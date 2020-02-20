const mongoose = require('./db');

let messageSchema = mongoose.Schema({
  date: Date,
  name: String,
  email: String,
  content: String,
  organisation: String,
  read: Boolean,
})

const MessageModel = mongoose.model("messages", messageSchema);
 module.exports = MessageModel;