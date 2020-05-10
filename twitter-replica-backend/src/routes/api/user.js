const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const User = mongoose.model('User');

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        throw new Error();
      }

      const correctPass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPass) {
        throw new Error();
      }

      const token = await user.generateJWT();
      return res
        .json({ token, userId: user._id, usernamePrefix: user.usernamePrefix })
        .send();
    } catch (err) {
      res.status(500).json({ message: 'Invalid credentials' }).send();
    }
  })
);

router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    try {
      const hashPass = await bcrypt.hash(req.body.password, saltRounds);
      const usernamePrefix = await generateUsernamePrefix(req.body.username);
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        usernamePrefix: usernamePrefix,
        password: hashPass,
      });
      const result = await user.save();
      res.json(result).send();
    } catch (err) {
      res.status(500).json({ message: 'User already exists' }).send();
    }
  })
);

generateUsernamePrefix = async (username) => {
  const atSign = '@';
  if (username.includes(atSign)) {
    const usernamePrefix = username.split(atSign)[0];
    let prefixCount = await User.countDocuments({ username: usernamePrefix });
    prefixCount = prefixCount === 0 ? '' : prefixCount;
    return `${usernamePrefix}${prefixCount}`;
  }
  return username;
};

module.exports = router;
