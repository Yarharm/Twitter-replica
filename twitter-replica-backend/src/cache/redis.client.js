var Promise = require('bluebird');
var redis = Promise.promisifyAll(require('redis')).createClient();

redis.on('connect', function () {
  console.log('Redis client is online');
});
redis.on('error', function (err) {
  console.log('Could not start Redis client, Error ' + err);
});

module.exports = redis;
