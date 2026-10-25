function checkAuthentication(req, res, next) {
  // FIX: JSON 401 instead of redirect (no frontend)
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ statusCode: 401, message: "unauthorized" });
}

function redirectIfIAuth(req, res, next) {
  // FIX: JSON 400 instead of redirect (no frontend)
  if (req.isAuthenticated()) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "already logged in" });
  }
  return next();
}

module.exports = { checkAuthentication, redirectIfIAuth };
