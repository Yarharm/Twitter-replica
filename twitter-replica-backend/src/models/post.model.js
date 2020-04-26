const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: false },
  content: { type: String, require: true },
  mediaPath: { type: String, required: true },
});

mongoose.model('Post', postSchema);
