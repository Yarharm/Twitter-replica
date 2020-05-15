const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization.split(' ');
    const type = authorization[0];
    const token = authorization[1];
    if (type !== authConfig.type) {
      throw new Error('Invalid authorization type');
    }

    req.userData = jwt.verify(token, authConfig.secret);
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = auth;
