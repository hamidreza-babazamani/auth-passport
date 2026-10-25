function notFoundError(req, res, next) {
  // FIX: proper HTTP status
  return res.status(404).json({ statusCode: 404, message: "not found" });
}

function errorHandler(err, req, res, next) {
  const status = err?.status ?? err?.statusCode ?? 500;
  // FIX: no stack in production
  return res.status(status).json({
    statusCode: status,
    message: err?.message ?? "internal server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err?.stack }),
  });
}

module.exports = { notFoundError, errorHandler };
