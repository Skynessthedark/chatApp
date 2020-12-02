const session = require('express-session');
const RedisStore = require('connect-redis')(session);

module.exports = new RedisStore({
    host:process.env.REDIS_URI,
    port:process.env.REDIS_PORT,
    pass:process.env.REDIS_PASS
});