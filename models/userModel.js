const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  oauthProvider: {
    type: String,
    enum: ["google", "facebook", "twitter", "apple"],
    default: undefined,
  },
  oauthId: { type: String, default: null },

  displayName: { type: String },
  bio: { type: String },
  profileImage: { type: String },
  socialLinks: {
    type: String,
  },

  isEmailVerified: { type: Boolean, default: false },

  emailVerificationCode: { type: String },
  emailVerificationExpires: { type: Date },

  payment: {
    country: String,
    bankInfo: String,
    isSetup: { type: Boolean, default: false },
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
