const express = require('express');
require('../config/passport');
const passport = require('passport');
const authController = require('../controllers/v1/authController');
const generateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/check-username', authController.checkUsername);

router.post('/register', authController.register);

router.post('/verify-email', authController.verifyEmailCode);

router.post('/login', authController.login);

/////////////// GOOGLE /////////////
router.get(
  '/google',
  (req, res, next) => {
    const { username } = req.query;
    if (username) {
      req.session.username = username;
    }
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/google/failure',
    session: false,
  }),
  (req, res) => {
    const token = generateToken(req.user);

    res.json({
      message: 'Google login successful',
      user: req.user,
      token,
    });
  }
);

router.get('/google/failure', (req, res) => {
  res.status(401).json({ message: 'Google login failed' });
});

module.exports = router;
