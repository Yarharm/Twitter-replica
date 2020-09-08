const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const cache = require('../cache/cache');
const User = mongoose.model('User');

exports.followUser = asyncHandler(async (req, res) => {
  try {
    const authenticatedUser = await User.findOne({
      usernamePrefix: req.userData.usernamePrefix,
    });
    const userToFollow = await User.findOne({
      usernamePrefix: req.body.usernamePrefix,
    });
    const followTimestamp = Math.floor(+Date.now() / 1000);

    if (
      authenticatedUser.following.findIndex(
        (user) => user.userId === userToFollow._id
      ) < 0
    ) {
      authenticatedUser.following.push({
        userId: userToFollow._id,
        followTime: followTimestamp,
      });
      await authenticatedUser.save();
      await cache.follow.addFollowing(
        req.userData.usernamePrefix,
        followTimestamp,
        JSON.stringify(this.buildFollowData(userToFollow))
      );
    }
    if (
      userToFollow.followers.findIndex(
        (user) => user.userId === authenticatedUser._id
      ) < 0
    ) {
      userToFollow.followers.push({
        userId: authenticatedUser._id,
        followTime: followTimestamp,
      });
      await userToFollow.save();
      await cache.follow.addFollower(
        req.body.usernamePrefix,
        followTimestamp,
        JSON.stringify(this.buildFollowData(authenticatedUser))
      );
    }

    res.send();
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

    const userToFollowIndex = authenticatedUser.following.findIndex((user) => {
      return user.userId.equals(userToFollow._id);
    });

    if (userToFollowIndex > -1) {
      authenticatedUser.following.splice(userToFollowIndex, 1);
      await authenticatedUser.save();
    }
    await cache.follow.removeFollowing(
      req.userData.usernamePrefix,
      JSON.stringify(this.buildFollowData(userToFollow))
    );

    const authUserIndex = userToFollow.followers.findIndex((user) =>
      user.userId.equals(authenticatedUser._id)
    );
    if (authUserIndex > -1) {
      userToFollow.followers.splice(authUserIndex, 1);
      await userToFollow.save();
    }
    await cache.follow.removeFollower(
      req.body.usernamePrefix,
      JSON.stringify(this.buildFollowData(authenticatedUser))
    );

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
    let usersToFollow = await cache.follow.getFollowingUsers(
      req.userData.usernamePrefix
    );
    if (!usersToFollow) {
      const user = await User.findOne({
        usernamePrefix: req.userData.usernamePrefix,
      });
      if (user.following && user.following.length > 0) {
        usersToFollow = await Promise.all(
          user.following.map(async (userToFollow) => {
            const currentUser = await User.findOne({
              _id: userToFollow.userId,
            });
            const userData = this.buildFollowData(currentUser);
            await cache.follow.addFollowing(
              req.userData.usernamePrefix,
              userToFollow.followTime,
              JSON.stringify(userData)
            );
            return userData;
          })
        );
      }
    }

    usersToFollow = usersToFollow ? usersToFollow : [];
    res.json(usersToFollow).send();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not fetch users to follow' })
      .send();
  }
});

exports.getFollowers = asyncHandler(async (req, res) => {
  let followers = [];
  try {
    const user = await User.findOne({
      usernamePrefix: req.userData.usernamePrefix,
    });
    if (user.followers && user.followers.length > 0) {
      followers = await Promise.all(
        user.followers.map(async (follower) => {
          const currentUser = await User.findOne({ _id: follower.userId });
          const userData = this.buildFollowData(currentUser);
          return userData;
        })
      );
    }

    res.json(followers).send();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Could not fetch followers' })
      .send();
  }
});

exports.buildFollowData = (user) => {
  return {
    name: user.name,
    usernamePrefix: user.usernamePrefix,
    avatar: user.avatar,
  };
};
