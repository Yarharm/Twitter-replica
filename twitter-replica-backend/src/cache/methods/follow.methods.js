const redisClient = require('../redis.client');
const constants = require('../constants');

exports.getTimelineSet = (usernamePrefix) => {
  return `timeline${constants.FOLLOW_KEY_DELIM}${usernamePrefix}`;
};

exports.getFollowingSet = (usernamePrefix) => {
  return `following${constants.FOLLOW_KEY_DELIM}${usernamePrefix}`;
};

exports.getFollowerSet = (usernamePrefix) => {
  return `followers${constants.FOLLOW_KEY_DELIM}${usernamePrefix}`;
};

exports.addTweetToTimeline = async (user, timestamp, tweet) => {
  const timelineSet = this.getTimelineSet(user);
  await redisClient.zaddAsync(timelineSet, timestamp, tweet);
};

exports.addFollowing = async (user, timestamp, userToFollowData) => {
  const followingSet = this.getFollowingSet(user);
  await redisClient.zaddAsync(followingSet, timestamp, userToFollowData);
};

exports.addFollower = async (user, timestamp, followerData) => {
  const followerSet = this.getFollowerSet(user);
  await redisClient.zaddAsync(followerSet, timestamp, followerData);
};

exports.removeTimeline = async (user) => {
  const timelineSet = this.getTimelineSet(user);
  await redisClient.delAsync(timelineSet);
};

exports.removeFollowing = async (user, userToRemoveData) => {
  const followingSet = this.getFollowingSet(user);
  await redisClient.zremAsync(followingSet, userToRemoveData);
};

exports.removeFollower = async (user, userToRemoveData) => {
  const followerSet = this.getFollowerSet(user);
  await redisClient.zremAsync(followerSet, userToRemoveData);
};

exports.getTimeline = async (user) => {
  const timelineSet = this.getTimelineSet(user);
  const timelineSetExists = await redisClient.existsAsync(timelineSet);
  let timeline = null;
  if (timelineSetExists) {
    timeline = await redisClient.zrevrangeAsync([timelineSet, 0, -1]);
    timeline = timeline.map((tweet) => JSON.parse(tweet));
  }
  return timeline;
};

exports.getFollowingUsers = async (user) => {
  const followingSet = this.getFollowingSet(user);
  const followingSetExists = await redisClient.existsAsync(followingSet);
  let followingUsers = null;
  if (followingSetExists) {
    followingUsers = await redisClient.zrangeAsync([followingSet, 0, -1]);
    followingUsers = followingUsers.map((following) => JSON.parse(following));
  }
  return followingUsers;
};

exports.getFollowers = async (user) => {
  const followerSet = this.getFollowerSet(user);
  const followerSetExists = await redisClient.existsAsync(followerSet);
  let followers = null;
  if (followerSetExists) {
    followers = await redisClient.zrangeAsync([followerSet, 0, -1]);
    followers = followers.map((follower) => JSON.parse(follower));
  }
  return followers;
};
