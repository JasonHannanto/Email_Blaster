//Setting up/Configuring Passport

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //Find the correct user given the cookie
    User.findById(id).then(user =>{
        done(null, user);
    });
});

//GoogleStrategy has internal identifier 'google'
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('access token: ', accessToken);
      // console.log('refresh token: ', refreshToken);
      // console.log('profile: ', profile);

      //Query our DB to see if ID already exists
      User.findOne({ googleID: profile.id }).then(existingUser => {
        //User Found
        if (existingUser) {
          //done(err, user)
          done(null, existingUser);
        } else {
          //Create new instance of user and save to DB
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
