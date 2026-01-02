const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  filename: String,
  path: String,
  author: String,
  hide: { type:Boolean, default: false},
  publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Journal", journalSchema);
