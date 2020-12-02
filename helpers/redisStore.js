const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

let redisClient = redis.createClient({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS
});

module.exports = new RedisStore({client: redisClient});