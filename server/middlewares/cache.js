const NodeCache = require('node-cache');

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 5 * 60 });

function getUrlFromRequest(req) {
  const url = `${req.protocol  }://${  req.headers.host  }${req.originalUrl}`;
  return url;
}

function setCache(req, res, next) {
  const url = getUrlFromRequest(req);
  cache.set(url, res.locals.data);
  return next();
}

function getCache(req, res, next) {
  const url = getUrlFromRequest(req);
  const content = cache.get(url);
  if (content) {
    return res.status(200).send(content);
  }
  return next();
}
function clearCache(req, res, next) {
  cache.keys(function(err, keys) {
      if (!err) {
          // again, it depends on your application architecture,
          // how you would retrive and clear the cache that needs to be cleared.
          // You may use query path, query params or anything. 
          let resourceUrl = req.baseUrl;
          const resourceKeys = keys.filter(k => k.includes(resourceUrl));

          cache.del(resourceKeys);
      }
  });
  return next();
}

module.exports = { getCache, setCache, clearCache };
