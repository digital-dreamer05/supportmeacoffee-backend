const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const { sendVerificationEmail } = require("../../utils/email");
// const generateToken = require("../../utils/generateToken");
const messages = require("../../utils/messages/fa");

exports.checkUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      isAvailable: false,
      message: messages.auth.username_required,
    });
  }

  const usernameRegex = /^[a-zA-Z0-9.]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      isAvailable: false,
      message: messages.auth.username_invalid,
      allowedChars: "a-z, A-Z, 0-9, .",
    });
  }

  if (username.length < 3 || username.length > 20) {
    return res.status(400).json({
      isAvailable: false,
      message: messages.auth.username_length,
    });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(409).json({
      isAvailable: false,
      message: messages.auth.username_taken,
    });
  }

  return res.status(200).json({
    isAvailable: true,
    message: messages.auth.username_available,
  });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: messages.auth.email_required });
  }
  if (!password) {
    return res.status(400).json({ message: messages.auth.password_required });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: messages.auth.user_exists });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const codeExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    email,
    password: hashedPassword,
    emailVerificationCode: verificationCode,
    emailVerificationExpires: codeExpires,
    isEmailVerified: false,
  });

  await sendVerificationEmail(email, verificationCode);

  res.status(201).json({ message: messages.auth.register_success });
};

exports.verifyEmailCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: messages.auth.email_required });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: messages.auth.user_not_found });
  }

  if (user.isEmailVerified) {
    return res.status(400).json({ message: messages.auth.already_verified });
  }

  if (user.emailVerificationCode !== code) {
    return res.status(400).json({ message: messages.auth.invalid_code });
  }

  if (user.emailVerificationExpires < Date.now()) {
    return res.status(400).json({ message: messages.auth.code_expired });
  }

  user.isEmailVerified = true;
  user.emailVerificationCode = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.status(200).json({ message: messages.auth.email_verified });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: messages.auth.user_not_found });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: messages.auth.login_failed });
  }

  if (!user.isEmailVerified) {
    return res.status(403).json({ message: messages.auth.email_not_verified });
  }

  const token = generateToken(user);

  res.status(200).json({
    message: messages.auth.login_success,
    user,
    token,
  });
};
