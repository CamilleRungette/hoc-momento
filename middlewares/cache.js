var mcache = require("memory-cache");

var cache = (duration) => {
  return (req, res, next) => {
    let key = "_express_" + req._parsedOriginalUrl.href;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cache;