/**
 * Centralized JSON response helpers for consistent API format.
 *
 * Success envelope: { success: true, data: <payload> }
 * Error envelope:  { success: false, message: <string> }
 */

function successResponse(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

function errorResponse(res, message, statusCode = 400) {
  return res.status(statusCode).json({ success: false, message });
}

function notFoundResponse(res, message = 'Resource not found') {
  return errorResponse(res, message, 404);
}

module.exports = { successResponse, errorResponse, notFoundResponse };
