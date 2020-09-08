const redisClient = require('../redis.client');
const constants = require('../constants');

exports.getKey = (usernamePrefix) => {
  return 'user' + constants.USER_KEY_DELIM + usernamePrefix;
};

exports.getUser = async (usernamePrefix) => {
  const userKey = this.getKey(usernamePrefix);
  const userExists = await redisClient.existsAsync(userKey);
  let user = null;
  if (userExists) {
    user = await redisClient.hgetallAsync(userKey);
  }
  return user;
};

exports.setUser = async (usernamePrefix, user) => {
  const userKey = this.getKey(usernamePrefix);

  const userData = {
    _id: user.id,
    email: user.email,
    username: user.username,
    usernamePrefix: user.usernamePrefix,
    password: user.password,
    name: user.name,
    bio: user.bio,
    avatar: user.avatar,
    coverImage: user.coverImage,
  };

  const properties = Object.entries(userData);
  const flattenProperties = properties.flat();
  await redisClient.hsetAsync(userKey, flattenProperties);
};

exports.deleteUser = async (usernamePrefix) => {
  const userKey = this.getKey(usernamePrefix);
  await redisClient.delAsync(userKey);
};
