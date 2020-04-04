const mongoose = require('./db');

let articleSchema = mongoose.Schema({
  action_id: {type: mongoose.Schema.Types.ObjectId, ref: "actions"},
  show_id: {type: mongoose.Schema.Types.ObjectId, ref: "shows"},
  type: String,
  url: String,
  name: String,
});

const ArticleModel = mongoose.model("articles", articleSchema);

module.exports = ArticleModel;
