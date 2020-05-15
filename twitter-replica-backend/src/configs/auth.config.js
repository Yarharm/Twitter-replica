const authConfig = {
  secret:
    process.env.NODE_ENV === 'production'
      ? process.env.AUTH_SECRET_PROD
      : process.env.AUTH_SECRET_DEV,
  type: 'Bearer',
  expiration: '1h',
};

module.exports = authConfig;
