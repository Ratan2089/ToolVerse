const { successResponse } = require('../utils/response');

function healthCheck(req, res) {
  return successResponse(res, {
    message: 'ToolVerse API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
}

module.exports = { healthCheck };
