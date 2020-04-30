const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const authConfig = require('../config/authConfig');

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

userSchema.methods.generateJWT = async () => {
  return jwt.sign(
    { id: this._id, username: this.username },
    authConfig.secret,
    {
      expiresIn: authConfig.expiration,
    }
  );
};

mongoose.model('User', userSchema);
