const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const properties = require('../properties');
const User = mongoose.model('User');
const defaultUser = require('../configs/default-user.config');
const saltRounds = 10;

exports.loginUser = asyncHandler(async (req, res) => {
  let msg = 'Invalid cred';
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      msg = 'NO USER WAS FOUND';
      throw new Error();
    }

    const correctPass = await bcrypt.compare(req.body.password, user.password);
    if (!correctPass) {
      msg = 'PASSWORD IS WRONG';
      throw new Error();
    }

    const token = await user.generateJWT();
    return res
      .json({ token, userId: user._id, usernamePrefix: user.usernamePrefix })
      .send();
  } catch (err) {
    return res.status(500).json({ message: msg }).send();
  }
});

exports.createUser = asyncHandler(async (req, res) => {
  try {
    const url = properties.generateUrl(req);
    const mediaPath = `${url}${properties.mediaPath}`;
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const usernamePrefix = await User.generateUsernamePrefix(req.body.username);

    const user = new User({
      email: req.body.email,
      username: req.body.username,
      usernamePrefix,
      password: hashPass,
      name: defaultUser.name,
      bio: defaultUser.bio,
      avatar: `${mediaPath}${defaultUser.avatar}`,
      coverImage: `${mediaPath}${defaultUser.coverImage}`,
    });

    const result = await user.save();
    return res.json(result).send();
  } catch (err) {
    return res.status(500).json({ message: 'User already exists' }).send();
  }
});

exports.getUser = asyncHandler(async (req, res) => {
  try {
    const result = await User.findOne({
      usernamePrefix: req.params.usernamePrefix,
    });
    res
      .json({
        id: result._id,
        coverImage: result.coverImage,
        avatar: result.avatar,
        bio: result.bio,
        name: result.name,
        username: result.username,
      })
      .send();
  } catch (err) {
    res.status(500).json({ message: 'Could not find user information' }).send();
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  let avatarImage = req.body.avatar;
  let coverImage = req.body.coverImage;
  const url = `${req.protocol}://${req.get('host')}`;

  if (req.files) {
    avatarImage = req.files['avatar']
      ? url + properties.mediaPath + req.files['avatar'][0].filename
      : avatarImage;
    coverImage = req.files['coverImage']
      ? url + properties.mediaPath + req.files['coverImage'][0].filename
      : coverImage;
  }

  const user = new User({
    _id: req.body.id,
    name: req.body.name,
    bio: req.body.bio,
    avatar: avatarImage,
    coverImage: coverImage,
  });

  try {
    const result = await User.updateOne(
      { _id: req.body.id, usernamePrefix: req.userData.usernamePrefix },
      user
    );
    if (result.n <= 0) {
      res.status(401).json({ message: 'Not authorized' }).send();
    }
    res.send();
  } catch (err) {
    res.status(500).json({ message: 'Could not update user' }).send();
  }
});

exports.healthCheck = asyncHandler(async (_, res) => {
  res.status(200).send('HEALTH:OK');
});
