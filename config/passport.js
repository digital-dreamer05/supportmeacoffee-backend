const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
console.log("GOOGLE_CLIENT_ID =>", process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "602465956315-2e82d8p47himjc2ipa03p2tn9qtfndsi.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4002/api/auth/google/callback",
      //   clientID: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //   callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const existingUser = await User.findOne({ email });

      if (existingUser) return done(null, existingUser);

      const username = req.query.state || null;

      const user = await User.create({
        email,
        isEmailVerified: true,
        username,
        payment: {
          isSetup: false,
        },
      });

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
