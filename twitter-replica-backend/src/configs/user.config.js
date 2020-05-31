const defaultUser = {
  name: 'Default User',
  bio: '',
  avatar: 'unknown_user.png',
  coverImage: 'unknown_background.jpg',
};

const unknownUser = {
  id: 'unknownUser',
  coverImage: defaultUser.coverImage,
  avatar: defaultUser.avatar,
  bio: 'User does not exist',
  name: 'Unknown user',
};

exports.defaultUser = defaultUser;
exports.unknownUser = unknownUser;
