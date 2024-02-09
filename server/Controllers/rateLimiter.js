const redisClient = require('../redis');

module.exports.rateLimiter = (secondsLimit, limitAmount) =>{
return async (req, res, next) => {
    const ip = req.connection.remoteAddress;
    const [response] = await redisClient.multi().incr(ip).expire(ip, secondsLimit).exec();
    console.log(response);
    if(response[1] > limitAmount){
        res.json({
            loggedIn: false,
            status: "Too many requests, please try again later."
        })
    }
    else next();
};
}