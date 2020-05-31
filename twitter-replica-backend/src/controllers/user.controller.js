const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const properties = require('../properties');

const User = mongoose.model('User');
const userFacade = require('../configs/user.config');

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
      name: userFacade.defaultUser.name,
      bio: userFacade.defaultUser.bio,
      avatar: `${properties.mediaPath}${userFacade.defaultUser.avatar}`,
      coverImage: `${properties.mediaPath}${userFacade.defaultUser.coverImage}`,
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
    res
      .json({
        id: userFacade.unknownUser.id,
        coverImage: `${properties.mediaPath}${userFacade.unknownUser.coverImage}`,
        avatar: `${properties.mediaPath}${userFacade.unknownUser.avatar}`,
        bio: userFacade.unknownUser.bio,
        name: userFacade.unknownUser.name,
        username: req.params.usernamePrefix,
      })
      .send();
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  let avatarImage = req.body.avatar;
  let { coverImage } = req.body;

  if (req.files) {
    avatarImage = req.files.avatar ? req.files.avatar[0].location : avatarImage;
    coverImage = req.files.coverImage
      ? req.files.coverImage[0].location
      : coverImage;
  }

  const user = new User({
    _id: req.body.id,
    name: req.body.name,
    bio: req.body.bio,
    avatar: avatarImage,
    coverImage,
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
