const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, require: true },
  mediaPath: { type: String, required: true },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  creatorUsernamePrefix: {
    type: String,
    require: true,
  },
  creationTime: { type: Number },
});

mongoose.model('Post', postSchema);
