const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../../utils/email");

exports.checkUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      isAvailable: false,
      message: "Username is required",
    });
  }

  const usernameRegex = /^[a-zA-Z0-9.]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      isAvailable: false,
      message: "Username can only contain letters, numbers, and periods",
      allowedChars: "a-z, A-Z, 0-9, .",
    });
  }

  if (username.length < 3 || username.length > 20) {
    return res.status(400).json({
      isAvailable: false,
      message: "Username must be between 3-20 characters",
    });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(409).json({
      isAvailable: false,
      message: "Username is already taken",
    });
  }

  return res.status(200).json({
    isAvailable: true,
    message: "Username is available",
  });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(409).json({ message: "Email is already registered" });

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

  res
    .status(201)
    .json({ message: "User registered. Verification code sent to email." });
};

exports.verifyEmailCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email and code are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.isEmailVerified) {
    return res.status(400).json({ message: "Email already verified" });
  }

  if (user.emailVerificationCode !== code) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  if (user.emailVerificationExpires < Date.now()) {
    return res.status(400).json({ message: "Verification code expired" });
  }

  user.isEmailVerified = true;
  user.emailVerificationCode = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  if (!user.isEmailVerified)
    return res.status(403).json({ message: "Email not verified" });

  const token = generateToken(user);

  res.status(200).json({
    message: "Login successful",
    user,
    token,
  });
};
