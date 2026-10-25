const router = require("express").Router();
const { hashSync } = require("bcrypt");
const rateLimit = require("express-rate-limit");
const { userModel } = require("../model/user.model");
const { registerSchema } = require("../validators/auth.validator");
const { redirectIfIAuth } = require("../middleware");

// FIX: brute-force protection on register
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    statusCode: 429,
    message: "too many register attempts, try later",
  },
});

router.post(
  "/register",
  redirectIfIAuth,
  registerLimiter,
  async (req, res, next) => {
    try {
      // FIX: validate body with zod
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          statusCode: 400,
          message: "validation failed",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const { fullName, username, password } = parsed.data;

      const existing = await userModel.findOne({ username });
      if (existing) {
        return res
          .status(409)
          .json({ statusCode: 409, message: "username already exists" });
      }

      const user = await userModel.create({
        fullName,
        username,
        password: hashSync(password, 10),
      });

      return res
        .status(201)
        .json({ statusCode: 201, message: "registered", data: user });
    } catch (error) {
      next(error);
    }
  },
);

// FIX: login rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { statusCode: 429, message: "too many login attempts, try later" },
});

router.post("/login", redirectIfIAuth, loginLimiter, (req, res, next) => {
  // FIX: custom callback so we return JSON instead of redirect
  req.app.locals.passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: info?.message || "invalid credentials",
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res
        .status(200)
        .json({ statusCode: 200, message: "logged in", data: user });
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  // FIX: POST for logout, JSON response, no redirect
  req.logOut({ keepSessionInfo: false }, (err) => {
    if (err) return next(err);
    return res.status(200).json({ statusCode: 200, message: "logged out" });
  });
});

module.exports = router;
