const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const authConfig = require('../configs/auth.config');

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  usernamePrefix: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  username: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  bio: { type: String },
  avatar: { type: String, require: true },
  coverImage: { type: String, require: true },
  following: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      followTime: { type: Number },
    },
  ],
  followers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      followTime: { type: Number },
    },
  ],
});

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

// Statics
userSchema.statics.generateUsernamePrefix = async function usernamePrefix(
  username
) {
  const atSign = '@';
  if (username.includes(atSign)) {
    const currPrefix = username.split(atSign)[0];
    let prefixCount = await this.countDocuments({ username: currPrefix });
    prefixCount = prefixCount === 0 ? '' : prefixCount;
    return `${currPrefix}${prefixCount}`;
  }
  return username;
};

// Methods
userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      usernamePrefix: this.usernamePrefix,
    },
    authConfig.secret,
    {
      expiresIn: authConfig.expiration,
    }
  );
};

mongoose.model('User', userSchema);
