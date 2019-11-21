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

module.exports = { getCache, setCache };
