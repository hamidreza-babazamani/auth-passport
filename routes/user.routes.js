const router = require("express").Router();
const { checkAuthentication } = require("../middleware");

router.get("/profile", checkAuthentication, (req, res) => {
  // FIX: JSON instead of render
  return res.status(200).json({ statusCode: 200, data: req.user });
});

router.get("/me", checkAuthentication, (req, res) => {
  return res.status(200).json({ statusCode: 200, data: req.user });
});

module.exports = router;
