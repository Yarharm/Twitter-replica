const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const User = mongoose.model('User');

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.sendStatus(401);
    }

    const correctPass = await bcrypt.compare(req.body.password, user.password);
    if (!correctPass) {
      return res.sendStatus(401);
    }

    const token = await user.generateJWT();
    return res
      .json({ token, userId: user._id, usernamePrefix: user.usernamePrefix })
      .send();
  })
);

router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const usernamePrefix = await generateUsernamePrefix(req.body.username);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      usernamePrefix: usernamePrefix,
      password: hashPass,
    });
    const ret = await user.save();
    res.json(ret).send();
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
