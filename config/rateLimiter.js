var RateLimiter = require('limiter').RateLimiter;
// Allow 150 requests per hour (the Twitter search limit). Also understands
// 'second', 'minute', 'day', or a number of milliseconds
var limiter = new RateLimiter(10, 'second');
 
// Throttle requests
module.exports=function(req,res,next){
    limiter.removeTokens(1, function(err, remainingRequests) {
        if (remainingRequests < 1) {
            res.writeHead(429, {'Content-Type': 'text/plain;charset=UTF-8'});
            res.end('429 Too Many Requests - your IP is being rate limited');
          } else {
              next()
              console.log(remainingRequests);
            // callMyMessageSendingFunction('????');
          }
    });
}

