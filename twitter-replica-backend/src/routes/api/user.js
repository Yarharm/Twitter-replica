const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    console.log(token);
    return res.json({ token }).send();
  })
);

router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashPass,
    });
    const ret = await user.save();
    res.json(ret).send();
  })
);

module.exports = router;
