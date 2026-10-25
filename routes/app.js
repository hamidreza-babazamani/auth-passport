const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

function initRoutes() {
  // FIX: no passport arg needed anymore; passport lives on app.locals
  router.get("/", (req, res) => {
    res.json({
      statusCode: 200,
      message: "auth-passport API",
      endpoints: [
        "/auth/register",
        "/auth/login",
        "/auth/logout",
        "/user/profile",
      ],
    });
  });

  router.use("/auth", authRoutes);
  router.use("/user", userRoutes);

  return router;
}

module.exports = initRoutes;
