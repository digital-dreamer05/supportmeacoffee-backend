const express = require("express");
require("../config/passport");
const passport = require("passport");
const authController = require("../controllers/v1/authController");

const router = express.Router();

router.post("/check-username", authController.checkUsername);

router.post("/register", authController.register);

router.post("/verify-email", authController.verifyEmailCode);

/////////////// GOOGLE /////////////
router.get(
  "/google",
  (req, res, next) => {
    const { username } = req.query;
    if (username) {
      req.session.username = username;
    }
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/google/failure",
    session: false,
  }),
  async (req, res) => {
    const username = req.session.username;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({
        status: "error",
        message: "Username already taken",
      });
    }

    req.user.username = username;
    await req.user.save();

    req.session.username = null;

    res.json({
      message: "Google login successful",
      user: req.user,
    });
  }
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google login failed" });
});

module.exports = router;
