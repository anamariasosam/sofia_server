require("dotenv").config();

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
      callbackURL: "/auth/facebook/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
    }
  )
);
