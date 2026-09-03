/**
 * Global Express error handler — must be the LAST middleware (4 arguments).
 *
 * Returns JSON errors with stack trace in development, safe message in production.
 */
function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV !== 'production';
  const statusCode = err.statusCode || err.status || 500;

  console.error(`[Error] ${req.method} ${req.originalUrl} → ${err.message}`);

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.',
    ...(isDev && { stack: err.stack }),
  });
}

module.exports = errorHandler;
