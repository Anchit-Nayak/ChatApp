const redisClient = require('../redis');

module.exports.rateLimiter = async (req, res, next) => {
    const ip = req.connection.remoteAddress;
    const response = await redisClient.multi().incr(ip).expire(ip, 60).exec();
    next();
}