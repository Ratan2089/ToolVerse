const { notFoundResponse } = require('../utils/response');

/**
 * Catch-all 404 handler — must be mounted AFTER all routes.
 */
function notFound(req, res) {
  return notFoundResponse(res, `Route ${req.originalUrl} not found on this server.`);
}

module.exports = notFound;
