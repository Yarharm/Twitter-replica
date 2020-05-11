const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('User');
const saltRounds = 10;

exports.loginUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error();
    }

    const correctPass = await bcrypt.compare(req.body.password, user.password);
    if (!correctPass) {
      throw new Error();
    }

    const token = await user.generateJWT();
    return res
      .json({ token, userId: user._id, usernamePrefix: user.usernamePrefix })
      .send();
  } catch (err) {
    return res.status(500).json({ message: 'Invalid credentials' }).send();
  }
});

exports.createUser = asyncHandler(async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const usernamePrefix = await User.generateUsernamePrefix(req.body.username);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      usernamePrefix,
      password: hashPass,
    });
    const result = await user.save();
    return res.json(result).send();
  } catch (err) {
    return res.status(500).json({ message: 'User already exists' }).send();
  }
});
