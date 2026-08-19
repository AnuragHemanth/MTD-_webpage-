const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    code,
    ...(process.env.NODE_ENV !== 'production' && err.stack ? { stack: err.stack } : {})
  });
};

module.exports = errorMiddleware;
