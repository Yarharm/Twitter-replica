const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.followUser = asyncHandler(async (req, res) => {
  try {
    const authenticatedUser = await User.findOne({
      usernamePrefix: req.userData.usernamePrefix,
    });
    const userToFollow = await User.findOne({
      usernamePrefix: req.body.usernamePrefix,
    });

    if (!authenticatedUser.following.includes(userToFollow._id)) {
      authenticatedUser.following.unshift(userToFollow);
      await authenticatedUser.save();
    }
    if (!userToFollow.followers.includes(authenticatedUser._id)) {
      userToFollow.followers.unshift(authenticatedUser);
      await userToFollow.save();
    }

    const userToFollowData = {
      name: userToFollow.name,
      usernamePrefix: userToFollow.usernamePrefix,
      avatar: userToFollow.avatar,
    };

    res.json(userToFollowData).send();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not follow the user' })
      .send();
  }
});

exports.unfollowUser = asyncHandler(async (req, res) => {
  try {
    const authenticatedUser = await User.findOne({
      usernamePrefix: req.userData.usernamePrefix,
    });
    const userToFollow = await User.findOne({
      usernamePrefix: req.body.usernamePrefix,
    });

    const userToFollowIndex = authenticatedUser.following.indexOf(
      userToFollow._id
    );
    if (userToFollowIndex > -1) {
      authenticatedUser.following.splice(userToFollowIndex, 1);
      await authenticatedUser.save();
    }

    const authUserIndex = userToFollow.followers.indexOf(authenticatedUser._id);
    if (authUserIndex > -1) {
      userToFollow.followers.splice(authUserIndex, 1);
      await userToFollow.save();
    }

    res.send();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not unfollow the user' })
      .send();
  }
});

exports.getFollowing = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({
      usernamePrefix: req.userData.usernamePrefix,
    });
    let usersToFollow = [];
    if (user.following) {
      usersToFollow = await Promise.all(
        user.following.map(async (userId) => {
          const user = await User.findOne({ _id: userId });
          const userData = {
            name: user.name,
            usernamePrefix: user.usernamePrefix,
            avatar: user.avatar,
          };
          return userData;
        })
      );
    }

    res.json(usersToFollow).send();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not fetch users to follow' })
      .send();
  }
});

exports.getFollowers = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({
      usernamePrefix: req.userData.usernamePrefix,
    });
    let usersToFollow = [];
    if (user.followers) {
      usersToFollow = await Promise.all(
        user.followers.map(async (userId) => {
          const user = await User.findOne({ _id: userId });
          const userData = {
            name: user.name,
            usernamePrefix: user.usernamePrefix,
            avatar: user.avatar,
          };
          return userData;
        })
      );
    }

    res.json(usersToFollow).send();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not fetch followers' })
      .send();
  }
});
