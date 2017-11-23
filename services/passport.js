const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
    }
  )
);
